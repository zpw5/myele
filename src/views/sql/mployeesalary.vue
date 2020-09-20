<template>
  <div class="app-main">
    <div id="z-header">
      <div id="h-item1">建筑名称：</div>
      <div id="h-item2">
      <el-select size="mini" v-model="org_value" @change="org_change">
        <el-option
          v-for="item in org_list"
          :key="item.org_id"
          :label="item.org_name"
          :value="item.org_id"
        ></el-option>
      </el-select>
      </div>
      <div id="h-item3">分类耗能：</div>
      <div id="h-item4">
      <el-select size="mini" v-model="agg_type_value" @change="agg_type_change">
        <el-option
          v-for="item in agg_type_list"
          :key="item.type_id"
          :label="item.type_name"
          :value="item.type_id"
        ></el-option>
      </el-select>
      </div>
      <div id="h-item5">年份：</div>
      <div id="h-item6">
      <el-date-picker v-model="year_value" type="year" placeholder="选择日期" size="mini" @change="year_change">
      </el-date-picker>
      </div>
    </div>
   <div id="z-content1">
      <div id="t1-item1">
        <div id="myChart1" :style="{width: '100%', height: '100%'}"></div>
      </div>
    </div>
    <div id="z-content2">
      <div id="t2-item1">
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
import { mployeesalary_chart } from "@/js/chart_json";
import { getUserInfo } from "@/api/user";

export default {
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
      tabhead: [],
      tableData: [],
      year_value:new Date().getFullYear().toString(),
      y_m_d_value: new Date().getFullYear().toString(),
      chart_option:mployeesalary_chart(),
    };
  },
  mounted() {
    getUserInfo().then((res) => {
      this.CurrentUser = res.data.data;
      this.get_org();
    });
  
  },
  created() {
    
  },
  methods: {
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
        this.drawLine();
        this.drawtable();
      });
    },
    org_change(){
      this.drawLine();
      this.drawtable();
    },
    agg_type_change(){
       this.drawLine();
      this.drawtable();     
    },
    year_change(){
       this.y_m_d_value=this.year_value.getFullYear();
       this.drawLine();
      this.drawtable(); 
    },
    drawLine() {
      // 绘制图表
      let myChart1 = this.$echarts.init(
        document.getElementById("myChart1"),
        "wonderland"
      );
      var sql1 ="select * from vvt_data where org_id=" + this.org_value +
                " and element_id='vvt10_01'" +
                " and search_option='" + this.y_m_d_value + "'" +
                " and kpi_name='" + this.agg_type_value + "' order by order_id"
      const params1 = new URLSearchParams();
      params1.append("sql", sql1);
      sqlquery(params1).then((response) => {
                this.chart_option.title.text=this.y_m_d_value + "年"  +"逐月趋势图"
        this.chart_option.xAxis.data=[];
        this.chart_option.xAxis.data=jsontoarray(response.data.data,"element_id","vvt10_01","series_id","本年","t_xAxis");
        this.chart_option.series[0].data=[];
        this.chart_option.series[0].data=jsontoarray(response.data.data,"element_id","vvt10_01","series_id","本年","t_value");
        this.chart_option.series[1].data=[];
        this.chart_option.series[1].data=jsontoarray(response.data.data,"element_id","vvt10_01","series_id","去年","t_value");
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
          this.tabhead.push({ id: j, name: i });
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
  grid-template-rows: repeat(100,1fr);
  grid-template-columns: repeat(100,1fr);
}
#z-header {
  border: 1px solid #DCDCDC;
  background-color: white;
  margin: 2px 2px 2px 2px;
  padding:6px 0px 0px 0px;
  border-radius: 2px;
  grid-row: 1/12;
  grid-column:1/101;
  display: grid;
  grid-template-columns: repeat(100, 1fr);
  grid-template-rows: repeat(100,1fr);
  color: #333333;
}
#h-item1 {
  grid-column: 2/25;
  grid-row: 1/101;
  margin:8px 0px 0px 5px;
}
#h-item2 {
  grid-column: 10/34;
  grid-row: 1/101;
  margin:5px 0px 0px 5px;
}
#h-item3 {
  grid-column: 30/40;
  grid-row: 1/101;
  margin:8px 0px 0px 5px;
}
#h-item4 {
  grid-column: 37/58;
  grid-row: 1/101;
  margin:5px 0px 0px 5px;
}
#h-item5 {
  grid-column: 54/68;
  grid-row: 1/101;
  margin:8px 0px 0px 5px;
}
#h-item6 {
  grid-column: 60/101;
  grid-row: 1/101;
  margin:5px 0px 0px 5px;
}

#z-content1 {
  border: 1px solid #DCDCDC;
  background-color: white;
  width:100%;
  height:98%;
  margin: 2px 2px 2px 2px;
  border-radius: 2px;
  grid-row:12/60;
  grid-column:1/101;
  display: grid;
  grid-template-columns: repeat(100, 1fr);
  grid-template-rows: repeat(100, 1fr);
}
#t1-item1 {
  width:100%;
  height:98%;
  grid-column: 1/101;
  grid-row: 1/101;
}

#z-content2 {
  border: 1px solid #DCDCDC;
  background-color: white;
  margin: 2px 2px 2px 2px;
  padding:10px 10px 10px 10px;
  border-radius: 2px;
  grid-row:60/101;
  grid-column:1/101;
  width:100%;
  height:98%;
  display: grid;
  grid-template-columns: repeat(100, 1fr);
  grid-template-rows: repeat(100, 1fr);

}
#t2-item1 {
  width:100%;
  height:98%;
  grid-column: 1/101;
  grid-row: 1/101;
}
</style>

