<template>
  <div class="app-main">
        <div id='item1'></div>
        <div id="item1_1"><span class="iconfont icon-yibiao" style="font-size:40px;color:#19A15F"></span></div>
        <div id="item1_2"><span style="font-size:24px;color:#49C6DA">{{vvt15_01[0].t_value}}</span></div>
        <div id="item1_3"><span class="iconfont icon-dianbiao" style="font-size:40px;color:#19A15F"></span></div>
        <div id="item1_4"><span style="font-size:24px;color:#49C6DA">{{vvt15_01[1].t_value}}</span></div>
        <div id="item1_5"><span style="color:black">{{vvt15_01[0].kpi_name + '(' +  vvt15_01[0].unit + ')'}}</span></div>
        <div id="item1_6"><span style="color:black">{{vvt15_01[1].kpi_name + '(' +  vvt15_01[1].unit + ')'}}</span></div>
        <div id='item2'>平台运行状态</div>
        <div id='item3'></div>
        <div id="item3_1"><span class="iconfont icon-eryanghuatan" style="font-size:40px;color:#22A7F2"></span></div>
        <div id="item3_2"><span style="font-size:24px;color:#49C6DA">{{vvt15_01[2].t_value}}</span><span style=";color:black">{{'(' + vvt15_01[2].unit +')'}}</span></div>
        <div id="item3_3"><span class="iconfont icon-meikuang" style="font-size:40px;color:#22A7F2"></span></div>
        <div id="item3_4"><span style="font-size:24px;color:#49C6DA">{{vvt15_01[3].t_value}}</span><span style=";color:black">{{'(' + vvt15_01[3].unit +')'}}</span></div>
        <div id="item3_5"><span style="color:black">{{vvt15_01[2].kpi_name}}</span></div>
        <div id="item3_6"><span style="color:black">{{vvt15_01[3].kpi_name}}</span></div>
        <div id='item4'>能耗折算</div>
        <div id='item5'></div>
        <div id='item5_1'> <div id="myChart1" :style="{width: '100%', height: '100%'}"></div></div>
        <div id='item6'>逐时用电趋势(kw.h)</div>
        <div id='item7'><iframe id='iframe1' src='https://map.baidu.com/@12646658,2528558,13z' style="width:100%;height:100%"></iframe></div>
        <div id='item8'></div>
        <div id='item9'>逐日用电趋势(kw.h)</div>   
        <div id='item8_1'>
      <div id="myChart2" :style="{width: '100%', height: '100%'}"></div>
            </div>          
        <div id='item10'></div>
        <div id='item11'>用电日同比分析</div>  
        <div id='item14'>{{vvt15_02[0].series_id}}<span style="font-size:18px;color:#253243;padding:0px 0px 0px 50px">{{vvt15_02[0].t_value}}</span>{{vvt15_02[0].unit}}</div>  
        <div id='item15'>{{vvt15_02[1].series_id}}<span style="font-size:18px;color:#253243;padding:0px 0px 0px 50px">{{vvt15_02[1].t_value}}</span>{{vvt15_02[1].unit}}</div>  
        <div id='item16'>{{vvt15_02[2].series_id}}<span style="font-size:18px;color:#253243;padding:0px 0px 0px 80px">{{vvt15_02[2].t_value + vvt15_02[2].unit}}</span>
            <span class='el-icon-caret-bottom' style="font-size:18px;color:red"></span></div>  
        <div id='item12'></div>
        <div id='item13'>用电月同比分析</div> 
        <div id='item17'>{{vvt15_03[0].series_id}}<span style="font-size:18px;color:#253243;padding:0px 0px 0px 50px">{{vvt15_03[0].t_value}}</span>&nbsp;{{vvt15_03[0].unit}}</div>  
        <div id='item18'>{{vvt15_03[1].series_id}}<span style="font-size:18px;color:#253243;padding:0px 0px 0px 50px">{{vvt15_03[1].t_value}}</span>{{vvt15_03[0].unit}}</div>  
        <div id='item19'>{{vvt15_03[2].series_id}}<span style="font-size:18px;color:#253243;padding:0px 0px 0px 80px">{{vvt15_03[2].t_value + vvt15_03[2].unit}}</span>
            <span class='el-icon-caret-bottom' style="font-size:18px;color:red"></span></div>   

  </div>

</template>

<script>
import { vvt15_chart_01,vvt15_chart_02} from "@/js/chart_json";
import { sqlquery } from "@/api/sql";
import { jsontoarray,jsontfilter } from "@/js/sql_echart";
import { getUserInfo} from '@/api/user'




