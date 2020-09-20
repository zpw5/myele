<template>
  <div class="app-main">
    <!-- 查询和其他操作 -->
    <div id="top">
      <div id="top_item1">
        <div id="top_item_t1">过滤条件</div>
        <div id="top_item_t2">建筑名称：</div>
        <div id="top_item_t3">
          <el-select size="mini" v-model="org_value" @change="org_change">
            <el-option
              v-for="item in org_list"
              :key="item.org_id"
              :label="item.org_name"
              :value="item.org_id"
            ></el-option>
          </el-select>
        </div>
        <div id="top_item_t4">分类能耗：</div>
        <div id="top_item_t5">
          <el-select size="mini" v-model="agg_type_value" @change="agg_type_change">
            <el-option
              v-for="item in agg_type_list"
              :key="item.type_id"
              :label="item.type_name"
              :value="item.type_id"
            ></el-option>
          </el-select>
        </div>
        <div id="top_item_t6">支路选择：</div>
        <div id="top_item_t7">
          <el-select size="mini" v-model="currentdept" @change="agg_type_change">
            <el-option
              v-for="item in dept_list"
              :key="item.id"
              :label="item.label"
              :value="item.id"
            ></el-option>
          </el-select>
        </div>
      </div>
      <div id="top_item2">
        <div id="top_item2_t1">环比(单位：kW·h )</div>
        <div id="top_item2_t2">
          <span class="iconfont icon-dangyuebaofei" style="color:#59C922;font-size:26px"></span>
        </div>
        <div id="top_item2_t3">
          <span class="iconfont icon-lishi" style="color:#4D93FF;font-size:22px"></span>
        </div>
        <div id="top_item2_t4">
          <span class="iconfont icon-trend" style="color:#FFA039;font-size:22px"></span>
        </div>
        <div id="top_item2_t5">
          <span class="iconfont icon-ziyuan" style="color:#FD5248;font-size:26px"></span>
        </div>
        <div id="top_item2_t6">
          <span class="iconfont icon-shuju5" style="color:#01ADA8;font-size:26px"></span>
        </div>
        <div id="top_item2_t7">
          <span class="iconfont icon-qushi" style="color:#4D93FF;font-size:26px"></span>
        </div>
        <div id="top_item2_t8">当日用能</div>
        <div id="top_item2_t9">15.98</div>
        <div id="top_item2_t10">昨日同期</div>
        <div id="top_item2_t11">17.98</div>
        <div id="top_item2_t12">趋势</div>
        <div id="top_item2_t13">
          17.40%
          <span class="el-icon-caret-bottom" style="font-size:8px;color:green"></span>
        </div>
        <div id="top_item2_t14">当月用能</div>
        <div id="top_item2_t15">-17.98</div>
        <div id="top_item2_t16">当月用能</div>
        <div id="top_item2_t17">-17.98</div>
        <div id="top_item2_t18">趋势</div>
        <div id="top_item2_t19">
          -17.98%
          <span class="el-icon-caret-top" style="font-size:8px;color:red"></span>
        </div>
      </div>
      <div id="top_item3">
        <div id="top_item3_t1">日平均负荷曲线</div>
        <div id="top_item3_t2">
          <div id="myChart1" :style="{width: '100%', height: '98%'}"></div>
        </div>
      </div>
    </div>
    <div id="bottom">
      <div id="bottom_item1">历史趋势</div>
      <div id="bottom_item2">
        <el-select size="mini"></el-select>
      </div>
      <div id="bottom_item3">
        <div id="myChart2" :style="{width: '100%', height: '98%'}"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { sqlquery } from "@/api/sql";
import { vvt } from "@/js/chart_json";
import {
  jsontoarray,
  jsontfilter,
  pieseries,
  getcol,
  tosqlin,
  strin,
} from "@/js/sql_echart";
import { getUserInfo } from "@/api/user";

