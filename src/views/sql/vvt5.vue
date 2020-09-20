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
    <div id="item6">查询日期：</div>
    <div id="item7">
      <el-date-picker
        v-model="value1"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        @change="time_change()"
        size="mini"
      ></el-date-picker>
    </div>
    <!-- <div id="item61">截止日期：</div>
    <div id="item71">
      <el-date-picker v-model="value1" type="datetime" placeholder="选择日期" size="mini"></el-date-picker>
    </div>-->
    <div id="item8"></div>
    <div id="item9"></div>
    <div id="item10">
      <el-input placeholder="输入关键字进行过滤" v-model="filterText" size="mini"></el-input>
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
    <div id="item13">
      <el-table
        :data="tableData"
        height="98%"
        border
        @row-click="table_click"
        ref="MyTable"
        style="width: 99%"
        :header-cell-style="{background:'#49C6DA',height:'15px',color:'white'}"
      >
        <el-table-column
          v-for="key in this.tabhead"
          :key="key.id"
          :prop="key.name"
          :label="key.name"
          :width="key.name=='回路'?'280':'250'"
        ></el-table-column>
      </el-table>
    </div>
    <div id="item14"></div>
    <div id="item15">
      <div id="myChart1" :style="{width: '100%', height: '100%'}"></div>
    </div>
    <div id="item16">
      <div id="myChart2" :style="{width: '100%', height: '100%'}"></div>
    </div>
  </div>
</template>

<script>
import { sqlquery } from "@/api/sql";
import { vvt5_chart1, vvt5_chart2 } from "@/js/chart_json";
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
      value1: ["2020-01-01", "2020-12-31"],
      tabhead: [
        { id: 0, name: "回路名称" },
        { id: 1, name: "工作时" },
        { id: 2, name: "非工作时" },
      ],
      tableData: [],
      chart1_opt: vvt5_chart1(),
      chart2_opt: vvt5_chart2(),
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
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    time_change() {
      this.draw_table();
    },
    org_change(){
      this.get_dept();
    },
    agg_type_change(){
        this.draw_table();
        this.drawLine1();
        this. drawLine2();
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

          this.draw_table();
          this.drawLine1();
          this.drawLine2();
      });
    },
    tree_click() {

    },
    //表格点击事件，重新渲染饼图
    table_click(row, column, event) {
      let myChart1 = this.$echarts.init(
        document.getElementById("myChart1"),
        "wonderland"
      );
      this.chart1_opt.series[0].data = [
        { value: row.工作时, name: "工时", itemStyle: { color: "#49C6DA" } },
        {
          value: row.非工作时,
          name: "非工时",
          itemStyle: { color: "#159F5C" },
        },
      ];
      myChart1.setOption(this.chart1_opt);
    },
    draw_table() {
      var nodechecked = this.$refs.tree.getCheckedKeys();
      var sql =
        "select A.series_id as 回路名称," +
        "sum(case t_xAxis when '工作时' then  round(t_value,2) else 0 end ) as 工作时," +
        "sum(case t_xAxis when '非工作时' then  round(t_value,2) else 0 end ) as 非工作时 from (";
      sql =
        sql +
        "select * from vvt_data where element_id='vvt5_01' and  org_id=" +
        this.org_value +  " and kpi_name='" + this.agg_type_value + "'"
      if (tosqlin(nodechecked) != "0") {
        sql = sql + " and dept_id in (" + tosqlin(nodechecked) + ")";
      }
      sql =
        sql +
        " and search_option between '" +
        this.d_Date(this.value1[0]) +
        "' and '" +
        this.d_Date(this.value1[1]) +
        "') A group by series_id";
      const params1 = new URLSearchParams();
      params1.append("sql", sql);
      sqlquery(params1).then((response) => {
        this.tableData = response.data.data;
      });
    },
    //饼图
    drawLine1() {
      // 基于准备好的dom，初始化echarts实例
      let myChart1 = this.$echarts.init(
        document.getElementById("myChart1"),
        "wonderland"
      );
      var nodechecked = this.$refs.tree.getCheckedKeys();
      var sql =
        "select " +
        "sum(case t_xAxis when '工作时' then  round(t_value,2) else 0 end ) as 工作时," +
        "sum(case t_xAxis when '非工作时' then  round(t_value,2) else 0 end ) as 非工作时 from (";
      sql =
        sql +
        "select * from vvt_data where element_id='vvt5_01' and  org_id=" +
        this.org_value +  " and kpi_name='" + this.agg_type_value + "'";
      if (tosqlin(nodechecked) != "0") {
        sql = sql + " and dept_id in (" + tosqlin(nodechecked) + ")";
      }
      sql =
        sql +
        " and search_option between '" +
        this.d_Date(this.value1[0]) +
        "' and '" +
        this.d_Date(this.value1[1]) +
        "') A";
      const params1 = new URLSearchParams();
      params1.append("sql", sql);
      sqlquery(params1).then((response) => {
        this.chart1_opt.series[0].data = [
          {
            value: response.data.data[0].工作时,
            name: "工时",
            itemStyle: { color: "#49C6DA" },
          },
          {
            value: response.data.data[0].非工作时,
            name: "非工时",
            itemStyle: { color: "#159F5C" },
          },
        ];
        myChart1.setOption(this.chart1_opt);
      });
    },
    drawLine2() {
      let myChart2 = this.$echarts.init(
        document.getElementById("myChart2"),
        "wonderland"
      );
            var nodechecked = this.$refs.tree.getCheckedKeys();
      var sql =
        "select A.series_id as 回路名称," +
        "sum(case t_xAxis when '工作时' then  round(t_value,2) else 0 end ) as 工作时," +
        "sum(case t_xAxis when '非工作时' then  round(t_value,2) else 0 end ) as 非工作时 from (";
      sql =
        sql +
        "select * from vvt_data where element_id='vvt5_01' and  org_id=" +
        this.org_value +  " and kpi_name='" + this.agg_type_value + "'";
      if (tosqlin(nodechecked) != "0") {
        sql = sql + " and dept_id in (" + tosqlin(nodechecked) + ")";
      }
      sql =
        sql +
        " and search_option between '" +
        this.d_Date(this.value1[0]) +
        "' and '" +
        this.d_Date(this.value1[1]) +
        "') A group by series_id";
      const params1 = new URLSearchParams();
      params1.append("sql", sql);
      sqlquery(params1).then((response) => {
        console.log(response.data.data)
       this.chart2_opt.xAxis.data= getcol(response.data.data,"回路名称");
       this.chart2_opt.series[0].data=getcol(response.data.data,"工作时")
       this.chart2_opt.series[1].data=getcol(response.data.data,"非工作时")
       myChart2.setOption(this.chart2_opt);
      })
      // 绘制图表



    },

    d_Date(date) {
      var d = new Date(date),
        month = "" + (d.getMonth() + 1),
        day = "" + d.getDate(),
        year = d.getFullYear();

      if (month.length < 2) month = "0" + month;
      if (day.length < 2) day = "0" + day;

      return [year, month, day].join("-");
    },
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
  grid-column: 55/101;
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
  grid-row: 10/61;
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
}

#item13 {
  grid-row: 13/58;
  grid-column: 27/100;
}
#item14 {
  grid-row: 61/101;
  grid-column: 26/101;
  background-color: white;
  color: darkgray;
  border: darkgray 1px solid;
  border-radius: 3px;
  margin: 1px 1px 1px 0px;
}
#item15 {
  grid-row: 62/100;
  grid-column: 27/60;
}
#item16 {
  grid-row: 62/100;
  grid-column: 61/100;
}
</style>
