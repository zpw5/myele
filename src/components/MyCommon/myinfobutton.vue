<template>
    <div  class="infopannel" >
        <div class="infoimg" ><img id="img1" v-bind:src="imgsrc" ref="img"></div>
        <div class="infotitle">{{infotitle}}</div>
    </div>
</template>  

<style>

.infopannel{
    display:flex;
    align-items: center;
    justify-content: center;
    background-color:rgba(0,0,0,0.0);
    flex-direction:column;
    flex-wrap: nowrap;
    align-items: center;
}
.infoimg{   /*按钮图标*/
    
    order:1;
    display: flex; 
    align-items: center;
    justify-content: space-around;
    color:#555;
    background-color:rgba(0,0,0,0.0);
    flex-direction:row;
    flex-wrap: nowrap;
    align-items: center;
    flex-grow: 0;
    flex-shrink: 0;
  
}

.infotitle{
   
    order:2;
    display: flex; 
    align-items: center;
    justify-content: space-around;
    color:#555;
    background-color:rgba(0,0,0,0.0);
    flex-direction:row;
    flex-wrap: nowrap;
    align-items: center;
    flex-grow: 0;
    flex-shrink: 0;
    font-size: 12px;
}




</style>

<script>
export default {
 name: 'myinfobutton',
 props: {
    
            img:String,
            frcolor: String,
            bgcolor: String,
            fontsize: String,
            title: String ,
            content:String,
            imgheight:String,
            imgwidth:String

        },
  
    data(){ 
            return{
                        imgsrc:this.img,
                        infotitle:this.title,
                        imgheight1:this.imgheight,
                        imgwidth1:this.imgwidth
                   }
           },
mounted(){
     //电表数字插件
　 
 
    this.$nextTick(()=>{
        if (this.$refs.img != null)
        {
            this.$refs.img.style.width = this.imgwidth1;
        this.$refs.img.style.height = this.imgheight1;
        }
        
     });

    
},
methods:{

},

}
</script>