<template>
  <div id="container">
    <div id="left_part">
      <div>
        <el-input placeholder="输入关键字进行过滤" v-model="filterText"></el-input>
        <el-tree
          class="filter-tree"
          :data="mydata"
          :props="defaultProps"
          default-expand-all
          :filter-node-method="filterNode"
          node-key="id"
          ref="tree"
          @node-click="treeclick()"
        ></el-tree>
      </div>
    </div>
    <div id="right_part">
      <div>
        <el-button type="primary" @click="sqlclick()">查询</el-button>
        <el-button type="primary" @click="datasetvisible= true">保存</el-button>
        <el-button type="primary" @click="sqlclick()">删除</el-button>
        <el-button type="primary" @click="paramdialogVisible='true'">新建参数</el-button>
        <el-button type="primary" @click="sqlclick()">删除参数</el-button>
      </div>
      <div style="height:300px;width:100%;overflow:auto;background:#EEEEEE;">
        <el-input type="textarea" placeholder="请输入内容" v-model="mysqlstr" :autosize="{ minRows: 14}"></el-input>
      </div>
    </div>
    <!--设置保存与修改数据集-->
    <el-dialog title="提示" :visible.sync="datasetvisible" width="30%">
      <div>
        <span>数据集标题</span>
        <el-input v-model="dtitle"></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="datasetvisible= false">取 消</el-button>
        <el-button type="primary" @click="savesqlclick()">确 定</el-button>
      </span>
    </el-dialog>

    <!--查询sql语句的-->
    <el-dialog title="数据集查询结果" :visible.sync="sqldialogVisible" width="70%">
      <div>
          <div style="display:flex">
        <div v-for="el in this.currentsqlparam"
        :key="el.name">
        <div v-if="el.type == '字符串'">
          <div>{{el.name}}</div>
        <component :is="el.style"  v-model="el.defaultdisplayvalue[0][Object.keys(el.defaultdisplayvalue[0])[1]]"
        :key="el.defaultdisplayvalue[0][Object.keys(el.defaultdisplayvalue[0])[0]]"></component>
        </div>
        </div>
        <div><el-button type="primary" @click=excutesql1()>查询</el-button></div>
        </div>

        <el-table :data="tableData" height="300" border style="width: 100%">
          <el-table-column
            v-for="key in this.tabhead"
            :key="key.id"
            :prop="key.name"
            :label="key.name"
            width="180"
          ></el-table-column>
        </el-table>
      </div>
    </el-dialog>

    <el-dialog title="参数" :visible.sync="paramdialogVisible" width="70%">
      <div>
        <div>
          <span>参数名称</span>
          <el-input v-model="currentparam.name"></el-input>
        </div>
        <div>
          <span>参数类型</span>
          <el-select v-model="currentparam.type" placeholder="请选择">
            <el-option
              v-for="item in this.currentparam.type_option"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
        <div>
          <span>参数控件</span>
          <el-select v-model="currentparam.style" placeholder="请选择">
            <el-option
              v-for="item in this.currentparam.style_option"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
        <div>
          <span>备选项</span>
          <el-input
            type="textarea"
            placeholder="请输入内容"
            v-model="currentparam.defaultvalue"
            :autosize="{ minRows: 5}"
          ></el-input>
        </div>
        <div>
          <span>默认项</span>
          <el-input
            type="textarea"
            placeholder="请输入内容"
            v-model="currentparam.valuelist"
            :autosize="{ minRows: 5}"
          ></el-input>
          <span slot="footer" class="dialog-footer">
            <el-button @click="paramdialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="saveparamclick('add')">确 定</el-button>
          </span>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getalltable,getallparam,getalldataset,saveparam,savedataset,paramlist,
