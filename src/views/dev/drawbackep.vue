<template>
   <div class="charge-container">
    
     <div class="label-div"><div>电表编号:</div></div>
     <div class="input-div">
        <el-input v-model="meter.meter_id" placeholder="6位电表编号" disabled="true" size="mini"></el-input>
      </div>
  

  
     <div class="label-div"><div>房间编号:</div></div>
     <div class="input-div">
        <el-input v-model="meter.room_name" disabled="true"  size="mini"></el-input>
      </div>
      <div class="label-div"><div>退款金额(元):</div></div>
     <div class="input-div">
        <el-input v-model="drawback_fee"  size="mini"></el-input>
      </div>
 
    <div class="diver-div">
      <el-divider></el-divider>  
    </div>
    
  
    <div class="label-div"/>
   
     <div class="button-div">
       <el-button type="primary" icon="el-icon-check" size="mini" @click="onclickOK">确定</el-button>
    </div>
     <div class="button-div">
        <el-button  icon="el-icon-remove" size="mini" @click="onclickCancel">取消</el-button>
      </div>
    <div class="label-div"/> 


  </div>
</template>      
 
<script>  

import { Message} from 'element-ui' 


export default {
  name:'drawbackep',
   data() {
     return{
      meter:this.$store.state.meter.currentmeter,
      drawback_fee:0.0,
      drawback_ep:0.0
     }
  },
   methods: {

       //点击添加房间
       onclickOK()
       {
           
          this.$emit('onclickOK',this.drawback_fee)

           
       },  
        //取消按钮
       onclickCancel()
       {
           this.$emit('onChargeClickCancel')
       },
   },
  mounted() {
    var _this = this
    this.$nextTick(() => {

       //  this.lessorday = getBeijingtime()
  })
  
        }
}
</script>

<style lang="scss" scoped>

/*容器布局*/
.charge-container{
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr ;
  grid-template-rows: 1fr 1fr 1fr 1fr 1fr;
  justify-items: stretch;
  align-content:stretch;
  grid-row-gap: 20px;

}


.col-gap
{
  display: flex;
  align-items:center;
  justify-content: flex-start;
}

.label-div
{
  display: flex;
  align-items:center;
  justify-content: flex-start;
}

.button-div
{
  display: flex;
  align-items:center;
  justify-content: center;
}
.input-div {
 
  grid-column-start: span 3;
  display: flex;
  align-items:center;
}

.input-ep {
 
  grid-column-start: span 1;
  display: flex;
  align-items:center;
}

.diver-div {
  grid-column-start: span 4;
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
