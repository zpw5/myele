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
    <div id="item6">年份：</div>
    <div id="item7">
      <el-date-picker v-model="y_value" type="year" placeholder="选择日期" size="mini"></el-date-picker>
    </div>
    <div id="item71">
      <el-button size="mini" type="primary" @click="search()">查询</el-button>
    </div>
    <div id="item8"></div>
    <div id="item81"></div>
    <div id="item9"></div>
    <div id="item91"></div>
    <div id="item10">
      <el-input size="mini" v-model="input" placeholder="请输入关键字进行过滤"></el-input>
    </div>
    <div id="item11">
      <el-tree
        class="filter-tree"
        :data="partoptions"
        :default-checked-keys="[0]"
        show-checkbox
        node-key="id"
        :props="defaultProps"
        default-expand-all
        :filter-node-method="filterNode"
        ref="tree"
        @node-click="tree_click"
      ></el-tree>
    </div>
    <div id="item14">
      <el-checkbox-group v-model="checkedList" style="display:block;">
        <el-checkbox v-for="el in checklist" :label="el.label" :key="el.id"></el-checkbox>
      </el-checkbox-group>
    </div>
    <div id="item12">
      <div id="myChart1" :style="{width: '100%', height: '100%'}"></div>
    </div>

    <div id="item13">
      <el-table
        :data="tableData"
        height="100%"
        border
        style="width: 100%"
        :header-cell-style="{background:'#49C6DA',height:'15px',color:'white'}"
      >
        <el-table-column prop="series_id" label="回路名称" width="250"></el-table-column>
        <el-table-column prop="t_xAxis" label="时间" width="250"></el-table-column>
        <el-table-column prop="t_value" label="有功功率" width="250"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { sqlquery} from "@/api/sql";
import { vvt} from "@/js/chart_json";
import {
  jsontoarray,
  jsontfilter,
  pieseries,
  getcol,
  tosqlin,
  strin
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
      chart1_opt:vvt(),
      y_value: new Date(),
      tableData:[],
      checklist: [
        { id: 0, label: "空调" },
        { id: 1, label: "宿舍用电" },
        { id: 2, label: "生产用电" },
        { id: 3, label: "非生产性耗能" },
      ],
      checkedList: ["空调", "宿舍用电","生产用电","非生产性耗能"],
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
      //  this.drawLine2();
    });
  },
  created() {},
  methods: {
    //获取建筑名称下拉框内容,并调用
    get_org() {
      var sql =
        "select distinct org_id,org_name from user_org_dept where user_id=" +
        this.CurrentUser.userId +
        " and org_type=3" +
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
        this.CurrentUser.userId +
        " and org_type=3" +
        " and org_id=" +
        this.org_value +
        " order by dept_id desc";
      const params1 = new URLSearchParams();
      params1.append("sql", sql1);
      sqlquery(params1).then((res) => {
        this.partoptions[0].children = [];
        this.partoptions[0].children = res.data.data;

        // this.draw_table();
        // this.drawLine1();
        // this.drawLine2();
        this.drawLine1();
        this.draw_table();
      });
    },
    search(){
      this.drawLine1();
      this.draw_table();
    },
    drawLine1() {
      // 基于准备好的dom，初始化echarts实例
      let myChart1 = this.$echarts.init(
        document.getElementById("myChart1"),
        "wonderland"
      );
      // 绘制图表
      var nodechecked = this.$refs.tree.getCheckedKeys();
      var sql="select element_id,series_id,t_xAxis,t_value from vvt_data where org_id=" + this.org_value +
      " and  kpi_name='" + this.agg_type_value + "' and element_id='vvt'";
      if(tosqlin(nodechecked) != "0"){
        sql = sql + " and dept_id in (" + tosqlin(nodechecked) + ")";
      }
      if (strin(this.checkedList)!=""){
        sql=sql + " and unit in (" + strin(this.checkedList) + ")"
      }
      const params1 = new URLSearchParams();
      params1.append("sql", sql);
      sqlquery(params1).then((response) => {
        this.chart1_opt.xAxis.data=jsontoarray(response.data.data,"element_id","vvt","series_id","本年","t_xAxis");
        this.chart1_opt.series[0].data=jsontoarray(response.data.data,"element_id","vvt","series_id","本年","t_value");
        this.chart1_opt.series[1].data=jsontoarray(response.data.data,"element_id","vvt","series_id","去年","t_value");
       myChart1.setOption(this.chart1_opt);
      });
    },
    draw_table(){
      var nodechecked = this.$refs.tree.getCheckedKeys();
      var sql="select series_id,t_xAxis,t_value from vvt_data where org_id=" + this.org_value +
      " and  kpi_name='" + this.agg_type_value + "' and element_id='vvt_001'";
      if(tosqlin(nodechecked) != "0"){
        sql = sql + " and dept_id in (" + tosqlin(nodechecked) + ")";
      }
      if (strin(this.checkedList)!=""){
        sql=sql + " and unit in (" + strin(this.checkedList) + ")"
      }
      console.log(sql);
     const params1 = new URLSearchParams();
      params1.append("sql", sql);
      sqlquery(params1).then((response) => {
        console.log(response.data.data);
        this.tableData=response.data.data;
      })


    },
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
  grid-column: 4/15;
  color: black;
}
#item3 {
  grid-row: 3/8;
  grid-column: 13/28;
}
#item4 {
  grid-row: 4/8;
  grid-column: 32/42;
  color: black;
}
#item5 {
  grid-row: 3/8;
  grid-column: 40/56;
}
#item6 {
  grid-row: 4/8;
  grid-column: 58/66;
  color: black;
}
#item7 {
  grid-row: 3/8;
  grid-column: 65/85;
}
#item71 {
  grid-row: 3/8;
  grid-column: 90/101;
}
#item8 {
  grid-row: 10/60;
  grid-column: 1/26;
  background-color: white;
  color: darkgray;
  border: darkgray 1px solid;
  border-radius: 3px;
  margin: 1px 1px 1px 1px;
}
#item81 {
  grid-row: 60/101;
  grid-column: 1/26;
  background-color: white;
  color: darkgray;
  border: darkgray 1px solid;
  border-radius: 3px;
  margin: 1px 1px 1px 1px;
}
#item9 {
  grid-row: 10/39;
  grid-column: 26/101;
  background-color: white;
  color: darkgray;
  border: darkgray 1px solid;
  border-radius: 3px;
  margin: 1px 1px 1px 0px;
}
#item91 {
  grid-row: 39/101;
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
  grid-row: 17/59;
  grid-column: 2/24;
}
#item12 {
  grid-row: 15/38;
  grid-column: 28/100;
}
#item13 {
  grid-row: 42/98;
  grid-column: 28/100;
}
#item14 {
  grid-row: 62/98;
  grid-column: 2/10;
  color: black;
}
</style>
