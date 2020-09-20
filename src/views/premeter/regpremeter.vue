<template>
  <div class="regpremeter-container">
      <div class="regpre-header">
          <div class="regpre-header-row1">
              注册电表
          </div>
          <div class="regpre-header-row2">
              <div class="regpreheader-sn">
                <el-row>
                  <el-col span="24">
                    <img src="@/assets/premetersn.png" style="height:40px;width:112px"/>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col span="24">
                    {{metersn}}
                  </el-col>
                </el-row>
              </div>
          </div>
      </div>
      <div class="regpre-body">
        <div class="regprebody-content" >
            <el-row type="flex" justify="center">
              <el-col span="2"/>
              <el-col span="20">
                    <el-input
                      @focus="onshowKeyBoard"
                      placeholder="请输入业主手机号"
                      v-model="ownertel">
                        <i slot="suffix" class="el-input__icon">
                         <svg-icon icon-class="mobile" />
                      </i>
                    </el-input>
              </el-col>
              <el-col span="2"/>
            </el-row>
            <el-row type="flex" justify="center">
              <el-col span="2"/>
               <el-col span="9">
                    <el-input
                      placeholder="短信验证码"
                      v-model="msg">
                      
                    </el-input>
                     
              </el-col>
              <el-col span="2"/>
              <el-col span="9">
                  <el-button type="primary">短信验证
                    <i slot="suffix" class="el-input__icon">
                         <svg-icon icon-class="短信" />
                      </i>
                  </el-button>
              </el-col>
             
              <el-col span="2"/>
            </el-row>
             <el-row type="flex" justify="center">
              <el-col span="2"/>
              <el-col span="20">
                    <el-input
                      placeholder="请输入安装地址"
                      v-model="addr">
                      <i slot="suffix" class="el-input__icon">
                         <svg-icon icon-class="address" />
                      </i>
                    </el-input>
              </el-col>
              <el-col span="2"/>
            </el-row>
             <el-row type="flex" justify="center">
              <el-col span="2"/>
              <el-col span="20">
                    <el-input
                      placeholder="房号"
                      v-model="roomname">
                      <i slot="suffix" class="el-input__icon el-icon-s-home"></i>
                    </el-input>
              </el-col>
              <el-col span="2"/>
            </el-row>
             <el-row type="flex" justify="center">
              <el-col span="2"/>
              <el-col span="20">
                    <el-input
                      placeholder="电费单价"
                      v-model="price">
                       <i slot="suffix" class="el-input__icon">
                         <svg-icon icon-class="money" />
                      </i>
                     
                    </el-input>
              </el-col>
              <el-col span="2"/>
            </el-row>
            <el-row>
              <el-col span="24">
                <div class="regpre-content-bottomgap"/>
              </el-col>
            </el-row>
        </div>
          
      </div>
      <div class="regpre-foot">
        <div class="regprefoot-bt">
          <div class="regprefoot-bt-gap"/>
          <div class="regprefoot-purchagebt" @click='onRegisteMeter'>
            购买电表
          </div>
        </div>
        <div class="regprefoot-tip">
            珠海明远电气有限公司
        </div>
      </div>
     
  </div>
  
</template>      
 
<script>  

import {GetWeixinAPPID,GetRequest,GetServerURL,uuidGenerator,PrefixInteger} from '@/api/common'
import {crtunifiledorder} from '@/api/myweixin'
import { Loading } from 'element-ui'
import { Message } from 'element-ui'
import { Button } from 'element-ui'
import { Popup } from 'vant'

