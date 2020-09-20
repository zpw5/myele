<template>
   <swiper :options="swiperOption" ref="mySwiper" >
    <swiper-slide v-for="(payday,index) in daylist" :key="index">
        <div v-if="payday.actived || payday.sel" class="paydayitem-sel"  @click="onclickItem(payday)">
            <div class="paydayitem-year">
                {{payday.year}}
            </div>
            <div class="paydayitem-month">
                {{payday.month}}月
            </div>
             <div class="paydayitem-staus">
                 <div v-if="payday.iscurrent">
                    本月 
                 </div>  
                  <div v-if="payday.ispre">
                    上月
                 </div>
                 <div v-if="payday.isnext">
                    下月
                 </div>
            </div>
        </div>
         <div v-else class="paydayitem"   @click="onclickItem(payday)">
            <div class="paydayitem-year">
                {{payday.year}}
            </div>
            <div class="paydayitem-month">
                {{payday.month}}月
            </div>
             <div class="paydayitem-staus">
                 <div v-if="payday.iscurrent">
                    本月 
                 </div>
                  <div v-if="payday.ispre">
                    上月
                 </div>
                 <div v-if="payday.isnext">
                    下月
                 </div>
            </div>
        </div>
    </swiper-slide>  
 </swiper>
</template>  

<style>

.swiper-slide{height:1px} /* 随意指定一个height值即可 */    
.swiper-slide-active { height:auto}
.swiper-container{
    background-color: #ffffff;
    cursor:pointer;
}
.paydayitem{
    display:flex;
    width: 80px;
    height: 100%;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color:#ffffff;
    color: #555;
    flex-wrap: nowrap;
    overflow: hidden;
    cursor:pointer;
}
.paydayitem-sel{
    display:flex;
    width: 80px;
    height: 100%;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color:blue;
    color: #ffffff;
    flex-wrap: nowrap;
    overflow: hidden;
    cursor:pointer;
}

.paydayitem-year{
    display:flex;
    flex-direction: row;
    flex-basis: 15px;
    flex-grow: 1;
    flex-shrink: 1;
    align-items: center;
    justify-content: center;
    font-size: 10px;
    cursor:pointer;
}

.paydayitem-month{
    display:flex;
    flex-direction: row;
    width: 30px;
    flex-basis: 12px;
    flex-grow: 1;
    flex-shrink: 1;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    font-weight:bold;
    cursor:pointer;
}

.paydayitem-month-sel{
    display:flex;
    flex-direction: row;
    width: 30px;
    flex-basis: 12px;
    flex-grow: 1;
    flex-shrink: 1;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    border-radius: 2px 2px 2px 2px;
    font-weight:bold;
    cursor:pointer;
}

.paydayitem-staus{
    display:flex;
    flex-direction: row;
    flex-basis: 15px;
    flex-grow: 1;
    flex-shrink: 1;
    align-items: flex-end;
    justify-content: center;
    font-size: 10px;
    cursor:pointer;
}




</style>

<script>


import {monDiff} from '@/api/common'
export default {
 name: 'mytimeswiper',
 props: {
    
            days:Array

        },
  
    data(){ 
            return{
                        daylist:this.days,
                        swiperOption: {
                            slidesPerView: 6,
                            notNextTick: true,
                            loop: false,
                            autoplay: false,
                            speed: 1000,
                            direction: 'horizontal',
                            grabCursor: true,
                            setWrapperSize: true,
                            autoHeight: true,
                            pagination: '.swiper-pagination',
                            paginationClickable: true,
                            mousewheelControl: true,
                            observeParents: true,
                            controller: true   
                            },
                         
                   }
           },
mounted(){

　 
    //初始化：自动切换到当前月份 
    this.$nextTick(()=>{
         

        var start = new Date("2019-01-01 00:00:00")
        var monIndex= monDiff(start,new Date()) 
        if (monIndex > 2)
        {
            
            this.$refs.mySwiper.$swiper.slideTo(monIndex-2);//切换到第一个slide，速度为1秒
            this.days[monIndex].sel = true;

            //设置本月标志
            this.days[monIndex].iscurrent = true;

            //设置上个月
            this.days[monIndex-1].ispre = true;

            //设置下个月
            this.days[monIndex+1].isnext = true;
        }
        else
        {
            this.$refs.mySwiper.$swiper.slideTo(monIndex);//切换到第一个slide，速度为1秒
        }
       



     });
    
},  
methods:{
    onclickItem(payday)
    {
        //清理原来已经选择的项目
         this.daylist.forEach(element => {

                element.sel = false; 

               });

        payday.sel = true;
        
       this.$emit('onChangeDay',payday)
    }
    

},

}
</script>