<template>
    <div class="devpage-body" :style="bodysize">
        <van-toast id="custom-tip" />
        <van-popup v-model="showop" position="bottom" :overlay="true" custom-style="height: 80%;">
          <div class="devpage-operation">
            <div class="devpage-operation-on" @click="onclickHezha()">
                合闸
            </div>
            <div class="devpage-operation-off" @click="onclickFenzha()">
                分闸
            </div>
          </div>
        </van-popup>
       <van-popup v-model="show" position="bottom" :overlay="true" >
        <div class="pay_password" >
            <!-- 密码输入框 -->
            <div class="password_input">
                <p style="text-align: center">请输入操作密码</p>
                <van-password-input
                        :value="value"
                />
            </div>
            <!--键盘-->
            <van-number-keyboard
                    :show="show"
                    @blur="show = false"
                    @input="onInput"
                    @delete="onDelete"
            />
        </div>
    </van-popup>

        <div id="devpage-row1">
            <div class="devitem-magrin-gap"/>
            <div class="row1-body">
              <div id="sel-meter">
                   <div id="sel-meter-selarrow" @click="backparent()">
                      <img src="@/assets/arrowleft.png" style="height:16px;width:16px"/>
                      返回
                  </div>
                  <div id="sel-meter-meter">
                      {{this.currentmeter.meter_addr}}_{{this.currentmeter.room_name}}
                  </div>
             </div>
             <div id="devpage-title">
                电表余额(kwh)
             </div>
             <div id="devpage-leftEP">
                 <meternumber totalwidth="100%" totalheight="60px" bgcolor="#0084FF" v-bind:bits="7" v-bind:value="meterleftEP"></meternumber>
            </div>

            <div id="devpage-foot">
                <myinfo title="" content=""></myinfo>
                <myinfo title="电价(kwh)" frcolor="#FFFFFF" v-bind:content="currentmonthEP"></myinfo>
                <myinfo title="上月(kwh)" frcolor="#FFFFFF" v-bind:content="lastMonthEP"></myinfo>
                <myinfo title="今日(kwh)"  frcolor="#FFFFFF" v-bind:content="todayEP"></myinfo>
                <myinfo title="" content=""></myinfo>
            </div>
            </div>
            <div class="devitem-magrin-gap"/>
        </div>
         <div id="devpage-row2">
             <div class="infoitem">
                <div class="infoitem-img">
                    <img src="@/assets/totalep.png" style="height:16px;width:16px"/>
                </div>
                <div class="infoitem-text">
                    {{this.metertotalEP}}kwh
                </div>
             </div>
              <div class="infoitem">
                <div class="infoitem-img">
                    <img src="@/assets/power.png" style="height:16px;width:16px"/>
                </div>
                <div class="infoitem-text">
                    {{this.meterPt}}kw
                </div>
             </div>
              <div class="infoitem" @click="onselopeclick()">
                <div class="infoitem-img">
                    <img src="@/assets/statushe.png" style="height:16px;width:16px"/>
                </div>
                <div class="infoitem-text">
                    合闸
                </div>
             </div>
        </div>
        <div id="devpage-row2">
             <div class="infoitem" @click="CommitCmd(0x31)">
                <div class="infoitem-img">
                    <img src="@/assets/timer.png" style="height:16px;width:16px"/>
                </div>
                <div class="infoitem-text" >
                    刷新
                </div>
             </div>
              <div class="infoitem">
                <div class="infoitem-img">
                    <img src="@/assets/money1.png" style="height:16px;width:16px"/>
                </div>
                <div class="infoitem-text">
                    充值记录
                </div>
             </div>
              <div class="infoitem" @click="onHistory()">
                <div class="infoitem-img">
                    <img src="@/assets/current.png" style="height:16px;width:16px"/>
                </div>
                <div class="infoitem-text">
                    用电记录
                </div>
             </div>
             
        </div>
        
        <div id="devpage-row3">
                <div class="devpage-gap"></div>
                <div class="devpage-button">
                     <van-button type="info" size="large" @click="chargemeter()">电费充值</van-button>
                </div>
                <div class="devpage-gap"></div>
        </div>
    </div>
