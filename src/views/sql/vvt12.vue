<template>
  <div class="app-main">
    <div id="item1"></div>
    <div id="item2">建筑名称:</div>
    <div id="item3">
      <el-select size="mini"></el-select>
    </div>
    <div id="item4"><div id="myChart1" :style="{width: '100%', height: '98%'}"></div></div>
    <div id="item5"><div id="myChart2" :style="{width: '100%', height: '98%'}"></div></div>
    <div id="item6"><div id="myChart3" :style="{width: '100%', height: '98%'}"></div></div>
    <div id="item7"><div id="myChart4" :style="{width: '100%', height: '98%'}"></div></div>
    <div id='item8'>
          <el-select v-model="t_value" placeholder="请选择" size='mini'>
    <el-option
      v-for="item in t_options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
    </div>
  </div>
</template>

<script>
import { sqlquery } from "@/api/sql";
import { parseTime } from "@/utils/index";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";

export default {
  components: {},
  data() {
    return {
      query: {
        sql: "",
      },
             t_options: [{
          value: 1,
          label: '特殊用电'
        }, {
          value: 2,
          label: '照明插座'
        }, {
          value: 3,
          label: '空调用电'
        }, {
          value: 4,
          label: '动力用电'
        }, {
          value: 5,
          label: '生产用电'
        }],
        t_value:1
    };
  },
  mounted() {
      this.drawLine1();
      this.drawLine2();    
      this.drawLine3();  
      this.drawLine4();
  },
  created() {},
  methods: {
        drawLine1() {
      // 基于准备好的dom，初始化echarts实例
      let myChart1 = this.$echarts.init(
        document.getElementById("myChart1"),
        "wonderland"
      );
      // 绘制图表
      myChart1.setOption({
        grid: {
          left: "8%",
          top: "16%",
          bottom: "8%",
          right: "3%",
        },
        yAxis: {
          type: "category",
          data: ["0时", "2时", "4时", "8时", "10时", "12时", "14时","16时","18时","20时","22时","24时"],
          axisLine: {
            lineStyle: {
              color: "#23A8F2",
            },
          }
        },
        xAxis: {
          type: "value",
          name:'单位：kw/h',
          axisLine: {
            lineStyle: {
              color: "#23A8F2",
            },
          },
        splitLine:{
          show:false     //去掉网格线
        }
        },
        tooltip:{                                      //提示框组件
            trigger: 'axis',                            //触发类型,'item'数据项图形触发，主要在散点图，饼图等无类目轴的图表中使用。 'axis'坐标轴触发，主要在柱状图，折线图等会使用类目轴的图表中使用。
            triggerOn:"mousemove",                      //提示框触发的条件,'mousemove'鼠标移动时触发。'click'鼠标点击时触发。'mousemove|click'同时鼠标移动和点击时触发。'none'不在 'mousemove' 或 'click' 时触发
            showContent:true,                           //是否显示提示框浮层
       //     alwaysShowContent:true,                     //是否永远显示提示框内容
            showDelay:0,                                  //浮层显示的延迟，单位为 ms
            hideDelay:100,                                //浮层隐藏的延迟，单位为 ms
            enterable:false,                             //鼠标是否可进入提示框浮层中
            confine:false,                               //是否将 tooltip 框限制在图表的区域内
            transitionDuration:0.4,                      //提示框浮层的移动动画过渡时间，单位是 s,设置为 0 的时候会紧跟着鼠标移动
     //       position:['10', '10'],                    //提示框浮层的位置，默认不设置时位置会跟随鼠标的位置,[10, 10],回掉函数，inside鼠标所在图形的内部中心位置，top、left、bottom、right鼠标所在图形上侧，左侧，下侧，右侧，
            formatter:"{a0}: {c0}<br />{a1}: {c1}",     //提示框浮层内容格式器，支持字符串模板和回调函数两种形式,模板变量有 {a}, {b}，{c}，{d}，{e}，分别表示系列名，数据名，数据值等
            backgroundColor:"#3C3C3C",            //标题背景色
            borderColor:"#ccc",                        //边框颜色
            borderWidth:0,                              //边框线宽
            padding:5                                 //图例内边距，单位px  5  [5, 10]  [5,10,5,10]
        },
        series: [
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320,1109,1233],
            type: "bar",
            name:'今日',
            color:'#23A8F2'
          }
        ],
      });
    },
      drawLine2() {
      // 基于准备好的dom，初始化echarts实例
      let myChart2 = this.$echarts.init(
        document.getElementById("myChart2"),
        "wonderland"
      );
      // 绘制图表
      myChart2.setOption({
        grid: {
          left: "8%",
          top: "16%",
          bottom: "8%",
          right: "3%",
        },
        xAxis: {
          type: "category",
          data: ["0时", "2时", "4时", "8时", "10时", "12时", "14时","16时","18时","20时","22时","24时"],
          axisLine: {
            lineStyle: {
              color: "#23A8F2",
            },
          }
        },
        yAxis: {
          type: "value",
          name:'单位：kw/h',
          axisLine: {
            lineStyle: {
              color: "#23A8F2",
            },
          },
        splitLine:{
          show:false     //去掉网格线
        }
        },
            dataZoom: [{
        show: true,
        type: 'inside',
        filterMode: 'none',
        xAxisIndex: [0],
        startValue: 0,
        endValue: 20
    }],
        tooltip:{                                      //提示框组件
            trigger: 'axis',                            //触发类型,'item'数据项图形触发，主要在散点图，饼图等无类目轴的图表中使用。 'axis'坐标轴触发，主要在柱状图，折线图等会使用类目轴的图表中使用。
            triggerOn:"mousemove",                      //提示框触发的条件,'mousemove'鼠标移动时触发。'click'鼠标点击时触发。'mousemove|click'同时鼠标移动和点击时触发。'none'不在 'mousemove' 或 'click' 时触发
            showContent:true,                           //是否显示提示框浮层
       //     alwaysShowContent:true,                     //是否永远显示提示框内容
            showDelay:0,                                  //浮层显示的延迟，单位为 ms
            hideDelay:100,                                //浮层隐藏的延迟，单位为 ms
            enterable:false,                             //鼠标是否可进入提示框浮层中
            confine:false,                               //是否将 tooltip 框限制在图表的区域内
            transitionDuration:0.4,                      //提示框浮层的移动动画过渡时间，单位是 s,设置为 0 的时候会紧跟着鼠标移动
     //       position:['10', '10'],                    //提示框浮层的位置，默认不设置时位置会跟随鼠标的位置,[10, 10],回掉函数，inside鼠标所在图形的内部中心位置，top、left、bottom、right鼠标所在图形上侧，左侧，下侧，右侧，
            formatter:"{a0}: {c0}<br />{a1}: {c1}",     //提示框浮层内容格式器，支持字符串模板和回调函数两种形式,模板变量有 {a}, {b}，{c}，{d}，{e}，分别表示系列名，数据名，数据值等
            backgroundColor:"#3C3C3C",            //标题背景色
            borderColor:"#ccc",                        //边框颜色
            borderWidth:0,                              //边框线宽
            padding:5                                 //图例内边距，单位px  5  [5, 10]  [5,10,5,10]
        },
        series: [
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320,1109,1233,1234,1342],
            type: "bar",
            name:'今日',
            color:'',
            barWidth:'30%',
            color:'#B6A2DE'

          }
        ],
      });
    },
      drawLine3() {
      // 基于准备好的dom，初始化echarts实例
      let myChart3 = this.$echarts.init(
        document.getElementById("myChart3"),
        "wonderland"
      );
      // 绘制图表
      myChart3.setOption({
        grid: {
          left: "8%",
          top: "16%",
          bottom: "8%",
          right: "3%",
        },
    tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
    },
    legend: {
        orient: 'vertical',
        left: 'left',
        data: ['照明', '空调', '动力', '生产', '损耗']
    },
    series: [
        {
            name: '访问来源',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: [
                {value: 335, name: '照明',itemStyle: {color: '#23A8F2'}},
                {value: 310, name: '空调',itemStyle: {color: '#71AB2B'}},
                {value: 234, name: '动力',itemStyle: {color: '#B4B4B4'}},
                {value: 135, name: '生产',itemStyle: {color: '#B6A2DE'}},
                {value: 1548, name: '损耗',itemStyle: {color: '#84B59B'}}
            ],
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
});
    },
      drawLine4() {
      // 基于准备好的dom，初始化echarts实例
      let myChart4 = this.$echarts.init(
        document.getElementById("myChart4"),
        "wonderland"
      );
      // 绘制图表
      myChart4.setOption({
        grid: {
          left: "8%",
          top: "16%",
          bottom: "8%",
          right: "3%",
        },
        xAxis: {
          type: "category",
          data: ["0时", "2时", "4时", "8时", "10时", "12时", "14时","16时","18时","20时","22时","24时"],
          axisLine: {
            lineStyle: {
              color: "#23A8F2",
            },
          }
        },
        yAxis: {
          type: "value",
          name:'单位：kw/h',
          axisLine: {
            lineStyle: {
              color: "#23A8F2",
            },
          },
        splitLine:{
          show:false     //去掉网格线
        }
        },
            dataZoom: [{
        show: true,
        type: 'inside',
        filterMode: 'none',
        xAxisIndex: [0],
        startValue: 0,
        endValue: 20
    }],
        tooltip:{                                      //提示框组件
            trigger: 'axis',                            //触发类型,'item'数据项图形触发，主要在散点图，饼图等无类目轴的图表中使用。 'axis'坐标轴触发，主要在柱状图，折线图等会使用类目轴的图表中使用。
            triggerOn:"mousemove",                      //提示框触发的条件,'mousemove'鼠标移动时触发。'click'鼠标点击时触发。'mousemove|click'同时鼠标移动和点击时触发。'none'不在 'mousemove' 或 'click' 时触发
            showContent:true,                           //是否显示提示框浮层
       //     alwaysShowContent:true,                     //是否永远显示提示框内容
            showDelay:0,                                  //浮层显示的延迟，单位为 ms
            hideDelay:100,                                //浮层隐藏的延迟，单位为 ms
            enterable:false,                             //鼠标是否可进入提示框浮层中
            confine:false,                               //是否将 tooltip 框限制在图表的区域内
            transitionDuration:0.4,                      //提示框浮层的移动动画过渡时间，单位是 s,设置为 0 的时候会紧跟着鼠标移动
     //       position:['10', '10'],                    //提示框浮层的位置，默认不设置时位置会跟随鼠标的位置,[10, 10],回掉函数，inside鼠标所在图形的内部中心位置，top、left、bottom、right鼠标所在图形上侧，左侧，下侧，右侧，
            formatter:"{a0}: {c0}<br />{a1}: {c1}",     //提示框浮层内容格式器，支持字符串模板和回调函数两种形式,模板变量有 {a}, {b}，{c}，{d}，{e}，分别表示系列名，数据名，数据值等
            backgroundColor:"#3C3C3C",            //标题背景色
            borderColor:"#ccc",                        //边框颜色
            borderWidth:0,                              //边框线宽
            padding:5                                 //图例内边距，单位px  5  [5, 10]  [5,10,5,10]
        },
        series: [
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320,1109,1233],
            type: "bar",
            name:'今日',
            color:'#23A8F2',
            barWidth:'30%'
          },
          {
            data: [824, 962, 941, 934, 1210, 1130, 1120,1109,1232],
            type: "bar",
            name:'昨日',
            color:'#84B59B',
            barWidth:'30%'
          }
        ],
      });
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
  grid-column: 13/38;
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
#item8{
    grid-row:11/30;
    grid-column: 90/101;
    text-align: right;
    margin:0px 5px 0px 5px;
}
</style>
