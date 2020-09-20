<template>
  <div class="app-container">
     <el-dialog
         
            title="电表充值"
            :visible.sync="dialogVisible"
            width="30%"
          >
          <mannercharge ref="chargedlg" v-on:onclickOK="onStartCharge" v-on:onChargeCancel="onChargeClickCancel" />
         
     </el-dialog>
     <el-dialog
         
            title="退电操作"
            :visible.sync="drawbackdialogVisible"
            width="30%"
          >
          <drawbackep ref="drawbackdlg" v-on:onclickOK="onStartDrawBack" v-on:onChargeCancel="onDrawBackClickCancel" />
         
     </el-dialog>

     

    <el-row :gutter="10">
      <el-col >
      
          <el-row type="flex" justify="space-start">   
            <el-col :span="3" class="room-filter">
                <el-input v-model="roomfilter.roomname" placeholder="过滤房间号" size="mini"></el-input>
            </el-col>
            <el-col :span="3" class="room-filter">
                <el-input v-model="roomfilter.roomdec" placeholder="过滤租户名称" size="mini"></el-input>
            </el-col>  
            <el-col :span="2" class="room-filter">
                <el-input v-model="roomfilter.roomdec" placeholder="过滤电表号" size="mini"></el-input>
            </el-col>  
             <el-col :span="11" class="room-filter">
              <el-button type="primary" icon="el-icon-search" size="mini" @click="" >查询</el-button>
            </el-col>

            <el-col  :span="5" class="room-exportcol">
                <el-button icon="el-icon-search" size="mini" @click="exportExcel()" >导出Excel...</el-button>
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
                id="meterTable"
                :data="meterList"
                element-loading-text="加载电表数据中..."
                border
                fit
                max-height="550"
                highlight-current-row
                :row-style="{height:'16px'}"
                :cell-style="{padding:'0px'}"
         
                
                :header-cell-style="{background:'#eef1f6',color:'#606266'}"
              >
              <el-table-column align="center" label="序号" width="60">
                  <template slot-scope="scope">
                    {{ scope.$index+1 }}
                  </template>
                </el-table-column>
                <el-table-column align="center" label="电表号" width="130">
                   <template slot-scope="scope">
                    {{ scope.row.meter_id}}
                  </template>
                </el-table-column>
                 <el-table-column align="center" label="电表型号" width="130">
                   <template slot-scope="scope">
                    {{ scope.row.meter_type}}
                  </template>
                </el-table-column>
                  
                <el-table-column align="center" label="房间编号"  width="90">
                  <template slot-scope="scope">
                      {{scope.row.room_name}}
                </template>
                </el-table-column>
                 <el-table-column align="center" label="当前读数" width="110">
                  <template slot-scope="scope">
                    {{scope.row.cur_ep.toFixed(1)}}度
                  </template>
                </el-table-column>
                 <el-table-column align="center" label="剩余电度" width="110">
                  <template slot-scope="scope">
                   <div color="#00FF00">  {{scope.row.left_ep.toFixed(1)}}度</div>
                  </template>
                </el-table-column>
                 <el-table-column align="center" label="单价(元/度)" width="120">
                  <template slot-scope="scope">
                     ￥{{scope.row.ep_price.toFixed(1)}}
                  </template>
                </el-table-column>
                <el-table-column align="center" label="最近抄表" width="180">
                  <template slot-scope="scope">
                     {{pickTick2Timestr(scope.row.fresh_tick)}}
                  </template> 
                </el-table-column>
                <el-table-column label="操作" prop="managefee" width="300" align="center">
                <template slot-scope="scope">
                  <span >
                    <el-link  type="primary" icon="iconfont icon-my-shoudian" @click="onMeterCharge(scope.row);" >售电</el-link> 
                    <el-link  type="danger" icon="el-icon-remove" @click="onDrawbackMeter(scope.row)" >退电</el-link> 
                    <el-link  icon="iconfont icon-my-shoudian" @click="onClearMeterDD(scope.row,1);" >清零</el-link> 
                    <el-link   icon="el-icon-success" @click="onDrawbackMeter(scope.row,1);" >刷新</el-link> 
                  </span>  
                </template>
            </el-table-column>
            
              </el-table>
             </el-col>
          </el-row>
   
      </el-col>
    </el-row>

  </div>
</template>

<script>