</template>  

<style>
/*电费管理主页布局*/
.devpage-body{
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction:column;
    flex-wrap: nowrap;
    justify-content: stretch; 
    align-items: stretch;}

/*2行的布局，第1行*/
#devpage-row1{
    display:flex;
    order: 1;
    flex-grow: 4;
    flex-shrink:4;
    flex-basis: 0px;
    flex-direction:row;
    flex-wrap: nowrap;
    justify-content: space-between; 
    align-items: stretch;
    background-color:#0084FF;
}


/*2行的布局，第2行*/
#devpage-row2{
    display: flex;
    flex-direction:row;
    justify-content: space-around; 
    align-items: stretch;
    order: 2;
    flex-grow: 1;
    flex-shrink: 1;
    flex-basis: 0px;
    background-color: white;
    z-index: 2;
}

/*2行的布局，第2行*/
#devpage-row3{
    display: flex;
    width: 100%;
    flex-direction:row;
    justify-content: stretch; 
    align-items: stretch;
    order: 3;
    flex-grow: 1;
    flex-shrink: 1;
    flex-basis: 0px;
    background-color: white;
    z-index: 2;
}


/*第一行的左右边距 */
.devitem-magrin-gap{
    display:flex;
    flex-grow: 0;
    flex-shrink:0;
    flex-basis: 10px;
    flex-direction:row;
    flex-wrap: nowrap;
    justify-content: space-between; 
    align-items: stretch;
    background-color:#0084FF;
}

/*第一行的左右边距 */
.row1-body{
    display:flex;
    flex-direction:column;
    flex-grow: 1;
    flex-shrink:1;
    flex-basis: 10px;
    flex-wrap: nowrap;
    justify-content: space-between; 
    align-items: stretch;
    background-color:#0084FF;
}

/*信息栏*/
.infoitem{
    display: flex;
    flex-direction:column;
    justify-content: center; 
    align-items: center;
    flex-grow: 1;
    flex-shrink: 1;
    flex-basis: 20px;
    background-color: white;
}

/*信息栏-图标*/
.infoitem-img{
    display: flex;
    flex-direction:row;
    justify-content: center; 
    align-items: flex-end;
    flex-grow: 1;
    flex-shrink: 1;
    flex-basis: 20px;
    background-color: white;
}

/*信息栏-图标*/
.infoitem-text{
    display: flex;
    flex-direction:row;
    justify-content: center; 
    align-items: flex-start;
    flex-grow: 1;
    flex-shrink: 1;
    flex-basis: 20px;
    font-size: 12px;
    background-color: white;
    color: #CCC;
}

/*2行的布局，第2行*/
#devpage-steper{
    display: flex;
    flex-direction:row;
    justify-content: center; 
    align-items: center;
    order: 2;
    flex-grow: 4;
    flex-shrink: 4;
    flex-basis: 0px;
    background-color: white;
    z-index: 2;
}

/*2行的布局，第2行*/
.devpage-button{
    display: flex;
    flex-direction:row;
    justify-content: stretch; 
    align-items: stretch;
    flex-grow: 4;
    flex-shrink: 4;
    flex-basis: 500px;
    background-color: white;
    z-index: 2;
}

/*标题栏 */
#devpage-title{
    display: flex;
    flex-direction:row;
    justify-content:center; 
    align-items:center;
    height:100px;
    width: 100%;
    order: 1;
    flex-grow: 1;
    flex-shrink: 1;
    flex-basis: 100px;
    background-color:rgba(0,0,0,0.0);
    color: #FFFFFF;
    font-size: 22px;
}

/*剩余电度*/
#devpage-leftEP{
    width: 100%;
    order: 2;
    flex-grow: 2;
    flex-shrink: 2;
    background-color:rgba(0,0,0,0.0);

}


