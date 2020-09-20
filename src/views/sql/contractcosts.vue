<template>
  <div class="app-main">
    <div id="item1"></div>
    <div id="item2">建筑面积：</div>
    <div id="item3">
      <el-select size="mini" v-model="org_value" @change="org_change">
        <el-option
          v-for="item in org_list"
          :key="item.org_id"
          :label="item.org_name"
          :value="item.org_id"
        ></el-option>
      </el-select>
    </div>
    <div id="item4">分类能耗：</div>
    <div id="item5">
      <el-select size="mini" v-model="agg_type_value" @change="agg_type_change">
        <el-option
          v-for="item in agg_type_list"
          :key="item.type_id"
          :label="item.type_name"
          :value="item.type_id"
        ></el-option>
      </el-select>
    </div>
    <div id="item6">起始日期：</div>
    <div id="item7">
      <el-date-picker v-model="datetime1" type="datetime" placeholder="选择日期" size="mini" @change="datetime1_change">
      </el-date-picker>
    </div>
    <div id="item61">截止日期：</div>
    <div id="item71">
      <el-date-picker v-model="datetime2" type="datetime" placeholder="选择日期" size="mini"  @change="datetime2_change">
      </el-date-picker>
    </div>
    <div id="item8"></div>
    <div id="item9"></div>
    <div id="item10">
      <el-input placeholder="输入关键字进行过滤" v-model="filterText" size="mini"></el-input>
    </div>
    <div id="item11">
      <el-tree
        class="filter-tree"
        :data="partoptions"
        show-checkbox
        node-key="id"
        :props="defaultProps"
        :default-checked-keys="[0]"
        default-expand-all
        :filter-node-method="filterNode"
        ref="tree"
        @check-change="tree_change"
      ></el-tree>
    </div>
    <div id="item13">
      <el-table
        :data="tableData"
        height="100%"
        border
        style="width: 100%"
        :header-cell-style="{background:'#49C6DA',height:'15px',color:'white'}"
      >
        <el-table-column prop="name" label="支路名称" width="220"></el-table-column>
        <el-table-column prop="t_min" label="起始数值" width="220"></el-table-column>
        <el-table-column prop="t_max" label="截止数值" width="220"></el-table-column>
        <el-table-column prop="max_min" label="差值"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { sqlquery } from "@/api/sql";
import {
  jsontoarray,
  jsontfilter,
  pieseries,
  getcol,
  tosqlin,
} from "@/js/sql_echart";
import { getUserInfo } from "@/api/user";

