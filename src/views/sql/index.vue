<template>

  <div class="app-container">
    <!-- 查询和其他操作 -->
    <div class="filter-container" style="margin: 10px 0 10px 0;">
                <el-input
                type="textarea"
                :rows="2"
                placeholder="请输入内容"
                v-model="query.sql">
                </el-input>
      
        <el-button type="primary" @click="roleList">查询</el-button>
    
    <div id="myChart" :style="{width: '300px', height: '300px'}"></div>
    </div>
    
  </div>


</template>

<script>
import { getRoleList, addRole, updateRole, deleteRole, findRoleMenus } from '@/api/roles'
import {sqlquery} from '@/api/sql'
import { getMenus } from '@/api/menu'
import { parseTime } from '@/utils/index'
import { getDeptTree } from '@/api/dept'
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'

export default {
  components: {
    Treeselect
  },
  data() {
    return {
     
      query: {
        sql: ''
      }
    }
      
  },
  mounted(){
    this.drawLine();
  },
  created() {
      
 
  },
  methods: {
    parseTime,
    // 获取角色
    roleList: function() {
      this.loading = true
      const params = new URLSearchParams()
      params.append('sql', this.query.sql)
      console.log(params)
      sqlquery(params).then(response => {
        console.log(response.data.data)
        this.loading = false
      })
    },
    drawLine(){
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('myChart'))
        // 绘制图表
        myChart.setOption({
            title: { text: '在Vue中使用echarts' },
            tooltip: {},
            xAxis: {
                data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
            }]
        });
    }


  }
}
</script>
