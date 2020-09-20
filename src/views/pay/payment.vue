<template>
  <div class="app-container">
    <el-row :gutter="10">
      <el-col >
      
          <el-row type="flex" justify="space-start">   
            <el-col :span="3" class="room-filter">
                <el-input v-model="meterfilter.roomname" placeholder="过滤房间号" size="mini"></el-input>
            </el-col>
            <el-col :span="3" class="room-filter">
                <el-input v-model="meterfilter.tenantname" placeholder="过滤租户名称" size="mini"></el-input>
            </el-col>  
            <el-col :span="2" class="room-filter">
                <el-input v-model="meterfilter.meterid" placeholder="过滤水表号" size="mini"></el-input>
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
              <el-button type="primary" icon="el-icon-search" size="mini" @click="filterMeterFee" >查询</el-button>
            </el-col>

            <el-col  :span="5" class="room-exportcol">
                <el-button icon="el-icon-search" size="mini" @click="exportExcel" >导出Excel...</el-button>
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
                id="rebateSetTable"
                v-loading="feeLoading"
                :data="dspFeeList"
                ref = "meterfeeTable"
                element-loading-text="加载水费数据中..."
                border
                fit
                max-height="550"
                highlight-current-row
                :row-style="{height:'16px'}"
                :cell-style="{padding:'0px'}"
           
                
                :header-cell-style="{background:'#eef1f6',color:'#606266'}"
              >
              <el-table-column type="selection" width="35"></el-table-column>
              <el-table-column align="center" label="序号" width="60">
                  <template slot-scope="scope">
                    {{ scope.$index+1 }}
                  </template>
                </el-table-column>
                 <el-table-column align="center" label="流水号" width="120">
                   <template slot-scope="scope">
                    {{ scope.row.fee_sn}}
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
                 <el-table-column label="水表编号"  width="90">
                  <template slot-scope="scope">
                     {{meterid_2_str(scope.row.meter_id)}}
                </template>
                </el-table-column>
                <el-table-column align="center" label="起止日期" width="90">
                  <template slot-scope="scope">
                    {{ datescope_2_str(scope.row.time_start,scope.row.time_end) }}
                  </template>
                </el-table-column>
                  <el-table-column align="center" label="期初(吨)" width="110">
                  <template slot-scope="scope">
                    {{scope.row.water_start.toFixed(1)}}
                  </template>
                </el-table-column>
                 <el-table-column align="center" label="期末(吨)" width="110">
                  <template slot-scope="scope">
                    {{scope.row.water_end.toFixed(1)}}
                  </template>
                </el-table-column>
                 <el-table-column align="center" label="本期用水(吨)" width="110">
                  <template slot-scope="scope">
                    {{scope.row.water_used.toFixed(1)}}
                  </template>
                </el-table-column>
                 <el-table-column align="center" label="单价(元/度)" width="120">
                  <template slot-scope="scope">
                     ￥{{scope.row.water_price.toFixed(1)}}
                  </template>
                </el-table-column>
                 <el-table-column align="center" label="合计(元)" width="120">
                  <template slot-scope="scope">
                    ￥{{scope.row.total_fee.toFixed(1)}}
                  </template>
                </el-table-column>
                <el-table-column 
                  label="状态" 
                  width="100" 
                  align="center"
                  prop="fee_status"
                  column-key="fee_status"
                  :filter-method="filterFeeStatus"
                  :filters="[{ text: '待审核', value: '0' }, 
                             { text: '待付款', value: '1' }, 
                             { text: '已付款(现金)', value: '2' },
                             { text: '费单撤销', value: '3' },
                             { text: '付款中(未到账)', value: '4' },
                             { text: '已付款(在线)', value: '5' }]" 
                  >
                    <template slot-scope="scope">
                        <span v-if="scope.row.fee_status === 0" style="color:red">
                              {{getFeeStateStr(scope.row.fee_status)}}
                        </span>
                        <span v-if="scope.row.fee_status === 1" style="color:red">
                               {{getFeeStateStr(scope.row.fee_status)}}
                        </span>
                        <span v-if="scope.row.fee_status === 2" style="color:green">
                               {{getFeeStateStr(scope.row.fee_status)}}
                        </span>
                        <span v-if="scope.row.fee_status === 3" style="color:#555555">
                               {{getFeeStateStr(scope.row.fee_status)}}
                        </span>
                        <span v-if="scope.row.fee_status === 4" style="color:red">
                               {{getFeeStateStr(scope.row.fee_status)}}
                        </span>
                         <span v-if="scope.row.fee_status === 5" style="color:green">
                               {{getFeeStateStr(scope.row.fee_status)}}
                        </span>
                  </template>
                </el-table-column>
               <el-table-column label="操作" prop="managefee" width="80" align="center">
                <template slot-scope="scope">
                  <span v-if="scope.row.fee_status === 0 " >
                    <el-link type="primary"  icon="el-icon-success" @click="BatchCheckMeterFee(scope.row,1);" >审核</el-link> 
                    <el-link type="danger"  icon="el-icon-remove" @click="BatchCheckMeterFee(scope.row,4)" >撤销</el-link> 
                  </span>  
                  <span v-if="scope.row.fee_status === 1 " >
                    <el-link type="primary"  icon="el-icon-success" @click="BatchCheckMeterFee(scope.row,2);" >标记已付款</el-link> 
                    <el-link type="danger"  icon="el-icon-remove" @click="BatchCheckMeterFee(scope.row,4)" >撤销</el-link> 
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
import {billdayscope2str,billstate2str,sqlstr_2_timestamp,PrefixInteger,timestam_2_str,timestam_2_shortstr,conversqltimestr_2_time} from '@/api/common'
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
       
        feeLoading:false,
        selDateRang:[new Date(),new Date()],
        meterFeeList:null,
        dspFeeList:null,
        meterfilter:{                            //费单过滤器
          roomname:'',
          tenantname:'',
          meterid:'',

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
    
      
       //初始化时间选择范围上月1号至今日
      var now=new Date();
      var lastMonth = new Date()
      lastMonth.setMonth(lastMonth.getMonth()-1);
      lastMonth.setDate(1);

      this.selDateRang=[];
      this.selDateRang.push(lastMonth)
      this.selDateRang.push(now)

      
  },
  mounted()
  {
      
      this.$nextTick(function () {

          //查询电费数据
          this.queryMeterFee()
      })
   

  },
   
  methods: {
      //获取费单状态的描述
     //获取费单状态的描述
    getFeeStateStr(feeState)
    {
        debugger
       return billstate2str(feeState)
    },
      //过滤费单状态
    filterFeeStatus(value, row)
    {

        if (row.fee_status == value)
        {
          return true;
        }
       
        return false; 
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
        endTm.setHours(endTm.getHours() + 8);
        startTm.setHours(startTm.getHours() + 8);
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
       //批量修改电费单,如果批量审核
    BatchCheckMeterFee(meterFee,newState)
    {
      
        var sellection = this.$refs.meterfeeTable.selection;
        var uptParam = {fee_state:newState,meterfee_info_lst:[]};
        var i = 0;

        if((null == sellection || sellection.length == 0)
           && meterFee != null)
        {
            var meterinfo = {};
            meterinfo.meter_id = meterFee.meter_id
            meterinfo.fee_sn = meterFee.fee_sn
            uptParam.meterfee_info_lst.push(meterinfo)
        }
        else
        {
            for(i = 0; i < sellection.length; i++)
            {
                var fee = sellection[i]
                if (null != fee)
                {
                    var meterinfo = {};
                    meterinfo.meter_id = fee.meter_id
                    meterinfo.fee_sn = fee.fee_sn
                    uptParam.meterfee_info_lst.push(meterinfo)
                }
            } 
        }
        
        var str = JSON.stringify(uptParam)
        var _this = this
         _this.$store.dispatch('BatchUptWMeterFee',str).then((result) => {

             this.$message({
              type: 'success',
              message: '操作成功'
            })
            
             
              _this.queryMeterFee();

              }).catch((ex)=>{
  
               
        })
    },

    //查询电费清单
    queryMeterFee()
    {
      
        var _this = this
        var date1 = timestam_2_str(this.selDateRang[0])
        var date2 = timestam_2_str(this.selDateRang[1])

        _this.feeLoading = true
        
        var areaid = _this.$store.state.area.currentarea.area_id
        var queryParam = {area_id:areaid,room_id:0,meter_id:0,room_tenant_id:'',start_time:date1,end_time:date2}

         _this.$store.dispatch('GetWaterFee',queryParam).then((meterfees) => {

               _this.feeLoading = false
               _this.meterFeeList = meterfees
               _this.filterMeterFee()

              }).catch((ex)=>{
  
                _this.feeLoading = false 
        })
    },
    onPickTimeRange()
    {
        this.queryMeterFee()
    },

    //过滤电费数据
    filterMeterFee()
    {
        var _this = this
        var newdspList = new Array()
        if (_this.meterFeeList != null)
        {
             _this.meterFeeList.forEach(function (fee, index) {

               var meterid_str = fee.meter_id+""

                if (fee != null 
                && (fee.room_name.indexOf(_this.meterfilter.roomname) != -1)
                && (fee.tenant_name.indexOf(_this.meterfilter.tenantname) != -1)
                && (meterid_str.indexOf(_this.meterfilter.meterid) != -1))
                { 
                    newdspList.push(fee);
                }
            
           }) 
        }

        _this.dspFeeList = newdspList
    },
    exportExcel() 
    {
        /* generate workbook object from table */
        let wb = XLSX.utils.table_to_book(document.querySelector('#rebateSetTable'));
        /* get binary string as output */
        let wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' });
        try {
            FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), '水费清单.xlsx');
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
