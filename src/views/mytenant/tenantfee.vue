<template>
    <div class="paybody" :style="bodysize">
      
       <div class="payrow1">
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
       <div class="payrow2">
           <div class="payrow2-monthpiker" v-if="this.hasloadday">
                <mytimeswiper :days="this.monthlist" v-on:onChangeDayRange="onChangeDayRange" v-on:onChangeDay="onChangeDay">
                </mytimeswiper>
           </div>
       </div>
       <div class="payrow-rowgap10" style="background-color:#eeeeee;"/>
       <div class="payrow-rowgap10" style="background-color:#eeeeee;"/>
       <div class="payrow3">
           <div class="meterbill-div" v-for="bill in meterbills " :key="bill.fee_sn">

               <meterbill 
                      v-bind:start_value_pro="bill.startvalue"
                      v-bind:end_value_pro="bill.endvalue"
                      v-bind:used_value_pro="bill.usedvalue"
                      v-bind:price_pro="bill.price"
                      v-bind:period_pro="bill.period_value"
                      bill_title_pro="电费单"
                      v-bind:weight_pro="bill.weight"
                      v-bind:total_fee_pro="bill.totalfee"
                      v-bind:bill_sn_pro="bill.sn"
                      v-bind:room_name_pro="bill.roomname"
                      v-bind:paystatus_pro="bill.paystatus"
                      v-bind:bill_pro="bill"
                      v-on:selChange="onSelChange(bill)"
                ></meterbill>
           </div>
           <div class="meterbill-div" v-for="bill in wmeterbills " :key="bill.fee_sn">

               <meterbill 
                      v-bind:start_value_pro="bill.startvalue"
                      v-bind:end_value_pro="bill.endvalue"
                      v-bind:used_value_pro="bill.usedvalue"
                      v-bind:price_pro="bill.price"
                      v-bind:period_pro="bill.period_value"
                      bill_title_pro="水费单"
                      v-bind:weight_pro="bill.weight"
                      v-bind:total_fee_pro="bill.totalfee"
                      v-bind:bill_sn_pro="bill.sn"
                      v-bind:room_name_pro="bill.roomname"
                      v-bind:paystatus_pro="bill.paystatus"
                      v-bind:bill_pro="bill"
                       v-on:selChange="onSelChange(bill)"
                ></meterbill>
           </div>
           
       </div>
      
       <div class="payrow4">
           <div class="payrow-buttongap"/>
   
           <div class="payrow4-button">
              

               <van-button v-if="hasSelFee===true" type="primary" ref="payButton" size="large" @click="payFee();">支付(¥{{totalFee.toFixed(2)}}元)</van-button>
               <van-button v-else  type="default" ref="payButton" size="large" disabled >请选择收费单</van-button>
               <div class="payrow-buttongap"/>
           </div>
            <div class="payrow-buttongap"/>
       </div>
    </div>
</template>  

<style>
/*缴费管理主页面*/
.paybody{
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction:column;
    flex-wrap: nowrap;
    justify-content: stretch; 
    align-items: stretch;}

/*第一行头部,10%高度*/
.payrow1{
    display:flex;
    width: 100%;
    flex-grow: 0;
    flex-shrink:0;
    flex-basis: 60px;
    flex-direction:row;
    flex-wrap: nowrap;
    justify-content: stretch; 
    align-items: stretch;
    background-color:#0084FF;
}
/*2行的布局，横向日历控件*/
.payrow2{
    display:flex;
    width: 100%;
    flex-grow: 0;
    flex-shrink:0;
    flex-basis: 50px;
    flex-direction:row;
    flex-wrap: nowrap;
    justify-content: stretch; 
    align-items: stretch;
    background-color:#FFFFFF;
}

/*3行的布局，间隔*/
.payrow3{
     display:flex;
    width: 100%;
    flex-grow: 50;
    flex-shrink:50;
    flex-basis: 0px;
    flex-direction:column;
    flex-wrap: nowrap;
    justify-content: start; 
    align-items: stretch;
    background-color:#EEEEEE;
}

