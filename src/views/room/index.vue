<template>
  <div class="app-container">
    <el-dialog
         
            title="注册房间"
            :visible.sync="dialogVisible"
            width="30%"
          >
          <addroom ref="roomlg" v-on:onclickOK="onNewDlgOK" v-on:onNewRoomDlgclickCancel="onNewRoomDlgclickCancel" />
         
     </el-dialog>
     <el-dialog
         
            title="绑定电表"
            :visible.sync="dlgMeterVisible"
            width="30%"
          >
          <addmeter ref="meterdlg" v-on:onBindMeterOK="onBindMeterOK" v-on:onBindMeterCancel="onBindMeterCancel" />
         
     </el-dialog>
     <el-dialog
         
            title="设置电表"
            :visible.sync="setmeter_dlg_visible"
            width="30%"
          >
          <setmeter ref="setmeterdlg" v-on:onclickOK="onSetMeterDlgOK" v-on:onClickCancel="onSetmeterDlgCancel" />
         
     </el-dialog>
      <el-dialog
         
            title="绑定水表"
            :visible.sync="dlgWMeterVisible"
            width="30%"
          >
          <addwmeter ref="wmeterdlg" v-on:onBindWMeterOK="onBindWMeterOK" v-on:onBindWMeterCancel="onBindWMeterCancel" />
         
     </el-dialog>
      <el-dialog
         
            title="设置水表"
            :visible.sync="setwmeter_dlg_visible"
            width="30%"
          >
          <setwmeter ref="setwmeterdlg" v-on:onclickOK="onSetWMeterDlgOK" v-on:onClickCancel="onSetwmeterDlgCancel" />
         
     </el-dialog>
      <el-dialog
         
            title="房间出租"
            :visible.sync="lessor_dlg_visible"
            width="50%"
          >
          <lessorconfirm ref="lessordlg" v-on:onclickOK="onlessorconfirmDlgOK" v-on:onClickCancel="onlessorconfirmDlgCancel" />
         
     </el-dialog>
    <el-row :gutter="10">
      <el-col :xs="24" :sm="12">
         <el-card class="user-center">
          <el-row type="flex" justify="space-start">   
            <el-col :span="4" class="room-filter">
                <el-input v-model="roomfilter.roomname" placeholder="房间号" size="mini"></el-input>
            </el-col>
              <el-col :span="8" class="room-filter">
                <el-input v-model="roomfilter.roomdec" placeholder="租户名称" size="mini"></el-input>
            </el-col>  
            <el-col :span="3" class="room-filter">
              <el-button type="primary" icon="el-icon-search" size="mini" @click="loadRoom" >查询</el-button>
            </el-col>
           <el-col :span="3" class="room-filter">
              <el-button type="primary" icon="el-icon-plus" size="mini" @click="onNewRoom" >添加</el-button>
            </el-col>
            <el-col  :span="6" class="room-exportcol">
                <el-button icon="el-icon-search" size="mini" @click="loadRoom" >导出Excel...</el-button>
            </el-col>
             

          </el-row>
          <el-row>
               <el-col :span="24">
                  <div class="room-row-gap"/>
               </el-col>
          </el-row>
          <el-row type="flex" justify="space-start">   
             <el-col :span="24" class="room-filter">
              <el-table
                :data="roomlist"
                element-loading-text="加载房间数据中..."
                border
                fit
                max-height="550"
                highlight-current-row
                :row-style="{height:'16px'}"
                :cell-style="{padding:'0px'}"
                @row-click="handleRoomChange"
                
                :header-cell-style="{background:'#eef1f6',color:'#606266'}"
              >
              <el-table-column align="center" label="序号" width="60">
                  <template slot-scope="scope">
                    {{ scope.$index+1 }}
                  </template>
                </el-table-column>
                  
                <el-table-column align="center" label="房间编号"  width="95">
                  <template slot-scope="scope">
                      <span v-if="scope.row.room_status === 1 " style="color:#555555">
                      {{scope.row.room_name}}</span>
                      <span v-else style="color:#cccccc">
                      {{scope.row.room_name}}</span>
                </template>
                </el-table-column>
                <el-table-column label="租户"  width="125">
                  <template slot-scope="scope">
                      <span v-if="scope.row.room_status === 1 " style="color:#555555">
                      {{scope.row.tenant_name}}</span>
                      <span v-else style="color:#cccccc">
                      {{scope.row.tenant_name}}</span>
                </template>
                </el-table-column>
                <el-table-column label="状态" width="80" align="center">
                  <template slot-scope="scope">
                      <span v-if="scope.row.room_status === 1 " style="color:#555555">
                      出租</span>
                      <span v-else style="color:#cccccc">
                      空置</span>
                </template>
                </el-table-column>
                <el-table-column label="出租日期" width="100" align="center">
                    <template slot-scope="scope">
                        <span v-if="scope.row.room_status === 1 " style="color:#555555">
                             {{sqlTime_2_shortstr(scope.row.tenant_time)}}
                        </span>
 
                  </template>
                </el-table-column>
               <el-table-column label="操作" prop="managefee" width="150" align="center">
                <template slot-scope="scope">
                   <el-link type="success"  icon="el-icon-s-open" v-if="scope.row.room_status===1" @click="unlessor(scope.row)" >退租</el-link>
                   <el-link type="primary" icon="el-icon-table-lamp" v-else @click="lessor(scope.row)" >出租</el-link>
                   <el-link type="danger"  icon="el-icon-delete" @click="handleDelete(scope.$index,scope.row)" >删除</el-link>  
                </template>
            </el-table-column>
              </el-table>
             </el-col>
          </el-row>
         </el-card>
      </el-col>
      <el-col :xs="24" :sm="12">
        <el-card class="user-center">
          <div v-if="hasSelRoom === false" style="color:red">
              请点击左边表格选择房间
          </div>
          <el-tabs v-model="activeName" @tab-click="handleClick" v-else>
            <el-tab-pane label="房间信息" name="first">
              <div class="user" style="width: 600px">
                <el-form ref="form" 
                  :model="currentroominfo" 
                  label-width="80px"
                  :rules="feeRules"
                  >

                  <el-form-item label="房间编号" >
                    <el-input v-model="currentroominfo.room_name" />
                  </el-form-item>
                  <el-form-item label="月租金"  prop="tenant_fee">
                    <el-input v-model="currentroominfo.tenant_fee"/>
                  </el-form-item>
                  <el-form-item label="管理费" prop="tenant_manage_fee">
                    <el-input v-model="currentroominfo.tenant_manage_fee" />
                  </el-form-item>
                  <el-form-item label="其他费用" prop="tenant_other_fee">
                    <el-input v-model="currentroominfo.tenant_other_fee"  />
                  </el-form-item>

                  <el-form-item>
                    
                    <el-button type="primary" v-if="currentroominfo.has_edit===true" @click="modifyRoom">确定修改</el-button>
                     <el-button type="primary" disabled="" v-if="currentroominfo.has_edit===false" @click="modifyRoom">确定修改</el-button>
                    <el-button   @click="cancelmodifyRoom">取消修改</el-button>
                  </el-form-item>
                </el-form>
              </div>

            </el-tab-pane>

            <el-tab-pane label="房间电表" name="second">
               <el-row type="flex" justify="space-end">   
                  <el-col :span="24" class="room-filter" >
                     
                      <div class="col-align-right">
                          <el-button type="primary" icon="el-icon-plus" size="mini"  @click="bindMeter">绑定新电表</el-button>
                      </div>
                       <div class="room-row-gap"/>
                  </el-col>
               </el-row>
              <el-row type="flex" justify="space-start">   
                <el-col :span="24" class="room-filter">
                  <el-table
                  :data="meterlist"
                  element-loading-text="加载房间电表..."
                  border   
                  fit
                  max-height="550"
                  highlight-current-row
                  :row-style="{height:'16px'}"
                  :cell-style="{padding:'0px'}"
                  :header-cell-style="{background:'#eef1f6',color:'#606266'}"
                  >
                 <el-table-column align="center" label="电表编号" width="80">
                    <template slot-scope="scope">
                        {{meterid2str(scope.row.meter_id)}}
                    </template>
                  </el-table-column>
                    
                
                   <el-table-column prop="ep_price" label="电价" width="80" align="center">
                      <template slot-scope="scope">
                           ¥{{scope.row.ep_price.toFixed(2)}}
                    </template>
                  </el-table-column>
                
                  <el-table-column  label="期初值" width="90" align="center">
                    <template slot-scope="scope">
                      
                           {{scope.row.ep_base}}度
                        
                    </template>
                  </el-table-column>
                  <el-table-column prop="m_cur_ep"  align="center" label="当前读数"  width="90">
                      <template slot-scope="scope">
                           <div style="color:#8888FF">
                              {{scope.row.cur_ep.toFixed(1)}}度
                           </div>
                      </template>
                  </el-table-column>
                  <el-table-column  align="center" label="抄表时间"  width="95">
                    <template slot-scope="scope">
                        {{pickTick2Timestr(scope.row.fresh_tick)}}
                    </template>
                  </el-table-column>
                <el-table-column label="操作" prop="managefee" width="150" align="center">
                  <template slot-scope="scope">
                    <el-link type="success" icon="el-icon-table-lamp"  @click="setMeter(scope.row)" >设置</el-link>
                    <el-link type="danger"  icon="el-icon-scissors" @click="unBindMeter(scope.row)" >解绑</el-link>  
                  </template>
                  
                </el-table-column>
                </el-table>
                </el-col>
              </el-row>
              
            </el-tab-pane>
            <el-tab-pane label="房间水表" name="third">

              <el-row type="flex" justify="space-end">   
                  <el-col :span="24" class="room-filter" >
                     
                      <div class="col-align-right">
                          <el-button type="primary" icon="el-icon-plus" size="mini"  @click="bindWMeter">绑定新水表</el-button>
                      </div>
                       <div class="room-row-gap"/>
                  </el-col>
               </el-row>
              <el-row type="flex" justify="space-start">   
                <el-col :span="24" class="room-filter">
                  <el-table
                  :data="wmeterlist"
                  element-loading-text="加载房间水表..."
                  border   
                  fit
                  max-height="550"
                  highlight-current-row 
                  :row-style="{height:'16px'}"
                  :cell-style="{padding:'0px'}"
                  :header-cell-style="{background:'#eef1f6',color:'#606266'}"
                  >
                 <el-table-column align="center" label="水表编号" width="90">
                    <template slot-scope="scope">
                        {{meterid2str(scope.row.meter_id)}}
                    </template>
                  </el-table-column>
                   <el-table-column align="center" label="16位标识号" width="90">
                    <template slot-scope="scope">
                        {{scope.row.meter_sn}}
                    </template>
                  </el-table-column>
                  <el-table-column prop="water_price" label="水价" width="70" align="center">
                    <template slot-scope="scope">
                       ¥{{scope.row.water_price.toFixed(2)}}
                    </template>
                  </el-table-column>
                  <el-table-column prop="m_cur_water"  align="center" label="当前读数"  width="100">
                      <template slot-scope="scope">
                           <div style="color:#8888FF">
                              {{scope.row.cur_water}}吨
                           </div>
                      </template>
                  </el-table-column>
                  <el-table-column  align="center" label="读取时间"  width="95">
                    <template slot-scope="scope">
                        {{pickTick2Timestr(scope.row.fresh_tick)}}
                    </template>
                  </el-table-column>
                <el-table-column label="操作" prop="managefee" width="150" align="center">
                  <template slot-scope="scope">
                     <el-link type="success" icon="el-icon-table-lamp"  @click="setWMeter(scope.row)" >设置</el-link>
                    <el-link type="danger"  icon="el-icon-scissors" @click="unBindWMeter(scope.row)" >解绑</el-link>  
                  </template>
                </el-table-column>
                </el-table>
                </el-col>
              </el-row>
            </el-tab-pane>
            <el-tab-pane label="房间租户" name="forth">

              <div style="width: 500px">
                <el-form ref="mailForm" :model="currentroominfo" label-width="100px" class="demo-ruleForm">
                  <el-form-item
                    prop="tenant_name"
                    label="租户名称"
                  >
                    <el-input v-model="currentroominfo.tenant_name" style="width: 250px;" />
                  </el-form-item>

                  <el-form-item
                    label="手机号"
                    prop="tenant_tel"
                  >
                    <el-input v-model="currentroominfo.tenant_tel" type="tel" autocomplete="off" />
                  </el-form-item>
                  <el-form-item
                    label="联系人"
                  >
                    <el-input v-model="currentroominfo.tenant_contactor"  autocomplete="off" />
                  </el-form-item >
                  <el-form-item label="租户微信">
                       <el-row>
                        <el-col :span="8">
                          <el-avatar shape="circle" :src="tenantInfo.tenant_img" :size="40"  ></el-avatar>
                        </el-col>
                        <el-col :span="8">
                           {{tenantInfo.tenant_nickname}}
                        </el-col>
                        <el-col justify="end" align="middle" :span="8" type="flex" >
                          <el-popover
                            placement="left"
                            width="160"
                            v-model="QSvisible"
                            @show="showQCtrl"
                            @hide="hideQCtrl">
                            <div  ref="qrCodeDiv">
                            </div>
                            <div style="color:#FF0000">
                                请租户扫码绑定
                            </div>
                            <el-button slot="reference">绑定微信</el-button>
                         </el-popover>
                        </el-col>
                      </el-row>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary"  @click="updatetenant">修改租户信息</el-button>
                  </el-form-item>
                </el-form>
              </div>
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </el-col>
    </el-row>

  </div>
