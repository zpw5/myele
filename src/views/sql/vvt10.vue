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
      <el-date-picker v-model="year_value" type="year" placeholder="选择日期" size="mini" @change="year_change">

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
        node-key="id"
        :props="defaultProps"
        default-expand-all
        :filter-node-method="filterNode"
        ref="tree"
        @node-click="tree_click"
      ></el-tree>
    </div>
    <div id="item12">
      <div id="myChart1" :style="{width: '100%', height: '100%'}"></div>
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
          width="200"
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
import { vvt10_01 } from "@/js/chart_json";
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
      dept_value:null,
      dept_label:null,
      year_value:new Date().getFullYear().toString(),
      y_m_d_value: new Date().getFullYear().toString(),
      chart_option: vvt10_01(),
      tabhead: [{id:0,name:'月份'},{id:1,name:'本年发电量'},{id:2,name:'去年发电量'}],
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
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    //获取建筑名称下拉框内容,并调用
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
        this.dept_value=this.partoptions[0].children[0].id;
        this.dept_label=this.partoptions[0].children[0].label;
        this.drawLine();
        this.drawtable();
      });
    },
    org_change() {
      this.get_dept();
    },
    year_change(){
        this.y_m_d_value=this.year_value.getFullYear();
        this.drawLine();
        this.drawtable();
    },
  agg_type_change(){
        this.drawLine();
        this.drawtable();
  },
    tree_click(){
      console.log(this.$refs.tree.getCurrentNode());
        this.dept_value=this.$refs.tree.getCurrentNode().id;
        this.dept_label=this.$refs.tree.getCurrentNode().label;
        this.drawLine();
        this.drawtable();
    },
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart1 = this.$echarts.init(
        document.getElementById("myChart1"),
        "wonderland"
      );
      var sql1 ="select * from vvt_data where org_id=" + this.org_value +
                " and dept_id=" + this.dept_value +
                " and element_id='vvt10_01'" +
                " and search_option='" + this.y_m_d_value + "'" +
                " and kpi_name='" + this.agg_type_value + "' order by order_id"
      const params1 = new URLSearchParams();
      params1.append("sql", sql1);
      sqlquery(params1).then((response) => {
        this.chart_option.title.text=this.y_m_d_value + "年" + this.dept_label +"逐月趋势图"
        this.chart_option.xAxis.data=[];
        this.chart_option.xAxis.data=jsontoarray(response.data.data,"element_id","vvt10_01","series_id","本年","t_xAxis");
        this.chart_option.series[0].data=[];
        this.chart_option.series[0].data=jsontoarray(response.data.data,"element_id","vvt10_01","series_id","本年","t_value");
        this.chart_option.series[1].data=[];
        this.chart_option.series[1].data=jsontoarray(response.data.data,"element_id","vvt10_01","series_id","去年","t_value");
      // 绘制图表
      myChart1.setOption(this.chart_option);
      })
    },
//绘制表格
   drawtable(){
     var last_year=parseInt(this.y_m_d_value)-1
     var sql="select t_xAxis as 月份," + 
      "sum(case series_id when '本年' then  round(t_value,2) else 0 end ) as " + this.y_m_d_value +"年发电量," +
      "sum(case series_id  when '去年' then  round(t_value,2) else 0 end ) as " + last_year.toString()  +"去年发电量," +
      "sum(case series_id  when '同比' then  round(t_value,2) else 0 end ) as 同比 from (";    
      sql = sql + "select series_id,t_xAxis,t_value from vvt_data where org_id=" + this.org_value +
                " and dept_id=" + this.dept_value +
                " and element_id='vvt10_01'" +
                " and search_option='" + this.y_m_d_value + "'" +
                " and kpi_name='" + this.agg_type_value + "'"
      sql=sql + ") B group by t_xAxis ORDER BY FIELD(t_xAxis,'1月','2月','3月','4月','5月','6月','7月','8月'" + 
      ",'9月','10月','11月','12月') ASC";
      const params1 = new URLSearchParams();
      params1.append("sql", sql);

      sqlquery(params1).then((response) => {
        this.tableData = response.data.data;
        var j = 0;
        this.tabhead = [];
        for (var i in this.tableData[0]) {
          this.tabhead[j]={ id: j, name: i };
          j++;
        }

      });
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
  width:100%;
  height:100%;
  grid-row: 17/100;
  grid-column: 2/24;
}
#item12 {
  width:100%;
  height:100%;
  grid-row: 15/60;
  grid-column: 28/100;
}
#item13 {
  width:100%;
  height:100%;
  grid-row: 61/98;
  grid-column: 28/100;
}
</style>

