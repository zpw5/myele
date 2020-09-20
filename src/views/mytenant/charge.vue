<template>

    <van-tabs type="line" color="#0084FF" title-active-color="#0084FF"  v-model="active">
        <van-tab title="电表充值">
            <van-popup v-model="showMeterPicker" position="bottom" :overlay="true">
                <van-picker show-toolbar title="请选择充值电表" :columns="meterIDList" @cancel="onCancelSelMeter" @confirm="onConfirmSelMeter" @change="onChangeSelMeter" />
            </van-popup>
            <div slot="title">
                <van-icon name="location-o" />电表充值
            </div>
            <div class="chargecontent" :style="bodysize">
                <div class="chargerow-titlegap"/>
                    
                   
                <div class="chargerow1">
                    剩余电度
                </div>
                <div class="chargerow2">
                    单位(kwh)
                </div>
            
                <div class="chargerow3">
                    <div class="chargerow-colgap"/>
                    <div class="chargerow-leftEPPannel">
                        <meternumber  totalwidth="100%" totalheight="60px" bgcolor="#0084FF" v-bind:bits="7" v-bind:value="meterleftEP"></meternumber>
                    </div>
                    <div class="chargerow-colgap"/>
                </div>
                <div class="chargerow4">
                    <div class="chargerow-infopannel">
                        <myinfo title="电价(kwh)" frcolor="#FFFFFF" v-bind:content="getPriceStr(price)"></myinfo>
                    </div>
                    <div class="chargerow-infopannel">
                        <myinfo title="累计电度(kwh)" frcolor="#FFFFFF" v-bind:content="getTotalEP()"></myinfo>
                    </div>  
                </div>
                <div class="chargerow6">
                  <div class="chargerow61">
                    <div class="meterid-pannel">
                    <van-cell   size="small"  icon="location-o" is-link @click="onShowMeterPicker()" >
                        <template slot="title">
                                <span style="color:#cccccc">{{addr}}</span>
                        </template>
                        <template slot="default">
                                <span style="color:#cccccc">{{getMeterIDStr(meterid)}}</span>
                        </template>
                        <van-icon
                            slot="right-icon"
                            name="arrow"
                            style="line-height: inherit;"
                        />
                    </van-cell>
                    </div>
                  </div>
     
                  <div class="chargerow62">
                      <div class="chargerow-colgap10"/>
                    <div class="chargerow-colgap10"/>
                    <div class="chargerow62-chargetip">
                        请选择充值套餐
                    </div>
                    
                  </div>
                  <div class="chargerow63">
                      <div id="feechoice-20">
                          <div class="feechoice-button" @click="chargeDD(20)">
                              <div class="feebutton-fee">
                                  ￥20.00元 
                              </div>
                              <div class="feebutton-ep">
                                  20.0度
                              </div>
                          </div>
                      </div>
                      <div id="feechoice-50">
                          <div class="feechoice-button" @click="chargeDD(50)">
                             <div class="feebutton-fee">
                                  ￥50.00元 
                              </div>
                              <div class="feebutton-ep">
                                  50.0度
                              </div>
                          </div>
                      </div>
                      <div id="feechoice-100">
                          <div class="feechoice-button">
                              <div class="feebutton-fee">
                                  ￥100.00元 
                              </div>
                              <div class="feebutton-ep">
                                  ￥100.0度
                              </div>
                          </div>
                      </div>
                      <div id="feechoice-200">
                          <div class="feechoice-button">
                               <div class="feebutton-fee">
                                  ￥200.00元 
                              </div>
                              <div class="feebutton-ep">
                                  ￥200.0度
                              </div>
                          </div>
                      </div>
                      <div id="feechoice-500">
                          <div class="feechoice-button">
                               <div class="feebutton-fee">
                                  ￥500.00元 
                              </div>
                              <div class="feebutton-ep">
                                  ￥500.0度
                              </div>
                          </div>
                      </div>
                      <div id="feechoice-other">
                          <div class="feechoice-button">
                              <div class="feebutton-fee">
                                  其他金额
                              </div>
                              <div class="feebutton-ep">
                                  手动输入
                              </div>
                          </div>
                      </div>
                  </div>
                  <div class="chargerow64">
                  </div>
                        
                  </div>                
                </div>
                
          
                
        </van-tab>
        <van-tab title="水表充值">
                <div slot="title">
                <van-icon name="setting-o" />水表充值
            </div>
                <div class="chargecontent" :style="bodysize">
                <div class="chargerow-titlegap"/>
                    <div class="chargerow1">
                    水费余额
                </div>
                <div class="chargerow2">
                    
                </div>
                <div class="chargerow3">
                    
                </div>
                    <div class="chargerow4">
                    
                </div>
                <div class="chargerow5">
                    
                </div>
            </div>
        </van-tab>
    </van-tabs>        
        