/*电费分项*/
#devpage-foot{
    display: flex;
   flex-direction:row;
    flex-wrap: nowrap;
    justify-content: space-between; 
    width: 100%;
    order: 3;
    flex-grow: 1;
    flex-shrink: 1;
    background-color:rgba(0,0,0,0.0);
}

/*当前电表*/
#sel-gap{
    display: flex;
    flex-direction:row;
    flex-wrap: nowrap;
    justify-content: flex-start; 
    width: 100%;
    order: 4;
    flex-grow: 1;
    flex-shrink: 1;
    color: #ddd;
    background-color:rgba(0,0,0,0.0);
}


/*当前电表*/
#sel-meter{
    display: flex;
    flex-direction:row;
    flex-wrap: nowrap;
    justify-content:space-between;
    align-items: center;
    width: 100%;
    order: 1;
    flex-grow: 1;
    flex-shrink: 1;
    color: #ffffff;
    background-color:rgba(0,0,0,0.0);
    
}
#sel-meter-gap{
    display: flex;
    flex-direction:row;
    flex-wrap: nowrap;
    justify-content: flex-start; 
    align-items: center;
    flex-basis: 20px;
    flex-grow: 1;
    flex-shrink: 1;
    color: #ffffff;
    background-color:rgba(0,0,0,0.0);
}

#sel-meter-meter{
    display: flex;
    flex-direction:row;
    flex-wrap: nowrap;
    justify-content: flex-end; 
    align-items: center;
    flex-basis: 20px;
    flex-grow: 3;
    flex-shrink: 3;
    color: #ffffff;
    background-color:rgba(0,0,0,0.0);
}

#sel-meter-selarrow{
    display: flex;
    flex-direction:row;
    flex-wrap: nowrap;
    justify-content: flex-start; 
    align-items: center;
    flex-basis: 50px;
    flex-grow: 0;
    flex-shrink: 0;
    color: #ffffff;
    background-color:rgba(0,0,0,0.0);
    font-size: 16px;
}

.devpage-gap{
    display:flex;
    flex-basis: 10px;
    flex-grow: 0;
    flex-shrink:0;
    flex-basis: 20px;
    flex-direction:column;
    flex-wrap: nowrap;
    justify-content: space-between; 
    align-items: stretch;
    background-color:#FFFFFF;
}

/*分合操作面板 */
.devpage-operation{
    display:flex;
    width: 100%;
    height: 400px;
    flex-grow: 1;
    flex-shrink:1;
    flex-basis: 200px;
    flex-direction:row;
    flex-wrap: nowrap;
    justify-content: space-around; 
    align-items: center;
  
    background-color:rgba(0,0,0,0.0);
}

/*分合操作面板-分按钮 */
.devpage-operation-on{
    display:flex;
    flex-basis: 100px;
    flex-grow: 0;
    flex-shrink:0;
    height: 100px;
    flex-basis: 100px;
    flex-direction:row;
    flex-wrap: nowrap;
    justify-content: center; 
    align-items: center;
    border-radius: 100%;
    background-color:#FF0000;
    color: #FFFFFF;
    font-size: 20px;
    box-shadow:0px 6px 15px rgb(48, 47, 47);
}
/*分合操作面板-分按钮 */
.devpage-operation-off{
    display:flex;
    flex-basis: 100px;
    flex-grow: 0;
    flex-shrink:0;
    flex-basis: 100px;
    height: 100px;
    flex-direction:row;
    flex-wrap: nowrap;
    justify-content: center; 
    align-items: center;
    border-radius: 100%;
    background-color:#00FF00;
    color: #FFFFFF;
    font-size: 20px;
    box-shadow:0px 6px 15px rgb(48, 47, 47);
}
.van-popup {
            transform: none;
        }
 
        .pay_password {
            background: #FAFAFA;
            position: fixed;
            left: 0;
            bottom: 0;
            width: 100%;
            height: 63%;
        }
 
        .password_input {
            position: fixed;
            left: 0;
            bottom: 250px;
            width: 100%;
        }

