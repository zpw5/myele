<template>
    <div class="paymentbody" :style="bodysize">
      
       <div class="paymentrow1">
           <div class="payrow-rowgap10"/>
           <div class="payrow1-header">
              <div class="payrow1-userwx">  
                  <div class="payrow1-headerimg">
                      <img :src="user.headimg" style="height:30px;width:30px;"/>
                  </div>
                  <div class="payrow-rowgap10"/>
                  <div class="payrow1-nickname">
                      {{user.nickname}}
                  </div>
              </div>
              <div class="payrow1-useraddr">
                  <div class="payrow1-useraddr-txt">
                      
                  </div>
                  <div class="payrow1-useraddr-name">
                      
                  </div>
              </div>
           </div>
           <div class="payrow-rowgap10"/>
       </div>
       <div class="paymentrow2">
          <van-cell v-for="pay in paymentLst " :key="pay.payment_id" center  v-bind:label="sqlTimeToStr(pay.time_crt)"  v-bind:value="getFeeStr(pay.payment_fee/100)" >
            <template slot="title">
                <div style="color:#220000">
                    <span>{{getPaymentInfo(pay)}}</span>
                    <span v-if="pay.payment_status===2">{{getPaymentStatus(pay)}}</span>
                    <span v-else-if="pay.payment_status===6">{{getPaymentStatus(pay)}}</span>
                    <span v-else>{{getPaymentStatus(pay)}}</span>
                </div>
            </template>
           <van-icon v-if="pay.payment_type === 'weixin'"
                slot="icon"
                name="after-sale"
                style="line-height: inherit;"
                color="#005500"
                size="30"
            />
             <van-icon v-else
                slot="icon"
                name="after-sale"
                style="line-height: inherit;"
                color="#550000"
                size="30"
            />
             
          </van-cell>
       </div>
    </div>
</template>  

<style>
/*账单主页面*/
.paymentbody{
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction:column;
    }

/*第一行头部,10%高度*/
.paymentrow1{
    display:flex;
    width: 100%;
    height:60px;
    flex-direction:row;
    flex-wrap: nowrap;
    justify-content: stretch; 
    align-items: stretch;
    background-color:#0084FF;
}
/*2行的布局，横向日历控件*/
.paymentrow2{
    flex: 1;       /*填充父容器剩余空间 */
    width: 100%;
    background: #ffffff;
    overflow-y: scroll;     /*超出部分滚动*/

}


/*列距*/
.payrow-buttongap{
    display:flex;
    flex-basis: 10px;
    height: 100%;
    flex-grow: 10;
    flex-shrink:10;
    background-color:rgba(0,0,0,0.0);
}

/*列距*/
.payrow-colgap10{
    display:flex;
    flex-basis: 10px;
    flex-grow: 0;
    flex-shrink:0;
    background-color:rgba(0,0,0,0.0);
}

/*列距*/
.payrow-rowgap10{
    display:flex;
    flex-basis: 10px;
    flex-grow: 0;
    flex-shrink:0;
    background-color:rgba(0,0,0,0.0);
}

/*头部*/
.payrow1-header{
    display:flex;
    flex-direction:row;
    justify-content:flex-start; 
    align-items: center;
    height: 100%;
    flex-grow: 10;
    flex-shrink:10;
    flex-basis: 10px;
    background-color:rgba(0,0,0,0.0);
}
/*头部导航栏--用户信息*/
.payrow1-userwx{
    display: flex;
    flex-direction:row;
    justify-content:flex-start; 
    align-items: center;
    height:100%;
    flex-grow: 50;
    flex-shrink: 50;
    flex-basis: 0px;
    overflow: hidden;
    font-size: 12px;
}


/*头部导航栏--用户地址*/
.payrow1-useraddr{
    display: flex;
    flex-direction:column;
    justify-content:space-around; 
    align-items: flex-end;
    height:100%;
    flex-grow: 50;
    flex-shrink: 50;
    flex-basis: 0px;
    overflow: hidden;
    font-size: 12px;
}

/*头部导航栏--用户头像和用户昵称*/
.payrow1-headerimg{
    display: flex;
    flex-direction:row;
    justify-content:center; 
    align-items: center;
    height:30px;
    width: 30px;
    overflow: hidden;
    border-radius: 50%;

}

