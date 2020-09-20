<template>
  <div class="app-main">
    <div id="item1"></div>
    <div id="item2">建筑面积：</div>
    <div id="item3">
      <el-select size="mini"></el-select>
    </div>
    <div id="item4">分类能耗：</div>
    <div id="item5">
      <el-select size="mini"></el-select>
    </div>
    <div id="item6">年份：</div>
    <div id="item7">
      <el-date-picker v-model="value1" type="year" placeholder="选择日期" size="mini"></el-date-picker>
    </div>
    <div id="item8"></div>
    <div id="item9"></div>
    <div id="item10">
      <el-input size="mini" v-model="input" placeholder="请输入关键字进行过滤"></el-input>
    </div>
    <div id="item11">
      <el-checkbox-group v-model="checkList" style="display:block;">
        <el-checkbox label="照片插座"></el-checkbox>
        <el-checkbox label="空调用电"></el-checkbox>
        <el-checkbox label="动力"></el-checkbox>
        <el-checkbox label="生产"></el-checkbox>
        <el-checkbox label="特殊用电"></el-checkbox>
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
        <el-table-column prop="date" label="月份" width="250"></el-table-column>
        <el-table-column prop="name" label="2020年用电量" width="250"></el-table-column>
        <el-table-column prop="name" label="2019年用电量" width="250"></el-table-column>
        <el-table-column prop="address" label="同比"></el-table-column>
      </el-table>
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
      checkList: ['选中且禁用','复选框 A'],
    };
  },
  mounted() {
    this.drawLine1();
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
  grid-row: 17/100;
  grid-column: 2/10;
  margin:0px 0px 0px 25px;
}
#item12 {
  grid-row: 15/60;
  grid-column: 28/100;
}
#item13 {
  grid-row: 61/98;
  grid-column: 28/100;
}
</style>