</template>  

<style>
/*账单主页面*/
.chargebody{
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction:column;
    }

/*第一行头部,20%高度*/
.chargehead{
    display:flex;
    width: 100%;
    flex-grow: 10;
    flex-shrink:10;
    flex-direction:row;
    flex-wrap: nowrap;
    justify-content: stretch; 
    align-items: stretch;
    background-color:#FFFFFF;
}

/*第一行头部,20%高度*/
.chargecontent{
    display:flex;
    width: 100%;
    flex-direction:column;
    flex-wrap: nowrap;
    justify-content: stretch; 
    align-items: stretch;
    background-color:#0084FF;
}

/*第一行头部,20%高度*/
.chargerow-titlegap{
    display:flex;
    width: 100%;
    flex-grow: 0;
    flex-shrink:0;
    flex-basis: 2px;
    flex-direction:row;
    flex-wrap: nowrap;
    justify-content: center; 
    align-items: center;
    background-color:#eeeeee;
}
/*第一行头部,25%高度*/
.chargerow1{
    display:flex;
    width: 100%;
    flex-grow: 10;
    flex-shrink:10;
    flex-direction:row;
    flex-wrap: nowrap;
    justify-content: center; 
    align-items: flex-end;
    background-color:#0084FF;
    color: #FFFFFF;
    font-size: 25px;
    font-weight: 700;
}
/*单位*/
.chargerow2{
    display:flex;
    width: 100%;
    flex-grow: 5;
    flex-shrink:5;
    flex-direction:row;
    flex-wrap: nowrap;
    justify-content: center; 
    align-items: center;
    background-color:#0084FF;
    color: #FFFFFF;
    font-size: 10px;
    font-weight: 100;
}
/*第三行头部,15%高度*/
.chargerow3{
    display:flex;
    width: 100%;
    flex-grow: 10;
    flex-shrink:10;
    flex-direction:row;
    flex-wrap: nowrap;
    justify-content: center; 
    align-items: center;
    background-color:#0084FF;
}

/*第四行头部,15%高度*/
.chargerow4{
    display:flex;
    width: 100%;
    flex-grow: 7;
    flex-shrink:7;
    flex-direction:row;
    flex-wrap: nowrap;
    justify-content: space-between; 
    align-items: center;
    background-color:#0084FF;
}
/*第五行头部,10%高度*/
.chargerow5{
    display:flex;
    width: 100%;
    flex-grow: 10;
    flex-shrink:10;
    flex-direction:row;
    flex-wrap: nowrap;
    justify-content: flex-end; 
    align-items: center;
    background-color:#0084FF;
}

/*第六行头部,20%高度*/
.chargerow6{
    display:flex;
    width: 100%;
    flex-grow: 70;
    flex-shrink:70;
    flex-direction:column;
    flex-wrap: nowrap;
    justify-content: flex-start; 
    align-items: flex-start;
    background-color:#FFFFFF;
}
.chargerow61{
    display:flex;
    width: 100%;
    height: 50px;
    flex-direction:row;
    flex-wrap: nowrap;
    overflow: hidden;
    justify-content: stretch; 
    align-items: stretch;
    background-color:#FFFFFF;
}

