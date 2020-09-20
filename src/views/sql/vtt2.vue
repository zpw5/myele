<template>
  <div class="app-main">
    <div id="item1"></div>
    <div id="item2">建筑名称:</div>
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
    <div id='item3_1'>分类能耗：</div>
    <div id='item3_2'>
      <el-select size="mini" v-model="agg_type_value" @change="agg_type_change">
        <el-option
          v-for="item in agg_type_list"
          :key="item.type_id"
          :label="item.type_name"
          :value="item.type_id"
        ></el-option>
      </el-select>      
      </div>   
    <div id="item4">
      <div id="myChart1" :style="{width: '100%', height: '98%'}"></div>
    </div>
    <div id="item5">
      <div id="myChart2" :style="{width: '100%', height: '98%'}"></div>
    </div>
    <div id="item5_1">
      <el-select v-model="dept_value" size='mini' @change="part_change">
        <el-option v-for="item in dept_list" :key="item.dept_id" :label="item.dept_name" :value="item.dept_id">
        </el-option>
        </el-select>
     </div>
    <div id="item6">
      <div id="myChart3" :style="{width: '100%', height: '98%'}"></div>
    </div>
    <div id="item7">
      <div id="myChart4" :style="{width: '100%', height: '98%'}"></div>
    </div>
  </div>
</template>

<script>
import {
  vvt2_chart_01,
  vvt2_chart_02,
  vvt2_chart_03,
  vvt2_chart_04,
} from "@/js/chart_json";
import { sqlquery } from "@/api/sql";
import { jsontoarray, jsontfilter,pieseries } from "@/js/sql_echart";
import { getUserInfo } from "@/api/user";