</style>

<script>
import { Button } from 'vant'
import { Stepper } from 'vant'
import { Overlay } from 'vant'
import { Popup } from 'vant';
import { Toast } from 'vant';
import { Cell, CellGroup } from 'vant';
import meternumber from '@/components/MyCommon/meternumber.vue'
import myinfo from '@/components/MyCommon/myinfo.vue'
import myinfobutton from '@/components/MyCommon/myinfobutton.vue'




export default {
 name: 'premetercharge',
  components:{
     "meternumber":meternumber,
     "myinfo":myinfo,
     "myinfobutton":myinfobutton
   
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
     isbusy:false,
     openid:'',
     nikename:'',
     headimg:'',
     currentmeter:this.$store.state.premeter.currentpremeter,
     chargevalue:1,
     state:2,
     meterid:0,
     meterleftEP:0,
     metertotalEP:0,
     meterPt:0,
     meterName:"",
     currentmonthEP:"",
     todayEP:"",
     lastMonthEP:"",
     code:0,
     starttick:0,
     expiretick:0,
     accessorydata:0,
     showop:false,
     show:false,
     value: '123',
     showKeyboard: true,
     yksel:0
     
    }
  },
  created(){
      debugger
　　this.loadsize()
},
watch: {
  nikename (newVal, oldVal) {
      var ii = 0;
    //do something
  }
},
methods:{
    
     //调用支付功能
     testPay()
     {
        var _this= this
        var order= null
        var unifieldorder = {openid:"oRvGF1YWJSGup8qiY27js5BbOf70",paymentid:getBeijingtimeStam()+"11",message:'testpay',fFee:1.0}
        new Promise(() => {
            crtunifiledorder(unifieldorder).then(response => {
                
                
                _this.orderinfo = response.data.data
                if (null != _this.orderinfo)
                {
                 //  _this.callPay()
                }
                

            }).catch(error => {

               
                var dd1 = 0
            })
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
    backparent()
    {
        router.replace({path:'/main/dev'});   
    },
    onHistory()
    {
        router.replace({path:'/main/historydata'});   
    },
    onselopeclick()
    {
        this.showop = true;
    },
    onclickHezha()
    {
        this.show = true;
        this.showop = false;
        this.value = "";
        this.yksel = 0;
    },
    onclickFenzha()
    {
        this.show = true;
        this.showop = false;
        this.value = "";
        this.yksel = 1;
    },
     onInput(key) 
     {
        this.value = (this.value + key).slice(0, 6);
        if (this.value.length == 6)
        {
            if (this.value == "123456")
            {
                this.ykoperation();
                
            }
            else
            {
                alert("密码错误");
                this.value = "";
            }
        }
        
     },
     showOperationTip()
     {
         var _this = this;
         const toast = Toast.loading({
            duration: 0,       // 持续展示 toast
            forbidClick: true, // 禁用背景点击
            message: '命令执行中...',
            loadingType: 'spinner',
            selector: '#custom-tip'
            });

            let second = 30;
            const timer = setInterval(() => {
            second--;
            if (second&&_this.state==3) {
               // toast.setData({
               // message: `执行中...`
              //  });
            } else {
                clearInterval(timer);
                Toast.clear();
            }
            }, 1000);
     },
     onDelete()
    {
        this.value = this.value.slice(0, this.value.length - 1);
        
    },
    toFixFormat(ep)
    {
        
        var data = (parseFloat(ep)/100.0);
        var fData = data.toFixed(1);
        return fData;
    },
  
loadsize(){

    
    //计算父窗口的大小，然后指定
　 　this.bodysize.height=window.innerHeight+'px';
    this.bodysize.width = window.width+'px';

    //设置昵称

　　},

    //状态机:装载电表数据
    stateLoadMeter:function () {   
      
      if (this.isbusy)
      {
          return;
      }
    
    
      this.isbusy  = true;
      var _this = this;

      axios({
        url:this.$GetServerURL()+"/Meter/GetMeter" ,               //下载用户的电表数据
        method: 'post',
        responseType: 'json', // 默认的
        data: {
           
            "MeterID":_this.meterid
        }
        }).then(function (response) {

         
            if (response.data != null)        //下载成功，提取电表数据
            {
                _this.currentmeter = response.data;
               // store.commit("setcurrentmeter",response.data);            
                
            }
            else                              //提取数据失败，提示用户
            {
              //  store.commit("seterrmsg",response.Message);
              
            }
         
            _this.isbusy = false;
            _this.state = 2;
        }).catch(function (error) {
            
        })
    },

    
    //状态机:查询执行结果
    stateFetchCmdState:function () {   
      
      if (this.isbusy)
      {
          return;
      }
    
    
      this.isbusy  = true;
      var _this = this;
      var starttick = parseInt(this.starttick) +"";
      var expireTick = parseInt(this.expiretick)+"";
    //  var meterIDStr = store.state.currentmeter.ID+"";
      var codeStr = this.code+"";
      var currenttick = 0;

      axios({
        url:this.$GetServerURL()+"/Meter/FetchCmdState" ,               
        method: 'post',
        responseType: 'json', // 默认的
        data: {
           
            "openid":_this.openid,
            "meterid":meterIDStr,
            "code":codeStr,     //充值命令
            "starttick":starttick,     //充值命令
            "expiretick":expireTick,     //充值命令
            "pwd":"1000",     //密码
            "fee":"1000",     //10元
        }
        }).then(function (response) {

         
            if (response.data != null && !response.data.IsError )        //下载成功，提取电表数据
            {
                 if(response.data.Data.state == 4 && response.data.Data.starttick == _this.starttick)    
                 {
                     Toast.success('命令执行成功');
                    // alert("命令执行成功!");
                     _this.isbusy = false;
                    _this.state = 2;

                   //  store.commit("setreloadmeterflag",1);      //清除重载标志位
                     return;
                 }
                 else
                 {
                     currenttick = _this.$GetCurrentSec();

                     //判断是否已经超时
                     if (currenttick > _this.expiretick)
                     {
                         Toast.fail('超时未响应');
                       //  alert("超时未响应");
                         _this.isbusy = false;
                         _this.state = 2;
                         return;
                     }
                     else    //如果未超时则继续执行
                     {
                         _this.isbusy = false;
                         _this.state = 3;
                         return;
                     }
                 }
                
            }
            else                              //提取数据失败，提示用户
            {
                currenttick = _this.$GetCurrentSec();

                //判断是否已经超时
                if (currenttick > _this.expiretick)
                {
                    Toast.fail('超时未响应');
                    //alert("超时未响应");
                    _this.isbusy = false;
                    _this.state = 2;
                    return;
                }
                else    //如果未超时则继续执行
                {
                    _this.isbusy = false;
                    _this.state = 3;
                    return;
                }
            }
         
            _this.isbusy = false;
            _this.state = 2;
             Toast.fail('设备无响应');
        }).catch(function (error) {
            alert("执行失败");
            _this.isbusy = false;
            _this.state = 2;
        })
    },


    //定时回调函数
    CallTick:function () {

         //更新实时数据
        if (this.currentmeter != null)
        {
            this.meterleftEP = this.currentmeter.LeftEP/100;
            this.metertotalEP = this.currentmeter.TotalEP/100;
            this.meterPt = (this.currentmeter.Pt/10000).toFixed(3);
            this.meterName = this.currentmeter.Addr+"_"+this.currentmeter.Name;
            this.currentmonthEP = this.currentmeter.CurrentMonthEP/100+"";
            this.todayEP = this.currentmeter.TodayEP/100+"";
            this.lastMonthEP = this.currentmeter.LastMonthEP/100+"";
            this.meterid =  this.currentmeter.ID;
        }

      switch(this.state)
      {
        case 0:        //系统登录中
          {
              this.state = 1;
              break;
          }
        case 1:        //装载电表数据
          {
              this.stateLoadMeter();
              break;
          }
        case 2:        //系统空闲中
          {
              break;
          }
          case 3:        //定期刷新电表实时数据
          {
              this.stateFetchCmdState();
              break;
          }
      }

    },

//执行命令,code位操作命令
CommitCmd(codeCmd)    //用户操作
{
     

     if (this.isbusy)
      {
          return;
      }

      this.isbusy  = true;
      this.starttick = this.$GetCurrentSec();
      this.expiretick = this.starttick + 30; //30秒的超时

      //充值命令
      this.code=codeCmd;        

      var starttick = parseInt(this.starttick) +"";
      var expireTick = parseInt(this.expiretick)+"";
     // var meterIDStr = store.state.currentmeter.ID+"";
      var codeStr = this.code+"";
      var _this = this;

      //显示提示
      this.showOperationTip();
      
      //向服务器提交充值电度
      axios({
        url:this.$GetServerURL()+"/Meter/MeterCmd" ,               //下载用户的电表数据
        method: 'post',
        responseType: 'json',           // 默认的
        data: {
            "openid":_this.openid,
            "meterid":meterIDStr,
            "code":codeStr,             //充值命令
            "starttick":starttick,      //充值命令
            "expiretick":expireTick,    //充值命令
            "pwd":"1000",               //密码
            "data":"1000",              //10度
        }
        }).then(function (response) {
          
          _this.state = 3;
          _this.show = false;
          _this.isbusy = false;
        }).catch(function (error) {
 
        })

    
},
//用户充电
chargemeter()    //用户操作
{
     
     return;
   
     if (this.isbusy)
      {
          return;
      }

      this.isbusy  = true;
      this.starttick = this.$GetCurrentSec();
      this.expireTick = this.starttick + 30; //30秒的超时

      //充值命令
      this.code=8;        

      //充值电度
      this.accessorydata = 1000;  


      var starttick = parseInt(this.starttick) +"";
      var expireTick = parseInt(this.expiretick)+"";
     // var meterIDStr = store.state.currentmeter.ID+"";
      var codeStr = this.code+"";
      var _this = this;
      
      //向服务器提交充值电度
      axios({
        url:this.$GetServerURL()+"/Meter/MeterCmd" ,               //下载用户的电表数据
        method: 'post',
        responseType: 'json', // 默认的
        data: {
            "openid":_this.openid,
            "meterid":meterIDStr,
            "code":codeStr,     //充值命令
            "starttick":starttick,     //充值命令
            "expiretick":expireTick,     //充值命令
            "pwd":"1000",     //密码
            "data":"1000",     //10度
        }
        }).then(function (response) {
          
          _this.state = 3;
          _this.show = false;
          _this.isbusy = false;
        }).catch(function (error) {
 
        })

    
},
//用户充电
ykoperation()    //用户操作
{
     
//遥控
      if (this.yksel == 0)    //遥控合闸
      {
          this.code=0x33;  
      }
      else         //遥控跳闸
      {
          this.code=0x32; 
      }
            
      this.CommitCmd(this.code);


    
}
},
 mounted: function () {

    
  //   this.nikename = store.state.nikename;
    // this.headimg = store.state.headimg;
   //  this.state.currentmeter

    //获取当前的路径，并从路径中提取出扫码的电表
 //   var params =  this.$getUrlVars(window.location.href);
   // var sMeterID = params["param"];  
   // this.meterid = Number(sMeterID);

    //启动微信登录回调定时任务
    this.$nextTick(function () {
        
       // setInterval(this.CallTick, 500);

    })

   
 }
}
</script>