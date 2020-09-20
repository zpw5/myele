<template>

  <div class="app-container" style="padding:0px 0px 0px 0px">
    <!-- 查询和其他操作 -->

    <div class="filter-container" style="margin:0px 0px 0px 0px; padding:0px 0px 0px 0px"> 
        <el-row>
            <el-col :span=8>
                <el-row style="border-style:solid; border-width:2px;border-color:#F3F3F3">
                    <el-col :span="1" style="height:36px;margin:0px 6px 0px 2px;">
                    <el-col :span="10" style="height:36px;background:#61A0A8;"><div><span>&nbsp;</span></div></el-col>
                    <el-col :span="14"><span>&nbsp;</span></el-col>
                    </el-col>
                    <el-col :span="22">
                    <div style="font-family:微软雅黑;color:#2F4554;font-size:14px;font-weight:bold">项目成本情况</div>
                    </el-col>
                </el-row>
                <el-row style="border-style:solid; border-width:2px;border-color:#F3F3F3"><div id="myChart0" :style="{width: '100%', height: '160px'}"></div></el-row>
                <el-row style="border-style:solid; border-width:2px;border-color:#F3F3F3"><div id="myChart1" :style="{width: '100%', height: '216px'}"></div></el-row>           
            </el-col>
            <el-col :span="16">

                <el-row style="border-style:solid; border-width:2px;border-color:#F3F3F3">
                    <el-col :span="1" style="height:36px;margin:0px 6px 0px 2px;">
                    <el-col :span="10" style="height:36px;background:#61A0A8;"><div><span>&nbsp;</span></div></el-col>
                    <el-col :span="14"><span>&nbsp;</span></el-col>
                    </el-col>
                    <el-col :span="22">
                    <div style="font-family:微软雅黑;color:#2F4554;font-size:14px;font-weight:bold">
                        项目开票及收款情况</div>
                    </el-col>
                </el-row>
                    <el-col :span="6" style="padding:10px 30px 10px 30px;border-style:solid; border-width:2px;border-color:#F3F3F3">
                        <div style=" border-left:5px solid #61A0A8;height:36px;font-family:微软雅黑;padding:5px 10px 10px 15px;
                        color:#2F4554;font-size:20px;font-weight:bold">合同总额</div>
                        <div style="font-family:微软雅黑;color:#2F4554;font-size:16px;padding:10px 10px 10px 20px">
                        2800万元</div>
                    </el-col>
                    <el-col :span="6" style="padding:10px 30px 10px 30px;border-style:solid; border-width:2px;border-color:#F3F3F3">
                        <div style=" border-left:5px solid #C23531;height:36px;font-family:微软雅黑;padding:5px 10px 10px 15px;
                        color:#2F4554;font-size:20px;font-weight:bold">开票总额</div>
                        <div style="font-family:微软雅黑;color:#2F4554;font-size:16px;padding:10px 10px 10px 20px">
                        2800万元</div>
                    </el-col>
                    <el-col :span="6" style="padding:10px 30px 10px 30px;border-style:solid; border-width:2px;border-color:#F3F3F3">
                        <div style=" border-left:5px solid #CA8622;height:36px;font-family:微软雅黑;padding:5px 10px 10px 15px;
                        color:#2F4554;font-size:20px;font-weight:bold">收款总额</div>
                        <div style="font-family:微软雅黑;color:#2F4554;font-size:16px;padding:10px 10px 10px 20px">
                        2800万元</div>
                    </el-col>
                    <el-col :span="6" style="padding:10px 0px 10px 30px;border-style:solid; border-width:2px;border-color:#F3F3F3">
                        <div style=" border-left:5px solid #D48265;height:36px;font-family:微软雅黑;padding:5px 10px 10px 15px;
                        color:#2F4554;font-size:20px;font-weight:bold">未收款总额</div>
                        <div style="font-family:微软雅黑;color:#2F4554;font-size:16px;padding:10px 10px 10px 20px">
                        2800万元</div>
                    </el-col>
                <el-row>

                </el-row>
                <el-row style="border-style:solid; border-width:2px;border-color:#F3F3F3">
                         <el-table
                            :data="tableData"
                            :height="250"
                            border
                            style="width:100%">
                            <el-table-column
                            prop="date"
                            label="日期"
                            width="150px">
                            </el-table-column>
                            <el-table-column
                            prop="name"
                            label="姓名"
                            width="150px">
                            </el-table-column>
                            <el-table-column
                            prop="address"
                            label="地址">
                            </el-table-column>
                        </el-table>
                    <div style="float:right">
                        <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="currentPage4"
                        :page-sizes="[100, 200, 300, 400]"
                        :page-size="100"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="400">
                        </el-pagination>
                    </div>   
                </el-row>
            </el-col>
        </el-row>

        <el-row>
            <el-col :span="12">
                    <el-row style="border-style:solid; border-width:2px;border-color:#F3F3F3">
                    <el-col :span="1" style="height:36px;margin:0px 6px 0px 2px;">
                    <el-col :span="10" style="height:36px;background:#61A0A8;"><div><span>&nbsp;</span></div></el-col>
                    <el-col :span="14"><span>&nbsp;</span></el-col>
                    </el-col>
                    <el-col :span="22">
                    <div style="font-family:微软雅黑;color:#2F4554;font-size:14px;font-weight:bold">
                        项目人天投入情况</div>
                    </el-col>
                </el-row>
                <el-row style="border-style:solid; border-width:2px;border-color:#F3F3F3">
                         <el-table
                            :data="tableData"
                            :height="250"
                            border
                            style="width:100%">
                            <el-table-column
                            prop="date"
                            label="日期"
                            width="150px">
                            </el-table-column>
                            <el-table-column
                            prop="name"
                            label="姓名"
                            width="150px">
                            </el-table-column>
                            <el-table-column
                            prop="address"
                            label="地址">
                            </el-table-column>
                        </el-table>
                    <div style="float:right">
                        <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="currentPage4"
                        :page-sizes="[100, 200, 300, 400]"
                        :page-size="100"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="400">
                        </el-pagination>
                    </div>   
                </el-row>

            </el-col>
            <el-col :span="12">
                    <el-row style="border-style:solid; border-width:2px;border-color:#F3F3F3">
                    <el-col :span="1" style="height:36px;margin:0px 6px 0px 2px;">
                    <el-col :span="10" style="height:36px;background:#61A0A8;"><div><span>&nbsp;</span></div></el-col>
                    <el-col :span="14"><span>&nbsp;</span></el-col>
                    </el-col>
                    <el-col :span="22">
                    <div style="font-family:微软雅黑;color:#2F4554;font-size:14px;font-weight:bold">
                        人员绩效情况</div>
                    </el-col>
                </el-row>
                <el-row style="border-style:solid; border-width:2px;border-color:#F3F3F3">
                         <el-table
                            :data="tableData"
                            :height="250"
                            border
                            style="width:100%">
                            <el-table-column
                            prop="date"
                            label="日期"
                            width="150px">
                            </el-table-column>
                            <el-table-column
                            prop="name"
                            label="姓名"
                            width="150px">
                            </el-table-column>
                            <el-table-column
                            prop="address"
                            label="地址">
                            </el-table-column>
                        </el-table>
                    <div style="float:right">
                        <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="currentPage4"
                        :page-sizes="[100, 200, 300, 400]"
                        :page-size="100"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="400">
                        </el-pagination>
                    </div>   
                </el-row>
            </el-col>
        </el-row>      
        
 


    </div>   
    </div>