import FileSaver from "file-saver";
import XLSX from "xlsx";
import QRCode from 'qrcodejs2'
import {billdayscope2str,sqlstr_2_timestamp,SecToDateTime,PrefixInteger,GetServerURL,uuidGenerator,timestam_2_str,timestam_2_shortstr,conversqltimestr_2_time} from '@/api/common'
import { getwxuserinfobyuuid } from '@/api/user'
import { Message} from 'element-ui' 
import PanThumb from '@/components/PanThumb'  
import { getUserInfo,updatePass, resetEmail } from '@/api/user'
import { isvalidFP } from '@/utils/validate'
import { Loading } from 'element-ui'
import  mannercharge  from './mannercharge'
import  drawbackep  from './drawbackep'
import { Toast } from 'vant';
let loading;

export default {
  name: 'Index',
  components: { PanThumb,mannercharge,drawbackep },
  data() {
     
    return {
       
        selDateRang:[new Date(),new Date()],
        meterList:null,
        roomfilter:{                            //费单过滤器
          areaid:10,
          roomname:'',
          roomdec:"",
        }  ,
        dialogVisible:false,
        drawbackdialogVisible:false,
        value2:'',
        toast:null,
        toastShowFlag:false,
        commandsn:0,
        curmeter:null,
        chargeFee:0.0,
        queryCommandTimer:null,
        freshMeterTimer:null,
    }
  },
  computed: {
    avatar() {
      return require(`@/assets/avatar/c7c4ee7be3eb4e73a19887dc713505145.jpg`)
    }
  },
  created() {
    
     
  },
  mounted()
  {
    
    var _this = this;
    var area_id = _this.$
       this.$nextTick(function () {

          //查询电费数据
          _this.loadMeter();
      })
   

  },
  
   
  methods: {

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

    //点击充值
    onMeterCharge(meter)
    {
        if(null == meter )
        {
           Toast.fail('电表配置数据错误');
           return
        }

        if (!meter.online_flag)
        {
           Toast.fail('电表网络连接异常');
           return
        }

        this.$store.commit('SET_CUR_METER',meter)
        this.curmeter = meter
        this.dialogVisible = true
    },

    //用户点击充值对话框的"确定"，获取新的命令ID后启动充值
    onStartCharge(fee)
    {
      debugger
        var _this =this
        _this.chargeFee = fee
        _this.dialogVisible = false

        if (fee <= 0)
        {
            Toast.fail('充值金额不能小于或者等于0')
            return
        }
         
        _this.showToast("电表充值中...")
        _this.$store.dispatch('GetNewMeterCommandSN').then((sn) => {    
        if (null == sn)     
        {
            _this.hideToast()
            Toast.fail('启动充值命令失败1!')
            return
        }
        else
        {
            _this.commandsn = sn.command_sn  
            var meterCommandParam={
              command_sn:_this.commandsn,
              meter_id:_this.curmeter.meter_id,
              command_id:1,                        //退
              command_value:_this.chargeFee,       //电度数
              user_id:0
              }
            _this.CommitCommand(meterCommandParam)
        }
      }).catch((ex)=>{
        _this.hideToast()
        Toast.fail('启动充值命令失败2!')
        
      })
    },

    //用户点击退电
     onDrawbackMeter(meter)
    {
        if(null == meter )
        {
           Toast.fail('电表配置数据错误');
           return
        }

        if (!meter.online_flag)
        {
           Toast.fail('电表网络连接异常');
           return
        }

        this.$store.commit('SET_CUR_METER',meter)
        this.curmeter = meter
        this.drawbackdialogVisible = true
    },

     //用户点击退电对话框的"确定"，获取新的命令ID后启动退电
    onStartDrawBack(fee)
    {
      
        var _this =this
        _this.chargeFee = fee
        _this.drawbackdialogVisible = false

        if (fee <= 0)
        {
            Toast.fail('退电金额不能小于或者等于0')
            return
        }
         
        _this.showToast("电表退电中...")
        _this.$store.dispatch('GetNewMeterCommandSN').then((sn) => {    
        if (null == sn)     
        {
            _this.hideToast()
            Toast.fail('启动退电命令失败1!')
            return
        }
        else
        {
            _this.commandsn = sn.command_sn  
            var meterCommandParam={
              command_sn:_this.commandsn,
              meter_id:_this.curmeter.meter_id,
              command_id:2,                        //退
              command_value:_this.chargeFee,       //电度数
              user_id:0
              }
            _this.CommitCommand(meterCommandParam)
        }
      }).catch((ex)=>{
        _this.hideToast()
        Toast.fail('启动退电命令失败2!')
        
      })
    },

    //清零电度
    onClearMeterDD(meter)
    {
        var _this = this
        if(null == meter )
        {
           Toast.fail('电表配置数据错误');
           return
        }

        if (!meter.online_flag)
        {
           Toast.fail('电表网络连接异常');
           return
        }

        this.$store.commit('SET_CUR_METER',meter)
        this.curmeter = meter

        _this.showToast("清零电度...")
        _this.$store.dispatch('GetNewMeterCommandSN').then((sn) => {    
        if (null == sn)     
        {
            _this.hideToast()
            Toast.fail('清零电度失败1!')
            return
        }
        else
        {
            _this.commandsn = sn.command_sn  
            var meterCommandParam={
              command_sn:_this.commandsn,
              meter_id:_this.curmeter.meter_id,
              command_id:3,                        //清零电度
              command_value:0,       //电度数
              user_id:0
              }
            _this.CommitCommand(meterCommandParam)
        }
      }).catch((ex)=>{
        _this.hideToast()
        Toast.fail('清零电度命令失败2!')
        
      })

    },

    //执行电表代充值命令
    CommitCommand(meterCommandParam)
    {
      var _this =this
      
      _this.$store.dispatch('CommitMeterCommand',meterCommandParam).then((res) => {    

        _this.queryCommandTimer = setInterval(this.queryCommand,2000)     //启动查询代充结果

      }).catch((ex)=>{
          _this.hideToast()
          Toast.fail('操作失败!')
          
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
        _this.$store.dispatch('FetchMeterCommandState',cmdSN).then((cmdState) => {    
            if (cmdState.command_state == 3)
            {
                clearInterval(this.queryCommandTimer);
                _this.hideToast()
                
                //延时2秒刷新电表数据
                _this.showToast("操作成功,刷新数据...")
                _this.freshMeterTimer = setInterval(_this.freshMeter,2000)
                
            }
            else if (cmdState.command_state == 5)
            {
                _this.hideToast()
                Toast.fail("执行失败:"+cmdState.err_msg)
                clearInterval(_this.queryCommandTimer );
                return
            }

            }).catch((ex)=>{
              _this.hideToast()
            })
        
    },

        //充值后延时刷新数据
    freshMeter()
    {
      debugger
       this.hideToast()
        
        clearInterval(this.freshMeterTimer);
        this.loadMeter()
    },

    //充值对话框点击确定
    onChargeClickOK()
    { 
        this.dialogVisible = false
    },
    //充值对话框点击取消
    onChargeClickCancel()
    {
      this.dialogVisible = false
    },

 

    onDrawBackClickCancel()
    {

    },

    getRoomName(meterItem)
    {
        if (meterItem != null )
        {
          if (meterItem.room_id != 0)
          {
            return meterItem.room_name;
          }
          else
          {
            return "未绑定"
          }
        }

        return ""
    },

    //将抄表的Tick转换成时间Tick
    pickTick2Timestr(tick)
    {
        
        if (tick == 0)
        {
            return "未抄表";
        }
        tick = tick + 3600*8;   //加8小时
        var pickTime = SecToDateTime(tick)
        return timestam_2_str(pickTime)
    },
    //装载园区电表
    loadMeter()
    {
      
      var _this = this
      if (null != _this.$store.state.area.currentarea)
      {
           debugger
           var areaid = _this.$store.state.area.currentarea.area_id
           this.startLoading('加载电表数据……')
          _this.$store.dispatch('GetAreaMeters',areaid).then((meters) => {

              Toast.success("加载成功")
               _this.meterList = meters
                loading.close()

              }).catch((ex)=>{

                var kk = 0
                 loading.close()
                
        })
    }
    },
     startLoading(title) {
       loading = Loading.service({
      lock: true,
      text: title,
      background: 'rgba(0, 0, 0, 0.7)'
      })
    },
    meterid_2_str(meterid)
    { 
      return  PrefixInteger(meterid,6)
    },

    //起止日期字符串
    datescope_2_str(startTmStr,endTmStr)
    {
        var startTm = sqlstr_2_timestamp(startTmStr)
        var endTm = sqlstr_2_timestamp(endTmStr)

        var str = billdayscope2str(startTm,endTm)

        return str
    },
    //获取流水号，将起始时间转换成整数
    get_meterfee_sn(meterid,datetimestr)
    { 
      
      
      if (datetimestr == null)
      {
          return ""
      }

      var startTm = sqlstr_2_timestamp(datetimestr)


      return  PrefixInteger(meterid,6)+PrefixInteger(startTm.getFullYear(),2)+PrefixInteger(startTm.getMonth(),2)+PrefixInteger(startTm.getDate(),2)
    },
    queryMeterFee(queryParam)
    {

    },
    onPickTimeRange()
    {
      

    },
    exportExcel() 
    {
        /* generate workbook object from table */
        let wb = XLSX.utils.table_to_book(document.querySelector('#meterTable'));
        /* get binary string as output */
        let wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' });
        try {
            FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), '电表抄表清单.xlsx');
        } catch (e)
        {
            if (typeof console !== 'undefined')
                console.log(e, wbout)
        }
        return wbout
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