/*4行的布局，内容项目*/
.payrow4{
     display:flex;
    flex-grow: 20;
    flex-shrink:20;
    flex-basis: 0px;
    flex-direction:row;
    flex-wrap: nowrap;
    justify-content: flex-start; 
    align-items: stretch;
    background-color:#EEEEEE;
}
/*4行的布局，内容项目*/
.payrow4-button{
    display:flex;
    height: 100%;
    flex-grow: 80;
    flex-shrink:80;
    flex-basis: 0px;
    flex-direction:column;
    flex-wrap: nowrap;
    justify-content: flex-start; 
    align-items:flex-start;
    background-color:#EEEEEE;
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


/*时间选择控件*/
.payrow2-monthpiker{
    display: flex;
    flex-direction:row;
    justify-content:stretch; 
    align-items: stretch;
    width: 100%;
    height: 100%;
    background-color: #FFFFFF;
    border-bottom:5px solid #ffffff;
    overflow: hidden;
}

/*4行的布局，底部留白部分*/
.paydetail{
    display:flex;
    height: 100%;
    flex-direction: row;
    flex-grow: 10;
    flex-shrink:10;
    flex-basis: 0px;
    flex-direction:row;
    flex-wrap: nowrap;
    justify-content: stretch; 
    align-items: stretch;
    background-color:#FFFFFF;
}

/*4行的布局，底部留白部分*/
.paydetailbody{
    display:flex;
    height: 100%;
    flex-direction: column;
    flex-grow: 10;
    flex-shrink:10;
    flex-basis: 0px;
    flex-wrap: nowrap;
    justify-content: stretch; 
    align-items: stretch;
    background-color:#FFFFFF;
}


/*4行的布局，底部留白部分*/
.paydetail-gap{
    display:flex;
    width: 100%;
    flex-direction: row;
    flex-grow: 0;
    flex-shrink:0;
    flex-basis: 10px;
    flex-direction:row;
    flex-wrap: nowrap;

}

/*清单标题*/
.paydetail-title{
    display:flex;
    width: 100%;
    flex-direction: row;
    flex-grow: 1;
    flex-shrink:1;
    flex-basis: 0px;
    flex-direction:row;
    flex-wrap: nowrap;
    justify-content: center; 
    align-items: center;
    font-size: 18px;
    color: #555;
}


.meterbill-div
{
    display:flex;
    width: 100%;
    flex-direction: row;
    flex-basis: 160px;
    flex-direction:row;
    flex-wrap: nowrap;
    justify-content: center; 
    align-items: center;
    overflow: hidden;
}
/*合计*/
.paydetail-button{
    display:flex;
    width: 100%;
    flex-direction: row;
    flex-grow: 1;
    flex-shrink:1;
    flex-basis: 0px;
    flex-direction:row;
    flex-wrap: nowrap;
    justify-content: stretch; 
    align-items: center;
    overflow: hidden;
}

.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.block {
  width: 120px;
  height: 120px;
  background-color: #fff;
}
/* */
</style>

<script>
import {billdayscope2str,getBeijingtimeStam,sqlstr_2_timestamp,PrefixInteger,timestam_2_str,timestam_2_shortstr,conversqltimestr_2_time} from '@/api/common'
import { Button } from 'vant';
import { Stepper } from 'vant';
import { Toast } from 'vant';
import { Popup } from 'vant';
import { Loading } from 'vant';
import { Cell, CellGroup } from 'vant';
import mytimeswiper from '@/components/TimeSwiper/mytimeswiper.vue'
import meterbill from '@/components/MyCommon/meterbill.vue'

export default {
 name: 'tenantfee',
  components:{
      "mytimeswiper":mytimeswiper,
      "meterbill":meterbill,
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
     hasSelFee:false,
     totalFee:0.0,
     lastQueryDate:null,
     isNeedReload:false,
     paymentResult:null,      //账单查询结果
     queryPaymentTimer:null,
     hasBill:false,
     isLoading:true,
     toast:null,
     date1Str:"",
     date2Str:"",
     hasloadday:false,                 //是否已经装载日期数据
     monthlist:new Array(),            //月列表
     selMonths:new Array(),             //当前被选中的6个月份列表
     meterbills:new Array(),
     wmeterbills:new Array(),
      orderinfo:                      //支付单信息
      {
         appid:'',
         mch_id:'',
         nonce_str:'',
         prepay_id:'',
         sign:'',
      },
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

watch:{
     'meterbills':{
         handler:function(val,oldval){

             
            console.log('修改后',val,'修改前',oldval);
         },   
     },
    
  },
mounted(){
     //电表数字插件
　 
    
    this.$nextTick(()=>{


        //this.loadBillList();
        
     }); 
},
methods:{

    //获取起始日期字符串
    getPeriodStr(startTmStr,endTmStr)
    {
        
        var startTm = sqlstr_2_timestamp(startTmStr)
        var endTm = sqlstr_2_timestamp(endTmStr)
        endTm.setHours(endTm.getHours() + 8);
        startTm.setHours(startTm.getHours() + 8);
        var str = billdayscope2str(startTm,endTm)

        return str
    },

    //初始化窗口的尺寸
    loadsize()
    {
        //计算父窗口的大小，然后指定
    　 　this.bodysize.height=window.innerHeight+'px';
        this.bodysize.width = window.width+'px';
　　},

    addBill(bill)
    {
         var isSel = false
        if (bill.fee_status == 1)
        {
            isSel = true
        }

        var billItem ={
            startvalue:bill.ep_start,
            endvalue:bill.ep_end,
            usedvalue:bill.ep_used,
            price:bill.ep_price,
            period_value:this.getPeriodStr(bill.time_start,bill.time_end),
            totalfee:bill.total_fee,
            sn:bill.fee_sn,
            weight:"度",
            roomname:bill.room_name,
            paystatus:bill.fee_status,
            issel:isSel

        }

        this.meterbills.push(billItem)
    },

    //添加水费单
     addWaterBill(bill)
    {
           
        
        var isSel = false
        if (bill.fee_status == 1)
        {
            isSel = true
        }

        var payStatus = false;
        var billItem ={
            startvalue:bill.water_start,
            endvalue:bill.water_end,
            usedvalue:bill.water_used,
            price:bill.water_price,
            period_value:this.getPeriodStr(bill.time_start,bill.time_end),
            totalfee:bill.total_fee,
            sn:bill.fee_sn,
            weight:"吨",
            roomname:bill.room_name,
            paystatus:bill.fee_status,
            issel:isSel
        }

        this.wmeterbills.push(billItem)
    },

    //检查是否有支付的费单被选择
    checkSelFee()
    {
        debugger
        var i = 0
        var fee = 0
        this.hasSelFee = false
   

        for( i = 0; i < this.wmeterbills.length; i++)
        {
            if (this.wmeterbills[i] != null && this.wmeterbills[i].issel)
            {
                this.hasSelFee = true
                fee +=this. wmeterbills[i].totalfee
            }
        }

        for( i = 0; i < this.meterbills.length; i++)
        {
            if (this.meterbills[i] != null && this.meterbills[i].issel)
            {
                this.hasSelFee = true
                fee += this.meterbills[i].totalfee
            }
        }

        this.totalFee = fee

        _this.$forceUpdate()
    },

    //根据登录的微信信息，下载租户的收费单
    loadBillList(day)
    {
        this.loadMeterFee(day)
        this.loadWMeterFee(day)

      
    },

    //装载电费单
    loadMeterFee(day)
    {
        
        var _this = this                                   //先清除查询结果队列
        this.meterbills.length=0

        var selDayMin = new Date(day.year,day.month,1)
        var selDayMax = new Date(day.year,day.month,1)
        var maxdate = new Date(selDayMin.getFullYear(), selDayMin.getMonth()+1, 0).getDate(); 
        selDayMax.setDate(maxdate);
        selDayMax.setHours(23,59,59)

        var date1Str = timestam_2_str(selDayMin)
        var date2Str = timestam_2_str(selDayMax)

        
        var queryParam = {open_id:this.user.openid,start_time:date1Str,end_time:date2Str}

         _this.$store.dispatch('GetTenantMeterFee',queryParam).then((meterfees) => {

             meterfees.forEach(function (fee, index) {

              _this.addBill(fee)
            
             }) 
               //检查是否有费单需要支付
              _this.checkSelFee()
              _this.$forceUpdate()

              }).catch((ex)=>{
  
                var ddd1=  0;
        })
    },

    //装载水费单
    loadWMeterFee(day)
    {
        var _this = this                                   //先清除查询结果队列
        this.wmeterbills.length=0

        var selDayMin = new Date(day.year,day.month,1)
        var selDayMax = new Date(day.year,day.month,1)
        var maxdate = new Date(selDayMin.getFullYear(), selDayMin.getMonth()+1, 0).getDate(); 
        selDayMax.setDate(maxdate);
        selDayMax.setHours(23,59,59)

        var date1Str = timestam_2_str(selDayMin)
        var date2Str = timestam_2_str(selDayMax)

        
        var queryParam = {open_id:this.user.openid,start_time:date1Str,end_time:date2Str}

         _this.$store.dispatch('GetTenantWaterFee',queryParam).then((wmeterfees) => {

             wmeterfees.forEach(function (fee, index) {

              _this.addWaterBill(fee)
            
             }) 
              
               //检查是否有费单需要支付
               _this.checkSelFee()
               _this.$forceUpdate()

              }).catch((ex)=>{
  
                var ddd1=  0;
        })
    },

    //数据下载完成的回调函数,由Store负责回调
    onDataLoaded()
    {
        
        

    },

    //获取当前选择的月份
    getSelMonth()
    {
        var item = null
        this.monthlist.forEach(element => {

                if (element.sel)
                {
                    item= element
                }

          });

        return item
    },

  
    //下载房间费单
    onChangeDayRange(daylst)
    {
        this.selMonths = daylst
     
    },

    //选择日期后重新加载用户的电费单
    onChangeDay(day)
    {
        
        this.loadBillList(day);
        this.lastQueryDate = day

    

        
    },
    //选择费单事件
    onSelChange(bill)
    {
        
        this.checkSelFee()
    },
    test11(bill)
    {
        
        var tt= 0;
    },

    //支付费单
    payFee()      
    {
        
        var _this = this
        var payParam = {
            openid:this.user.openid,
            user_id:0,
            fee_list:[]
        }

        var userid = 0
        var i = 0
        var bill = null

        //添加所有的电费单
        for(i = 0; i <this.meterbills.length;i++ )
        {
             bill = this.meterbills[i];
             if (null != bill)
             {
                 var feeItem = {fee_sn:bill.sn,fee_type:"WaterFee"}
                 if (userid == 0)
                 {
                     userid = bill.user_id
                 }

                 if (userid != bill.user_id)     //判断缴费单是否缴费给同一个业主
                 {
                     return
                 }

                 if (!bill.issel)
                 {
                     continue
                 }

                 payParam.fee_list.push(feeItem)
             }
        }

        //添加所有的水费单
        for(i = 0; i <this.wmeterbills.length;i++ )
        {
             bill = this.wmeterbills[i];
             if (null != bill)
             {
                 var feeItem = {fee_sn:bill.sn,fee_type:"WaterFee"}
                 if (userid == 0)
                 {
                     userid = bill.user_id
                 }

                 if (userid != bill.user_id)     //判断缴费单是否缴费给同一个业主
                 {
                     return
                 }

                 if (!bill.issel)
                 {
                     continue
                 }

                 payParam.fee_list.push(feeItem)
             }
        }

        //将预付单参数转换成Json字符串
        var str = JSON.stringify(payParam)

       

        //请求API
        _this.$store.dispatch('CreateNewPayment',str).then((prepay) => {

            
            _this.orderinfo = prepay
                if (null != _this.orderinfo)
                {
                   _this.callPay()
                }
              

              }).catch((ex)=>{
  
                var ddd1=  0;
        })

        
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
      this.paymentResult = null;
      this.queryPaymentTimer =  setInterval(this.queryPayment,2000)
      this.isNeedReload = true
             
      var _this = this
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
            // 使用以上方式判断前端返回,微信团队郑重提示：
                 _this.wxparam.ret= 2
                 _this.errmsg = res.errMsg
            } 
        }); 
      },

      //查询支付结果
      queryPayment()
      {
          

          var _this = this
          if(!_this.isNeedReload)
          {
             clearInterval(_this.queryPaymentTimer)
             return
          }

          if (null == _this.orderinfo)
          {
              return
          }

         var qryParam = {payment_id:_this.orderinfo.paymentid,
                        user_id:0,
                        tenant_openid:"",
                        start_time:"2020-07-05 23:57:16",
                        end_time:"2020-07-05 23:57:16"}

        
          //请求API
        _this.$store.dispatch('QueryPayment',qryParam).then((paymentInfo) => {

            if (paymentInfo.payment_status != 0)
            {
               
                _this.isNeedReload = false
                _this.loadBillList(this.lastQueryDate)

                 alert("支付成功"+paymentInfo.payment_status)
                _this.$forceUpdate()

            }

            }).catch((ex)=>{
  
        
                var ddd1=  0;
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
        
        var yearcount = 3;
        var monthcount = 12;
        var i = 0;
        var j = 0;
        var monthitem ;

        

        //装载日期选择控件
        for(i = 0; i < 5; i++)
        {
            for(j = 0; j < 12; j++)
            {
                var monthitem={};
                monthitem.year = 2019+i;
                monthitem.month = j+1;
                monthitem.content = "无";
                monthitem.sel = false;
                monthitem.actived = false;
                monthitem.iscurrent = false;
                monthitem.ispre = false;
                monthitem.isnext = false;
                _this.monthlist.push(monthitem);
            }
        }
        
        _this.hasloadday = true;

        var date = new Date()
        var nyear = date.getFullYear()+""
        var mon = (date.getMonth()+1)+""

      


    })

 }
}
</script>