export default {
  name:'regpremeter',
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
      loading:null,
      ownertel:'',
      roomname:'',
      addr:'',
      price:0.0,
      msg:'',
      metersn:'',
      showkeyboard:false,
      showpop:false,
     }
  },
   methods: {

    onKBInput()
    {

    },
    onKBDelete()
    {

    },
    onshowKeyBoard()
    {
        
        this.showpop = true
        this.showkeyboard = true
    },
    onRegisteMeter()
    {
        debugger
        var _this = this
        var meter = _this.$store.state.premeter.currentpremeter
        var meteruser = _this.$store.state.user.prewxuser
        if (meter)
        {
            meter.meter_addr = _this.addr
            meter.room_name = _this.roomname
            meter.ep_price = _this.price
            meter.owner_tel = _this.ownertel
            meter.owner_openid = meteruser.openid
            var PreMeter={meter_id:meter.meter_id, 
                            meter_addr:meter.meter_addr, 
                            owner_openid:meter.owner_openid, 
                            owner_tel:meter.owner_tel,
                            ep_price:meter.ep_price,
                            room_name:meter.room_name}

            debugger

            //调用后台注册电表
             _this.$store.dispatch('RegistePreMeter',PreMeter).then(() => {

          
                   Message({ 
                          message: '注册电表成功!', 
                          type: 'success',
                          duration:  1000
                      })
              }).catch((ex)=>{
          
                  
              })
        }
        
    }

   },
  mounted() {
    var _this = this
    this.$nextTick(() => {

      _this.metersn = PrefixInteger(_this.$store.state.premeter.currentpremeter.meter_id,10)
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
 
  /*注册电表-整体*/
.regpremeter-container{
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction:column;
    flex-wrap: nowrap;
    justify-content: space-between; 
    align-items: stretch;
    background-color: #cccccc;
}

  /*注册电表-头部*/
.regpre-header{
    display: flex;
    width: 100%;
    flex-direction:column;
    flex-wrap: nowrap;
    justify-content: center; 
    align-items: stretch;
    flex-grow: 25;
    flex-shrink: 25;
    flex-basis: 0px;   /*高度 60,并且不增加*/
    background-color: #0084FF;
    color: #ffffff;
}

  /*注册电表-内容*/
.regpre-body{
    display: flex;
    width: 100%;
    flex-direction:column;
    flex-wrap: nowrap;
    justify-content: flex-start; 
    align-items: center;
    flex-grow: 55;
    flex-shrink: 55;
    flex-basis: 0px;   /*高度 60,并且不增加*/
    background-color: #eeeeee;
    color: #555555;
}

  /*注册电表-页脚*/
.regpre-foot{
    display: flex;
    width: 100%;
    flex-direction:column;
    flex-wrap: nowrap;
    justify-content: space-between; 
    align-items: stretch;
    flex-grow: 20;
    flex-shrink: 20;
    flex-basis: 0px;   /*高度 60,并且不增加*/
    background-color: #eeeeee;
    color: #555555;
}


  /*注册电表-头部标题60%高度*/
.regpre-header-row1{
    display: flex;
    width: 100%;
    flex-direction:row;
    flex-wrap: nowrap;
    justify-content: center; 
    align-items: center;
    flex-grow: 50;
    flex-shrink: 50;
    flex-basis: 0px;   /*高度 60,并且不增加*/
    background-color: #0084FF;
    color: #ffffff;
    font-size: 20px;
}

  /*注册电表-头部标题30%高度*/
.regpre-header-row2{
    display: flex;
    width: 100%;
    flex-direction:row;
    flex-wrap: nowrap;
    justify-content: center; 
    align-items: stretch;
    flex-grow: 50;
    flex-shrink: 50;
    flex-basis: 0px;   /*高度 60,并且不增加*/
    background-color: #0084FF;
    color: #ffffff;
   
}

/*注册电表-头部标题序列号*/
.regpreheader-sn{
    display: flex;
    width: 90%;
    height: 100%;
    flex-direction:column;
    flex-wrap: nowrap;
    justify-content: center; 
    align-items: center;
    background-color: #ffffff;
    color: #555555;
    border-radius: 15px 15px 0 0;
    box-shadow:1px -3px 3px #555555
}

  /*注册电表-内容*/
.regprebody-content{
    display: flex;
    width: 90%;
    height: 95%;
    flex-direction:column;
    flex-wrap: nowrap;
    justify-content: space-around; 
    align-items: stretch;
    background-color: #ffffff;
    color: #555555;
    border-radius: 0 0 15px 15px;
    box-shadow:1px 3px 3px #555555
}

 /*注册电表-页脚按钮*/
.regprefoot-bt{
    display: flex;
    width: 100%;
    flex-direction:column;
    flex-wrap: nowrap;
    justify-content: center; 
    align-items: center;
    flex-grow: 10;
    flex-shrink: 10;
    flex-basis: 0px;   /*高度 60,并且不增加*/
    background-color: #eeeeee;
    color: #555555;
}
/*注册电表-页脚按钮*/
.regprefoot-bt-gap{
    display: flex;
    width: 100%;
    flex-direction:row;
    flex-wrap: nowrap;
    justify-content: center; 
    align-items: flex-end;
    flex-grow: 5;
    flex-shrink: 5;
    flex-basis: 0px;   /*高度 60,并且不增加*/
    background-color: #eeeeee;
    color: #ffffff;
}
 /*注册电表-页脚按钮*/
.regprefoot-purchagebt{
    display: flex;
    width: 80%;
    flex-direction:row;
    flex-wrap: nowrap;
    justify-content: center; 
    align-items: center;
    flex-grow: 10;
    flex-shrink: 10;
    flex-basis: 0px;   /*高度 60,并且不增加*/
    background-color: #0084FF;
    color: #ffffff;
    border-radius: 8px;
}
 /*注册电表-页脚注脚*/
.regprefoot-tip{
    display: flex;
    width: 100%;
    flex-direction:row;
    flex-wrap: nowrap;
    justify-content: center; 
    align-items: center;
    flex-grow: 10;
    flex-shrink: 10;
    flex-basis: 0px;   /*高度 60,并且不增加*/
    background-color: #eeeeee;
    color: #555555;
}

 /*注册电表-输入行*/
.regpre-content-row{
    display: flex;
    width: 100%;
    flex-direction:row;
    flex-wrap: nowrap;
    justify-content: center; 
    align-items: center;
    flex-grow: 10;
    flex-shrink: 10;
    flex-basis: 0px;   /*高度 60,并且不增加*/
    background-color: #eeeeee;
    color: #555555;
}

 /*注册电表-输入行*/
.regpre-content-bottomgap{
    display: flex;
    height: 40px;
    width: 100%;
    background-color: #ffffff;
    color: #555555;
}

</style>
