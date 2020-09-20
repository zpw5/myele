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
    <div id="item6">起始日期：</div>
    <div id="item7">
      <el-date-picker v-model="value1" type="datetime" placeholder="选择日期" size="mini"></el-date-picker>
    </div>
    <div id='item61'><el-button size='mini' type="primary"><span class='iconfont icon-nian'></span>&nbsp;年</el-button></div>
    <div id='item71'><el-button size='mini' type="success"><span class='iconfont icon-yue'></span>&nbsp;月</el-button></div>
      <div id='item81'><el-button size='mini' type="info"><span class='iconfont icon-ri'></span>&nbsp;日</el-button></div>
    <div id="item8"></div>
    <div id="item9"></div>
    <div id="item10">
      <el-input size="mini" v-model="input" placeholder="请输入关键字进行过滤"></el-input>
    </div>
    <div id="item11">
      <el-tree
        class="filter-tree"
        :data="data"
        :props="defaultProps"
        default-expand-all
        :filter-node-method="filterNode"
        show-checkbox
        ref="tree"
      ></el-tree>
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
      defaultProps: {
        children: "children",
        label: "label",
      },
      filterText: "",
      data: [
        {
          id: 1,
          label: "一级 1",
          children: [
            {
              id: 4,
              label: "二级 1-1",
              children: [
                {
                  id: 9,
                  label: "三级 1-1-1",
                },
                {
                  id: 10,
                  label: "三级 1-1-2",
                },
              ],
            },
          ],
        },
        {
          id: 2,
          label: "一级 2",
          children: [
            {
              id: 5,
              label: "二级 2-1",
            },
            {
              id: 6,
              label: "二级 2-2",
            },
          ],
        },
        {
          id: 3,
          label: "一级 3",
          children: [
            {
              id: 7,
              label: "二级 3-1",
            },
            {
              id: 8,
              label: "二级 3-2",
            },
          ],
        },
      ],
    };
  },
  mounted() {

  },
  created() {},
  methods: {
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
  grid-column: 13/28;
}
#item4 {
  grid-row: 4/8;
  grid-column: 29/37;
  color: black;
}
#item5 {
  grid-row: 3/8;
  grid-column: 37/48;
}
#item6 {
  grid-row: 4/8;
  grid-column: 49/58;
  color: black;
}
#item7 {
  grid-row: 3/8;
  grid-column: 55/66;
}
#item61 {
  grid-row: 3/9;
  grid-column: 75/87;
}
#item71 {
  grid-row: 3/9;
  grid-column: 83/90;
}
#item81 {
  grid-row: 3/9;
  grid-column: 91/100;
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
  grid-row: 20/100;
  grid-column: 2/24;
}

#item13 {
  grid-row: 15/98;
  grid-column: 28/100;
}
</style>
