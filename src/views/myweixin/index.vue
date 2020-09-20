<template>
  <div>

  </div>
   
</template>      
 
<script>  

import {GetWeixinAPPID,GetRequest,GetServerURL,getBeijingtimeStam} from '@/api/common'
import {crtunifiledorder} from '@/api/myweixin'
import { Loading } from 'element-ui'

export default {
  name:'addroom',
   data() {
     return{
      wxparam:
      {
         ret:0,      //执行结果:-0执行中,-1执行成功，-2执行失败
         url:'',
         fun:'',
         param:'',
         code:'',
         state:'',
         iscallback:false,
         isfailed:false,
         errmsg:''
      },
      orderinfo:
      {
         appid:'',
         mch_id:'',
         nonce_str:'',
         prepay_id:'',
         sign:'',
      },
      tip:'扫码验证中...',
      loading:null
     }
  },
   methods: {

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
                   _this.callPay()
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
      
   
     //解析参数
     parse()
     {
       

          var _this = this
       
 
          //获取参数，用于判断是否为客户请求或者微信回调
          var fun = GetRequest("fun");
          var code = GetRequest("code");


          if(fun != null)               //用户请求前端
          {
              var param = GetRequest("param");
              var state = fun+param

              //根据不同的功能码请求微信服务器和填充跳转页面
            
              this.tip = '登录验证中...'

              var redirect_uri = encodeURIComponent( GetServerURL() + "/myweixin");
              var url = "https://open.weixin.qq.com/connect/oauth2/authorize?";
              var sParam = "appid=" + GetWeixinAPPID() + "&";
              sParam = sParam + "redirect_uri=" + redirect_uri + "&";
              sParam = sParam + "response_type=code&";
              sParam = sParam + "scope=snsapi_userinfo&";
              sParam = sParam + "state=" + state + "#wechat_redirect";
              url += sParam;

              this.wxparam.url = location.href
              this.wxparam.fun = fun
              this.wxparam.param = param
              location.href = url
              
              
          }
          else if (code != null)        //微信返回用户的code和功能码
          {
              
              this.tip = '验证登录...'

              var state = GetRequest("state");
              this.wxparam.iscallback = true
              this.wxparam.code = code
              this.wxparam.state = state

              

              if (_this.wxparam.state != null && _this.wxparam.state.length >= 2)
              {
                  var funcode = _this.wxparam.state.slice(0,2);
                  var param = _this.wxparam.state.slice(2,_this.wxparam.state.length);
                  var userparam = { code:code,param:param};
                  var wxuserinfo = null

                  //通过微信提取用户基本信息
                  _this.$store.dispatch('FetchWXUserInfoByCode',userparam).then((data) => {    

                      
                      if (null == data)     
                      {
                          _this.tip = '登录验证失败,请重新扫码！'
                          _this.loading.close()
                          return
                      }
                      else
                      {
                          wxuserinfo = JSON.parse(data)
                          if(wxuserinfo == null)
                          {

                              _this.tip = '获取用户微信信息失败!'
                              _this.loading.close()
                              return
                          }
                          else if(wxuserinfo.subscribe == 0)
                          {
                              _this.tip = '未关注公众号，请先关注公众号再操作！'
                               window.location =  "https://mp.weixin.qq.com/s/HvaBTWtba54z_Z1nM5LTpw"
                              _this.loading.close()
                              return
                          }
                          else
                          {
                              _this.$store.commit('SET_PREWXUSER', wxuserinfo)
                              _this.tip = '登录验证成功!'
                          }

                          if (funcode == "fu" && param == "")         //获取微信用户信息
                          {
                              

                              
                          }
                          else if (funcode == "pm" && param != null && param != "")     //扫码预付费电表PreMeter缩写
                          {
                              //提取电表数据
                              this.proccessPreScan(param)

                          } 
                          else if (funcode == "tl" && param != null && param != "")     //租户登录或者点击公众号的"充值缴费"
                          {
                              //根据租户的用户信息，转到租户的充值缴费主界面
                              
                              _this.loading.close();
                              _this.$store.commit('SET_CUR_TENANTUSER', wxuserinfo)
                              _this.$router.push('/mytenant')
                             

                          } 
                          else if (funcode == "ul" && param != null && param != "")     //房东登录或者点击公众号的"充值缴费"
                          {
                              //提取电表数据
                              _this.$router.push('/regpremeter')
                              this.testPay()

                          } 

                      }
                      
                        //提取附加数据
                        // _this.testPay()

                      }).catch((ex)=>{
                  
                          _this.wxparam.ret = 2
                      })
                 
              }
              

          }

     },
     showLoading()
     {
        var _this = this
        _this.loading = this.$loading({
          lock: true,
          text: _this.tip,
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
     },
     hideLoading()
     {
        loading()
     },
     proccessPreScan(param)      //处理用户扫码预付费电表
     {
       
       var _this = this
        _this.$store.dispatch('GetPreMeterByID',param).then((premeter) => {    

            
            if (null == premeter)     
            {
                _this.tip = '获取电表失败！'
                _this.loading.close()
                return
            }
            else
            {
                _this.tip = '获取电表信息成功'
                _this.loading.close()

                var userinfo = _this.$store.state.user.prewxuser

                //检查电表是否已经开封
                
                if (premeter.owner_openid == null || premeter.owner_openid == "")
                {
                    _this.$router.push('/regpremeter')
                }
                else if (userinfo.openid == premeter.owner_openid)    //如果用户是业主，则跳转到业主界面
                {
                    _this.$router.push('/premetercharge')
                }
                else    //充值界面
                {
                    _this.$router.push('/premetercharge')
                }
                

            }
            
              //提取附加数据
              // _this.testPay()

            }).catch((ex)=>{
        
                _this.wxparam.ret = 2
            })

     }

   },
  mounted() {
    var _this = this
    this.$nextTick(() => {

      _this.showLoading()
      _this.parse()
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