</template>

<script>

import {sqlquery} from '@/api/sql'
import { parseTime } from '@/utils/index'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'

export default {
  components: {

  },
  data() {
    return {
     
      query: {
        sql: ''
      },
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }]
    }
      
  },
  mounted(){
    this.drawLine0();
    this.drawLine1();
    this.drawLine2();
    this.drawLine3();
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
        drawLine0(){
        // 基于准备好的dom，初始化echarts实例
        let myChart0 = this.$echarts.init(document.getElementById('myChart0'),'wonderland')
        // 绘制图表
        myChart0.setOption({
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },
    grid: {
                x:2,
                y:2,
                x2:2,
                y2:2,
        containLabel: true
    },
    xAxis: {
        show:false,
        splitLine:{
            show:false
                    },
        type: 'value',
        boundaryGap: [0, 0.01]
    },
    yAxis: {
        splitLine:{
            show:false
                    },
        type: 'category',
        data: ['项目1', '项目2', '项目3', '项目4', '项目5', '项目6']
    },
    series: [
        {
            name: '2011年',
            type: 'bar',
            data: [18203, 23489, 29034, 104970, 131744, 630230]
        }
    ]
});
    },
           drawLine1(){
        // 基于准备好的dom，初始化echarts实例
        let myChart1 = this.$echarts.init(document.getElementById('myChart1'),'wonderland')
        // 绘制图表
        myChart1.setOption({
    title: {
        text: '部门费用组成结构',
        subtext: '纯属虚构',
        left: 'center'
    },
        grid: {
                x:2,
                y:2,
                x2:2,
                y2:2,
        containLabel: true
    },
    tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
    },
    legend: {
        orient: 'vertical',
        left: 'left',
        data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
    },
    series: [
        {
            name: '访问来源',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: [
                {value: 335, name: '直接访问'},
                {value: 310, name: '邮件营销'},
                {value: 234, name: '联盟广告'},
                {value: 135, name: '视频广告'},
                {value: 1548, name: '搜索引擎'}
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
           drawLine2(){
        // 基于准备好的dom，初始化echarts实例
        let myChart2 = this.$echarts.init(document.getElementById('myChart2'),'wonderland')
        // 绘制图表
        myChart2.setOption({
    grid:{
                x:30,
                y:30,
                x2:20,
                y2:20
                },
    xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
        type: 'value'
    },
    series: [{
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line'
    }]
});
    },
           drawLine3(){
        // 基于准备好的dom，初始化echarts实例
        let myChart3 = this.$echarts.init(document.getElementById('myChart3'),'wonderland')
        // 绘制图表
        myChart3.setOption({
    grid:{
                show:false,
                x:30,
                y:30,
                x2:20,
                y2:20
                },
    xAxis: {
         splitLine:{
            show:false
                    },
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
         splitLine:{
            show:false
                    },
        type: 'value'
    },
    series: [{
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line'
    }]
});
    }
      
         



  }
}
</script>