export default {
  components: {},
  data() {
    return {
      query: {
        sql: "",
      },
      CurrentUser:this.$store.state.user,
      checkList: ["选中且禁用", "复选框 A"],
      //左边4个指标的展示
      vvt15_01:[
             {kpi_name:'网关',unit:'个',t_value:5},
             {kpi_name:'仪表',unit:'个',t_value:5533},
             {kpi_name:'CO2',unit:'吨',t_value:293},
             {kpi_name:'标准煤',unit:'吨',t_value:4.98},             
             ],
      //逐时用电趋势json;
            vvt15_chart_01:vvt15_chart_01(),
      //逐日用电趋势json;
            vvt15_chart_02:vvt15_chart_02(),
      //用电日同比分析
       vvt15_02:[{series_id:'本日用电量',unit:'kw/h',t_value:12},
                  {series_id:'昨日用电量',unit:'kw/h',t_value:12},
                  {series_id:'同期比',unit:'%',t_value:12},
       ],
      //用电月同比分析
       vvt15_03:[{series_id:'本月用电量',unit:'kw/h',t_value:12},
                  {series_id:'上月用电量',unit:'kw/h',t_value:12},
                  {series_id:'同期比',unit:'%',t_value:12},
       ],
    }

  },
  mounted() {
         getUserInfo().then((res) => {
        this.CurrentUser = res.data.data
        var sql="select A.* from vvt15_data A INNER JOIN sys_user B on A.dept_id=B.dept_id where B.user_id=" 
        + this.CurrentUser.userId + " order by order_id ASC"
        this.drawLine(sql)
      })
  },
  created() {},
  methods: {

    drawLine(sqlstr) {
      let myChart1 = this.$echarts.init(
        document.getElementById("myChart1"),
        "wonderland"
      );
      let myChart2 = this.$echarts.init(
        document.getElementById("myChart2"),
        "wonderland"
      );
      this.loading = true;
      const params = new URLSearchParams();
      params.append("sql", sqlstr);
      sqlquery(params).then(response => {
       // 逐时用电趋势(kw.h)图
      this.vvt15_chart_01.xAxis.data=[];
      this.vvt15_chart_01.xAxis.data=jsontoarray(response.data.data,'element_id','逐时用电趋势','series_id','今日','t_xAxis');
      this.vvt15_chart_01.series[0].data=[];
      this.vvt15_chart_01.series[0].data=jsontoarray(response.data.data,'element_id','逐时用电趋势','series_id','今日','t_value');
      this.vvt15_chart_01.series[1].data=[];
      this.vvt15_chart_01.series[1].data=jsontoarray(response.data.data,'element_id','逐时用电趋势','series_id','昨日','t_value');
      myChart1.setOption(this.vvt15_chart_01);
      // 逐日用电趋势(kw.h)
      this.vvt15_chart_02.xAxis.data=[];
      this.vvt15_chart_02.xAxis.data=jsontoarray(response.data.data,'element_id','逐日用电趋势','series_id','本月','t_xAxis');
      this.vvt15_chart_02.series[0].data=[];
      this.vvt15_chart_02.series[0].data=jsontoarray(response.data.data,'element_id','逐日用电趋势','series_id','本月','t_value');
      this.vvt15_chart_02.series[1].data=[];
      this.vvt15_chart_02.series[1].data=jsontoarray(response.data.data,'element_id','逐日用电趋势','series_id','上月','t_value');
      myChart2.setOption(this.vvt15_chart_02);
      //左边4个指标
      this.vvt15_01=[];
      this.vvt15_01=jsontfilter(response.data.data,'element_id','四个指标');
      //用电日同比分析
      this.vvt15_02=[];      
      this.vvt15_02=jsontfilter(response.data.data,'element_id','用电日同比分析');
      //用电月同比分析
      this.vvt15_03=[];
      this.vvt15_03=jsontfilter(response.data.data,'element_id','用电月同比分析');
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
  grid-row: 1/33;
  grid-column: 1/28;
  background-color: white;
  color: darkgray;
  border: darkgray 1px solid;
  border-radius: 3px;
  margin: 1px 1px 1px 5px;
}
#item1_1{
      grid-row: 9/18;
      grid-column: 6/15;
}
#item1_2{
      grid-row: 17/22;
      grid-column: 7/15;
}
#item1_3{
      grid-row: 9/18;
      grid-column: 18/25;
}
#item1_4{
      grid-row: 17/22;
      grid-column: 18/25;
}
#item1_5{
      grid-row: 22/28;
      grid-column: 5/15;
}
#item1_6{
      grid-row: 22/28;
      grid-column: 18/25;
}
#item2{
     grid-row: 1/7;
     grid-column: 1/28; 
     background-color: #49C6DA;
     border-radius: 3px;
     margin: 1px 1px 1px 5px;
     padding:7px 0px 2px 5px;
}

