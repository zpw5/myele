<template>
    <div  class="infopannel" >
        <div class="infocontent"  ref="contentdiv">{{content}}</div>
        <div class="myinfogap"/>
        <div class="myinfotitle"  ref="infodiv">{{title}}</div>
    </div>
</template>  

<style>

.infopannel{
    display:flex;
    height: 100%;
    align-items: center;
    justify-content: space-around;
    background-color:rgba(0,0,0,0.0);
    flex-direction:column;
    flex-wrap: nowrap;
    align-items: stretch;
}
.myinfotitle{
    width:100%;
    order:3;
    display: flex; 
    align-items: flex-start;
    justify-content: space-around;
    color:#ccc;
    background-color:rgba(0,0,0,0.0);
    flex-direction:row;
    flex-wrap: nowrap;
    align-items: stretch;
    flex-grow: 1;
    flex-shrink: 1;
    font-size: 10px;
}
.myinfogap{
    width:100%;
    order:2;
    display: flex; 
    background-color:rgba(0,0,0,0.0);
    flex-direction:row;
    flex-wrap: nowrap;
    align-items: stretch;
    flex-grow: 0;
    flex-shrink: 0;
    flex-basis: 2px;
}

.infocontent{
    width:100%;
    order:1;
    display: flex; 
    align-items: flex-end;
    justify-content: center;
    color:#555;
    background-color:rgba(0,0,0,0.0);
    flex-direction:row;
    flex-wrap: nowrap;
    flex-grow: 2;
    flex-shrink: 2;
    font-size: 16px;
}




</style>

<script>
export default {
 name: 'myinfo',
 props: {
    
          
            frcolor: String,
            bgcolor: String,
            fontsize: String,
            title: String ,
            content:String,
           
        },
  
   /* data(){ 
            return{
                        infotitle:this.title,
                        infocontent:this.content
                   }
           },*/
mounted(){
    
    
    this.$refs.contentdiv.style.color = this.frcolor;
    this.$refs.infodiv.style.color = this.frcolor;
   

},
methods:{
loadsize(){

  
    //电表数字插件
　  

　　}
},

}
</script>