export default {
  data() {
    return {
      //建筑名称下拉框
      org_list: [],
      org_value: null,
      currentdept:null,
      dept_list:[],
      //分类能耗下拉框
      agg_type_list: [
        { type_id: "电", type_name: "电" },
        { type_id: "水", type_name: "水" },
        { type_id: "可再生能源", type_name: "可再生能源" },
      ],
      agg_type_value: "电",
    };
  },
  mounted() {
    getUserInfo().then((res) => {
      this.CurrentUser = res.data.data;
       this.get_org();
      //  this.drawLine2();
      this.drawLine1();
      this.drawLine2();
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
        console.log(sql1)
      const params1 = new URLSearchParams();
      params1.append("sql", sql1);
      sqlquery(params1).then((res) => {
        console.log('...................')
        console.log(res.data.data)
        this.dept_list = res.data.data;
      });
    },
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
            type: "line",
            name: "今日",
            symbol: "none",
            smooth: true,
            lineStyle: {
              color: "#49C6DA",
            },
          },
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
          top: "8%",
          bottom: "18%",
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
            name: "今日",
            barWidth: "40%",
            color: "#23A8F2",
          },
        ],
      });
    },
  },
};
</script>
<style scoped>
.app-main {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: 390px 1fr;
}
#top {
  display: grid;
  grid-template-rows: repeat(12, 1fr);
  grid-template-columns: repeat(48, 1fr);
}
#top_item1 {
  border: 1px solid grey;
  background-color: white;
  border-radius: 3px;
  margin: 2px 2px 2px 2px;
  grid-row: 1/7;
  grid-column: 1/15;
  display: grid;
  grid-template-columns: repeat(24, 1fr);
  grid-template-rows: repeat(16, 1fr);
}
#top_item_t1 {
  grid-row: 1/4;
  grid-column: 1/25;
  background-color: #49c6da;
  color: white;
  border: 1px solid #49c6da;
  border-radius: 2px;
  padding: 5px 0px 0px 5px;
}
#top_item_t2 {
  grid-row: 5/8;
  grid-column: 2/8;
  color: grey;
  padding: 5px 0px 0px 0px;
}
#top_item_t3 {
  grid-row: 5/9;
  grid-column: 8/24;
}
#top_item_t4 {
  grid-row: 9/12;
  grid-column: 2/8;
  color: grey;
  padding: 5px 0px 0px 0px;
}
#top_item_t5 {
  grid-row: 9/13;
  grid-column: 8/24;
}
#top_item_t6 {
  grid-row: 13/15;
  grid-column: 2/8;
  color: grey;
  padding: 5px 0px 0px 0px;
}
#top_item_t7 {
  grid-row: 13/16;
  grid-column: 8/24;
}
#top_item2 {
  border: 1px solid grey;
  background-color: white;
  border-radius: 3px;
  margin: 2px 2px 2px 2px;
  grid-row: 7/13;
  grid-column: 1/15;
  display: grid;
  grid-template-columns: repeat(24, 1fr);
  grid-template-rows: repeat(16, 1fr);
}
#top_item2_t1 {
  grid-row: 1/4;
  grid-column: 1/25;
  background-color: #49c6da;
  color: white;
  border: 1px solid #49c6da;
  border-radius: 2px;
  padding: 5px 0px 0px 5px;
}
#top_item2_t2 {
  grid-row: 5/8;
  grid-column: 4/7;
}
#top_item2_t3 {
  grid-row: 5/8;
  grid-column: 12/15;
}
#top_item2_t4 {
  grid-row: 5/8;
  grid-column: 19/22;
}
#top_item2_t5 {
  grid-row: 11/14;
  grid-column: 4/7;
}
#top_item2_t6 {
  grid-row: 11/14;
  grid-column: 12/15;
}
#top_item2_t7 {
  grid-row: 11/14;
  grid-column: 19/24;
}
#top_item2_t8 {
  grid-row: 8/11;
  grid-column: 3/10;
  color: #49c6da;
  font-family: "黑体";
  font-size: 6px;
}
#top_item2_t9 {
  grid-row: 9/12;
  grid-column: 3/10;
  color: black;
  font-family: "黑体";
  font-size: 8px bold;
}
#top_item2_t10 {
  grid-row: 8/11;
  grid-column: 11/15;
  color: #49c6da;
  font-family: "黑体";
  font-size: 6px;
}
#top_item2_t11 {
  grid-row: 9/12;
  grid-column: 11/15;
  color: black;
  font-family: "黑体";
  font-size: 8px bold;
}
#top_item2_t12 {
  grid-row: 8/11;
  grid-column: 19/24;
  color: #49c6da;
  font-family: "黑体";
  font-size: 6px;
}
#top_item2_t13 {
  grid-row: 9/12;
  grid-column: 19/24;
  color: black;
  font-family: "黑体";
  font-size: 8px bold;
}
#top_item2_t14 {
  grid-row: 14/16;
  grid-column: 3/10;
  color: #49c6da;
  font-family: "黑体";
  font-size: 6px;
}
#top_item2_t15 {
  grid-row: 15/17;
  grid-column: 3/10;
  color: black;
  font-family: "黑体";
  font-size: 8px bold;
}
#top_item2_t16 {
  grid-row: 14/16;
  grid-column: 11/15;
  color: #49c6da;
  font-family: "黑体";
  font-size: 6px;
}
#top_item2_t17 {
  grid-row: 15/17;
  grid-column: 11/15;
  color: black;
  font-family: "黑体";
  font-size: 8px bold;
}
#top_item2_t18 {
  grid-row: 14/16;
  grid-column: 19/24;
  color: #49c6da;
  font-family: "黑体";
  font-size: 6px;
}
#top_item2_t19 {
  grid-row: 15/17;
  grid-column: 18/24;
  color: black;
  font-family: "黑体";
  font-size: 8px bold;
}
#top_item3 {
  border: 1px solid grey;
  background-color: white;
  border-radius: 3px;
  margin: 2px 2px 2px 2px;
  grid-row: 1/13;
  grid-column: 15/49;
  display: grid;
  grid-auto-rows: 9% 1fr;
}
#top_item3_t1 {
  color: white;
  padding: 8px 0px 0px 5px;
  background-color: #49c6da;
}
#top_item3_t2 {
  padding: 8px 0px 0px 5px;
}
#bottom {
  border: 1px solid grey;
  background-color: white;
  border-radius: 3px;
  margin: 2px 2px 2px 2px;
  display: grid;
  grid-template-rows: 18% 1fr;
  grid-template-columns: repeat(48, 1fr);
}
#bottom_item1 {
  color: white;
  padding: 8px 0px 0px 5px;
  background-color: #49c6da;
  grid-column: 1/49;
  grid-row: 1/2;
}
#bottom_item2 {
  grid-column: 40/49;
  grid-row: 1/2;
  margin: 2px 3px 0px 0px;
  text-align: right;
}
#bottom_item3 {
  padding: 8px 0px 0px 5px;
  margin: 8px 8px 8px 8px;
  grid-column: 1/49;
  grid-row: 2/3;
}
</style>