/*分割线条 */
.row-gap-border{
    display:flex;
    width: 100%;
    height: 5px;
    flex-direction:row;
    flex-wrap: nowrap;
    overflow: hidden;
    justify-content: stretch; 
    align-items: stretch;
    background-color:#FFFFFF;
}

/*分割线条 */
.gap-border{
    display:flex;
    width: 100%;
    height: 5px;
    flex-direction:row;
    flex-wrap: nowrap;
    overflow: hidden;

    background-color:#FFFFFF;
}

/*充值提示 */
.chargerow62{
    display:flex;
    width: 100%;
    height:  30px;
    flex-direction:row;
    flex-wrap: nowrap;
    justify-content: flex-start; 
    align-items: center;
    color: #333333;
    background-color:#cccccc;
}
/*充值提示 */
.chargerow62-chargetip{
    display:flex;
    height: 100%;
    width:100%;
    flex-direction:row;
    flex-wrap: nowrap;
    justify-content: flex-start; 
    align-items: center;
    font-size: 12px;
    color: #333333;
    background-color:rgba(0,0,0,0.0);
}


/*金额选择 */
.chargerow63{
    display:grid;
    width: 100%;
    flex-grow: 60;
    flex-shrink:60;
    display: grid;
    grid-template-columns: 10px 1fr 1fr 1fr 10px;
    grid-template-rows: 1fr 1fr;
    justify-items:stretch;
    align-items: stretch;
    justify-content: stretch;
    align-content: stretch;
    grid-template-areas: 'gap1 a b c gap2'
                         'gap3 d e f gap4';
    background-color:rgba(0,0,0,0.0);
}

/*提示 */
.chargerow64{
    display:flex;
    width: 100%;
    flex-grow: 40;
    flex-shrink:40;
    flex-direction:row;
    flex-wrap: nowrap;
    justify-content: flex-start; 
    align-items: center;

    background-color:rgba(0,0,0,0.0);
}

/* */
.chargerow-colgap{
    display:flex;
    flex-grow: 10;
    flex-shrink:10;
    height: 100%;
    background-color:rgba(0,0,0,0.0);

}

.chargerow-leftEPPannel{
    display:flex;
    flex-grow: 80;
    flex-shrink:80;
    height: 100%;
    background-color:rgba(0,0,0,0.0);

}



/*列距*/
.chargerow-colgap10{
    display:flex;
    flex-basis: 10px;
    flex-grow: 0;
    flex-shrink:0;
    background-color:rgba(0,0,0,0.0);
}

/*列距*/
.meterid-pannel{
    display:flex;
    width: 100%;
    flex-grow: 15;
    flex-shrink:15;
    flex-direction:column;
    flex-wrap: column;
    justify-content: stretch; 
    align-items: stretch;
   /* border-bottom: #cccccc 1px solid;*/
    background-color:#FFFFFF;
}

/*第四行头部,15%高度*/
.chargerow-infopannel{
    display:flex;
    height:  100%;
    flex-grow: 50;
    flex-shrink:50;
    flex-direction:row;
    flex-wrap: nowrap;
    justify-content: center; 
    align-items: center;
    background-color:#0084FF;
}

/*地址图标*/
.chargerow5-icon{
    display:flex;
    height:  100%;
    flex-grow: 10;
    flex-shrink:10;
    flex-direction:row;
    justify-content: center; 
    align-items: center;
    background-color:#0084FF;
}
/*地址图标*/
.chargerow5-addr{
    display:flex;
    height:  100%;
    flex-direction:row;
    flex-wrap: nowrap;
    justify-content: flex-end; 
    align-items: center;
    background-color:#0084FF;
    color: #FFFFFF;
    font-size: 14px;
}
/*地址图标*/
.chargerow5-sel{
    display:flex;
    height:  100%;
    flex-direction:row;
    flex-wrap: nowrap;
    justify-content: flex-end; 
    align-items: center;
    background-color:#0084FF;
    color: #FFFFFF;
    font-size: 12px;
}

