<template>
  <div class="app-container">
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
                <el-input v-model="roomfilter.roomdec" placeholder="过滤水表号" size="mini"></el-input>
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
                element-loading-text="加载水表数据中..."
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
                <el-table-column align="center" label="水表号" width="130">
                   <template slot-scope="scope">
                    {{ scope.row.meter_id}}
                  </template>
                </el-table-column>
                <el-table-column align="center" label="标识号" width="180">
                   <template slot-scope="scope">
                    {{ scope.row.meter_sn}}
                  </template>
                </el-table-column>
                 <el-table-column align="center" label="水表型号" width="130">
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
                    {{scope.row.cur_water.toFixed(1)}}吨
                  </template>
                </el-table-column>
                
                 <el-table-column align="center" label="单价(元/吨)" width="120">
                  <template slot-scope="scope">
                     ￥{{scope.row.water_price.toFixed(1)}}
                  </template>
                </el-table-column>
                <el-table-column align="center" label="最近抄表" width="180">
                  <template slot-scope="scope">
                     {{pickTick2Timestr(scope.row.fresh_tick)}}
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
let loading;

export default {
  name: 'Index',
  components: { PanThumb },
  data() {
     
    return {
       
        selDateRang:[new Date(),new Date()],
        meterList:null,
        roomfilter:{                            //费单过滤器
          areaid:10,
          roomname:'',
          roomdec:"",
        }  ,
        
        value2:'',
      
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

          //查询水费数据
          _this.loadMeter();
      })
   

  },
  
   
  methods: {

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
    //装载园区水表
    loadMeter()
    {
      
      debugger
      var _this = this
      if (null != _this.$store.state.area.currentarea)
      {
           
           var areaid = _this.$store.state.area.currentarea.area_id
           this.startLoading('加载水表数据……')
          _this.$store.dispatch('GetAreaWMeters',areaid).then((meters) => {

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
            FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), '水表抄表清单.xlsx');
        } catch (e)
        {
            if (typeof console !== 'undefined')
                console.log(e, wbout)
        }
        return wbout
      },
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
