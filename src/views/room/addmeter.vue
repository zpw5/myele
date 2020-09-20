<template>
   <div>
    <el-row>
        <el-col :span="6">
            电表编号:
        </el-col>
        <el-col :span="18">
            <el-input v-model="meterparam.meter_id" placeholder="6位电表编号" size="mini"></el-input>
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
  name:'addmeter',
   data() {
     return{
      meterparam:
      {
         room_id:this.$store.state.room.currentroom.room_id,
         meter_id:0
      },
     }
  },
   methods: {

       //点击添加房间
       onclickOK()
       {
           
           var _this = this
          
           var meterinfo = { room_id: _this.meterparam.room_id, meter_id: _this.meterparam.meter_id };
            //调用后台添加房间
             _this.$store.dispatch('BindMeter',meterinfo).then(() => {

                   Message({ 
                          message: '绑定电表成功!', 
                          type: 'success',
                          duration:  1000
                      })

                      this.$emit('onBindMeterOK')

              }).catch((ex)=>{
          
                  
              })


           
       },  
        //取消按钮
       onclickCancel()
       {
           this.$emit('onBindMeterCancel')
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
