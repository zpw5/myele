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
                <el-input v-model="roomfilter.roomdec" placeholder="过滤电表号" size="mini"></el-input>
            </el-col>  
             <el-col :span="11" class="room-filter">
              <el-date-picker
                size="mini"
                v-model="selDateRang"
                type="monthrange"
                align="right"
                unlink-panels
                range-separator="至"
                start-placeholder="开始月份"
                end-placeholder="结束月份"
                :picker-options="pickerOptions"
                @change="onPickTimeRange">
              </el-date-picker>
              <el-button type="primary" icon="el-icon-search" size="mini" @click="loadRoom" >查询</el-button>
            </el-col>

            <el-col  :span="5" class="room-exportcol">
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
                :data="meterFeeList"
                element-loading-text="加载收费数据中..."
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
                <el-table-column align="center" label="流水号" width="130">
                   <template slot-scope="scope">
                    {{ get_meterfee_sn(scope.row.meter_id,scope.row.time_start)}}
                  </template>
                </el-table-column>
                  
                <el-table-column align="center" label="房间编号"  width="90">
                  <template slot-scope="scope">
                      {{scope.row.room_name}}
                </template>
                </el-table-column>
                <el-table-column label="租户"  width="125">
                  <template slot-scope="scope">
                     {{scope.row.tenant_name}}
                </template>
                </el-table-column>
                <el-table-column align="center" label="起止日期" width="90">
                  <template slot-scope="scope">
                    {{ datescope_2_str(scope.row.time_start,scope.row.time_end) }}
                  </template>
                </el-table-column>
                  <el-table-column align="center" label="电费(元)" width="110">
                  <template slot-scope="scope">
                    {{scope.row.ep_start.toFixed(1)}}度
                  </template>
                </el-table-column>
                 <el-table-column align="center" label="水费(元)" width="110">
                  <template slot-scope="scope">
                    {{scope.row.ep_end.toFixed(1)}}度
                  </template>
                </el-table-column>
                 <el-table-column align="center" label="租金(度)" width="110">
                  <template slot-scope="scope">
                    {{scope.row.ep_used.toFixed(1)}}度
                  </template>
                </el-table-column>
                 <el-table-column align="center" label="管理费(元)" width="120">
                  <template slot-scope="scope">
                     ￥{{scope.row.ep_price.toFixed(1)}}
                  </template>
                </el-table-column>
                 <el-table-column align="center" label="其他(元)" width="120">
                  <template slot-scope="scope">
                    ￥{{scope.row.total_fee.toFixed(1)}}元
                  </template>
                </el-table-column>
                 <el-table-column align="center" label="合计(元)" width="120">
                  <template slot-scope="scope">
                    ￥{{scope.row.total_fee.toFixed(1)}}元
                  </template>
                </el-table-column>
               
                <el-table-column label="状态" width="100" align="center">
                    <template slot-scope="scope">
                        <span v-if="scope.row.fee_status === 1 " style="color:#555555">
                              已缴费
                        </span>
                        <span v-if="scope.row.fee_status === 0 " style="color:#555555">
                              未缴费
                        </span>
 
                  </template>
                </el-table-column>
               <el-table-column label="操作" prop="managefee" width="180" align="center">
                <template slot-scope="scope">
                   <el-link type="primary"  icon="el-icon-info" @click="handleDelete(scope.$index,scope.row)" >详情</el-link>  
                   <el-link type="danger"  icon="el-icon-delete" @click="handleDelete(scope.$index,scope.row)" >删除</el-link>  
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

import QRCode from 'qrcodejs2'
import {billdayscope2str,sqlstr_2_timestamp,PrefixInteger,GetServerURL,uuidGenerator,timestam_2_str,timestam_2_shortstr,conversqltimestr_2_time} from '@/api/common'
import { getwxuserinfobyuuid } from '@/api/user'
import { Message} from 'element-ui' 
import PanThumb from '@/components/PanThumb'  
import { getUserInfo,updatePass, resetEmail } from '@/api/user'
import { isvalidFP } from '@/utils/validate'
import { Loading } from 'element-ui'
let loading;

export default {
  name: 'roomfee',
  components: { PanThumb },
  data() {
     
    return {
       
        selDateRang:[new Date(),new Date()],
        meterFeeList:null,
        roomfilter:{                            //费单过滤器
          areaid:10,
          roomname:'',
          roomdec:"",
        }  ,
         pickerOptions: {
          shortcuts: [{
            text: '本月',
            onClick(picker) {
              
              picker.$emit('pick', [new Date(), new Date()]);
            }
          }, {
            text: '今年至今',
            onClick(picker) {
              const end = new Date();
              const start = new Date(new Date().getFullYear(), 0);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近六个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setMonth(start.getMonth() - 6);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        value2:'',
      
    }
  },
  computed: {
    avatar() {
      return require(`@/assets/avatar/c7c4ee7be3eb4e73a19887dc713505145.jpg`)
    }
  },
  created() {
    
       //初始化时间选择范围
      var now=new Date();
      var lastMonth = new Date()
      lastMonth.setMonth(lastMonth.getMonth()-4);
      var startDate=new Date(Date.UTC(lastMonth.getFullYear(),lastMonth.getMonth(),lastMonth.getDate())).toISOString().slice(0,10);
      var endDate=new Date(Date.UTC(now.getFullYear(),now.getMonth(),now.getDate())).toISOString().slice(0,10);
      this.selDateRang=[];
      this.selDateRang.push(startDate)
      this.selDateRang.push(endDate)
  },
  mounted()
  {
    

   

  },
   
  methods: {

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
        
        debugger
        var _this = this
        var date1 = timestam_2_str(this.selDateRang[0])
        var date2 = timestam_2_str(this.selDateRang[1])
        
        var areaid = _this.$store.state.area.currentarea.area_id

        
        var queryParam = {area_id:areaid,room_id:0,meter_id:0,room_tenant_id:'',start_time:date1,end_time:date2}

         _this.$store.dispatch('GetMeterFee',queryParam).then((meterfees) => {

               _this.meterFeeList = meterfees

              }).catch((ex)=>{
  
                var kk = 0
           
                
        })

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