/*头部导航栏--用户头像和用户昵称*/
.payrow1-nickname{
    display: flex;
    flex-direction:row;
    justify-content:flex-start; 
    align-items: center;
    height:100%;
    flex-grow: 50;
    flex-shrink: 50;
    flex-basis: 0px;
    overflow: hidden;
    font-size: 10px;
    color: #eeeeee;
  
}

/*头部导航栏--用户地址*/
.payrow1-useraddr-txt{
    display: flex;
    flex-direction:row;
    justify-content:flex-end; 
    align-items: flex-end;
    flex-grow: 50;
    flex-shrink: 50;
    flex-basis: 0px;
    overflow: hidden;
    font-size: 12px;
    color: #eeeeee;
}

/*头部导航栏--用户地址*/
.payrow1-useraddr-name{
    display: flex;
    flex-direction:row;
    justify-content:flex-end; 
    align-items: flex-start;
    flex-grow: 50;
    flex-shrink: 50;
    flex-basis: 0px;
    overflow: hidden;
    font-size: 12px;
    color: #eeeeee;
}


/*重新自定义图标大小 */
.my-icon 
{
      min-width: 1.5em;
      height: 36px;
    font-size: 24px;
    line-height: 36px;
}
.van-cell__left-icon {
      min-width: 1.5em;
      height: 36px;
    font-size: 24px;
    line-height: 36px;
}



/* */
</style>

<script>
import {billdayscope2str,conversqltimestr_2_Beijingtime,getBeijingtimeStam,sqlstr_2_timestamp,PrefixInteger,timestam_2_str,timestam_2_shortstr,conversqltimestr_2_time} from '@/api/common'
import { Button } from 'vant';
import { Stepper } from 'vant';
import { Toast } from 'vant';
import { Popup } from 'vant';
import { Loading } from 'vant';
import { Cell, CellGroup } from 'vant';


export default {
 name: 'payment',
  components:{
   
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
     paymentLst:new Array(),
     isLoading:true,
     toast:null,
   
    }
  },
  created(){

debugger
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

    sqlTimeToStr(tm)
    {

        var timeItem = conversqltimestr_2_Beijingtime(tm)
        return timestam_2_str(timeItem)
    },

    //充值费用字符串
    getFeeStr(fee)
    {

        var feeStr = "¥"+fee.toFixed(2)+"元"
        return feeStr
    },

    //支付信息:支付原因+支付方式
    getPaymentInfo(payment)
    {
        if (null == payment)
        {
            return ""
        }

        var payDec = "支付数据错误";
        if (payment.payment_reason == "chargefee")
        {
            if (payment.payment_type == "weixin")
            {
                payDec = "自助在线充值"
            } 
            else{
                payDec = "管理员代充值"
            }
        }
        else if(payment.payment_reason == "payfee")
        {
            if (payment.payment_type == "weixin")
            {
                payDec = "自助在线缴费"
            } 
            else{
                payDec = "管理员代缴费"
            }
        }
        return payDec

    },

    //获取支付单的状态
    getPaymentStatus(pay)
    {
        var strStatus = "异常"
        if(pay.payment_status == 2 || pay.payment_status == 6)
        {
            strStatus = "正常"
        }
        return "("+strStatus+")"
    },

     //初始化窗口的尺寸
    loadsize()
    {
        //计算父窗口的大小，然后指定
    　 　this.bodysize.height=(window.innerHeight-60)+'px';
        this.bodysize.width = window.width+'px';
　　},
    loadPayment()
    {
        var _this = this
        var qryParam = {payment_id:"",
                        user_id:0,
                        tenant_openid:this.user.openid,
                        start_time:"2020-07-05 23:57:16",
                        end_time:"2020-07-05 23:57:16"}

        
          //请求API
        _this.$store.dispatch('QueryPayment',qryParam).then((paymentList) => {

            debugger
            this.paymentLst = paymentList
           _this.$forceUpdate()

        }).catch((ex)=>{

              
        })
    },

   
},
 mounted: function () {

     var _this = this;

     this.toast = Toast.loading({
            message: '加载中...',
            forbidClick: true,
            loadingType: 'spinner'
    });

    //启动微信登录回调定时任务
    this.$nextTick(function () {
        
    
        this.loadPayment()

    })

 }
}
</script>