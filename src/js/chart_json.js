
//vvt15 逐时用电趋势(kw.h)图
export function vvt15_chart_01(){
    return {
        grid: {
          show: true,
          left: "8%",
          top: "15%",
          bottom: "15%",
          right: "6%",
        },
        xAxis: {
          type: "category",
          data: [
            "1点",
            "2点",
            "3点",
            "4点",
            "5点",
            "6点",
            "7点",
            "8点",
            "9点",
            "10点",
            "11点",
            "12点",
            "13点",
            "14点",
            "15点",
            "16点",
            "17点",
            "18点",
            "19点",
            "20点",
            "21点",
            "22点",
            "23点",
            "24点"
          ],
          axisLine: {
            lineStyle: {
              color: "#23A8F2",
            },
          },
          //设置网格线颜色
          splitLine: {
            show: true,
            lineStyle: {
              color: "#A6E1FC",
              width: 1,
              type: "solid",
            },
          },
        },
        yAxis: {
          type: "value",
          name: "单位：KW/h",
          axisLine: {
            lineStyle: {
              color: "#23A8F2",
            },
          },
          //设置网格线颜色
          splitLine: {
            show: true,
            lineStyle: {
              color: "#A6E1FC",
              width: 1,
              type: "solid",
            },
          },
        },
        tooltip: {
          //提示框组件
          trigger: "axis", //触发类型,'item'数据项图形触发，主要在散点图，饼图等无类目轴的图表中使用。 'axis'坐标轴触发，主要在柱状图，折线图等会使用类目轴的图表中使用。
          triggerOn: "mousemove", //提示框触发的条件,'mousemove'鼠标移动时触发。'click'鼠标点击时触发。'mousemove|click'同时鼠标移动和点击时触发。'none'不在 'mousemove' 或 'click' 时触发
          showContent: true, //是否显示提示框浮层
          //     alwaysShowContent:true,                     //是否永远显示提示框内容
          showDelay: 0, //浮层显示的延迟，单位为 ms
          hideDelay: 100, //浮层隐藏的延迟，单位为 ms
          enterable: false, //鼠标是否可进入提示框浮层中
          confine: false, //是否将 tooltip 框限制在图表的区域内
          transitionDuration: 0.4, //提示框浮层的移动动画过渡时间，单位是 s,设置为 0 的时候会紧跟着鼠标移动
          //       position:['10', '10'],                    //提示框浮层的位置，默认不设置时位置会跟随鼠标的位置,[10, 10],回掉函数，inside鼠标所在图形的内部中心位置，top、left、bottom、right鼠标所在图形上侧，左侧，下侧，右侧，
          formatter: "{a0}: {c0}<br />{a1}: {c1}", //提示框浮层内容格式器，支持字符串模板和回调函数两种形式,模板变量有 {a}, {b}，{c}，{d}，{e}，分别表示系列名，数据名，数据值等
          backgroundColor: "#3C3C3C", //标题背景色
          borderColor: "#ccc", //边框颜色
          borderWidth: 0, //边框线宽
          padding: 5, //图例内边距，单位px  5  [5, 10]  [5,10,5,10]
        },
        series: [
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320, 1109, 1233,0],
            type: "line",
            areaStyle: {color: "#D5F3F7"},
            name: "本年",      
          },
          {
            data: [840, 789, 931, 904, 1590, 1320, 1120, 1409, 1133, 1654,129,0,1895],
            type: "line",
            name: "上年",
            areaStyle: {color: "#C9E4F4"},
          },
        ],
      }
};
//vvt15 逐时用电趋势(kw.h)图
export function vvt15_chart_02(){
    return {
        grid: {
          show: true,
          left: "8%",
          top: "15%",
          bottom: "15%",
          right: "6%",
        },
        xAxis: {
          type: "category",
          data: [
            "1月",
            "2月",
            "3月",
            "4月",
            "5月",
            "6月",
            "7月",
            "8月",
            "9月",
            "10月",
            "11月",
            "12月",
          ],
          axisLine: {
            lineStyle: {
              color: "#23A8F2",
            },
          },
          //设置网格线颜色
          splitLine: {
            show: true,
            lineStyle: {
              color: "#A6E1FC",
              width: 1,
              type: "solid",
            },
          },
        },
        yAxis: {
          type: "value",
          name: "单位：KW/h",
          axisLine: {
            lineStyle: {
              color: "#23A8F2",
            },
          },
          //设置网格线颜色
          splitLine: {
            show: true,
            lineStyle: {
              color: "#A6E1FC",
              width: 1,
              type: "solid",
            },
          },
        },
        tooltip: {
          //提示框组件
          trigger: "axis", //触发类型,'item'数据项图形触发，主要在散点图，饼图等无类目轴的图表中使用。 'axis'坐标轴触发，主要在柱状图，折线图等会使用类目轴的图表中使用。
          triggerOn: "mousemove", //提示框触发的条件,'mousemove'鼠标移动时触发。'click'鼠标点击时触发。'mousemove|click'同时鼠标移动和点击时触发。'none'不在 'mousemove' 或 'click' 时触发
          showContent: true, //是否显示提示框浮层
          //     alwaysShowContent:true,                     //是否永远显示提示框内容
          showDelay: 0, //浮层显示的延迟，单位为 ms
          hideDelay: 100, //浮层隐藏的延迟，单位为 ms
          enterable: false, //鼠标是否可进入提示框浮层中
          confine: false, //是否将 tooltip 框限制在图表的区域内
          transitionDuration: 0.4, //提示框浮层的移动动画过渡时间，单位是 s,设置为 0 的时候会紧跟着鼠标移动
          //       position:['10', '10'],                    //提示框浮层的位置，默认不设置时位置会跟随鼠标的位置,[10, 10],回掉函数，inside鼠标所在图形的内部中心位置，top、left、bottom、right鼠标所在图形上侧，左侧，下侧，右侧，
          formatter: "{a0}: {c0}<br />{a1}: {c1}", //提示框浮层内容格式器，支持字符串模板和回调函数两种形式,模板变量有 {a}, {b}，{c}，{d}，{e}，分别表示系列名，数据名，数据值等
          backgroundColor: "#3C3C3C", //标题背景色
          borderColor: "#ccc", //边框颜色
          borderWidth: 0, //边框线宽
          padding: 5, //图例内边距，单位px  5  [5, 10]  [5,10,5,10]
        },
        series: [
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320, 1109, 1233],
            type: "line",
            areaStyle: {color: "#18DAD1"},
            name: "本年",      
          },
          {
            data: [840, 789, 931, 904, 1590, 1320, 1120, 1409, 1133, 1654],
            type: "line",
            name: "上年",
            areaStyle: {color: "#18DAD1"},
          },
        ],
      }
};
/**
 * 页面：vvt2
 * 所在位置：部门用能》用能概况
 */