/*列距*/
.row5-colgap10{
    display:flex;
    flex-basis: 0px;
    flex-grow: 5;
    flex-shrink:5;
    background-color:rgba(0,0,0,0.0);
}

/*输入金额的组件*/
.row6-input{
    display:flex;
    flex-direction: column;
    width: 100%;
    flex-basis: 30px;
    flex-grow: 70;
    flex-shrink:70;
    justify-content: stretch;
    align-content: center;
    background-color:rgba(0,0,0,0.0);
}

/*充值选择按钮20元*/
#feechoice-20{
    grid-area: a;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
   background-color:rgba(0,0,0,0.0);
}

/*充值选择按钮50元*/
#feechoice-50{
    grid-area: b;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background-color:rgba(0,0,0,0.0);
}

/*充值选择按钮100元*/
#feechoice-100{
    grid-area: c;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background-color:rgba(0,0,0,0.0);
}

/*充值选择按钮200元*/
#feechoice-200{
    grid-area: d;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background-color:rgba(0,0,0,0.0);
}

/*充值选择按钮500元*/
#feechoice-500{
    grid-area: e;
    
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background-color:rgba(0,0,0,0.0);
}

/*充值选择按钮其他*/
#feechoice-other{
    grid-area: f;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background-color:rgba(0,0,0,0.0);
}

/*充值金额选择按钮*/
.feechoice-button{

 
    width: 80%;
    height: 65%;
    border: #cccccc 1px solid;
    border-radius:10px;

    display: grid;
    grid-row-gap: 5px;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr;
    justify-items:stretch;
    align-items: stretch;
    grid-template-areas: 'feerow'
                         'eprow';
}

/*充值金额选择按钮---金额*/
.feebutton-fee{
    grid-area: feerow;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-items: center;
    justify-content: center;
    align-items:flex-end;
    color: #6088ad;
    font-size: 14px;
    font-weight: 500;
    background-color:rgba(0,0,0,0.0);
}

/*充值金额选择按钮---电度*/
.feebutton-ep{
    grid-area: eprow;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-items: center;
    justify-content: center;
    align-items: flex-start;
    color: #bbbbbb;
    font-size: 11px;
    background-color:rgba(0,0,0,0.0);
}

.van-cell__title {
      min-width: 60%;
     
    }

/* */
</style>

<script>
import {conversqltimestr_2_Beijingtime,getBeijingtimeStam,sqlstr_2_timestamp,PrefixInteger,timestam_2_str,timestam_2_shortstr,conversqltimestr_2_time} from '@/api/common'
import { Button } from 'vant';
import { Stepper } from 'vant';
import { Toast } from 'vant';
import { Popup } from 'vant';
import { Loading } from 'vant';
import { Cell, CellGroup } from 'vant';
import { Icon } from 'vant';
import { Field } from 'vant';
import meternumber from '@/components/MyCommon/meternumber.vue'
import myinfo from '@/components/MyCommon/myinfo.vue'

