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
      <el-select size="mini" v-model="agg_type_value">
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
      <el-date-picker v-model="y_m_d_value" :type="y_m_d" placeholder="选择日期" size="mini"></el-date-picker>
    </div>
    <div id="item61">
      <el-button size="mini" type="primary" @click="bt1_click">
        <span class="iconfont icon-nian"></span>&nbsp;年
      </el-button>
    </div>
    <div id="item71">
      <el-button size="mini" type="success" @click="bt2_click">
        <span class="iconfont icon-yue"></span>&nbsp;月
      </el-button>
    </div>
    <div id="item81">
      <el-button size="mini" type="info" @click=" bt3_click">
        <span class="iconfont icon-ri"></span>&nbsp;日
      </el-button>
    </div>
    <div id="item91">
      <el-button size="mini" type="primary" @click=" bt4_click">
        <span class="iconfont icon-chaxun"></span>查询
      </el-button>
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
        default-expand-all
        :filter-node-method="filterNode"
        ref="tree"
        @check-change="tree_change"
      ></el-tree>
    </div>
    <div id="item13">
      <el-table
        :data="tableData"
        height="99%"
        border
        style="width: 100%"
        :header-cell-style="{background:'#49C6DA',height:'15px',color:'white'}"
      >
        <el-table-column
          v-for="key in this.tabhead"
          :key="key.id"
          :prop="key.name"
          :label="key.name"
           :width="key.name=='回路'?'180':'80'"
        ></el-table-column>
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
      agg_type_value: "电",
      y_m_d: "month",
      y_m_d_value: "2020-09-01",
      tabhead: [{id:0,name:'回路名称'}],
      tableData: [],
      filterText: "",
      partoptions: [
        {
          id: 0,
          label: "全部",
          children: [
            {
              id: 6,
              label: "研发部",
            },
            {
              id: 7,
              label: "财务部",
            },
          ],
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
    //获取建筑名称下拉框内容,并调用 org_change（）方法
    get_org() {
      var sql =
        "select distinct org_id,org_name from user_org_dept where user_id=" +
        this.CurrentUser.userId + ' and org_type=1'  +
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
        this.CurrentUser.userId + ' and org_type=1'  +
        " and org_id=" +
        this.org_value +
        " order by dept_id";
      const params1 = new URLSearchParams();
      params1.append("sql", sql1);
      sqlquery(params1).then((res) => {
        this.partoptions[0].children = [];
        this.partoptions[0].children = res.data.data;

        var col = getcol(res.data.data, "id");
        for (var i = 0; i < col.length; i++) {
          this.$refs.tree.setChecked(col[i], true, true);
          this.bt4_click();
        }
      });
    },
    //建筑名称下拉框change()事件
    org_change() {
      this.get_dept();
    },
    //树控件变化事件
    tree_change() {
    },
    bt1_click() {
      this.y_m_d = "year";
      var myDate = new Date();
      this.y_m_d_value = myDate.getFullYear().toString();
    },
    bt2_click() {
      this.y_m_d = "month";
      var myDate = new Date();
      var tYear = myDate.getFullYear();
      var tMonth = myDate.getMonth();
      var m = tMonth + 1;
      if (m.toString().length == 1) {
        m = "0" + m;
      }
      this.y_m_d_value = tYear + "-" + m;
    },
    bt3_click() {
      this.y_m_d = "date";
      var myDate = new Date();
      this.y_m_d_value = myDate.toString();
    },
    bt4_click() {
      var nodechecked = this.$refs.tree.getCheckedKeys();
      var y_m_d_val=this.y_m_d_value.toString()
      if(this.y_m_d == "date"){
        y_m_d_val=this.d_Date(this.y_m_d_value)
      }
      if(this.y_m_d == "month"){
        y_m_d_val=this.m_Date(this.y_m_d_value)
      }
      if(this.y_m_d == "year"){
        y_m_d_val=this.y_Date(this.y_m_d_value)
      }
      var sql="";
      if(this.y_m_d=='date'){
        sql="select series_id as 回路,"
        + "sum(case t_xAxis when '1时' then  round(t_value,2) else 0 end ) as 1时,"
        + "sum(case t_xAxis when '2时' then  round(t_value,2) else 0 end ) as 2时," 
        + "sum(case t_xAxis when '3时' then  round(t_value,2) else 0 end ) as 3时," 
        + "sum(case t_xAxis when '4时' then  round(t_value,2) else 0 end ) as 4时,"
        + "sum(case t_xAxis when '5时' then  round(t_value,2) else 0 end ) as 5时,"
        + "sum(case t_xAxis when '6时' then  round(t_value,2) else 0 end ) as 6时," 
        + "sum(case t_xAxis when '7时' then  round(t_value,2) else 0 end ) as 7时,"
        + "sum(case t_xAxis when '8时' then  round(t_value,2) else 0 end ) as 8时,"
        + "sum(case t_xAxis when '9时' then  round(t_value,2) else 0 end ) as 9时,"
        + "sum(case t_xAxis when '10时' then  round(t_value,2) else 0 end ) as 10时,"
        + "sum(case t_xAxis when '11时' then  round(t_value,2) else 0 end ) as 11时,"
        + "sum(case t_xAxis when '12时' then  round(t_value,2) else 0 end ) as 12时,"
        + "sum(case t_xAxis when '13时' then  round(t_value,2) else 0 end ) as 13时,"
        + "sum(case t_xAxis when '14时' then  round(t_value,2) else 0 end ) as 14时,"
        + "sum(case t_xAxis when '15时' then  round(t_value,2) else 0 end ) as 15时,"
        + "sum(case t_xAxis when '16时' then  round(t_value,2) else 0 end ) as 16时,"
        + "sum(case t_xAxis when '17时' then  round(t_value,2) else 0 end ) as 17时,"
        + "sum(case t_xAxis when '18时' then  round(t_value,2) else 0 end ) as 18时,"
        + "sum(case t_xAxis when '19时' then  round(t_value,2) else 0 end ) as 19时,"
        + "sum(case t_xAxis when '20时' then  round(t_value,2) else 0 end ) as 20时,"
        + "sum(case t_xAxis when '21时' then  round(t_value,2) else 0 end ) as 21时,"
        + "sum(case t_xAxis when '22时' then  round(t_value,2) else 0 end ) as 22时,"
        + "sum(case t_xAxis when '23时' then  round(t_value,2) else 0 end ) as 23时,"
        + "sum(case t_xAxis when '24时' then  round(t_value,2) else 0 end ) as 24时 from (";
      }
      if(this.y_m_d=='month'){
        sql="select series_id as 回路,"
        + "sum(case t_xAxis when '1日' then  round(t_value,2) else 0 end ) as 1日,"
        + "sum(case t_xAxis when '2日' then  round(t_value,2) else 0 end ) as 2日," 
        + "sum(case t_xAxis when '3日' then  round(t_value,2) else 0 end ) as 3日," 
        + "sum(case t_xAxis when '4日' then  round(t_value,2) else 0 end ) as 4日,"
        + "sum(case t_xAxis when '5日' then  round(t_value,2) else 0 end ) as 5日,"
        + "sum(case t_xAxis when '6日' then  round(t_value,2) else 0 end ) as 6日," 
        + "sum(case t_xAxis when '7日' then  round(t_value,2) else 0 end ) as 7日,"
        + "sum(case t_xAxis when '8日' then  round(t_value,2) else 0 end ) as 8日,"
        + "sum(case t_xAxis when '9日' then  round(t_value,2) else 0 end ) as 9日,"
        + "sum(case t_xAxis when '10日' then  round(t_value,2) else 0 end ) as 10日,"
        + "sum(case t_xAxis when '11日' then  round(t_value,2) else 0 end ) as 11日,"
        + "sum(case t_xAxis when '12日' then  round(t_value,2) else 0 end ) as 12日,"
        + "sum(case t_xAxis when '13日' then  round(t_value,2) else 0 end ) as 13日,"
        + "sum(case t_xAxis when '14日' then  round(t_value,2) else 0 end ) as 14日,"
        + "sum(case t_xAxis when '15日' then  round(t_value,2) else 0 end ) as 15日,"
        + "sum(case t_xAxis when '16日' then  round(t_value,2) else 0 end ) as 16日,"
        + "sum(case t_xAxis when '17日' then  round(t_value,2) else 0 end ) as 17日,"
        + "sum(case t_xAxis when '18日' then  round(t_value,2) else 0 end ) as 18日,"
        + "sum(case t_xAxis when '19日' then  round(t_value,2) else 0 end ) as 19日,"
        + "sum(case t_xAxis when '20日' then  round(t_value,2) else 0 end ) as 20日,"
        + "sum(case t_xAxis when '21日' then  round(t_value,2) else 0 end ) as 21日,"
        + "sum(case t_xAxis when '22日' then  round(t_value,2) else 0 end ) as 22日,"
        + "sum(case t_xAxis when '23日' then  round(t_value,2) else 0 end ) as 23日,"
        + "sum(case t_xAxis when '24日' then  round(t_value,2) else 0 end ) as 24日,"
        + "sum(case t_xAxis when '25日' then  round(t_value,2) else 0 end ) as 25日,"
        + "sum(case t_xAxis when '26日' then  round(t_value,2) else 0 end ) as 26日,"
        + "sum(case t_xAxis when '27日' then  round(t_value,2) else 0 end ) as 27日,"
        + "sum(case t_xAxis when '28日' then  round(t_value,2) else 0 end ) as 28日,"
        + "sum(case t_xAxis when '29日' then  round(t_value,2) else 0 end ) as 29日,"
        + "sum(case t_xAxis when '30日' then  round(t_value,2) else 0 end ) as 30日,"
        + "sum(case t_xAxis when '31日' then  round(t_value,2) else 0 end ) as 31日 from ("
      }
      if(this.y_m_d=='year'){
        sql="select series_id as 回路,"
        + "sum(case t_xAxis when '1月' then  round(t_value,2) else 0 end ) as 1月,"
        + "sum(case t_xAxis when '2月' then  round(t_value,2) else 0 end ) as 2月," 
        + "sum(case t_xAxis when '3月' then  round(t_value,2) else 0 end ) as 3月," 
        + "sum(case t_xAxis when '4月' then  round(t_value,2) else 0 end ) as 4月,"
        + "sum(case t_xAxis when '5月' then  round(t_value,2) else 0 end ) as 5月,"
        + "sum(case t_xAxis when '6月' then  round(t_value,2) else 0 end ) as 6月," 
        + "sum(case t_xAxis when '7月' then  round(t_value,2) else 0 end ) as 7月,"
        + "sum(case t_xAxis when '8月' then  round(t_value,2) else 0 end ) as 8月,"
        + "sum(case t_xAxis when '9月' then  round(t_value,2) else 0 end ) as 9月,"
        + "sum(case t_xAxis when '10月' then  round(t_value,2) else 0 end ) as 10月,"
        + "sum(case t_xAxis when '11月' then  round(t_value,2) else 0 end ) as 11月,"
        + "sum(case t_xAxis when '31日' then  round(t_value,2) else 0 end ) as 31月 from ("
      }      
      if (tosqlin(nodechecked) == "0") {
        sql =sql +
          "select series_id,t_xAxis,t_value from vvt_data where org_id=" +
          this.org_value +
          " and dept_id in (" +
          tosqlin(getcol(this.partoptions[0].children, "id")) +
          ") and  search_option='" + y_m_d_val + 
          "' and kpi_name='" + this.agg_type_value +
          "' and element_id='vvt9_01'";
      } else {
        sql =sql +
          "select series_id,t_xAxis,t_value from vvt_data where org_id=" +
          this.org_value +
          " and dept_id in (" +
          tosqlin(nodechecked) +
          ") and  search_option='" + y_m_d_val +
          "' and kpi_name='" + this.agg_type_value +
          "' and element_id='vvt9_01'";
      }
      sql=sql+ ") B GROUP BY series_id "
      const params1 = new URLSearchParams();
      params1.append("sql", sql);
      console.log(sql);
      sqlquery(params1).then((response) => {
        this.tableData = response.data.data;
        var j = 0;
        this.tabhead = [];
        for (var i in this.tableData[0]) {
          this.tabhead.push({ id: j, name: i });
          j++;
        }

      });
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
d_Date(date) {
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();
 
  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;
 
  return [year, month, day].join('-');
},
y_Date(date) {
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();
 
  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;
 
  return year;
},
m_Date(date) {
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();
 
  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;
 
  return [year, month].join('-');
}
  },
};
</script>
<style scoped>
.app-main {
  width: 100%;
  height: 100%;
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
  grid-column: 2/9;
  color: black;
}
#item3 {
  grid-row: 3/8;
  grid-column: 10/25;
}
#item4 {
  grid-row: 4/8;
  grid-column: 26/34;
  color: black;
}
#item5 {
  grid-row: 3/8;
  grid-column: 33/44;
}
#item6 {
  grid-row: 4/8;
  grid-column: 45/57;
  color: black;
}
#item7 {
  grid-row: 3/8;
  grid-column: 52/64;
}
#item61 {
  grid-row: 3/9;
  grid-column: 73/80;
}
#item71 {
  grid-row: 3/9;
  grid-column: 80/87;
}
#item81 {
  grid-row: 3/9;
  grid-column: 87/94;
}
#item91 {
  grid-row: 3/9;
  grid-column: 94/101;
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
  grid-row: 16/100;
  grid-column: 2/24;
  overflow: auto;
  height: 100%;
}

#item13 {
  width:100%;
  height:100%;
  grid-row: 15/98;
  grid-column: 28/100;
}
</style>
