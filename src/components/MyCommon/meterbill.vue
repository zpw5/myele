<template>
    <div  class="meterbill" >
        <div class="meterbill-gap" style="background-color:#eeeeee;" />
        <div class="meterbill-gap"/>
        <div class="meterbill-content">
            
            <div class="meterbill-head">
                <div class="meterbill-head-title">
                    {{billtitle}}:{{billsn}}({{roomname}})
                </div>
                 <div class="meterbill-head-tip">
                     小计:¥{{totalfee.toFixed(2)}}元
                </div>
            </div>
             <div class="meterbill-body">
                 <div class="meterbill-detail">
                     <div class="meterbill-detailrow" style="color:red;">
                         期初抄数:{{startEP.toFixed(2)}}{{weight}}
                     </div>
                     <div class="meterbill-detailrow" style="color:blue;">
                         期末抄数:{{endEP.toFixed(2)}}{{weight}}
                     </div>
                     <div class="meterbill-detailrow" style="color:green;">
                         本期用量:{{usedEP.toFixed(2)}}{{weight}}
                     </div>
                     <div class="meterbill-detailrow">
                         起止日期:{{period}}
                     </div>
                 </div>
                 <div class="meterbill-status">
                     <div class="meterbill-statusrow">
                        <el-checkbox v-if="bill.paystatus === 1" v-model="bill.issel" @change="checkChange"></el-checkbox>
                     </div>
                     <div class="meterbill-statusrow">
                         <div v-if="paystatus===2" style="color:green">
                             已付款(现金)
                         </div>
                          <div v-else-if="paystatus===4" style="color:#555555">
                             等待付款到账
                         </div>
                         <div v-else-if="paystatus===5" style="color:#green">
                             已付款(在线)
                         </div>
                         <div v-else style="color:red">
                             未付款
                         </div>
                     </div>
                 </div>
            </div>
        </div>
        <div class="meterbill-gap"/>
        <div class="meterbill-gap" style="background-color:#eeeeee;"/>
    </div>
</template>  

<style>

/*
    费单信息布局
*/
.meterbill{
    display:flex;
    width: 100%;
    height:140px;
    align-items: center;
    justify-content: center;
    background-color:#ffffff;
    flex-direction:row;
    flex-wrap: nowrap;
    align-items: center;
}

/*
    左右边距和上下边距
*/
.meterbill-gap{
    display:flex;
    width: 10px;
    height:100%;
    align-items: center;
    justify-content: center;
    background-color:rgba(0,0,0,0.0);
    flex-grow: 0;
    flex-shrink: 0;
    flex-basis: 10px;
}

/*
    费单信息主题
*/
.meterbill-content{
    display:flex;
    height:100%;
    flex-direction:column;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: center;
    background-color:rgba(0,0,0,0.0);
    flex-grow: 100;
    flex-shrink: 100;
    flex-basis: 10px;
}

/*
    费单信息-标题部分,高度占整体的20%
*/
.meterbill-head{
    display:flex;
    width:100%;
    flex-direction:row;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: center;
    background-color:rgba(0,0,0,0.0);
    flex-grow: 20;
    flex-shrink: 20;
    border-bottom:1px solid #eeeeee;
    font-size: 12px;
}


/*
    费单信息-头部标题,靠左,50%宽度
*/
.meterbill-head-title{
    display:flex;
    height:100%;
    flex-direction:row;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: stretch;
    color: #555555;
    background-color:rgba(0,0,0,0.0);
    flex-grow: 50;
    flex-shrink: 50;
}

/*
    费单信息-头部标题,靠右边,50%宽度
*/
.meterbill-head-tail{
    display:flex;
    height:100%;
    flex-direction:row;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: stretch;
    color: #555555;
    background-color:rgba(0,0,0,0.0);
    flex-grow: 50;
    flex-shrink: 50;
}

/*
    费单信息-内容清单部分,高度占整体的80%，4行显示
*/
.meterbill-body{
    display:flex;
    width:100%;
    flex-direction:row;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: center;
    background-color:rgba(0,0,0,0.0);
    color: #555555;
    flex-grow: 80;
    flex-shrink: 80;
    font-size: 12px;
}

/*
    费单信息-内容清单部分,宽度占70%
*/
.meterbill-detail{
    display:flex;
    height:100%;
    flex-direction:column;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: center;
    background-color:rgba(0,0,0,0.0);
    flex-grow: 70;
    flex-shrink: 70;
}
/*
    费单信息-内容清单部分-细节行,宽度占70%
*/
.meterbill-detailrow{
    display:flex;
    width:100%;
    flex-direction:column;
    flex-wrap: nowrap;
    align-items: flex-start;
    justify-content: center;
    background-color:rgba(0,0,0,0.0);
    flex-grow: 25;
    flex-shrink: 25;
}

/*
    费单信息-状态部分,宽度占30%
*/
.meterbill-status{
    display:flex;
    height:100%;
    flex-direction:column;
    flex-wrap: nowrap;
    align-items: flex-end;
    justify-content: flex-end;
    background-color:rgba(0,0,0,0.0);
    flex-grow: 30;
    flex-shrink: 30;
}

/*
    费单信息-内容清单部分-细节行,宽度占70%
*/
.meterbill-statusrow{
    display:flex;
    width:100%;
    flex-direction:column;
    flex-wrap: nowrap;
    align-items: flex-end;
    justify-content: center;
    background-color:rgba(0,0,0,0.0);
    flex-grow: 25;
    flex-shrink: 25;
}

</style>

<script>
import { Checkbox } from 'vant';

export default {
 name: 'meterbill',
 props: {
    
            start_value_pro:Number,
            end_value_pro: Number,
            used_value_pro: Number,
            price_pro:Number,
            period_pro:String,
            bill_title_pro:String,
            total_fee_pro:Number,
            bill_sn_pro:String,
            room_name_pro:String,
            paystatus_pro:Number,
            weight_pro:String,
            bill_pro:Object
        },
  
    data(){ 
            return{
                   

                        startEP:this.start_value_pro,
                        endEP:this.end_value_pro,
                        usedEP:this.used_value_pro,
                        period:this.period_pro,
                        epprice:this.price_pro,
                        billtitle:this.bill_title_pro,
                        totalfee:this.total_fee_pro,
                        billsn:this.bill_sn_pro,
                        roomname:this.room_name_pro,
                        weight:this.weight_pro,
                        checked:true,
                        paystatus:this.paystatus_pro,
                        bill:this.bill_pro
                   }
           },
created(){

    if (this.bill !=null)
    {
     
    }

},
mounted(){
     //电表数字插件
　 
 
    this.$nextTick(()=>{


       debugger
       var data = 0
        
     }); 
},
methods:{
    checkChange()
    {
        this.$emit('selChange', this.bill) //通过$emit触发父组件
    }

},

}
</script>