</template>

<script>

import QRCode from 'qrcodejs2'
import {SecToDateTime,PrefixInteger,GetServerURL,time2BeijingTime,uuidGenerator,timestam_2_str,timestam_2_shortstr,conversqltimestr_2_time} from '@/api/common'
import { getwxuserinfobyuuid } from '@/api/user'
import { Message} from 'element-ui' 
import  addroom  from './addroom'
import  addmeter  from './addmeter'
import  addwmeter  from './addwmeter'
import  setmeter  from './setmeter'
import  setwmeter  from './setwmeter'
import  lessorconfirm  from './lessorconfirm'
import PanThumb from '@/components/PanThumb'  
import { getUserInfo,updatePass, resetEmail } from '@/api/user'
import { isvalidFP } from '@/utils/validate'
import { Loading } from 'element-ui'
let loading;

export default {
  name: 'Index',
  components: { PanThumb,addroom,addmeter,addwmeter,setmeter,setwmeter,lessorconfirm },
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.passForm.checkPass !== '') {
          this.$refs.passForm.validateField('checkPass')  
        }
        callback()
      }
    }
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.passForm.newPass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
     const validateRoomfee = (rule, value, callback) => {

       
       this.currentroominfo.has_edit = true
      if (!isvalidFP(value)) {
        callback(new Error('请输入正确的金额'))
      }  else {
        callback()
      }
    }

     const validateRoomName = (rule, value, callback) => {

       
       this.currentroominfo.has_edit = true
      if (value == null || value == "") {
        callback(new Error('房间编号不能为空'))
      }  else {
        callback()
      }
    }
    
    
    return {
         setmeter_dlg_visible:false,
         setwmeter_dlg_visible:false,
         dialogVisible:false,
         dlgMeterVisible:false,
         dlgWMeterVisible:false,
         lessor_dlg_visible:false,
         QSvisible:false,                //绑定微信扫码
         isShowQCtrl:false,
         Qcodectrl:null,
         uuid:"",
         roomfilter:{                            //费单过滤器
          areaid:10,
          roomname:'',
          roomdec:"",
        }  ,
        roomlist:new Array(),
        meterlist:new Array,
        wmeterlist:new Array,
        hasSelRoom:false,
        isNeedFetchUserinfo:false,
        currentroominfo:      //当前房间基本信息
        { 
            room_id:0,
            area_id:0,
            room_name:'',
            room_status:0,
            tenant_fee:0,
            tenant_manage_fee:0,
            tenant_other_fee:0,
            tenant_name:'',
            tenant_tel:'',
            tenant_openid:'',
            tenant_contactor:'',
            has_edit:false
        },
        tenantInfo:
        {
            tenant_openid:'',
            tenant_img:'',
            tenant_nickname:'',
        },
        feeRules: {
          room_name: [{  trigger: 'blur',validator: validateRoomName }],
          tenant_fee: [{  trigger: 'blur',validator: validateRoomfee }],
          tenant_manage_fee: [{  trigger: 'blur',validator: validateRoomfee }],
          tenant_other_fee: [{  trigger: 'blur',validator: validateRoomfee }],

        },
        user: {
          avatar: '',
          username: '',
          phone: 0,
          email: '',
          deptName: '',
          jobName: '',
          createTime: ''
        },
        activeName: 'first',
        passForm: {
          oldPass: '',
          newPass: '',
          checkPass: ''
        },
      
      rules: {
        oldPass: [{ required: true, message: '原密码不能为空', trigger: 'blur' }],
        newPass: [{ validator: validatePass, trigger: 'blur' }],
        checkPass: [{ validator: validatePass2, trigger: 'blur' }]
      },
      mailForm: {
        email: '',
        code: '',
        pass: ''
      },
      buttonName: '发送验证码',
      isDisabled: false,
      codeLoading: false,
      time: 60,
      logo: [
        { img: 'gitee.png', name: 'gitee', bind: false, radius: true },
        { img: 'github.png', name: 'github', bind: false, radius: true },
        { img: 'tencent_cloud.png', name: 'tencent_cloud', bind: false, radius: true },
        { img: 'qq.png', name: 'qq', bind: false, radius: false },
        { img: 'dingtalk.png', name: 'dingtalk', bind: false, radius: true },
        { img: 'microsoft.png', name: 'microsoft', bind: false, radius: false }
      ]
    }
  },
  computed: {
    avatar() {
      return require(`@/assets/avatar/c7c4ee7be3eb4e73a19887dc713505145.jpg`)
    }
  },
  created() {
    
    var tt = SecToDateTime(220)
    this.findUserInfo()
  },
  mounted()
  {
    this.loadRoom()

  },
   
  methods: {
     sqlTime_2_shortstr(timestr)
     {
       
       if (timestr != null && timestr != "")
       {
          var arr1 = timestr.split("T"); 
          return arr1[0]
       }
       else
       {
         return ""
       }

       
     },
      //将抄表的Tick转换成时间Tick
    pickTick2Timestr(tick)
    {
      debugger
        if (tick == 0)
        {
            return "未抄表";
        }
        tick = tick + 3600*8;   //加8小时
        var pickTime = SecToDateTime(tick)
        pickTime = time2BeijingTime(pickTime)
        return timestam_2_str(pickTime)
    },
  
    sec2Timestr(tick)
     {
       
       return  timestam_2_str(SecToDateTime(tick));
     },
     showQCtrl()
       {
           
           var _this = this
           this.isShowQCtrl = true
           this.uuid = uuidGenerator()
               
            //判断是否需要创建二维码
            if(_this.$refs.qrCodeDiv != null)
            {
                _this.$refs.qrCodeDiv.innerHTML = "";
    
                if (null != _this.Qcodectrl)
                {
                    _this.Qcodectrl.clear();
                }
                
                _this.Qcodectrl =  new QRCode(_this.$refs.qrCodeDiv, {
                        text: GetServerURL()+"/myweixin?fun=fu&param="+_this.uuid,  
                        width: 200,
                        height: 200,
                        colorDark: "#333333", //二维码颜色
                        colorLight: "#ffffff", //二维码背景色
                        correctLevel: QRCode.CorrectLevel.L//容错率，L/M/H
                });

                _this.isNeedFetchUserinfo = true
                _this.queryRegiste()

            }
       },
       //定时访问服务器，请求绑定的用户信息
      queryRegiste()
      {
          
         var _this = this 
         var paramfilter = {param:_this.uuid,code:''}

          
         if (!_this.isNeedFetchUserinfo)
         {
            return
         }
          
          
         new Promise(() => {
            getwxuserinfobyuuid(paramfilter).then(response => {

                
                if (response.data != null && response.data.data != null)
                {
                    var userinfo = JSON.parse(response.data.data);
                    _this.tenantInfo.tenant_img = userinfo.headimgurl
                    _this.tenantInfo.tenant_openid = userinfo.openid
                    _this.tenantInfo.tenant_nickname = userinfo.nickname
                    _this.currentroominfo.tenant_openid = userinfo.openid
                    _this.isNeedFetchUserinfo = false

                    //完后后隐藏二维码
                    _this.QSvisible = false
                    return
                }
                 setTimeout(() => {
                        _this.queryRegiste();
                        }, 1000);

             
            }).catch(error => {

               setTimeout(() => {
                    _this.queryRegiste();
                    }, 1000);
            })
          })
       },

      //向后台提起客户微信信息
       fetchtenantWXInfo()
       {
          
          var _this = this
          var userparam = { code:this.currentroominfo.tenant_openid,openid:this.currentroominfo.tenant_openid,param:''};

          if(_this.currentroominfo.tenant_openid != null && _this.currentroominfo.tenant_openid != "")
          {
              _this.startLoading("获取用户微信信息")
          }
          else{
            return
          }
        
          _this.$store.dispatch('FetchWXUserInfoByOpenid',userparam).then((data) => {

              loading.close() 
              _this.isNeedFetchUserinfo = false
                if (null == data)
                {
                    _this.$message({
                        type: 'error',
                        message: '获取用户微信信息失败!'
                      })

                    return
                }
                else if (data.subscribe == '0')
                {
                    _this.$message({
                        type: 'error',
                        message: '该租户未关注公众号，获取信息失败!'
                      })
                }
                else
                {
                    _this.tenantInfo.tenant_img = data.headimgurl
                    _this.tenantInfo.tenant_openid = data.openid
                    _this.tenantInfo.tenant_nickname = data.nickname

                }


            }).catch((ex)=>{
        
             loading.close()
              var ddd = 0
               
            })
       },
       hideQCtrl()
       {
           
           this.isShowQCtrl = false
           this.QSvisible = false
           this.isNeedFetchUserinfo = false
       },
    
     meterid2str(meterid)
     {
        return PrefixInteger(meterid,6)
     },
     startLoading(title) {
       loading = Loading.service({
      lock: true,
      text: title,
      background: 'rgba(0, 0, 0, 0.7)'
      })
    },
    loadRoom()
    { 
        
        var _this = this
        
        if (null != _this.$store.state.area.currentarea)
         {
           
           _this.roomfilter.areaid = _this.$store.state.area.currentarea.area_id
           this.startLoading('加载园区数据……')

            _this.$store.dispatch('GetRoomList',_this.roomfilter).then(() => {

              
                _this.roomlist = _this.$store.state.room.rooms
                if (null != _this.roomlist)      //如果有园区则选择默认园区
                {
                  //  _this.selArea = _this.areas[0].area_id
                }

                loading.close()

              }).catch((ex)=>{
          
                loading.close()
              })

         }
          
    },
    //装置电表
    loadMeter()     
    { 
        
        
        var _this = this
        if (null != _this.$store.state.area.currentarea
          && null != _this.$store.state.room.currentroom)
         {
            
            this.startLoading('加载电表数据....')
            _this.$store.dispatch('GetRoomMeters',_this.$store.state.room.currentroom.room_id).then(() => {

              
                _this.meterlist = _this.$store.state.meter.meters
                loading.close()

              }).catch((ex)=>{
          
                loading.close()
              })

         }
          
    },
    bindMeter()    //绑定电表
    {
      this.dlgMeterVisible = true
    },
    unBindMeter(meter)   //解除电表绑定
    {
        var _this = this

        
        if (null == meter)
        {
            return
        }

         _this.$confirm('确认解绑电表？') 
          .then(_ => {
            
               this.startLoading('解绑电表....')
               _this.$store.dispatch('UnbindMeter',meter.meter_id).then(() => {

              this.$message({
                type: 'success',
                message: '解绑成功'
              })

              _this.loadMeter()

                loading.close()

              }).catch((ex)=>{
          
                loading.close()
              })

          })
          .catch(_ => {});
    },
    setMeter(meter)         //设置电表的电价和期初值
    {
        if (null == meter)
        {
          return
        }
        
        //缓存当前的电表,然后唤起对话框
        this.$store.commit('SET_CUR_METER',meter)

        //显示对话框
        this.setmeter_dlg_visible = true
    },
     setWMeter(wmeter)         //设置水表的水价和期初值
    {
        if (null == wmeter)
        {
          return
        }


        //缓存当前的水表,然后唤起对话框
        this.$store.commit('SET_CUR_WMETER',wmeter)

        //显示对话框
        this.setwmeter_dlg_visible = true
    },
     //装载水表
    loadWMeter()     
    { 
        
        debugger
        var _this = this
        if (null != _this.$store.state.area.currentarea
          && null != _this.$store.state.room.currentroom)
         {
            
            this.startLoading('加载水表数据....')
            _this.$store.dispatch('GetRoomWMeters',_this.$store.state.room.currentroom.room_id).then(() => {

              
                _this.wmeterlist = _this.$store.state.wmeter.wmeters
                loading.close()

              }).catch((ex)=>{
          
                loading.close()
              })

         }
          
    },
     bindWMeter()           //绑定水表
    {
       this.dlgWMeterVisible = true
    },
     unBindWMeter(wmeter)   //解绑水表
    {
         var _this = this

        
        if (null == wmeter)
        {
            return
        }

         _this.$confirm('确认解绑水表？') 
          .then(_ => {
            
               this.startLoading('解绑水表....')
               _this.$store.dispatch('UnbindWMeter',wmeter.meter_id).then(() => {

              this.$message({
                type: 'success',
                message: '解绑水表成功'
              })

              _this.loadWMeter()

                loading.close()

              }).catch((ex)=>{
          
                loading.close()
              })

          })
          .catch(_ => {});
    },
    onBindWMeterOK()        //绑定成功后，刷新水表列表
    {
        this.dlgWMeterVisible = false
        this.loadWMeter()
    },
   
    onBindWMeterCancel()   // 
    {
        this.dlgWMeterVisible = false
    },
    onNewRoom()
    {
        this.dialogVisible = true
    },
    onBindMeterOK()
    {
  
        this.dlgMeterVisible = false
        this.loadMeter()
    },
    onBindMeterCancel()
    {
      this.dlgMeterVisible = false
    },
    onNewDlgOK()            //创建房间成功
    {
        this.dialogVisible = false
        this.loadRoom()
    },
    onNewRoomDlgclickCancel()     //用户点击取消
    {
        this.dialogVisible = false
    },
    onSetmeterDlgCancel()       //用户点击取消设置电表
    {
         this.setmeter_dlg_visible = false
    },
    onSetMeterDlgOK()          //设置电表成功 
    {
        this.setmeter_dlg_visible = false
        this.loadMeter()
    },
    onSetwmeterDlgCancel()    //取消水表设置
    {
      this.setwmeter_dlg_visible = false
    },
      onSetWMeterDlgOK()          //设置水表成功 
    {
        this.setwmeter_dlg_visible = false
        this.loadWMeter()
    },
     lessor(row)
    {

        if (null != row)
         {
              this.$store.commit('SET_CURRENTROOM',row)
              this.lessor_dlg_visible = true
    
         }
        
    },
    unlessor(row)
    {
        var _this = this
        this.$confirm('是否退租?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
              }).then(() => {
                  
              this.$store.dispatch('UnLessorRoom',row).then(() => {
                 row.IsLessor = true;
                  Message({ 
                          message: '房间退租成功!', 
                          type: 'error',
                          duration:  1000
                      })
                  
                  _this.loadRoom()
              }).catch((err)=>{
                var dd = err
              })
             
              }).catch(() => {
                 
                    
              });        
    },
    onlessorconfirmDlgOK()
    {
        this.loadRoom()
        this.lessor_dlg_visible = false
    },
    //删除
      handleDelete(index, row) {
        
           this.$confirm('确认删除？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
    resolveLogo(logo) {
      return require(`@/assets/logo/${logo}`)
    },
    // 加载用户个人信息
    findUserInfo: function() {
      getUserInfo().then((res) => {
        this.user = res.data.data
      })
    },

    // 修改密码
    updatePass: function(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const params = new URLSearchParams()
          params.append('oldPass', this.passForm.oldPass)
          params.append('newPass', this.passForm.newPass)
          updatePass(params).then((res) => {
            if (res.data.code === 200) {
              this.$message({
                type: 'success',
                message: '操作成功'
              })
              this.activeName = 'second'
              this.$refs['passForm'].resetFields()
            } else {
              this.$message({
                type: 'error',
                message: res.data.msg
              })
            }
          })
        } else {
          return false
        }
      })
    },
   

    
    refresh() {
      this.ico = 'el-icon-loading'
      this.$refs.log.init()
      setTimeout(() => {
        this.ico = 'el-icon-refresh'
      }, 300)
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      if (this.$refs[formName] !== undefined) {
        this.$refs[formName].resetFields()
      }
    },
    handleClick(tab, event) {
      
      if (tab.name == "second")
      {
          this.loadMeter()
      }
      else if (tab.name == "third")
      {
          this.loadWMeter()
      }
      else if (tab.name == "forth")
      {
        
          this.fetchtenantWXInfo()      //下载用户微信信息
      }
      
    },
    cancelmodifyRoom()     //放弃修改房间基本信息
    {
        var row =   this.$store.state.room.currentroom
        if(null != row)
        {
              this.currentroominfo.room_name = row.room_name
              this.currentroominfo.tenant_fee = row.tenant_fee
              this.currentroominfo.tenant_manage_fee = row.tenant_manage_fee
              this.currentroominfo.tenant_other_fee = row.tenant_other_fee
        }
      
    },
    modifyRoom()
    {
        var _this = this

        //调用后台添加房间
        _this.$store.dispatch('UpdateRoom',_this.currentroominfo).then(() => {

              Message({ 
                    message: '修改房间成功!', 
                    type: 'success',
                    duration:  1000
                })

                this.$emit('onclickOK')

        }).catch((ex)=>{
    
              Message({ 
                    message: '修改房间失败!', 
                    type: 'error',
                    duration:  1000
                })
        })
    },
    handleRoomChange(row, event, column)
    { 
      
        this.$store.commit('SET_ROOM', row)
        this.hasSelRoom = true
        this.currentroominfo.area_id = row.area_id
        this.currentroominfo.room_id = row.room_id
        this.currentroominfo.room_name = row.room_name
        this.currentroominfo.tenant_fee = row.tenant_fee
        this.currentroominfo.tenant_manage_fee = row.tenant_manage_fee
        this.currentroominfo.tenant_other_fee = row.tenant_other_fee
        this.currentroominfo.tenant_name = row.tenant_name
        this.currentroominfo.tenant_tel = row.tenant_tel
        this.currentroominfo.tenant_openid = row.tenant_openid
        this.currentroominfo.tenant_contactor = row.tenant_contactor

        this.tenantInfo.tenant_name = row.tenant_name
        this.tenantInfo.tenant_tel =  row.tenant_tel
        this.tenantInfo.tenant_openid = row.tenant_openid
        this.tenantInfo.tenant_contactor = row.tenant_contactor

        this.activeName = 'first'
    },
    updatetenant()
    {
        var _this = this

        //调用后台添加房间
        _this.$store.dispatch('UpdateRoomTenant',_this.currentroominfo).then(() => {

              Message({ 
                    message: '修改租户成功!', 
                    type: 'success',
                    duration:  1000
                })

                this.$emit('onclickOK')

        }).catch((ex)=>{
    
              Message({ 
                    message: '修改租户失败!', 
                    type: 'error',
                    duration:  1000
                })
        })
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    }
  }
}
</script>

