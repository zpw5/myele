<template>
   <div>
    <el-row>
        <el-col :span="6">
            房间编号:
        </el-col>
        <el-col :span="18">
            <el-input v-model="roomparam.room_name" placeholder="几栋几号" size="mini"></el-input>
        </el-col>
    </el-row>
    <el-divider></el-divider>  
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
import { createRoom} from '@/api/room'
import { Message} from 'element-ui' 


export default {
  name:'addroom',
   data() {
     return{
      roomparam:
      {
         area_id:this.$store.state.area.currentarea.area_id,
         room_name:""
      },
     }
  },
   methods: {

       //点击添加房间
       onclickOK()
       {
           
           var _this = this
           if (this.$store.state.area.currentarea == null)
           {
                Message({ 
                          message: '当前的园区不能为空', 
                          type: 'error',
                          duration:  1000
                      })
           }

           if (this.roomparam.name == '')
           {
                Message({ 
                          message: '房间编号不能为空', 
                          type: 'error',
                          duration:  1000
                      })
           }
         
            //调用后台添加房间
             _this.$store.dispatch('CreateNewRoom',_this.roomparam).then(() => {

                   Message({ 
                          message: '创建房间成功!', 
                          type: 'success',
                          duration:  1000
                      })

                      this.$emit('onclickOK')

              }).catch((ex)=>{
          
                   Message({ 
                          message: '创建房间失败!', 
                          type: 'error',
                          duration:  1000
                      })
              })


           
       },  
        //取消按钮
       onclickCancel()
       {
           this.$emit('onNewRoomDlgclickCancel')
       },
   },
  mounted() {
    var _this = this
    this.$nextTick(() => {

       //  this.lessorday = getBeijingtime()
  })
  
        }
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
