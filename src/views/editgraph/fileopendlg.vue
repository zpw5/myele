<template>
   <div>
    <el-row>
        <el-col :span="6">
            请选择打开的文件名称
        </el-col>
    </el-row>
    <el-divider></el-divider>  
     <el-row align="middle" justify="end" type="flex" class="el-row1">
        <el-table
            :data="fileList"
            element-loading-text="加载文件列表..."
            border
            fit
            max-height="1250"
            highlight-current-row
            :row-style="{height:'16px'}"
            :cell-style="{padding:'0px'}"
            @row-click="onSelFileName"
            :header-cell-style="{background:'#eef1f6',color:'#606266'}"
        >
            <el-table-column align="center" label="序号" width="60">
                <template slot-scope="scope">
                {{ scope.$index+1 }}
                </template>
            </el-table-column>
            <el-table-column align="center" label="文件名称" width="460">
              
                <template slot-scope="scope">
                  {{ scope.row.file_name}}
                </template>
              
            </el-table-column>
        </el-table>
        
     </el-row>
      <el-row align="middle" justify="end" type="flex" class="el-row1">
         <el-col :span="4">
        </el-col>  
        <el-col :span="4">  
        </el-col>
        <el-col :span="4">
            <el-button  icon="el-icon-remove" size="mini" @click="onclickCancel">取消</el-button>
        </el-col>
        <el-col :span="1">  
        </el-col>
        <el-col :span="4">
            <el-button type="primary" icon="el-icon-check" size="mini" @click="onclickOK">确定</el-button>
        </el-col>
        
     </el-row>
  </div>
</template>      
 
<script>  

import { Message} from 'element-ui' 
import {  getMapFileList,saveMapFile } from '@/api/myfile'

export default {
  name:'addmeter',
  props: {
    
  },
   data() {
     return{
      fileparam:
      {
         file_name:'',
         file_content:this.fileContent
      },
      fileList:null,
     }
  },
   methods: {

        //装载图形文件列表
       loadFileList()
       {
            debugger
            var _this = this
            return new Promise((resolve, reject) => {
            getMapFileList().then(response => {
            
              if (null != response.data)
              {
                  _this.fileList = response.data.data
              }       
              
     
            }).catch(error => {
              reject(error)
            })
          })
       },
      onSelFileName(row, event, column)
      {
          
          if (null != row)
          {
            this.fileparam.file_name = row.file_name
          }
          
      },

     
       //点击添加房间
       onclickOK()
       {
           //检查名称是否与原来有一样的，如果有则提示是否覆盖
           debugger

         var r=confirm("您是否要打开新文件!");
           if (r==true){
                this.$emit('onFileOpenDlgOK',this.fileparam.file_name)
            }
            else{
              return
            }
           
       },  
        //取消按钮
       onclickCancel()
       {
         debugger
           this.$emit('onFileOpenDlgCancel')
       },
   },
  mounted() {
    var _this = this
    this.$nextTick(() => {

        
     
    })
  
  },
  created()
  {
      this.loadFileList()
  },
}
</script>

<style lang="scss" scoped>
.el-row1 {
  margin-top:10px;
  padding: 0px; 
}
.el-row2 {
  margin-right: 10px;
  margin-top:0px;
  padding: 0px; 
  
}
.el-row-title {
  margin-right: 10px;
  margin-top:10px;
  padding: 0px; 
  font-size: 20px;
  color: #333333;
}
 
  .el-calendar-day{
      height: 45px;  
    }
</style>
