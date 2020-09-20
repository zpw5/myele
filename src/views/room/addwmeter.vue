<template>
   <div>
    <el-row>
        <el-col :span="6">
            水表编号:
        </el-col>
        <el-col :span="18">
            <el-input v-model="wmeterparam.meter_id" placeholder="6位水表编号" size="mini"></el-input>
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

import { Message} from 'element-ui' 


export default {
  name:'addwmeter',
   data() {
     return{
      wmeterparam:
      {
         room_id:this.$store.state.room.currentroom.room_id,
         meter_id:0
      },
     }
  },
   methods: {

       //点击绑定水表
       onclickOK()
       {
           
           var _this = this
          
           var wmeterinfo = { room_id: _this.wmeterparam.room_id, meter_id: _this.wmeterparam.meter_id };
            
            //调用后台绑定水表
             _this.$store.dispatch('BindWMeter',wmeterinfo).then(() => {

                   Message({ 
                          message: '绑定水表成功!', 
                          type: 'success',
                          duration:  1000
                      })

                      this.$emit('onBindWMeterOK')

              }).catch((ex)=>{
          
                  
              })


           
       },  
        //取消按钮
       onclickCancel()
       {
           this.$emit('onBindWMeterCancel')
       },
   },
  mounted() {
    var _this = this
    this.$nextTick(() => {

    
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
