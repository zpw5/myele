<template>
  <div style="width:100%;height:100%;" >
  <router-view></router-view>
  <van-tabbar v-model="active" route ref="vantab">
  <van-tabbar-item name="home" icon="home-o" replace to="/mytenant/fee">在线缴费</van-tabbar-item>
  <van-tabbar-item name="meter"  icon="search" replace to="/mytenant/charge">预付充值</van-tabbar-item>
  <van-tabbar-item name="shuimeter" icon="friends-o" replace to="/mytenant/payment">账单详情</van-tabbar-item>
  <van-tabbar-item name="graph" icon="friends-o" replace to="/mytenant/realgraph">实时监控</van-tabbar-item>
</van-tabbar>

</div>
</template>
 
<script>

export default {
  data() {
    return {
      active: "home",
      isbusy: false,
      state:0,
      lastLoadRealTick:0
    }
  },
  methods:{

    
  },
  mounted: function () {



    //阻值按返回键
  if (window.history && window.history.pushState) 
  {
      history.pushState(null, null, document.URL);
    
  }

      var _this = this
         //启动微信登录回调定时任务
        this.$nextTick(function () {

debugger
           _this.$router.push("/mytenant/charge");
     
            _this.$refs.vantab.setActiveItem()
            _this.$refs.vantab.onChange("meter")
            
            //setInterval(this.CallTick, 100);

        })
  }
}
</script> 