<template>
   <div>
    <el-row align="middle" type="flex" class="el-row1">
        <el-col :span="24" justify="end" align="middle">
           <el-calendar   v-model="lessorday">
                
           </el-calendar>
        </el-col>
    </el-row>
    
     
    <el-divider></el-divider>  
     <el-row align="middle" justify="end" type="flex" class="el-row1">
         <el-col :span="4">
            
        </el-col>  
        <el-col :span="5">  
          
        </el-col>
        <el-col :span="4">
            <el-button  icon="el-icon-remove" size="mini" @click="onclickCancel">取消</el-button>
        </el-col>
        <el-col :span="4">
            <el-button type="primary" icon="el-icon-check" size="mini" @click="onclickOK">确定</el-button>
        </el-col>
        
     </el-row>
  </div>
</template>      
 
<script>  
import { PrefixInteger,SecToDateTime,TimeToSec,getBeijingtime,time2BeijingTime,timestam_2_str} from '@/api/common'
import { Message} from 'element-ui' 


export default {
  name:'lessorconfirm',
   data() {
     return{
      lessorday:getBeijingtime(),
      room:this.$store.state.room.currentroom 
     }
  },
   methods: {

  
       //确定按钮,判断日期是否正确
       onclickOK()
       {

            

           var _this = this
           var tmNow = getBeijingtime()
           this.room = this.$store.state.room.currentroom 
          
           if (_this.lessorday.getFullYear() > tmNow.getFullYear())   
            {
                alert("请选择年份小于今年的日期!")
            }

            //新增房间或者修改房间
            if (_this.lessorday.getMonth() != tmNow.getMonth())
            {
                alert("请选择当月的日期!")
                return
            }
 
            if (_this.lessorday.getDate() > tmNow.getDate())
            {
                alert("请选择小于今天的日期!")
            }

            

            //出租房间
            if (_this.room != null)
            {
              
                var timestr = timestam_2_str(time2BeijingTime(_this.lessorday))
                var tenantParam = {room_id:_this.room.room_id,
                                  period_start_time:timestr
                                  }
        
                _this.$store.dispatch('LessorRoom',tenantParam).then((res) => {
     
                  

                  Message({ 
                          message: '房间出租成功!', 
                          type: 'success',
                          duration:  1000
                      })

                      this.$emit('onclickOK')
                  }).catch((err)=>{
 
                    this.$message({ 
                      type: 'error',
                      message: '出租失败!'
                  });

                  })
                  
            }  
           
  
       },
        //取消按钮
       onclickCancel()
       {
        
           this.$emit('onclickCancel')
            
       },
   },
  mounted() {
    var _this = this
    this.$nextTick(() => {
        
        
         this.lessorday = getBeijingtime()
   
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