export function vvt2_chart_01(){
  return{
    grid: {
      left: "20%",
      top: "16%",
      bottom: "8%",
      right: "10%",
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
  }
};
export function vvt2_chart_02(){
  return{
    grid: {
      left: "8%",
      top: "16%",
      bottom: "8%",
      right: "3%",
    },
    xAxis: {
      type: "category",
      data: [],
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
  }
};
export function vvt2_chart_03(){
  return{
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
}
};
export function vvt2_chart_04() {
  return {
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
  }
};
export function vvt10_01(){
  return {
    title: {
      text: "当月逐日趋势",
      left: "center",
      top: "top",
      textStyle: {
        fontSize: 16,
        color: "#23A8F2",
      },
    },
    grid: {
      show: true,
      left: "8%",
      top: "15%",
      bottom: "15%",
      right: "6%",
    },
    xAxis: {
      type: "category",
      data: [
        "1月",
        "2月",
        "3月",
        "4月",
        "5月",
        "6月",
        "7月",
        "8月",
        "9月",
        "10月",
        "11月",
        "12月",
      ],
      axisLine: {
        lineStyle: {
          color: "#23A8F2",
        },
      },
      //设置网格线颜色
      splitLine: {
        show: true,
        lineStyle: {
          color: "#A6E1FC",
          width: 1,
          type: "solid",
        },
      },
    },
    yAxis: {
      type: "value",
      name: "单位：KW/h",
      axisLine: {
        lineStyle: {
          color: "#23A8F2",
        },
      },
      //设置网格线颜色
      splitLine: {
        show: true,
        lineStyle: {
          color: "#A6E1FC",
          width: 1,
          type: "solid",
        },
      },
    },
    tooltip: {
      //提示框组件
      trigger: "axis", //触发类型,'item'数据项图形触发，主要在散点图，饼图等无类目轴的图表中使用。 'axis'坐标轴触发，主要在柱状图，折线图等会使用类目轴的图表中使用。
      triggerOn: "mousemove", //提示框触发的条件,'mousemove'鼠标移动时触发。'click'鼠标点击时触发。'mousemove|click'同时鼠标移动和点击时触发。'none'不在 'mousemove' 或 'click' 时触发
      showContent: true, //是否显示提示框浮层
      //     alwaysShowContent:true,                     //是否永远显示提示框内容
      showDelay: 0, //浮层显示的延迟，单位为 ms
      hideDelay: 100, //浮层隐藏的延迟，单位为 ms
      enterable: false, //鼠标是否可进入提示框浮层中
      confine: false, //是否将 tooltip 框限制在图表的区域内
      transitionDuration: 0.4, //提示框浮层的移动动画过渡时间，单位是 s,设置为 0 的时候会紧跟着鼠标移动
      //       position:['10', '10'],                    //提示框浮层的位置，默认不设置时位置会跟随鼠标的位置,[10, 10],回掉函数，inside鼠标所在图形的内部中心位置，top、left、bottom、right鼠标所在图形上侧，左侧，下侧，右侧，
      formatter: "{a0}: {c0}<br />{a1}: {c1}", //提示框浮层内容格式器，支持字符串模板和回调函数两种形式,模板变量有 {a}, {b}，{c}，{d}，{e}，分别表示系列名，数据名，数据值等
      backgroundColor: "#3C3C3C", //标题背景色
      borderColor: "#ccc", //边框颜色
      borderWidth: 0, //边框线宽
      padding: 5, //图例内边距，单位px  5  [5, 10]  [5,10,5,10]
    },
    series: [
      {
        data: [820, 932, 901, 934, 1290, 1330, 1320, 1109, 1233],
        type: "bar",
        name: "本年",
        color: "#18DAD1",
      },
      {
        data: [840, 789, 931, 904, 1590, 1320, 1120, 1409, 1133, 1654],
        type: "bar",
        name: "上年",
        color: "#36CF89",
      },
    ],
  }
}
export function mployeesalary_chart(){
  return {
    title: {
      text: "当月逐日趋势",
      left: "center",
      top: "top",
      textStyle: {
        fontSize: 16,
        color: "#23A8F2",
      },
    },
    grid: {
      show: true,
      left: "8%",
      top: "15%",
      bottom: "15%",
      right: "6%",
    },
    xAxis: {
      type: "category",
      data: [
        "1月",
        "2月",
        "3月",
        "4月",
        "5月",
        "6月",
        "7月",
        "8月",
        "9月",
        "10月",
        "11月",
        "12月",
      ],
      axisLine: {
        lineStyle: {
          color: "#23A8F2",
        },
      },
      //设置网格线颜色
      splitLine: {
        show: true,
        lineStyle: {
          color: "#A6E1FC",
          width: 1,
          type: "solid",
        },
      },
    },
    yAxis: {
      type: "value",
      name: "单位：KW/h",
      axisLine: {
        lineStyle: {
          color: "#23A8F2",
        },
      },
      //设置网格线颜色
      splitLine: {
        show: true,
        lineStyle: {
          color: "#A6E1FC",
          width: 1,
          type: "solid",
        },
      },
    },
    tooltip: {
      //提示框组件
      trigger: "axis", //触发类型,'item'数据项图形触发，主要在散点图，饼图等无类目轴的图表中使用。 'axis'坐标轴触发，主要在柱状图，折线图等会使用类目轴的图表中使用。
      triggerOn: "mousemove", //提示框触发的条件,'mousemove'鼠标移动时触发。'click'鼠标点击时触发。'mousemove|click'同时鼠标移动和点击时触发。'none'不在 'mousemove' 或 'click' 时触发
      showContent: true, //是否显示提示框浮层
      //     alwaysShowContent:true,                     //是否永远显示提示框内容
      showDelay: 0, //浮层显示的延迟，单位为 ms
      hideDelay: 100, //浮层隐藏的延迟，单位为 ms
      enterable: false, //鼠标是否可进入提示框浮层中
      confine: false, //是否将 tooltip 框限制在图表的区域内
      transitionDuration: 0.4, //提示框浮层的移动动画过渡时间，单位是 s,设置为 0 的时候会紧跟着鼠标移动
      //       position:['10', '10'],                    //提示框浮层的位置，默认不设置时位置会跟随鼠标的位置,[10, 10],回掉函数，inside鼠标所在图形的内部中心位置，top、left、bottom、right鼠标所在图形上侧，左侧，下侧，右侧，
      formatter: "{a0}: {c0}<br />{a1}: {c1}", //提示框浮层内容格式器，支持字符串模板和回调函数两种形式,模板变量有 {a}, {b}，{c}，{d}，{e}，分别表示系列名，数据名，数据值等
      backgroundColor: "#3C3C3C", //标题背景色
      borderColor: "#ccc", //边框颜色
      borderWidth: 0, //边框线宽
      padding: 5, //图例内边距，单位px  5  [5, 10]  [5,10,5,10]
    },
    series: [
      {
        data: [820, 932, 901, 934, 1290, 1330, 1320, 1109, 1233],
        type: "bar",
        name: "本年",
        color: "#18DAD1",
      },
      {
        data: [840, 789, 931, 904, 1590, 1320, 1120, 1409, 1133, 1654],
        type: "bar",
        name: "上年",
        color: "#36CF89",
      },
    ],
  }
};
export function vvt5_chart1(){
  return {
    grid: {
      left: "8%",
      top: "16%",
      bottom: "8%",
      right: "3%",
    },
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b} : {c} ({d}%)",
    },
    legend: {
      orient: "vertical",
      left: "left",
      data: ["工时", "非工时"],
    },
    series: [
      {
        name: "访问来源",
        type: "pie",
        radius: "55%",
        center: ["50%", "60%"],
        data: [
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ],
  }
};
export function vvt5_chart2(){
  return {
    grid: {
      left: "8%",
      top: "16%",
      bottom: "8%",
      right: "3%",
    },
    xAxis: {
      type: "category",
      data: [
        "0时",
        "2时",
        "4时",
        "8时",
        "10时",
        "12时",
        "14时",
        "16时",
        "18时",
        "20时",
        "22时",
        "24时",
      ],
      axisLine: {
        lineStyle: {
          color: "#23A8F2",
        },
      },
    },
    yAxis: {
      type: "value",
      name: "单位：kw/h",
      axisLine: {
        lineStyle: {
          color: "#23A8F2",
        },
      },
      splitLine: {
        show: false, //去掉网格线
      },
    },
    dataZoom: [
      {
        show: true,
        type: "inside",
        filterMode: "none",
        xAxisIndex: [0],
        startValue: 0,
        endValue: 20,
      },
    ],
    tooltip: {
      //提示框组件
      trigger: "axis", //触发类型,'item'数据项图形触发，主要在散点图，饼图等无类目轴的图表中使用。 'axis'坐标轴触发，主要在柱状图，折线图等会使用类目轴的图表中使用。
      triggerOn: "mousemove", //提示框触发的条件,'mousemove'鼠标移动时触发。'click'鼠标点击时触发。'mousemove|click'同时鼠标移动和点击时触发。'none'不在 'mousemove' 或 'click' 时触发
      showContent: true, //是否显示提示框浮层
      //     alwaysShowContent:true,                     //是否永远显示提示框内容
      showDelay: 0, //浮层显示的延迟，单位为 ms
      hideDelay: 100, //浮层隐藏的延迟，单位为 ms
      enterable: false, //鼠标是否可进入提示框浮层中
      confine: false, //是否将 tooltip 框限制在图表的区域内
      transitionDuration: 0.4, //提示框浮层的移动动画过渡时间，单位是 s,设置为 0 的时候会紧跟着鼠标移动
      //       position:['10', '10'],                    //提示框浮层的位置，默认不设置时位置会跟随鼠标的位置,[10, 10],回掉函数，inside鼠标所在图形的内部中心位置，top、left、bottom、right鼠标所在图形上侧，左侧，下侧，右侧，
      formatter: "{a0}: {c0}<br />{a1}: {c1}", //提示框浮层内容格式器，支持字符串模板和回调函数两种形式,模板变量有 {a}, {b}，{c}，{d}，{e}，分别表示系列名，数据名，数据值等
      backgroundColor: "#3C3C3C", //标题背景色
      borderColor: "#ccc", //边框颜色
      borderWidth: 0, //边框线宽
      padding: 5, //图例内边距，单位px  5  [5, 10]  [5,10,5,10]
    },
    series: [
      {
        data: [820, 932, 901, 934, 1290, 1330, 1320, 1109, 1233],
        type: "bar",
        name: "工作时",
        color: "#B6A2DE",
        barWidth: "50%",
      },
      {
        data: [820, 932, 901, 934, 1290, 1330, 1320, 1109, 1233],
        type: "bar",
        name: "工作时",
        color: "#49C6DA",
        barWidth: "50%",
      },
    ],
  }
};
export function vvt(){
  return {
    grid: {
      show: true,
      left: "8%",
      top: "15%",
      bottom: "15%",
      right: "6%",
    },
    xAxis: {
      type: "category",
      data: [
        "1月",
        "2月",
        "3月",
        "4月",
        "5月",
        "6月",
        "7月",
        "8月",
        "9月",
        "10月",
        "11月",
        "12月",
      ],
      axisLine: {
        lineStyle: {
          color: "#23A8F2",
        },
      },
      //设置网格线颜色
      splitLine: {
        show: true,
        lineStyle: {
          color: "#A6E1FC",
          width: 1,
          type: "solid",
        },
      },
    },
    yAxis: {
      type: "value",
      name: "单位：KW/h",
      axisLine: {
        lineStyle: {
          color: "#23A8F2",
        },
      },
      //设置网格线颜色
      splitLine: {
        show: true,
        lineStyle: {
          color: "#A6E1FC",
          width: 1,
          type: "solid",
        },
      },
    },
    tooltip: {
      //提示框组件
      trigger: "axis", //触发类型,'item'数据项图形触发，主要在散点图，饼图等无类目轴的图表中使用。 'axis'坐标轴触发，主要在柱状图，折线图等会使用类目轴的图表中使用。
      triggerOn: "mousemove", //提示框触发的条件,'mousemove'鼠标移动时触发。'click'鼠标点击时触发。'mousemove|click'同时鼠标移动和点击时触发。'none'不在 'mousemove' 或 'click' 时触发
      showContent: true, //是否显示提示框浮层
      //     alwaysShowContent:true,                     //是否永远显示提示框内容
      showDelay: 0, //浮层显示的延迟，单位为 ms
      hideDelay: 100, //浮层隐藏的延迟，单位为 ms
      enterable: false, //鼠标是否可进入提示框浮层中
      confine: false, //是否将 tooltip 框限制在图表的区域内
      transitionDuration: 0.4, //提示框浮层的移动动画过渡时间，单位是 s,设置为 0 的时候会紧跟着鼠标移动
      //       position:['10', '10'],                    //提示框浮层的位置，默认不设置时位置会跟随鼠标的位置,[10, 10],回掉函数，inside鼠标所在图形的内部中心位置，top、left、bottom、right鼠标所在图形上侧，左侧，下侧，右侧，
      formatter: "{a0}: {c0}<br />{a1}: {c1}", //提示框浮层内容格式器，支持字符串模板和回调函数两种形式,模板变量有 {a}, {b}，{c}，{d}，{e}，分别表示系列名，数据名，数据值等
      backgroundColor: "#3C3C3C", //标题背景色
      borderColor: "#ccc", //边框颜色
      borderWidth: 0, //边框线宽
      padding: 5, //图例内边距，单位px  5  [5, 10]  [5,10,5,10]
    },
    series: [
      {
        data: [820, 932, 901, 934, 1290, 1330, 1320, 1109, 1233],
        type: "line",
        name: "本年",
        color: "#18DAD1",
      },
      {
        data: [840, 789, 931, 904, 1590, 1320, 1120, 1409, 1133, 1654],
        type: "line",
        name: "上年",
        color: "#36CF89",
      },
    ],
  }
}