export default {
  components: {},
  data() {
    return {
      //建筑名称下拉框
      org_list: [],
      org_value: null,
      //分类能耗下拉框
      agg_type_list: [
        { type_id: "电", type_name: "电" },
        { type_id: "水", type_name: "水" },
        { type_id: "可再生能源", type_name: "可再生能源" },
      ],
      defaultkeys: [0],
      agg_type_value: "电",
      tableData:[],
      datetime1: new Date(2020, 0, 1, 0, 0, 0),
      datetime2: new Date(2020, 11, 31, 0, 0, 0),
      filterText: "",
      partoptions: [
        {
          id: 0,
          label: "全部",
          children: [],
        },
      ],
      defaultProps: {
        children: "children",
        label: "label",
      },
    };
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    },
  },
  mounted() {
    getUserInfo().then((res) => {
      this.CurrentUser = res.data.data;
      this.get_org();
    });
  },
  created() {},
  methods: {
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    //获取建筑名称下拉框内容,并调用 org_change（）方法
    get_org() {
      var sql =
        "select distinct org_id,org_name from user_org_dept where user_id=" +
        this.CurrentUser.userId +
        " and org_type=1" +
        " order by org_id";
      const params = new URLSearchParams();
      params.append("sql", sql);
      sqlquery(params).then((response) => {
        this.org_list = [];
        this.org_value = response.data.data[0].org_id;
        this.org_list = response.data.data;
        this.get_dept();
      });
    },
        //为部门树赋值
    get_dept() {
      var sql1 =
        "select distinct dept_id as id,dept_name as label from user_org_dept where user_id=" +
        this.CurrentUser.userId + ' and org_type=3'  +
        " and org_id=" +
        this.org_value +
        " order by dept_id desc";
      const params1 = new URLSearchParams();
      params1.append("sql", sql1);
      sqlquery(params1).then((res) => {
        this.partoptions[0].children = [];
        this.partoptions[0].children = res.data.data;

        var col = getcol(res.data.data, "id");
        for (var i = 0; i < col.length; i++) {
          this.$refs.tree.setChecked(col[i], true, true);
        }
        this.drawtable();
      });
    },
    drawtable(){
      var nodechecked = this.$refs.tree.getCheckedKeys();
      var sql=""
      var t_1=this.dateFormat("YYYY-mm-dd HH:MM", this.datetime1);
      var t_2=this.dateFormat("YYYY-mm-dd HH:MM", this.datetime2);
      if(tosqlin(nodechecked) == "0")
      {
         sql="select series_id as name,min(t_value) as t_min, max(t_value) as t_max," +
              " max(t_value)-min(t_value) as max_min from " +
              "vvt_data_1 where element_id='contractcosts' and search_option between '" 
                 + t_1.toString() + "' and '" + t_2.toString() +
                 "' and dept_id in (" + tosqlin(getcol(this.partoptions[0].children, "id"))  
                  + ") and kpi_name='" + this.agg_type_value + "'";
      }
      else{
         sql="select series_id as name,min(t_value) as t_min, max(t_value) as t_max," +
         " max(t_value)-min(t_value) as max_min from " +
              "vvt_data_1 where element_id='contractcosts' and search_option between '" 
                 + t_1.toString() + "' and '" + t_2.toString() +
                 "' and dept_id in (" + tosqlin(nodechecked) 
                 + ") and kpi_name='" + this.agg_type_value + "'";
      }
      console.log(sql);    
      const params1 = new URLSearchParams();
      params1.append("sql", sql);
      sqlquery(params1).then((response) => {
        console.log('999999');
        console.log(response.data.data);
        this.tableData=response.data.data;
      })

    },
    org_change(){
      this. get_dept();
    },
    datetime1_change(){
      this.drawtable();
    },
    datetime2_change(){
      this.drawtable();
    },
    check_change(){
      this.drawtable();
    },
    agg_type_change(){
      this.drawtable();
    },
    tree_change(){
      this.drawtable();      
    },
    dateFormat(fmt, date) {
    let ret;
    const opt = {
        "Y+": date.getFullYear().toString(),        // 年
        "m+": (date.getMonth() + 1).toString(),     // 月
        "d+": date.getDate().toString(),            // 日
        "H+": date.getHours().toString(),           // 时
        "M+": date.getMinutes().toString(),         // 分
        "S+": date.getSeconds().toString()          // 秒
        // 有其他格式化字符需求可以继续添加，必须转化成字符串
    };
    for (let k in opt) {
        ret = new RegExp("(" + k + ")").exec(fmt);
        if (ret) {
            fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
        };
    };
    return fmt;
}
  },
};
</script>
<style scoped>
.app-main {
  width: 100%;
  height: 100%;
  border: 1px solid green;
  display: grid;
  grid-template-columns: repeat(100, 1fr);
  grid-template-rows: repeat(100, 1fr);
}
#item1 {
  grid-row: 1/10;
  grid-column: 1/101;
  background-color: white;
  color: darkgray;
  border: darkgray 1px solid;
  border-radius: 3px;
  margin: 1px 1px 0px 1px;
}
#item2 {
  grid-row: 4/8;
  grid-column: 4/15;
  color: black;
}
#item3 {
  grid-row: 3/8;
  grid-column: 13/28;
}
#item4 {
  grid-row: 4/8;
  grid-column: 29/37;
  color: black;
}
#item5 {
  grid-row: 3/8;
  grid-column: 37/48;
}
#item6 {
  grid-row: 4/8;
  grid-column: 49/58;
  color: black;
}
#item7 {
  grid-row: 3/8;
  grid-column: 55/66;
}
#item61 {
  grid-row: 4/8;
  grid-column: 75/87;
  color: black;
}
#item71 {
  grid-row: 3/8;
  grid-column: 81/100;
}
#item8 {
  grid-row: 10/101;
  grid-column: 1/26;
  background-color: white;
  color: darkgray;
  border: darkgray 1px solid;
  border-radius: 3px;
  margin: 1px 1px 1px 1px;
}
#item9 {
  grid-row: 10/101;
  grid-column: 26/101;
  background-color: white;
  color: darkgray;
  border: darkgray 1px solid;
  border-radius: 3px;
  margin: 1px 1px 1px 0px;
}
#item10 {
  grid-row: 11/20;
  grid-column: 2/24;
}
#item11 {
  grid-row: 17/100;
  grid-column: 2/24;
  width:100%;
  height:98%;
}

#item13 {
  grid-row: 15/98;
  grid-column: 28/100;
}
</style>
