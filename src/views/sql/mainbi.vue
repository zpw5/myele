<template>
  <div id="main">
    <div id="container">
      <div id="top_left">
        <div id="top_left_title">建筑信息</div>
        <div id="top_left_body">
          <div class="top_left_body_r1">
            <div class="top_left_body_r1col1">建筑名称：</div>
            <div class="top_left_body_r1col2">
              <el-cascader placeholder="试试搜索：指南" :options="options" filterable></el-cascader>
            </div>
          </div>
          <div class="top_left_body_r1">
            <div class="top_left_body_r1col1">建筑地点：</div>
            <div class="top_left_body_r1col2" style="margin:9px 8px 3px 8px;">{{top_left_title1}}</div>
          </div>
          <div class="top_left_body_r1">
            <div class="top_left_body_r1col1">建筑面积：</div>
            <div class="top_left_body_r1col2" style="margin:8px;">{{top_left_title2}}</div>
          </div>
          <div class="top_left_body_r2">
            <div class="top_left_body_r2col">
              <div class="r1">
                <span class="iconfont icon-zhubiantaishu" style=" font-size:65px;color:#F6684E"></span>
              </div>
              <div class="r2">{{top_left_body_r2[0].value}}</div>
              <div cloass="r3">{{top_left_body_r2[0].title}}</div>
            </div>
            <div class="top_left_body_r2col">
              <div class="r1">
                <span class="iconfont icon-zhuangjirongliang" style=" font-size:65px;color:#36CF89"></span>
              </div>
              <div class="r2">{{top_left_body_r2[1].value}}</div>
              <div class="r3">{{top_left_body_r2[1].title}}</div>
            </div>
            <div class="top_left_body_r2col">
              <div class="r1">
                <span class="iconfont icon-rongliang" style=" font-size:65px;color:#FFA73C"></span>
              </div>
              <div class="r2">{{top_left_body_r2[2].value}}</div>
              <div class="r3">{{top_left_body_r2[2].title}}</div>
            </div>
            <div class="top_left_body_r2col">
              <div class="r1">
                <span class="iconfont icon-jiliangdianshu" style=" font-size:65px;color:#3EBCF8"></span>
              </div>
              <div class="r2">{{top_left_body_r2[3].value}}</div>
              <div class="r3">{{top_left_body_r2[3].title}}</div>
            </div>
          </div>
        </div>
      </div>
      <div id="top_right">
        <div id="top_right_title">分类能耗</div>
        <div id="top_right_body">
          <div id="brc1">
            <div class="tcell">
              <div class="brr1">
                <span class="iconfont icon-ziyuan"></span>
              </div>
              <div class="brr2">可再生资源</div>
            </div>
            <div class="tcell">
              <div class="brr1">
                <span class="iconfont icon-dian"></span>
              </div>
              <div class="brr2">电</div>
            </div>
            <div class="tcell">
              <div class="brr1">
                <span class="iconfont icon-biaozhunmei"></span>
              </div>
              <div class="brr2">标准煤</div>
            </div>
          </div>
          <div id="brc2">
            <div class="c2cell" v-for="item in kpi" :key="item.kpi_name">
              <div> {{ item.ct1 + ':' + item.value1 + item.dw1}} </div>
              <div> {{ item.ct2 + ':'+ item.value2 +  item.dw2}} </div>
              <div>
                <span style="color:green;font-size:9px" v-if="item.dw3=='上升'"> {{item.ct3 + ':' + item.value3 + '%'}}</span>
                <span style="color:green;font-size:9px" v-if="item.dw3=='下降'"> {{item.ct3 + ':' + item.value3 + '%'}}</span>
                <span class="el-icon-caret-bottom" style="color:green;font-size:16px" v-if="item.dw3=='上升'"></span>
                  <span class="el-icon-caret-bottom" style="color:red;font-size:16px" v-if="item.dw3=='下降'"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="bt">
      <div id="bt_title">
        <div id="bt_title_text">用能趋势</div>
        <div id="bt_title_switch">
          <div id="bt_title_bt">
            <el-select v-model="bt_value" placeholder="请选择" size="mini" v-if="bt_text==true">
              <el-option
                v-for="item in bt_select"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
          <div>
            <el-switch
              style="display: block"
              v-model="bt_text"
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-text="总电能"
              inactive-text="分时段"
            ></el-switch>
          </div>
        </div>
      </div>
      <div id="bt_body">
        <div class="b_cl1" v-show="bt_text==true">
          <div id="myChart1" :style="{width: '100%', height: '90%'}"></div>
         <div id="myChart2" :style="{width: '100%', height: '90%'}"></div>
        </div>
        <div class="b_cl2" v-show="bt_text==false">
          <div id="myChart3" :style="{width: '850px', height: '180px'}"></div>
         <div id="myChart4" :style="{width: '350px', height: '180px'}"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      top_left_title1: "广州大道中175号金穗大厦31楼",
      top_left_title2: "256平方",
      top_left_body_r2: [
        { title: "主变电台", value: "1台" },
        { title: "装机容量", value: "500KVA" },
        { title: "运行容量", value: "200KVA" },
        { title: "计量点数", value: "600只" },
      ],
      options: [
        {
          value: "zhinan",
          label: "指南",
          children: [
            {
              value: "shejiyuanze",
              label: "设计原则",
              children: [
                {
                  value: "yizhi",
                  label: "一致",
                },
                {
                  value: "fankui",
                  label: "反馈",
                },
                {
                  value: "xiaolv",
                  label: "效率",
                },
                {
                  value: "kekong",
                  label: "可控",
                },
              ],
            },
            {
              value: "daohang",
              label: "导航",
              children: [
                {
                  value: "cexiangdaohang",
                  label: "侧向导航",
                },
                {
                  value: "dingbudaohang",
                  label: "顶部导航",
                },
              ],
            },
          ],
        },
        {
          value: "zujian",
          label: "组件",
          children: [
            {
              value: "basic",
              label: "Basic",
              children: [
                {
                  value: "layout",
                  label: "Layout 布局",
                },
                {
                  value: "color",
                  label: "Color 色彩",
                },
                {
                  value: "typography",
                  label: "Typography 字体",
                },
                {
                  value: "icon",
                  label: "Icon 图标",
                },
                {
                  value: "button",
                  label: "Button 按钮",
                },
              ],
            },
            {
              value: "form",
              label: "Form",
              children: [
                {
                  value: "radio",
                  label: "Radio 单选框",
                },
                {
                  value: "checkbox",
                  label: "Checkbox 多选框",
                },
                {
                  value: "input",
                  label: "Input 输入框",
                },
                {
                  value: "input-number",
                  label: "InputNumber 计数器",
                },
                {
                  value: "select",
                  label: "Select 选择器",
                },
                {
                  value: "cascader",
                  label: "Cascader 级联选择器",
                },
                {
                  value: "switch",
                  label: "Switch 开关",
                },
                {
                  value: "slider",
                  label: "Slider 滑块",
                },
                {
                  value: "time-picker",
                  label: "TimePicker 时间选择器",
                },
                {
                  value: "date-picker",
                  label: "DatePicker 日期选择器",
                },
                {
                  value: "datetime-picker",
                  label: "DateTimePicker 日期时间选择器",
                },
                {
                  value: "upload",
                  label: "Upload 上传",
                },
                {
                  value: "rate",
                  label: "Rate 评分",
                },
                {
                  value: "form",
                  label: "Form 表单",
                },
              ],
            },
            {
              value: "data",
              label: "Data",
              children: [
                {
                  value: "table",
                  label: "Table 表格",
                },
                {
                  value: "tag",
                  label: "Tag 标签",
                },
                {
                  value: "progress",
                  label: "Progress 进度条",
                },
                {
                  value: "tree",
                  label: "Tree 树形控件",
                },
                {
                  value: "pagination",
                  label: "Pagination 分页",
                },
                {
                  value: "badge",
                  label: "Badge 标记",
                },
              ],
            },
            {
              value: "notice",
              label: "Notice",
              children: [
                {
                  value: "alert",
                  label: "Alert 警告",
                },
                {
                  value: "loading",
                  label: "Loading 加载",
                },
                {
                  value: "message",
                  label: "Message 消息提示",
                },
                {
                  value: "message-box",
                  label: "MessageBox 弹框",
                },
                {
                  value: "notification",
                  label: "Notification 通知",
                },
              ],
            },
            {
              value: "navigation",
              label: "Navigation",
              children: [
                {
                  value: "menu",
                  label: "NavMenu 导航菜单",
                },
                {
                  value: "tabs",
                  label: "Tabs 标签页",
                },
                {
                  value: "breadcrumb",
                  label: "Breadcrumb 面包屑",
                },
                {
                  value: "dropdown",
                  label: "Dropdown 下拉菜单",
                },
                {
                  value: "steps",
                  label: "Steps 步骤条",
                },
              ],
            },
            {
              value: "others",
              label: "Others",
              children: [
                {
                  value: "dialog",
                  label: "Dialog 对话框",
                },
                {
                  value: "tooltip",
                  label: "Tooltip 文字提示",
                },
                {
                  value: "popover",
                  label: "Popover 弹出框",
                },
                {
                  value: "card",
                  label: "Card 卡片",
                },
                {
                  value: "carousel",
                  label: "Carousel 走马灯",
                },
                {
                  value: "collapse",
                  label: "Collapse 折叠面板",
                },
              ],
            },
          ],
        },
        {
          value: "ziyuan",
          label: "资源",
          children: [
            {
              value: "axure",
              label: "Axure Components",
            },
            {
              value: "sketch",
              label: "Sketch Templates",
            },
            {
              value: "jiaohu",
              label: "组件交互文档",
            },
          ],
        },
      ],
      kpi:[{kpi_name:'可再生资源td',ct1:'当日',value1:1980,dw1:'KW/h',ct2:'昨日',value2:1980,dw2:'KW/h',ct3:'同比',value3:15,dw3:'上升'},
           {kpi_name:'可再生资源mt',ct1:'当月',value1:1980,dw1:'KW/h',ct2:'上月',value2:1980,dw2:'KW/h',ct3:'同比',value3:15,dw3:'下降'},
            {kpi_name:'可再生资源yt',ct1:'当年',value1:1980,dw1:'KW/h',ct2:'上年',value2:1980,dw2:'KW/h',ct3:'同比',value3:15,dw3:'下降'},
            {kpi_name:'电td',ct1:'当日',value1:1980,dw1:'KW/h',ct2:'昨日',value2:1980,dw2:'KW/h',ct3:'同比',value3:15,dw3:'上升'},
           {kpi_name:'电mt',ct1:'当月',value1:1980,dw1:'KW/h',ct2:'上月',value2:1980,dw2:'KW/h',ct3:'同比',value3:15,dw3:'下降'},
            {kpi_name:'电yt',ct1:'当年',value1:1980,dw1:'KW/h',ct2:'上年',value2:1980,dw2:'KW/h',ct3:'同比',value3:15,dw3:'下降'},
            {kpi_name:'标准煤td',ct1:'当日',value1:1980,dw1:'KW/h',ct2:'昨日',value2:1980,dw2:'KW/h',ct3:'同比',value3:15,dw3:'上升'},
           {kpi_name:'标准煤mt',ct1:'当月',value1:1980,dw1:'KW/h',ct2:'上月',value2:1980,dw2:'KW/h',ct3:'同比',value3:15,dw3:'下降'},
            {kpi_name:'标准煤yt',ct1:'当年',value1:1980,dw1:'KW/h',ct2:'上年',value2:1980,dw2:'KW/h',ct3:'同比',value3:15,dw3:'下降'}
      ],
      bt_text: true,
      bt_select:[{
        title:'可再生资源',
        value:'可再生资源'
      },{
        title:'电',
        value:'电'
      },{
        title:'标准煤',
        value:'标准煤'
      }],
      bt_value:'标准煤',
      query: {
        sql: "",
      },
    };
  },
  methods: {
    drawLine1() {
      // 基于准备好的dom，初始化echarts实例
      let myChart1 = this.$echarts.init(
        document.getElementById("myChart1"),
        "wonderland"
      );
      // 绘制图表
      myChart1.setOption({
        title: {
          text: "当日逐时趋势",
          left: "center",
          top: "top",
          textStyle: {
            fontSize: 16,
            color: "#23A8F2",
          },
        },
        grid: {
          show: true,
          left: "6%",
          top: "25%",
          bottom: "12%",
          right: "10%",
        },
        xAxis: {
          type: "category",
          data: ["0时", "2时", "4时", "8时", "10时", "12时", "14时","16时","18时","20时","22时","24时"],
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
            }
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
          //设置网格线颜色
          splitLine: {
            show: true,
            lineStyle: {
              color: "#A6E1FC",
              width: 1,
              type: "solid",
            }
          },
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
            type: "line",
            name:'今日',
            symbol:'none',
            smooth: true,
            lineStyle:{
              color:'#49C6DA'
            }
          },
          {
            data: [840, 789, 931, 904, 1590, 1320, 1120,1409,1133,1654],
            name:'昨日',
            type: "line",
            symbol:'none',
            smooth: true,
            lineStyle:{
              color:'#36CF89'
            }
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
        title: {
          text: "当日逐时趋势",
          left: "center",
          top: "top",
          textStyle: {
            fontSize: 16,
            color: "#23A8F2",
          },
        },
        grid: {
          show: true,
          left: "6%",
          top: "25%",
          bottom: "12%",
          right: "2%"
        },
        xAxis: {
          type: "category",
          data: ["1日", "3日", "5日", "7日", "9日", "11时", "13日","15日","17日","19日","21日","23日","25日","27日","29日"],
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
            }
          }
        },
        yAxis: {
          type: "value",
          name:'单位：KW/h',
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
            }
          },
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
            formatter:"{a0}: {c0}<br />",     //提示框浮层内容格式器，支持字符串模板和回调函数两种形式,模板变量有 {a}, {b}，{c}，{d}，{e}，分别表示系列名，数据名，数据值等
            backgroundColor:"#3C3C3C",            //标题背景色
            borderColor:"#ccc",                        //边框颜色
            borderWidth:0,                              //边框线宽
            padding:5                                 //图例内边距，单位px  5  [5, 10]  [5,10,5,10]
        },
        series: [
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320,1109,1233],
            type: "line",
            name:'本月',
            symbol:'none',
            smooth: true,
            lineStyle:{
              color:'#C6B9EE'
            }
          },
          {
            data: [840, 789, 931, 904, 1590, 1320, 1120,1409,1133,1654],
            name:'上月',
            type: "line",
            symbol:'none',
            smooth: true,
            lineStyle:{
              color:'#18DAD1'
            }
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
          left: "10%",
          top: "25%",
          bottom: "15%",
          right: "6%",
        },
        xAxis: {
          type: "category",
          data: ["1日", "3日", "5日", "7日", "9日", "11时", "13日","15日","17日","19日","21日","23日","25日","27日","29日"],
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
            }
          }
        },
        yAxis: {
          type: "value",
          name:'单位：KW/h',
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
            }
          },
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
            name:'本月',
            barWidth :'60%',
            color:'#18DAD1'
          },
          {
            data: [840, 789, 931, 904, 1590, 1320, 1120,1409,1133,1654],
            name:'上月',
            type: "line",
            symbol:'none',
            smooth: true,
            lineStyle:{
              color:'#36CF89'
            }
          }
        ],
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
          show: false,
          left: "10%",
          top: "25%",
          bottom: "15%",
          right: "6%",
        },
        tooltip:{                                      //提示框组件
            trigger: 'item',                            //触发类型,'item'数据项图形触发，主要在散点图，饼图等无类目轴的图表中使用。 'axis'坐标轴触发，主要在柱状图，折线图等会使用类目轴的图表中使用。
            triggerOn:"mousemove",                      //提示框触发的条件,'mousemove'鼠标移动时触发。'click'鼠标点击时触发。'mousemove|click'同时鼠标移动和点击时触发。'none'不在 'mousemove' 或 'click' 时触发
            showContent:true,                           //是否显示提示框浮层
       //     alwaysShowContent:true,                     //是否永远显示提示框内容
            showDelay:0,                                  //浮层显示的延迟，单位为 ms
            hideDelay:100,                                //浮层隐藏的延迟，单位为 ms
            enterable:false,                             //鼠标是否可进入提示框浮层中
            confine:false,                               //是否将 tooltip 框限制在图表的区域内
            transitionDuration:0.4,                      //提示框浮层的移动动画过渡时间，单位是 s,设置为 0 的时候会紧跟着鼠标移动
     //       position:['10', '10'],                    //提示框浮层的位置，默认不设置时位置会跟随鼠标的位置,[10, 10],回掉函数，inside鼠标所在图形的内部中心位置，top、left、bottom、right鼠标所在图形上侧，左侧，下侧，右侧，
            formatter:"{a0}: {c0}<br />",     //提示框浮层内容格式器，支持字符串模板和回调函数两种形式,模板变量有 {a}, {b}，{c}，{d}，{e}，分别表示系列名，数据名，数据值等
            backgroundColor:"#3C3C3C",            //标题背景色
            borderColor:"#ccc",                        //边框颜色
            borderWidth:0,                              //边框线宽
            padding:5                                 //图例内边距，单位px  5  [5, 10]  [5,10,5,10]
        },
        color:['#6CDCA9','#C6B9EE','#95DEE9','#3EBCF8'],
        series: [
          {
            data: [820, 932, 901, 934],
            type: "pie",
            name:'本月',
          }
        ],
      });
    },
  },
  mounted() {
    this.drawLine1();
    this.drawLine2();
    this.drawLine3();
    this.drawLine4();
  },
};
</script>
<style scoped>
#main{
  height: 100%;
  width:100%;
  display: grid;
  grid-template-rows: 1fr 1fr;  
}
#container {
  color: black;
  display: grid;
  grid-template-columns: 30% 70%;
  height: 100%;
  width:100%;
}
#container > #top_left {
  height: 100%;
}
#container > #top_left > #top_left_title {
  height: 10%;
  background-color: #49c6da;
  margin: 5px 5px 0px 5px;
  padding: 10px 5px 10px 5px;
  border-radius: 2px;
  color: white;
}
#container > #top_left > #top_left_body {
  height: 90%;
  background-color: white;
  margin: 0px 5px 0px 5px;
  padding: 10px 5px 10px 5px;
  border-radius: 0px 0px 5px 5px;
  border-left: #dcdddd 1px solid;
  border-right: #dcdddd 1px solid;
  border-bottom: #dcdddd 1px solid;
  display: grid;
  align-content: start;
}
#container > #top_left > #top_left_body > .top_left_body_r1 {
  height: 35px;
  display: grid;
  grid-template-columns: 25% 75%;
}
#container
  > #top_left
  > #top_left_body
  > .top_left_body_r1
  > .top_left_body_r1col1 {
  margin: 8px;
}
.top_left_body_r1col2 > .el-cascader {
  width: 220px;
}
#container > #top_left > #top_left_body > .top_left_body_r2 {
  display: grid;
  height: 100%;
  grid-template-columns: 25% 25% 25% 25%;
}
#container
  > #top_left
  > #top_left_body
  > .top_left_body_r2
  > .top_left_body_r2col {
  margin: 1px auto;
}
.top_left_body_r2col > .r1 {
  text-align: center;
  font-size: 48px;
}
.top_left_body_r2col > .r2 {
  text-align: center;
  font-size: 16px;
  color: seagreen;
}
.top_left_body_r2col > .r3 {
  text-align: center;
}
#top_right {
  height: 100%;
}
#top_right > #top_right_title {
  height: 10%;
  background-color: #49c6da;
  margin: 5px 5px 0px 5px;
  padding: 10px 5px 10px 5px;
  border-radius: 2px;
  color: white;
}
#top_right > #top_right_body {
  height: 90%;
  background-color: white;
  margin: 0px 5px 0px 5px;
  padding: 10px 5px 10px 5px;
  border-radius: 0px 0px 5px 5px;
  border-left: #dcdddd 1px solid;
  border-right: #dcdddd 1px solid;
  border-bottom: #dcdddd 1px solid;
  display: grid;
  grid-template-columns: 15% 85%;
}
#top_right > #top_right_body > #brc1 {
  height: 95%;
  display: grid;
  align-content: space-between;
  grid-template-rows: 30% 30% 30%;  
}
#top_right_body > #brc1 > .tcell {
  height: 100%;
  background-color: #f2fbfb;
}
#top_right_body > #brc1 > .tcell > .brr1 {
  height: 75%;
  text-align: center;
  font-size: 30px;
}
.brr1 > span {
  font-size: 30px;
  color: #3ebcf8;
}
#top_right_body > #brc1 > .tcell > .brr2 {
  height: 25%;
  text-align: center;
  display: grid;
}

