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
    <div id="item4">日期：</div>
    <div id="item5">
      <el-date-picker v-model="y_m_d_value" :type="y_m_d" placeholder="选择日期" size="mini" @change="y_m_d_change">
      </el-date-picker>
    </div>
    <div id="item6">
      <el-button type="goon" plain size="mini" @click="bt1_click">
        <span class="iconfont icon-nian">&nbsp;&nbsp;&nbsp;&nbsp;年</span>
      </el-button>
    </div>
    <div id="item7">
      <el-button type="goon" plain size="mini" @click="bt2_click">
        <span class="iconfont icon-yue">&nbsp;&nbsp;&nbsp;&nbsp;月</span>
      </el-button>
    </div>
    <div id="item8">
      <el-button type="goon" plain size="mini" @click="bt3_click">
        <span class="iconfont icon-ri">&nbsp;&nbsp;&nbsp;&nbsp;日</span>
      </el-button>
    </div>
    <div id="item9"></div>
    <div id="item10">
      <el-input placeholder="输入关键字进行过滤" v-model="filterText" size="mini"></el-input>
    </div>
    <div id="item11">
      <el-tree
        class="filter-tree"
        :data="partoptions"
        show-checkbox
        node-key="id"
        :props="defaultProps"
        :default-checked-keys="defaultkeys"
        default-expand-all
        :filter-node-method="filterNode"
        ref="tree"
        @click="tree_click"
      ></el-tree>
    </div>
    <div id="item12"></div>
    <div id="item13">
          <el-table :data="tableData" height="100%" style="width: 100%"
           :header-cell-style="{background:'#49C6DA',height:'15px',color:'white'}">
            <el-table-column prop="name" label="回路名称" width="220"></el-table-column>
            <el-table-column label="尖">
              <el-table-column prop="j_dianliang" label="电量" width="80"></el-table-column>
              <el-table-column prop="j_dianfei" label="电费" width="80"></el-table-column>
              </el-table-column>
            <el-table-column label="峰">
              <el-table-column prop="f_dianliang" label="电量" width="80"></el-table-column>
              <el-table-column prop="f_dianfei" label="电费" width="80"></el-table-column>
              </el-table-column>
            <el-table-column label="平">
              <el-table-column prop="p_dianliang" label="电量" width="80"></el-table-column>
              <el-table-column prop="p_dianfei" label="电费" width="80"></el-table-column>
              </el-table-column>
            <el-table-column label="谷">
              <el-table-column prop="g_dianliang" label="电量" width="80"></el-table-column>
              <el-table-column prop="g_dianfei" label="电费" width="80"></el-table-column>
              </el-table-column>
            <el-table-column label="合计">
              <el-table-column prop="h_dianliang" label="电量" width="80"></el-table-column>
              <el-table-column prop="h_dianfei" label="电费" width="80"></el-table-column>
              </el-table-column>
          </el-table>
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
import { getUserInfo } from "@/api/user";
export default {
  components: {},
  data() {
    return {
      //建筑名称下拉框
      org_list: [],
      org_value: null,
      y_m_d: "month",
      y_m_d_value: "2020-09-01",
      filterText: "",
      defaultkeys:[0],
      partoptions: [
        {
          id: 0,
          label: "全部",
          children: [
          ],
        },
      ],
      defaultProps: {
        children: "children",
        label: "label",
      },
      tableData: [
      ],
    };
  },
  mounted() {
    getUserInfo().then((res) => {
      this.CurrentUser = res.data.data;
      this.get_org();
    });

  },
  created() {},
  methods: {
        //获取建筑名称下拉框内容,并调用 org_change（）方法
    get_org() {
      var sql =
        "select distinct org_id,org_name from user_org_dept where user_id=" +
        this.CurrentUser.userId + ' and org_type=1'
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
    //为线路赋值
    get_dept() {
      var sql1 =
        "select distinct dept_id as id,dept_name as label from user_org_dept where user_id=" +
        this.CurrentUser.userId + ' and org_type=2'  +
        " and org_id=" +
        this.org_value +
        " order by dept_id Asc";
      const params1 = new URLSearchParams();
      params1.append("sql", sql1);
      sqlquery(params1).then((res) => {
        this.partoptions[0].children = [];
        this.partoptions[0].children = res.data.data;
        this.load_table();
      });
    },
    //建筑名称change()事件
    org_change(){
      this.get_dept();
    },
    //时间控件点击事件
    y_m_d_change(){
     this.load_table();
    },
    //树形点击事件
    tree_click(){
     this.load_table();
    },
 bt1_click() {
      this.y_m_d = "year";
      var myDate = new Date();
      this.y_m_d_value = myDate.getFullYear().toString();
      this.y_m_d_val=this.y_m_d_value;
     this.load_table();
    },
    bt2_click() {
      this.y_m_d = "month";
      var myDate = new Date();
      var tYear = myDate.getFullYear();
      var tMonth = myDate.getMonth();
      var m = tMonth + 1;
      if (m.toString().length == 1) {
        m = "0" + m;
      }
      this.y_m_d_value = tYear + "-" + m;
     this.load_table();
    },
    bt3_click() {
      this.y_m_d = "date";
      var myDate = new Date();
      this.y_m_d_value = myDate.toString();
     this.load_table();
    },
    load_table() {
      var nodechecked = this.$refs.tree.getCheckedKeys();
      var y_m_d_val=this.y_m_d_value.toString()
      if(this.y_m_d == "date"){
        y_m_d_val=this.d_Date(this.y_m_d_value)
      }
      if(this.y_m_d == "month"){
        y_m_d_val=this.m_Date(this.y_m_d_value)
      }
      if(this.y_m_d == "year"){
        y_m_d_val=this.y_Date(this.y_m_d_value)
      }
      
      var sql="select series_id as name," + 
               "sum(case kpi_name when '尖电量' then  round(t_value,2) else 0 end ) as j_dianliang," +
               "sum(case kpi_name when '尖电费' then  round(t_value,2) else 0 end ) as j_dianfei," +
               "sum(case kpi_name when '峰电量' then  round(t_value,2) else 0 end ) as f_dianliang," +
               "sum(case kpi_name when '峰电费' then  round(t_value,2) else 0 end ) as f_dianfei," +
               "sum(case kpi_name when '平电量' then  round(t_value,2) else 0 end ) as p_dianliang," +
               "sum(case kpi_name when '平电费' then  round(t_value,2) else 0 end ) as p_dianfei," +
               "sum(case kpi_name when '谷电量' then  round(t_value,2) else 0 end ) as g_dianliang," +
               "sum(case kpi_name when '谷电费' then  round(t_value,2) else 0 end ) as g_dianfei," +
               "sum(case kpi_name when '合计电量' then  round(t_value,2) else 0 end ) as h_dianliang," +
               "sum(case kpi_name when '合计电费' then  round(t_value,2) else 0 end ) as j_dianfei from (" 
      if (tosqlin(nodechecked) == "0") {
         sql =sql + "select series_id,kpi_name,t_value from vvt_data where dept_id in (" +
          tosqlin(getcol(this.partoptions[0].children, "id")) +
          ") and  search_option='" + y_m_d_val + 
          "' and element_id='profit'";
      } else {
        sql =sql + "select series_id,kpi_name,t_value from vvt_data where " +
          "dept_id in (" + tosqlin(nodechecked) +
          ") and  search_option='" + y_m_d_val +
          "' and element_id='profit'";
      }
      sql=sql + ") B group by series_id"
      const params1 = new URLSearchParams();
      params1.append("sql", sql);
      sqlquery(params1).then((response) => {
        this.tableData = response.data.data;
      });
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
d_Date(date) {
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();
 
  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;
 
  return [year, month, day].join('-');
},
y_Date(date) {
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();
 
  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;
 
  return year;
},
m_Date(date) {
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();
 
  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;
 
  return [year, month].join('-');
},
    
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
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
  grid-column: 11/36;
}
#item4 {
  grid-row: 4/8;
  grid-column: 30/39;
  color: black;
}
#item5 {
  grid-row: 3/8;
  grid-column: 35/58;
}
#item6 {
  grid-row: 3/9;
  grid-column: 55/65;
}
#item7 {
  grid-row: 3/9;
  grid-column: 66/76;
}
#item8 {
  grid-row: 3/9;
  grid-column: 77/87;
}
#item9 {
  grid-row: 10/101;
  grid-column: 1/26;
  background-color: white;
  color: darkgray;
  border: darkgray 1px solid;
  border-radius: 3px;
  margin: 1px 1px 0px 1px;
}
#item10 {
  grid-row: 11/20;
  grid-column: 2/24;
}
#item11 {
  grid-row: 17/100;
  grid-column: 2/24;
}
#item12 {
  grid-row: 10/101;
  grid-column: 26/101;
  background-color: white;
  color: darkgray;
  border: darkgray 1px solid;
  border-radius: 3px;
  margin: 1px 1px 0px 1px;
}
#item13 {
  grid-row: 12/100;
  grid-column: 27/100;
}

.el-button--goon.is-active,
.el-button--goon:active {
  background: #49c6da;
  border-color: #49c6da;
  color: #fff;
}

.el-button--goon:focus,
.el-button--goon:hover {
  background: #48d1cc;
  border-color: #48d1cc;
  color: #fff;
}

.el-button--goon {
  color: #fff;
  background-color: #49c6da;
  border-color: #49c6da;
}
</style>