<style lang="scss" scoped>
  .room-filter{
  margin-left: 5px;
  }
  .room-exportcol{
  text-align: right;
  }
 
  .col-align-right
  {
    display: flex;
    justify-content: flex-end;
    flex-direction: row;
    align-items:center;
    width:100%;

  }

  .room-row-gap
    {
      display: flex;
      height: 15px;
      width:100%;

    }

  .user-center{
    height: 100%;
  }
  .box-center {
    margin: 0 auto;
    display: table;
  }

  .text-muted {
    color: #777;
  }

  .user-profile {
    .user-name {
      font-weight: bold;
    }

    .box-center {
      padding-top: 10px;
    }

    .user-role {
      padding-top: 10px;
      font-weight: 400;
      font-size: 14px;
    }

    .box-social {
      padding-top: 30px;

      .el-table {
        border-top: 1px solid #dfe6ec;
      }
    }

    .user-follow {
      padding-top: 20px;
    }
  }

  .user-bio {
    margin-top: 20px;
    color: #606266;

    span {
      padding-left: 4px;
    }
    .logo-wrapper {
      display: inline-block;
      margin: 10px 0;
      img {
        width: 1.4rem;
        display: inline-block;
        margin: 0 .6rem;
        cursor: pointer;
        &.unbind {
          -webkit-filter: grayscale(100%);
          -moz-filter: grayscale(100%);
          -o-filter: grayscale(100%);
          filter: grayscale(100%);
        }
        &.radius {
          border-radius: 50%;
        }
      }
    }
    .user-bio-section {
      font-size: 14px;
      padding: 15px 0;

      .user-bio-section-header {
        border-bottom: 1px solid #dfe6ec;
        padding-bottom: 10px;
        margin-bottom: 10px; 
        font-weight: bold;
      }
    }
  }
</style>