#top_right > #top_right_body > #brc2 {
  margin-left: 15px;
  display: grid;
  grid-template-columns: 33.33% 33.33% 33.33%;
  grid-template-rows: 33.33% 33.33% 33.33%;
}
#brc2 > .c2cell {
  width: 90%;
  height: 80%;
  border: 1px solid #49c6da;
  display: grid;
  grid-template-rows: 33.33% 33.33% 33.33%;
  font-size: 8px;
  padding: 3px 2px 1px 28px;
}
#bt {
  height: 100%;
  width: 100%;
  margin-top: 10px;
}
#bt > #bt_title {
  height: 14%;
  background-color: #49c6da;
  margin: 5px 5px 0px 5px;
  padding: 4px 5px 4px 5px;
  border-radius: 2px;
  color: white;
  display: grid;
  grid-template-columns: 70% 30%;
}
#bt > #bt_title > #bt_title_switch {
  display: grid;
  text-align: right;
  grid-template-columns: 1fr 1fr;
}

#bt > #bt_body {
  height: 86%;
  background-color: white;
  margin: 0px 5px 0px 5px;
  padding: 10px 5px 10px 5px;
  border-radius: 0px 0px 5px 5px;
  border-left: #dcdddd 1px solid;
  border-right: #dcdddd 1px solid;
  border-bottom: #dcdddd 1px solid;
}
#bt > #bt_body > .b_cl1 {
  display: grid;
  grid-template-columns: 1fr 1fr;  
  height: 99%;
}
#bt > #bt_body > .b_cl2{
  display: grid;
  grid-template-columns: 65% 30%;  
  height: 99%;
}
</style>