#item3 {
  grid-row: 34/66;
  grid-column: 1/28;
  background-color: white;
  color: darkgray;
  border: darkgray 1px solid;
  border-radius: 3px;
  margin: 1px 1px 1px 5px;
}
#item3_1{
      grid-row: 45/52;
      grid-column: 6/15;
}
#item3_2{
      grid-row: 53/60;
      grid-column: 7/15;
}
#item3_3{
      grid-row: 45/52;
      grid-column: 18/25;
}
#item3_4{
      grid-row: 53/60;
      grid-column: 18/25;
}
#item3_5{
      grid-row: 59/70;
      grid-column: 7/15;
}
#item3_6{
      grid-row: 59/70;
      grid-column: 18/25;
}
#item4{
     grid-row: 34/40;
     grid-column: 1/28; 
     background-color: #49C6DA;
     border-radius: 3px;
     margin: 1px 1px 1px 5px;
     padding:7px 0px 2px 5px;
}
#item5 {
  grid-row: 67/100;
  grid-column: 1/28;
  background-color: white;
  color: darkgray;
  border: darkgray 1px solid;
  border-radius: 3px;
  margin: 1px 1px 1px 5px;
}
#item5_1 {
  grid-row: 74/99;
  grid-column: 2/27;
}
#item6{
     grid-row: 67/73;
     grid-column: 1/28; 
     background-color: #49C6DA;
     border-radius: 3px;
     margin: 1px 1px 1px 5px;
     padding:7px 0px 2px 5px;
}

#item7{
  grid-row: 1/67;
  grid-column: 29/101;
  background-color: white;
  color: darkgray;
  border: darkgray 1px solid;
  border-radius: 3px;
  margin: 1px 1px 1px 5px; 
}
#item8 {
  grid-row: 67/100;
  grid-column: 29/56;
  background-color: white;
  color: darkgray;
  border: darkgray 1px solid;
  border-radius: 3px;
  margin: 1px 1px 1px 5px;
}
#item8_1 {
  grid-row: 74/99;
  grid-column: 30/55;

}
#item9{
     grid-row: 67/73;
     grid-column: 29/56; 
     background-color: #49C6DA;
     border-radius: 3px;
     margin: 1px 1px 1px 5px;
     padding:7px 0px 2px 5px;
}
#item10 {
  grid-row: 67/100;
  grid-column: 57/78;
  background-color: white;
  color: darkgray;
  border: darkgray 1px solid;
  border-radius: 3px;
  margin: 1px 1px 1px 5px;
}
#item11{
     grid-row: 67/73;
     grid-column: 57/78; 
     background-color: #49C6DA;
     border-radius: 3px;
     margin: 1px 1px 1px 5px;
     padding:7px 0px 2px 5px;
}
#item12 {
  grid-row: 67/100;
  grid-column: 79/101;
  background-color: white;
  color: darkgray;
  border: darkgray 1px solid;
  border-radius: 3px;
  margin: 1px 1px 1px 5px;
}
#item13{
     grid-row: 67/73;
     grid-column: 79/101; 
     background-color: #49C6DA;
     border-radius: 3px;
     margin: 1px 1px 1px 5px;
     padding:7px 0px 2px 5px;
}
#item14{
     grid-row: 73/81;
     grid-column: 58/78; 
     background-color: #D8E4FB;
     border-radius: 3px;
     margin: 8px 12px 1px 8px;
     padding:12px 0px 2px 8px;
     color:darkcyan;
}
#item15{
     grid-row: 81/89;
     grid-column: 58/78; 
     background-color: #FBE0DE;
     border-radius: 3px;
     margin: 8px 12px 1px 8px;
     padding:12px 0px 2px 8px;
     color:darkcyan;
}
#item16{
     grid-row: 89/97;
     grid-column: 58/78; 
     background-color: #DDF3DC;
     border-radius: 3px;
     margin: 8px 12px 1px 8px;
     padding:12px 0px 2px 8px;
     color:darkcyan;
}
#item17{
     grid-row: 73/81;
     grid-column: 80/101; 
     background-color: #D8E4FB;
     border-radius: 3px;
     margin: 8px 12px 1px 8px;
     padding:12px 0px 2px 8px;
     color:darkcyan;
}
#item18{
     grid-row: 81/89;
     grid-column: 80/101; 
     background-color: #FBE0DE;
     border-radius: 3px;
     margin: 8px 12px 1px 8px;
     padding:12px 0px 2px 8px;
     color:darkcyan;
}
#item19{
     grid-row: 89/97;
     grid-column:80/101; 
     background-color: #DDF3DC;
     border-radius: 3px;
     margin: 8px 12px 1px 8px;
     padding:12px 0px 2px 8px;
     color:darkcyan;
}

</style>