getparamlistfromsql,getparamdefaultvalue,getparamvaluelist,excutesql} from "@/js/dataset";
import { sqlquery, insertsql } from "@/api/sql";
export default {
  data() {
    return {
      activeName: "1",
      parlist: [],
      currentparam: {
        name: "参数1",
        type: "字符串",
        style:'下拉框',
        type_option: [
          {
            value: "选项1",
            label: "字符串"
          },
          {
            value: "选项2",
            label: "日期"
          },
          {
            value: "选项3",
            label: "数字"
          }
        ],
        style_option: [
          {
            value: "选项1",
            label: "文本框"
          },
          {
            value: "选项2",
            label: "下拉框"
          },
          {
            value: "选项3",
            label: "日期控件"
          }
        ],
        defaultvalue: "15",
        valuelist: "select distinct dept_id from sys_dept"
      },
      //当前数据集的参数列表
      currentsqlparam: [
          {name:'字符串',
           type:'字符串',
           style:'文本框',
           defaultvalue:"我的选项",
           valuelist:'出来吧',
           defaultdisplayvalue:[{}],
          }
      ],
      alltable: [],
      tableData: [],
      tabhead: [],
      dtitle: "数据集1",       //当前数据集名称，以及树状控件中对应的label,以及文本框
      filterText: "",
      mysqlstr: "",     //当前数据集的sql语句，以及sql语句输入文本框的内容
      datasetvisible: false,
      sqldialogVisible: false,
      paramdialogVisible: false,
      mydata: [
        {
          id: 1,
          label: "数据库表",
          children: []
        },
        {
          id: 2,
          label: "参数",
          children: []
        },
        {
          id: 3,
          label: "数据集",
          children: []
        }
      ],
      defaultProps: {
        children: "children",
        label: "label"
      }
    };
  },
  mounted() {
      //获取数据库所有表名及视图名,参数，数据集
    getalltable(this.mydata[0].children);
    getallparam(this.mydata[1].children);
    getalldataset(this.mydata[2].children);
   

  },
  methods: {
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },

    /**
     * 方法：treeclick
     * 描述：点击树状控件事件
     * 1、如果点击的数据集时，设置当前的数据集sql【mysqlstr】，以及数据集的标题【dtitle】
     *2、 如果点击的参数，设置当前的参数，并弹出参数设置框
     *3、如果点击的是数据库表，设置当前的数据集的sql【mysqlstr】
     */
    treeclick(node, data, value) {
     
     if(this.$refs.tree.getCurrentNode().leixin == "数据集"){
      this.mysqlstr = this.$refs.tree.getCurrentNode().con;
      this.dtitle = this.$refs.tree.getCurrentNode().label;
     }
     else if (this.$refs.tree.getCurrentNode().leixin == "参数") {
        this.currentparam.name = this.$refs.tree.getCurrentNode().label;
        this.currentparam.type = this.$refs.tree.getCurrentNode().type;
        this.currentparam.style = this.$refs.tree.getCurrentNode().style;
        this.currentparam.defaultvalue = this.$refs.tree.getCurrentNode().defaultvalue;
        this.currentparam.valuelist = this.$refs.tree.getCurrentNode().valuelist;
        this.paramdialogVisible = true;
      }
      else{
          this.mysqlstr ="select * from " + this.$refs.tree.getCurrentNode().label;
           this.dtitle='';
      }
    },
    /**
     * 方法：saveparamclick
     * 描述：新增或保存参数
     * 说明 ：当参数传递为'add'时，代表是执行新增操作
     */
    saveparamclick(str){
        if(str=='add'){
        saveparam(this.currentparam,this.paramdialogVisible,this.mydata[1].children);
        }
        else{

        }
    },
     /**
     * 方法：savesqlclick
     * 描述：新增或保存数据集
     * 说明 ：如果数据集存在，则执行更新操作，如果不存在，新增；
     */
     savesqlclick(){
        savedataset(this.dtitle,this.mydata[2].children,this.mysqlstr)
         this.datasetvisible=false;
     },
    /**
     * 
     */
    sqlclick() {
        var sql=this.mysqlstr
        var list=[],
      list=getparamlistfromsql(sql);
      this.currentsqlparam=list

      this.sqldialogVisible=true;
    },
    /**
     * 方法：excutesql
     * 描述：执行数据集弹出参数后的查询按钮 
     */
    excutesql1(){
      var sql=excutesql(this.mysqlstr,this.currentsqlparam)
      this.getsql(sql);
    },
    getsql(sqlstr) {
      this.loading = true;
      const params = new URLSearchParams();
      params.append("sql", sqlstr);
      sqlquery(params).then(response => {
        this.tableData = response.data.data;
        var j = 0;
        this.tabhead = [];
        for (var i in this.tableData[0]) {
          this.tabhead.push({ id: j, name: i });
          j++;
        }
        this.loading = false;
      });
    }
  },


  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    }
  }
};
</script>
<style scoped>
#container {
  display: flex;
}
#left_part {
  width: 20%;
  height: 100%;
}
#right_part {
  width: 80%;
}
</style>