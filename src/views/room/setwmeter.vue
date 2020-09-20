<template>
   <div>
       <el-form ref="form" 
            :model="wmeterparam" 
            label-width="120px"
            :rules="wmeterRules"
            >
            <el-form-item label="水表编号" >
                {{meterid2str(wmeterparam.meter_id)}}
            </el-form-item>
            <el-form-item label="水费单价(元)"  prop="water_price">
                <el-input v-model="wmeterparam.water_price"/>
            </el-form-item>
            <el-form-item label="期初读数(吨)" prop="water_base">
                <el-input v-model="wmeterparam.water_base" />
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
  name:'setwmeter',
   data() {
       
     const validatePrice = (rule, value, callback) => {
         
        var _this = this
        if (!isvalidFP(value)) {
          _this.IsPriceValidate  = false
          callback(new Error('请输入正确的水表单价'))

        }  else {
            _this.IsPriceValidate  = true
            callback()
        }
     }
     const validateBase = (rule, value, callback) => {
       var _this = this
        if (!isvalidFP(value)) {
            _this.IsEpbaseValidate  = false
          callback(new Error('请输入正确的水表期初值'))
        }  else {
            _this.IsEpbaseValidate  = true
            callback()
        }
     }
     return{
         
      IsEpbaseValidate :true,
      IsPriceValidate :true,
      wmeterparam:
      {
         room_id:this.$store.state.room.currentroom.room_id,
         meter_id:0,
         water_base:0,
         water_price:1.0
      },
       meterRules: {
        water_base: [{  trigger: 'blur',validator: validateBase }],
        water_price: [{  trigger: 'blur',validator: validatePrice }],
      },
      
     }
  },
   methods: {
       
        meterid2str(meterid)
        {
            return PrefixInteger(meterid,6)
        },

       //点击设置水表
       onclickok()
       {
           
           var _this = this
          
           var wmeterbaseprice = { meter_id: _this.wmeterparam.meter_id
                                ,water_base: _this.wmeterparam.water_base
                                ,water_price: _this.wmeterparam.water_price };

            //调用后台添加房间
             _this.$store.dispatch('SetWMeterBasePrice',wmeterbaseprice).then(() => {

                   Message({ 
                          message: '设置水表成功!', 
                          type: 'success',
                          duration:  1000
                      })

                      this.$emit('onclickOK')

              }).catch((ex)=>{
          
                   Message({ 
                          message: '设置水表失败!', 
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

        if (null != _this.$store.state.wmeter.currentwmeter)
        {
            _this.wmeterparam.meter_id = _this.$store.state.wmeter.currentwmeter.meter_id
            _this.wmeterparam.water_base = _this.$store.state.wmeter.currentwmeter.water_base
            _this.wmeterparam.water_price = _this.$store.state.wmeter.currentwmeter.water_price.toFixed(2)
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
