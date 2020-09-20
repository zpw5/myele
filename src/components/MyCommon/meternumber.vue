<template>
    <div :style="{width:totalwidth,height:totalheight,background:bgcolor}" class="powerbitpannel" >
         <div  class="powerbit" ref="bitElemList" v-for="item1 in numberbits" v-bind:key="item1.bitindex" v-bind:style="{order:item1.order}">
            <div>{{item1.order}}</div>
         </div>
    </div>
</template>  

<style>
.powerbitpannel{
    width:60%;
    height: 100%;
    display: flex; 
    flex-direction:row;
    align-items: center;
    justify-content: space-around;
    background-color:rgba(0,0,0,0.0);
    flex-wrap: nowrap;

}



.powerbit{
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    order: 1;
    font-size:12;
    border-radius: 10px 10px 10px 10px;
}


</style>

<script>
export default {
 name: 'meternumber',
 props: {
  
            totalwidth: String,
            totalheight: String,
            bits: Number,
            floatbits: Number,
            bgcolor: String,
            numbgcolor: String,
            value: Number ,
            bitwidth:Number,
            bitHeight:Number,

        },
  
    data(){ 
            return{
                    numberbits:[ 
                                ],
                    numbervalue:this.value,
                    hasInited:false
                   }
           },
mounted(){
    

    //格式化数据格式,将数据转换成字符
    this.formatvalue();

    //将数据刷新到界面上
　　 this.freshui();

    this.hasInited = true;

},
watch:{

    value:function(newval)
    {
        
        this.numbervalue = newval;

        //初始化后才允许刷新界面
        if (this.hasInited)
        {
            this.formatvalue();
            this.freshui();
        }
        
    }
},
methods:{

formatvalue()
{
     var i =0;
    var data = 0;
    var weight = 1;
    var tmpValue = parseInt(this.numbervalue*10);

    //先清空数组然后再赋值
    this.numberbits = [];

    for(i = 0; i < this.bits; i++)
    {
      
        if (i == 0)
        {
            if (tmpValue  < 1)
            {
                data = tmpValue%10;
            }
            else
            {
                data = tmpValue%10;
            }
            
        }
        else{
            weight = weight*10;
            data = parseInt((tmpValue)/(weight));
            if (data < 1)
            {
                data = 0;
            }
            else
            {
                data = data %10;
            }
        }
        this.numberbits.push({
            "bitindex": i,
            "bitvalue":data,
            "order":i+1
        });
    }
},
freshui(){

    
    var _this = this;

   //查找所有的.powerbit，修改高度
   //var allbitsElem = document.querySelectorAll(".powerbit");
     
     this.$nextTick(()=>{
         
        var i = 0;
        var len = this.$refs.bitElemList.length;
         this.$refs.bitElemList.forEach(function(elem,i){
            elem.style.width = "24px";
            elem.style.height ="32px";
            elem.style.color='white';
            elem.innerHTML = _this.numberbits[len-i-1].bitvalue+"";
            i = i+1;

            if (i == (len))
            {
                elem.style.background="red";
            }
            else
            {
                elem.style.background="black";
            }

            if (i == 1)
            {
                elem.style.borderRadius="6px 6px 6px 6px" ;
            }
            else
            {
                elem.style.borderRadius="0px 0px 0px 0px" ;
            }
          
        　　});
     });
    //电表数字插件
　  

　　}
},

}
</script>