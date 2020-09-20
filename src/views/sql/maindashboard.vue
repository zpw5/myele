<template>
  <div class="app-main">
    <div id="z-header">
      <div id="h-item1">建筑名称：</div>
      <div id="h-item2">
        <el-select></el-select>
      </div>
      <div id="h-item3">日期：</div>
      <div id="h-item4">
        <el-date-picker
          v-model="value1"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </div>
            <div id="h-item5">
        <el-button type="goon">
            <span class="el-icon-refresh-left">查询</span></el-button>
      </div>
    </div>
    <div id="z-content1">
        <div id="t1-item1">
         <div id="myChart1" :style="{width: '100%', height: '100%'}"></div>
        </div>
    </div>
  </div>
</template>

<script>
import { sqlquery } from "@/api/sql";
import { parseTime } from "@/utils/index";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";

export default {
  data() {
    return {};
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

    series: {
        type: 'sankey',
        layout: 'none',
        focusNodeAdjacency: 'allEdges',
        data: [{
            name: 'a'
        }, {
            name: 'b'
        }, {
            name: 'a1'
        }, {
            name: 'a2'
        }, {
            name: 'b1'
        }, {
            name: 'c'
        }],
        links: [{
            source: 'a',
            target: 'a1',
            value: 5
        }, {
            source: 'a',
            target: 'a2',
            value: 3
        }, {
            source: 'b',
            target: 'b1',
            value: 8
        }, {
            source: 'a',
            target: 'b1',
            value: 3
        }, {
            source: 'b1',
            target: 'a1',
            value: 1
        }, {
            source: 'b1',
            target: 'c',
            value: 2
        }]
    }
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
  grid-template-rows: 65px auto;
}
#z-header {
  border: 1px solid #dcdcdc;
  background-color: white;
  margin: 2px 2px 2px 2px;
  border-radius: 2px;
  display: grid;
  grid-template-columns: repeat(48, 1fr);
  grid-template-rows: repeat(10, 1fr);
  color: #333333;
}
#h-item1 {
  grid-column: 2/5;
  grid-row: 4/7;
}
#h-item2 {
  grid-column: 6/14;
  grid-row: 3/7;
}
#h-item3 {
  grid-column: 15/17;
  grid-row: 4/7;
}
#h-item4{
    grid-column: 18/34;
  grid-row: 3/7;  
}
#h-item5{
    grid-column: 45/48;
  grid-row: 3/7;  
}

#z-content1 {
  border: 1px solid #dcdcdc;
  background-color: white;
  margin: 2px 2px 2px 2px;
  border-radius: 2px;
  display: grid;
  grid-template-columns: repeat(48, 1fr);
  grid-template-rows: repeat(12, 1fr);
}
#t1-item1 {
  grid-column: 2/48;
  grid-row: 2/12;
}
.el-button--goon.is-active,
.el-button--goon:active {
  background: #49C6DA;
  border-color: #49C6DA;
  color: #fff;
}

.el-button--goon:focus,
.el-button--goon:hover {
  background: #48D1CC;
  border-color: #48D1CC;
  color: #fff;
}

.el-button--goon {
  color: #FFF;
  background-color: #49C6DA;
  border-color: #49C6DA;
}
</style>