export default {
  components: {},
  data() {
    return {
//建筑名称下拉框
      org_list: [
      ],
      org_value: null,
//分类能耗下拉框 
      agg_type_list: [
        {type_id:'电',type_name:'电'},
        {type_id:'水',type_name:'水'},
        {type_id:'可再生能源',type_name:'可再生能源'},        
      ],
      agg_type_value: '电',
  //部门下拉框 
      dept_list:[
        {dept_id:6,dept_name:'研发部'},
        {dept_id:7,dept_name:'财务部'}, 
        {dept_id:12,dept_name:'市场部'}, 
        {dept_id:14,dept_name:'人事部'}              
      ],
       dept_value:6,
  //图表配置option
      vvt2_chart_01: vvt2_chart_01(),
      vvt2_chart_02: vvt2_chart_02(),
      vvt2_chart_03: vvt2_chart_03(),
      vvt2_chart_04: vvt2_chart_04(),
    };
  },
  mounted() {
    getUserInfo().then((res) => {
      this.CurrentUser = res.data.data;
      this.get_org();

    })
  },
  created() {},
  methods: {
  //获取建筑名称下拉框内容,并调用 org_change（）方法
    get_org(){

      var sql ="select distinct org_id,org_name from user_org_dept where user_id=" + this.CurrentUser.userId
               + " order by org_id";
      const params = new URLSearchParams();
      params.append("sql", sql);
      sqlquery(params).then((response) => {
      this.org_list=[];
      this.org_value=response.data.data[0].org_id
      this.org_list=response.data.data;
     this.get_dept();

    });

    },
      //为部门下拉框赋值，并调用画图方法drawLine（）
    get_dept(){
      var sql1 ="select distinct dept_id,dept_name from user_org_dept where user_id=" + this.CurrentUser.userId
               + " and org_id=" + this.org_value +
               " and org_type=1 order by dept_id"
      const params1 = new URLSearchParams();
      params1.append("sql", sql1);
      sqlquery(params1).then((res) => {
        this.dept_list=[];
        this.dept_value=res.data.data[0].dept_id;
        this.dept_list=res.data.data;
        this.drawLine();
      })

    },
    //分类能源change事件
    agg_type_change(){
     this.drawLine();
    },
    //建筑名称下拉框change事件
    org_change(){
     this. get_dept()
    },
  //ECHART画图方法
    drawLine() {
       this.set_chart1();
       this.set_chart2();
       this.set_chart3();
       this.set_chart4();
    },
    //部门改变时事件
    part_change(){
             this.set_chart2();
             this.set_chart4();
    },
    //左上图：部门横向堆叠图
    set_chart1(){
      let myChart1 = this.$echarts.init(document.getElementById("myChart1"),"wonderland");
      let chart_sql="select * from vvt_data where org_id=" + this.org_value + " and element_id='vvt2_01'"
      const params = new URLSearchParams();
      params.append("sql", chart_sql);
       sqlquery(params).then((response) => {
        this.vvt2_chart_01.yAxis.data = [];
        this.vvt2_chart_01.yAxis.data = jsontoarray(response.data.data,"search_option","2020","kpi_name",this.agg_type_value,"series_id");
        this.vvt2_chart_01.series[0].data = [];
        this.vvt2_chart_01.series[0].data = jsontoarray(response.data.data,"search_option","2020","kpi_name",this.agg_type_value,"t_value");
      myChart1.setOption(this.vvt2_chart_01);
       })
    },
    //右上图，
    set_chart2(){
    let myChart2 = this.$echarts.init(document.getElementById("myChart2"),"wonderland");
    var chart_sql="select * from vvt_data where org_id=" + this.org_value 
               + " and element_id='vvt2_02' and dept_id="  + this.dept_value
      const params = new URLSearchParams();
      params.append("sql", chart_sql);
      sqlquery(params).then((response) => {
        this.vvt2_chart_02.xAxis.data = [];
        this.vvt2_chart_02.xAxis.data = jsontoarray(response.data.data,"search_option","2020","kpi_name",this.agg_type_value,"t_xAxis");
        console.log(this.vvt2_chart_02.xAxis.data);        
        this.vvt2_chart_02.series[0].data = [];
        this.vvt2_chart_02.series[0].data = jsontoarray(response.data.data,"search_option","2020","kpi_name",this.agg_type_value,"t_value");
      myChart2.setOption(this.vvt2_chart_02);

      })
    },
    //左下角饼图
    set_chart3(){
    let myChart3 = this.$echarts.init(document.getElementById("myChart3"),"wonderland");
    var chart_sql="select * from vvt_data where org_id=" + this.org_value
                  + " and element_id='vvt2_03' and kpi_name='" + this.agg_type_value + "'";
      const params = new URLSearchParams();
      params.append("sql", chart_sql);
      sqlquery(params).then((response) => {
        this.vvt2_chart_03.legend.data = [];
        this.vvt2_chart_03.legend.data = jsontoarray(response.data.data,"search_option","2020","search_option","2020","series_id");
        this.vvt2_chart_03.series[0].data = [];
        this.vvt2_chart_03.series[0].data = pieseries(response.data.data,"search_option","2020","series_id","t_value");
       myChart3.setOption(this.vvt2_chart_03);
      })      
    },
    //右下图
    set_chart4(){
    let myChart4 = this.$echarts.init(document.getElementById("myChart4"),"wonderland");
    var chart_sql="select * from vvt_data where org_id=" + this.org_value
                  + " and element_id='vvt2_04' and kpi_name='" + this.agg_type_value
                   + "' and dept_id=" + this.dept_value;
      const params = new URLSearchParams();
      params.append("sql", chart_sql);
      sqlquery(params).then((response) => {
        this.vvt2_chart_04.xAxis.data = [];
        this.vvt2_chart_04.xAxis.data = jsontoarray(response.data.data,"search_option","2020","series_id","本月","t_xAxis");
        this.vvt2_chart_04.series[0].data = [];
        this.vvt2_chart_04.series[0].data = jsontoarray(response.data.data,"search_option","2020","series_id","本月","t_value");
        this.vvt2_chart_04.series[1].data = [];
        this.vvt2_chart_04.series[1].data = jsontoarray(response.data.data,"search_option","2020","series_id","上月","t_value");
      myChart4.setOption(this.vvt2_chart_04);
      })
    }

  }
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
  grid-column: 13/38;
}
#item3_1 {
  grid-row: 4/8;
  grid-column: 36/45;
  color: black;
}
#item3_2 {
  grid-row: 3/8;
  grid-column: 45/60;
}
#item4 {
  grid-row: 10/60;
  grid-column: 1/33;
  background-color: white;
  color: darkgray;
  border: darkgray 1px solid;
  border-radius: 3px;
  margin: 1px 1px 1px 1px;
}
#item5 {
  grid-row: 10/60;
  grid-column: 33/101;
  background-color: white;
  color: darkgray;
  border: darkgray 1px solid;
  border-radius: 3px;
  margin: 1px 1px 1px 1px;
}
#item5_1{
  grid-row: 10/25;
  grid-column: 33/101;
  text-align: right;
  padding:5px 5px 5px 5px;
}
#item6 {
  grid-row: 60/101;
  grid-column: 1/33;
  background-color: white;
  color: darkgray;
  border: darkgray 1px solid;
  border-radius: 3px;
  margin: 1px 1px 1px 1px;
}
#item7 {
  grid-row: 60/101;
  grid-column: 33/101;
  background-color: white;
  color: darkgray;
  border: darkgray 1px solid;
  border-radius: 3px;
  margin: 1px 1px 1px 1px;
}
</style>
