<template>
   <div>
       <el-form ref="form" 
            :model="meterparam" 
            label-width="80px"
            :rules="meterRules"
            >
            <el-form-item label="电表编号" >
                {{meterid2str(meterparam.meter_id)}}
            </el-form-item>
            <el-form-item label="电价(元)"  prop="ep_price">
                <el-input v-model="meterparam.ep_price"/>
            </el-form-item>
            <el-form-item label="期初值" prop="ep_base">
                <el-input v-model="meterparam.ep_base" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" v-if="IsPriceValidate === true && IsEpbaseValidate === true"  @click="onclickok">确定</el-button>
                <el-button type="primary" v-else disabled  @click="onclickok">确定</el-button>
                <el-button @click="oncancel">取消</el-button>
            </el-form-item>
        </el-form>
  </div>
</template>      
 
<script>  

import { Message} from 'element-ui' 
import{PrefixInteger} from  '@/api/common'
import { isvalidFP } from '@/utils/validate'

export default {
  name:'setmeter',
   data() {
       
     const validatePrice = (rule, value, callback) => {
         
        var _this = this
        if (!isvalidFP(value)) {
          _this.IsPriceValidate  = false
          callback(new Error('请输入正确的电费单价'))

        }  else {
            _this.IsPriceValidate  = true
            callback()
        }
     }
     const validateBase = (rule, value, callback) => {
       var _this = this
        if (!isvalidFP(value)) {
            _this.IsEpbaseValidate  = false
          callback(new Error('请输入正确的期初值'))
        }  else {
            _this.IsEpbaseValidate  = true
            callback()
        }
     }
     return{
         
      IsEpbaseValidate :true,
      IsPriceValidate :true,
      meterparam:
      {
         room_id:this.$store.state.room.currentroom.room_id,
         meter_id:0,
         ep_base:0,
         ep_price:1.0
      },
       meterRules: {
        ep_base: [{  trigger: 'blur',validator: validateBase }],
        ep_price: [{  trigger: 'blur',validator: validatePrice }],
      },
      
     }
  },
   methods: {
       
        meterid2str(meterid)
        {
            return PrefixInteger(meterid,6)
        },

       //点击添加房间
       onclickok()
       {
           
           var _this = this
          
           var meterbaseprice = { meter_id: _this.meterparam.meter_id
                                ,ep_base: _this.meterparam.ep_base
                                ,ep_price: _this.meterparam.ep_price };

            //调用后台添加房间
             _this.$store.dispatch('SetMeterBasePrice',meterbaseprice).then(() => {

                   Message({ 
                          message: '设置电表成功!', 
                          type: 'success',
                          duration:  1000
                      })

                      this.$emit('onclickOK')

              }).catch((ex)=>{
          
                   Message({ 
                          message: '设置电表失败!', 
                          type: 'error',
                          duration:  1000
                      })

              })

       },  
        //取消按钮
       oncancel()
       {
           this.$emit('onClickCancel')
       },
   },
  mounted() {
      
    var _this = this
    this.$nextTick(() => {

        if (null != _this.$store.state.meter.currentmeter)
        {
            _this.meterparam.meter_id = _this.$store.state.meter.currentmeter.meter_id
            _this.meterparam.ep_base = _this.$store.state.meter.currentmeter.ep_base
            _this.meterparam.ep_price = _this.$store.state.meter.currentmeter.ep_price.toFixed(2)
        }
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