export default {
 name: 'charge',
  components:{
   "meternumber":meternumber,
   "myinfo":myinfo
   },
  data() {
    return {
      bodysize:{

　　　　　　width:'200px',
　　　　　　height:'',
           background: 'white',
           
　　　　},
     imgsize:{
         　width:'200px',
　　　　　　height:'' 
     },
     user:{
         nickname:'',
         headimg:'',
         openid:''
     },
     curMeter: null,         //当前选择的电表
     meterList:new Array(),
     isLoading:true,
     toast:null,
     toastShowFlag:false,
     active: 0,
     addr:"",
     meterleftEP:12,
     price:0.0,
     meterid:127,
     chargefee:10.0,
     chargeEP:0.0,
     commandsn:0,
     orderinfo:null,
     queryPaymentTimer:null,
     queryCommandTimer:null,
     freshMeterTimer:null,
     ispaycancel:false,
     showMeterPicker:false,
     meterIDList:[]
    }
  },
  created(){

    if (null != this.$store.state.mytenant.wxuser)
    {
        this.user.nickname= this.$store.state.mytenant.wxuser.nickname
        this.user.headimg = this.$store.state.mytenant.wxuser.headimgurl
        this.user.openid = this.$store.state.mytenant.wxuser.openid
    }
　　this.loadsize()
},


mounted(){
     //电表数字插件
　 
    
    this.$nextTick(()=>{


        
        
     }); 
},
methods:{
    getMeterIDStr(meterid)
    {
        var str = "表号"+PrefixInteger(meterid,6)
        
        return str
    },
    getPriceStr(priceValue)
    {
        var str = "¥"+priceValue.toFixed(2)+"/kwh"
        return str
    },
    getTotalEP()
    {
        var totalEP = 0.0
        if (null == this.curMeter)
        {
            return totalEP.toFixed(2)
        }

        totalEP = this.curMeter.cur_ep
        return totalEP.toFixed(2)
    },
     //初始化窗口的尺寸
    loadsize()
    {
        //计算父窗口的大小，然后指定
    　 　this.bodysize.height=(window.innerHeight-80)+'px';
        this.bodysize.width = window.width+'px';
　　},
    //显示电表选择
    onShowMeterPicker()
    {
        this.showMeterPicker = true
    },
    //隐藏电表选择
    hideMeterPicker()
    {
        this.showMeterPicker = false
    },
    onCancelSelMeter()
    {
        this.hideMeterPicker()
    },
    onConfirmSelMeter()
    {
        this.hideMeterPicker()
    } ,
    onChangeSelMeter(picker, value, index)
    {
        debugger
        if (null != value && value.meter != null)
        {
            this.selCurrentMeter(value.meter)
        }
    },

    callPay()
     {
        if (typeof WeixinJSBridge == "undefined"){
        if( document.addEventListener ){
            document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
        }else if (document.attachEvent){
            document.attachEvent('WeixinJSBridgeReady', onBridgeReady); 
            document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
        }
        }else{
          this.onBridgeReady();
        }
     },

     onBridgeReady(){
       
      //清空账单查询结果
      var _this = this
      this.paymentResult = null;
      this.ispaycancel =false
      this.queryPaymentTimer =  setInterval(this.queryPayState,2000)
     
      this.isNeedReload = true
             
     
      var timestam = getBeijingtimeStam()
      var packages = _this.orderinfo.packages
        WeixinJSBridge.invoke(
            'getBrandWCPayRequest', {
              "appId":_this.orderinfo.appId,     //公众号名称，由商户传入     
              "timeStamp":_this.orderinfo.timeStamp,         //时间戳，自1970年以来的秒数     
              "nonceStr":_this.orderinfo.nonceStr, //随机串     
              "package":_this.orderinfo.package,     
              "signType":"MD5",         //微信签名方式：     
              "paySign":_this.orderinfo.paySign //微信签名 
            },
            function(res){
            if(res.errMsg != "" ){
                if(res.err_msg == "get_brand_wcpay_request:ok" ){
                    alert("支付成功")
                }
                else if(res.err_msg == "get_brand_wcpay_request:cancel" )
                {
                    _this.NotifyPayCancel()
                    _this.ispaycancel = true
                   _this.hideToast()
                   
                    
                }
                else if(res.err_msg == "get_brand_wcpay_request:fail" )
                {
                    alert("支付失败")
                }
            // 使用以上方式判断前端返回,微信团队郑重提示：
                // _this.wxparam.ret= 2
                 //_this.errmsg = res.errMsg
            } 
        }); 
      },

    NotifyPayCancel()
    {
         var _this =this
        _this.$store.dispatch('NotifyPayCancel',_this.orderinfo.paymentid).then((prepay) => {    
        }).catch((ex)=>{
        })
    },
    CreateChargePay(chargePayCmd)
    {
        debugger
         var _this =this
        _this.$store.dispatch('CreateNewChargePayment',chargePayCmd).then((prepay) => {    

        
        if (null == prepay)     
        {
             _this.hideToast()
            return
        }
        else
        {
            this.orderinfo = prepay
            this.callPay()

        }

        }).catch((ex)=>{
             _this.hideToast()
            
        })
    },
    chargeDD(chargeFee)
    {

        
        var _this =this

        _this.showToast("电表充值中...")
        _this.chargefee = chargeFee

        _this.$store.dispatch('GetNewCommandSN').then((sn) => {    

        
        if (null == sn)     
        {
            _this.showToast1Failed()
            return
        }
        else
        {
            
            _this.commandsn = sn.command_sn

            //调用充值支付命令

            var chargeParam={meter_id:_this.curMeter.meter_id,
                            charge_fee:_this.chargefee,
                            tenant_openid:_this.user.openid,
                            command_sn:_this.commandsn}
            _this.CreateChargePay(chargeParam)
            
        }


        }).catch((ex)=>{
    
             _this.hideToast()
            return
        })

    },

    //查询支付结果
    queryPayState()
    {
        //判断执行的充值命令是否为空
        var _this = this
        var gap = 0

         _this.showToast("支付中...")

        if (_this.orderinfo == null)
        {
            _this.hideToast()
            return;
        }


        //如果用户取消支付，则不用查询命令状态
        if (_this.ispaycancel)
        {
           // clearInterval(_this.queryPaymentTimer )
          //  _this.toast.clear()
         //   alert("支付取消")
        }

        
       //查询支付结果
        _this.$store.dispatch('QueryPayState',_this.orderinfo.paymentid).then((payState) => {    

                if (payState.payment_state == 2 || payState.payment_state >= 6)
                {
                    //延时2秒刷新电表数据
                    clearInterval(_this.queryPaymentTimer );
                    _this.queryCommandTimer = setInterval(this.queryCommand,2000)
                     _this.showToast("充值数据下载中...")
                }
                else if (payState.payment_state == 3 || payState.payment_state >= 4)
                {
                    alert("充值订单取消"+payState.payment_state)
                    clearInterval(_this.queryPaymentTimer );  
                    _this.hideToast()
                }

            }).catch((ex)=>{
                _this.hideToast()
            })
        
    },

     //查询充值命令执行结果
    queryCommand()
    {
        //判断执行的充值命令是否为空
        var _this = this

        if (_this.commandsn == null)
        {
            return;
        }

        var cmdSN ={command_sn:_this.commandsn,command_state:0}

        //如果用户取消支付，则不用查询命令状态
        if (_this.ispaycancel)
        {
            clearInterval(_this.queryCommandTimer )
        }

        
       
        _this.$store.dispatch('FetchCommandState',cmdSN).then((cmdState) => {    

             

            if (cmdState.command_state == 3)
            {
                alert("充值成功")

                 _this.showToast("刷新电表数据...")

                //延时2秒刷新电表数据
                _this.freshMeterTimer = setInterval(this.freshMeter,2000)
                clearInterval(_this.queryCommandTimer );
                 
            }
            else if (cmdState.command_state == 5)
            {
                 _this.hideToast()
                 clearInterval(_this.queryCommandTimer );
                Toast.fail("充值失败!"+cmdState.err_msg)
                
            }

            }).catch((ex)=>{
               _this.hideToast()
            })
        
    },

    //充值后延时刷新数据
    freshMeter()
    {
        clearInterval(this.freshMeterTimer );
        this.loadMeterByID()
    },

    //加载指定ID的电表数据
    loadMeterByID()
    {
        var _this = this

        if (null == _this.curMeter)
        {
            _this.hideToast()
            return
        }
          
        _this.$store.dispatch('GetMeterByID',_this.curMeter.meter_id).then((meter) => {    

            _this.hideToast()
            if (null == meter)     
            {
                 _this.hideToast()
                return
            }
            else
            {
   
                _this.curMeter = meter
                _this.addr =  _this.curMeter.room_name
                _this.meterleftEP =  _this.curMeter.left_ep
                _this.price =  _this.curMeter.ep_price
                _this.meterid =  _this.curMeter.meter_id
                _this.chargefee =  10.0
                _this.chargeEP =  0.0

                //装载电表选择框
                var meterIDStr = ''
                var len = meters.length
                var i = 0
                var meterTmp = null
                _this.meterIDList.length = 0
                for(i = 0; i < len; i++)
                {
                    meterTmp = meters[i];
                    if (null != meterTmp) 
                    {
                       meterIDStr =  PrefixInteger(meterTmp.meter_id,6)
                       var meterPickerItem = {"meter":meterTmp,"text":meterIDStr}
                       _this.meterIDList.push(meterPickerItem)

                    }
                }

                //装载默认
                _this.selCurrentMeter(_this.curMeter)

            }

            }).catch((ex)=>{
        
                _this.hideToast()
            })
        
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
                _this.meterList = meters
                _this.curMeter = meters[0]
                _this.addr =  _this.curMeter.room_name
                _this.meterleftEP =  _this.curMeter.left_ep
                _this.price =  _this.curMeter.ep_price
                _this.meterid =  _this.curMeter.meter_id
                _this.chargefee =  10.0
                _this.chargeEP =  0.0

                //装载电表选择框
                var meterIDStr = ''
                var len = meters.length
                var i = 0
                var meterTmp = null
                _this.meterIDList.length = 0
                for(i = 0; i < len; i++)
                {
                    meterTmp = meters[i];
                    if (null != meterTmp) 
                    {
                       meterIDStr =  PrefixInteger(meterTmp.meter_id,6)
                       var meterPickerItem = {"meter":meterTmp,"text":meterIDStr}
                       _this.meterIDList.push(meterPickerItem)

                    }
                }

                //装载默认
                _this.selCurrentMeter(_this.curMeter)

            }

            }).catch((ex)=>{
        
                _this.hideToast()
            })
        
    },
    //选择当前电表
    selCurrentMeter(meter)
    {
        if (null == meter)
        {
            return
        }

        var _this = this
        _this.curMeter      =  meter
        _this.addr          =  _this.curMeter.room_name
        _this.meterleftEP   =  _this.curMeter.left_ep
        _this.price         =  _this.curMeter.ep_price
        _this.meterid       =  _this.curMeter.meter_id
        _this.chargefee     =  10.0
        _this.chargeEP      =  0.0
    },

    //加载充值水表
    loadWMeter()
    {
        
    },
    hideToast()
    {
        this.toast.clear()
        this.toastShowFlag = false    
    },
    showToast(msg)
    {
        var _this = this;

        if (_this.toastShowFlag)
        {
            _this.toast.message=msg
        }
        else
        {
            _this.toast = Toast.loading({
                            duration: 0, // 持续展示 toast
                            message: msg,
                            forbidClick: true,
                            loadingType: 'spinner'
                    });
            _this.toastShowFlag = true
        }
       
    },

    showToast1Failed(msg)
    {
        var _this = this;
        _this.toast = ToastToast.fail("充值命令失败!")
    },
    showToastSuccess(msg)
    {
        var _this = this;

        _this.toast = ToastToast.success(msg)
    }
},
 mounted: function () {

     var _this = this;

    _this.showToast("加载水电表数据")

    _this.loadMeter()

    //启动微信登录回调定时任务
    _this.$nextTick(function () {
        
    })

 }
}
</script>