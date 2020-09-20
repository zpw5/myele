<template>
   <div class="charge-container">
    
     <div class="label-div"><div>电表编号:</div></div>
     <div class="input-div">
        <el-input v-model="meter.meter_id" disabled="true" size="mini"></el-input>
      </div>
  

  
     <div class="label-div"><div>房间编号:</div></div>
     <div class="input-div">
        <el-input v-model="meter.room_name" disabled="true"  size="mini"></el-input>
      </div>

     <div class="label-div"><div>付款方式:</div></div>
     <div class="input-div">
         <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in paytype"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>


      <div class="label-div"><div>充电金额(元):</div></div>
     <div class="input-div">
        <el-input v-model="charge_fee"  size="mini"></el-input>
      </div>

    
 
 
    <div class="diver-div">
      <el-divider></el-divider>  
    </div>
    
  
    <div class="label-div"/>
   
     <div class="button-div">
       <el-button type="primary" icon="el-icon-check" size="mini" @click="onclickOK">确定</el-button>
    </div>
     <div class="button-div">
        <el-button  icon="el-icon-remove" size="mini" @click="onclickCancel">取消</el-button>
      </div>
    <div class="label-div"/> 


  </div>
</template>      
 
<script>  

import { Message} from 'element-ui' 
import { Toast } from 'vant';

export default {
  name:'mannercharge',
   data() {
     return{
      commandsn:0,                //充值操作命令号
      toastShowFlag:false,
      toast:null,
      meter:this.$store.state.meter.currentmeter,
      queryCommandTimer:null,
      freshMeterTimer:null,
      charge_fee:0.0,
      charge_ep:0.0,
      paytype: [{
          value: 'wepay',
          label: '微信扫码'
        }, {
          value: 'alipay',
          label: '支付宝'
        }, {
          value: 'cash',
          label: '现金支付'
        }],
        value: 'alipay'
     }
  },
   methods: {

       //点击充值
       onclickOK()
       {
           
          this.$emit('onclickOK',this.charge_fee)
           
       },  

      
    //加载充值电表
    loadMeter()
    {
        var _this = this
          
        _this.$store.dispatch('GetTenantMetersByOpenid',this.user.openid).then((meters) => {    

            _this.hideToast()
            if (null == meters || meters.lenght == 0)     
            {
              
                return
            }
            else
            {
                debugger
                _this.meterList = meters
                _this.curMeter = meters[0]

                _this.addr =  _this.curMeter.room_name
                _this.meterleftEP =  _this.curMeter.left_ep
                _this.price =  _this.curMeter.ep_price
                _this.meterid =  _this.curMeter.meter_id
                _this.chargefee =  10.0
                _this.chargeEP =  0.0

            }


            }).catch((ex)=>{
        
                _this.hideToast()
            })
        
    },

        //取消按钮
       onclickCancel()
       {
           this.$emit('onChargeClickCancel')
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

/*容器布局*/
.charge-container{
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr ;
  grid-template-rows: 1fr 1fr 1fr 1fr 1fr;
  justify-items: stretch;
  align-content:stretch;
  grid-row-gap: 20px;

}


.col-gap
{
  display: flex;
  align-items:center;
  justify-content: flex-start;
}

.label-div
{
  display: flex;
  align-items:center;
  justify-content: flex-start;
}

.button-div
{
  display: flex;
  align-items:center;
  justify-content: center;
}
.input-div {
 
  grid-column-start: span 3;
  display: flex;
  align-items:center;
}

.input-ep {
 
  grid-column-start: span 1;
  display: flex;
  align-items:center;
}

.diver-div {
  grid-column-start: span 4;
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
