<template>
    <div class="paymentbody" :style="bodysize">
      
       <div class="paymentrow1">
           <div class="payrow-rowgap10"/>
           <div class="payrow1-header">
              <div class="payrow1-userwx">  
                  <div class="payrow1-headerimg">
                      <img :src="user.headimg" style="height:30px;width:30px;"/>
                  </div>
                  <div class="payrow-rowgap10"/>
                  <div class="payrow1-nickname">
                      {{user.nickname}}
                  </div>
              </div>
              <div class="payrow1-useraddr">
                  <div class="payrow1-useraddr-txt">
                      
                  </div>
                  <div class="payrow1-useraddr-name" @click="backOrignal">
                      回原点
                  </div>
              </div>
           </div>
           <div class="payrow-rowgap10"/>
       </div>
       <div class="paymentrow2" ref="mygraphDiv">
          
       </div>
    </div>
</template>  

<style>
/*账单主页面*/
.paymentbody{
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction:column;
    }

/*第一行头部,10%高度*/
.paymentrow1{
    display:flex;
    width: 100%;
    height:60px;
    flex-direction:row;
    flex-wrap: nowrap;
    justify-content: stretch; 
    align-items: stretch;
    background-color:#0084FF;
}
/*2行的布局，横向日历控件*/
.paymentrow2{
    flex: 1;       /*填充父容器剩余空间 */
    width: 100%;
    background: #ffffff;
    overflow-y: scroll;     /*超出部分滚动*/

}


/*列距*/
.payrow-buttongap{
    display:flex;
    flex-basis: 10px;
    height: 100%;
    flex-grow: 10;
    flex-shrink:10;
    background-color:rgba(0,0,0,0.0);
}

/*列距*/
.payrow-colgap10{
    display:flex;
    flex-basis: 10px;
    flex-grow: 0;
    flex-shrink:0;
    background-color:rgba(0,0,0,0.0);
}

/*列距*/
.payrow-rowgap10{
    display:flex;
    flex-basis: 10px;
    flex-grow: 0;
    flex-shrink:0;
    background-color:rgba(0,0,0,0.0);
}

/*头部*/
.payrow1-header{
    display:flex;
    flex-direction:row;
    justify-content:flex-start; 
    align-items: center;
    height: 100%;
    flex-grow: 10;
    flex-shrink:10;
    flex-basis: 10px;
    background-color:rgba(0,0,0,0.0);
}
/*头部导航栏--用户信息*/
.payrow1-userwx{
    display: flex;
    flex-direction:row;
    justify-content:flex-start; 
    align-items: center;
    height:100%;
    flex-grow: 50;
    flex-shrink: 50;
    flex-basis: 0px;
    overflow: hidden;
    font-size: 12px;
}


/*头部导航栏--用户地址*/
.payrow1-useraddr{
    display: flex;
    flex-direction:column;
    justify-content:space-around; 
    align-items: flex-end;
    height:100%;
    flex-grow: 50;
    flex-shrink: 50;
    flex-basis: 0px;
    overflow: hidden;
    font-size: 12px;
}

/*头部导航栏--用户头像和用户昵称*/
.payrow1-headerimg{
    display: flex;
    flex-direction:row;
    justify-content:center; 
    align-items: center;
    height:30px;
    width: 30px;
    overflow: hidden;
    border-radius: 50%;

}

/*头部导航栏--用户头像和用户昵称*/
.payrow1-nickname{
    display: flex;
    flex-direction:row;
    justify-content:flex-start; 
    align-items: center;
    height:100%;
    flex-grow: 50;
    flex-shrink: 50;
    flex-basis: 0px;
    overflow: hidden;
    font-size: 10px;
    color: #eeeeee;
  
}

/*头部导航栏--用户地址*/
.payrow1-useraddr-txt{
    display: flex;
    flex-direction:row;
    justify-content:flex-end; 
    align-items: flex-end;
    flex-grow: 50;
    flex-shrink: 50;
    flex-basis: 0px;
    overflow: hidden;
    font-size: 12px;
    color: #eeeeee;
}

/*头部导航栏--用户地址*/
.payrow1-useraddr-name{
    display: flex;
    flex-direction:row;
    justify-content:flex-end; 
    align-items: flex-start;
    flex-grow: 50;
    flex-shrink: 50;
    flex-basis: 0px;
    overflow: hidden;
    font-size: 12px;
    color: #eeeeee;
}


/*重新自定义图标大小 */
.my-icon 
{
      min-width: 1.5em;
      height: 36px;
    font-size: 24px;
    line-height: 36px;
}
.van-cell__left-icon {
      min-width: 1.5em;
      height: 36px;
    font-size: 24px;
    line-height: 36px;
}



/* */
</style>

<script>
import {billdayscope2str,conversqltimestr_2_Beijingtime,getBeijingtimeStam,sqlstr_2_timestamp,PrefixInteger,timestam_2_str,timestam_2_shortstr,conversqltimestr_2_time} from '@/api/common'
import { Button } from 'vant';
import { Stepper } from 'vant';
import { Toast } from 'vant';
import { Popup } from 'vant';
import { Loading } from 'vant';
import { Cell, CellGroup } from 'vant';
import {  getWXUserMapFile} from '@/api/myweixin'
import {  setupmxShapeBasic } from '@/utils/mxBasic'
import {CheckWeChatBrowser} from  '@/api/common'

export default {
 name: 'payment',
  components:{
   
   },
  data() {
    return {
      bodysize:{

　　　　　　width:'200px',
　　　　　　height:'',
           background: 'white',
           
　　　　},
     imgsize:{
         　width:'200px',
　　　　　　height:'' 
     },
     user:{
         nickname:'',
         headimg:'',
         openid:''
     },
     paymentLst:new Array(),
     isLoading:true,
     toast:null,
     zoomInCounter:0,
     zoomOutCounter:0,
    }
  },
  created(){


    if (null != this.$store.state.mytenant.wxuser)
    {
        this.user.nickname= this.$store.state.mytenant.wxuser.nickname
        this.user.headimg = this.$store.state.mytenant.wxuser.headimgurl
        this.user.openid = this.$store.state.mytenant.wxuser.openid
    }
　　this.loadsize()

    //扩展图形
    setupmxShapeBasic()

},


mounted(){
    
    var _this = this

    //装载默认图形
    this.$nextTick(()=>{

        if (!mxClient.isBrowserSupported()) 
        {
            // 判断是否支持mxgraph
            mxUtils.error('Browser is not supported!', 200, false);
        } 
        else 
        {
            
            // 再容器中创建图表
            let MxGraph = mxGraph;
            let MxCodec = mxCodec;

            //注册触屏的手势识别
            var hammer = new Hammer(_this.$refs.mygraphDiv);
            this.setupHammer(hammer)
            
            
            //禁止选择
            _this.graph = new MxGraph(_this.$refs.mygraphDiv);
            _this.graph.setCellsSelectable(false)
            _this.graph.setCellsEditable(false)
            _this.graph.cellsMovable=false
            _this.graph.panningHandler.useLeftButtonForPanning = true;    //允许右键移动视图

            //允许移动视图
            _this.graph.setPanning(true)

            //修改文本标签的显示
            _this.graph.getLabel = function(cell)
            {
                
               
                var attrMap = new Map()
                if (null != cell && cell.value)                       //查看是否有设备属性关联
                {
                    if(typeof(cell.value) == 'string')
                    {
                        return cell.value
                    }

                    debugger
                    var cellValue = cell.value
                    var attributes =cellValue.attributes
                    
                    for(var i = 0; i <  attributes.length; i++)
                    {
                        var atrribute = attributes.item(i)
                        if (null != atrribute && atrribute.name != "" 
                           && atrribute.value)
                        {
                            var name = atrribute.name
                            var attrValue = atrribute.value
                            attrMap.set(atrribute.name,atrribute.value)
                        }
                    }

                }

                
                if (attrMap.has("devname")                 //如果cell有关联设备属性和属性值
                   && attrMap.has("propertyname")
                   && attrMap.has("propertyvalue"))
                   {
                       debugger
                         var nameAttr = attrMap.get("propertyname")
                         var attrValue = attrMap.get("propertyvalue")
                         var attrWeight = attrMap.get("weight")
                         var strLabel = ""
                         if (nameAttr)
                         {
                             strLabel += nameAttr
                         }
                         
                         if (attrValue)
                         {
                             strLabel = strLabel + " = " +attrValue
                         }
                         if (attrValue)
                         {
                             strLabel += attrWeight
                         }

                         return strLabel
                   }
                  if(cell.value.tagName){
                    return cell.value.TagName;
                }
               return ""
            };

            // 生成 Hello world!
            var parent = _this.graph.getDefaultParent();

            //应对手机端，添加触摸事件
          //  _this.setupTouchEvent()

          //  _this.TouchMove()

            _this.loadMapFile()

          //  _this.graph.getView().installListeners()
            
          //添加交互事件处理
          //_this.addListen()   
          //  _this.setupMqtt()
          }

      });
        
        
    
},
methods:{

    backOrignal()
    {
        this.graph.zoomActual();
        this.graph.zoomFactor = 1.2;
        alert('缩放重置')
    },
    setupMqtt()
    {
        var mqtt = require('mqtt')
        var client  = mqtt.connect('tcp://134.175.52.44', {
                                    port: 61623,
                                    clientId: 'client41',
                                    username: "mbclient",
                                    password: "my3332361",
                                    clean: false,
                                });
        client.on('connect', function () {
            alert('mqtt链接成功')
        client.subscribe('presence', function (err) {
            if (!err) {
            client.publish('presence', 'Hello mqtt')
            }
        })
        })
        client.on('message', function (topic, message) {
        // message is Buffer
        console.log(message.toString())
       // client.end()
        })
    },

    //创建手势识别
    setupHammer(hammer)
    {
        
      let that = this;

        //开启缩放
      hammer.get("pinch").set({
        enable: true
      });


        hammer.on("pinchstart", function(e) {
            hammer.on("pinchout", function(e) {
                if (++that.zoomInCounter >20)
                {
                    that.zoomInCounter = 0
                    that.graph.zoomIn()
                }
                    
            });
            hammer.on("pinchin", function(e) {

                if (++that.zoomOutCounter >30)
                {
                    that.zoomOutCounter = 0
                    that.graph.zoomOut();
                }

                 
            });

        })
    },
    //设置双点触摸放大和缩小
    setupTouchEvent()
    {
         // 再容器中创建图表
        let MxGraph = mxGraph;
        let MxCodec = mxCodec;

        mxGraphView.prototype.installListeners = function()
		{
			var graph = this.graph;
			var container = graph.container;
			
			if (container != null)
			{
				var md = (mxClient.IS_TOUCH) ? 'touchstart' : 'mousedown';
				var mm = (mxClient.IS_TOUCH) ? 'touchmove' : 'mousemove';
				var mu = (mxClient.IS_TOUCH) ? 'touchend' : 'mouseup';
				
				// Adds basic listeners for graph event dispatching
				mxEvent.addListener(container, md,
					mxUtils.bind(this, function(evt)
					{
                       
						var pt = mxUtils.convertPoint(graph.container,
							mxEvent.getClientX(evt), mxEvent.getClientY(evt));
						var cell = graph.getCellAt(pt.x, pt.y);
						var state = this.getState(cell);
 
						if (state != null)
						{
							this.graph.fireMouseEvent(mxEvent.MOUSE_DOWN,
									new mxMouseEvent(evt, state));
						}
						// Condition to avoid scrollbar events starting a rubberband
						// selection
						else if (this.isContainerEvent(evt) &&
							((!mxClient.IS_IE && 
							!mxClient.IS_GC && !mxClient.IS_OP && !mxClient.IS_SF) ||
							!this.isScrollEvent(evt)))
						{
							this.graph.fireMouseEvent(mxEvent.MOUSE_DOWN,
								new mxMouseEvent(evt));
						}
					})
				);
				mxEvent.addListener(container, mm,
					mxUtils.bind(this, function(evt)
					{
                      
						var pt = mxUtils.convertPoint(graph.container,
							mxEvent.getClientX(evt), mxEvent.getClientY(evt));
						var cell = graph.getCellAt(pt.x, pt.y);
						var state = this.getState(cell);
	
						if (state != null)
						{
							this.graph.fireMouseEvent(mxEvent.MOUSE_MOVE,
									new mxMouseEvent(evt, state));
						}
						else if (this.isContainerEvent(evt))
						{
							this.graph.fireMouseEvent(mxEvent.MOUSE_MOVE,
								new mxMouseEvent(evt));
						}
					})
				);
				mxEvent.addListener(container, mu,
					mxUtils.bind(this, function(evt)
					{
                      
						var pt = mxUtils.convertPoint(graph.container,
							mxEvent.getClientX(evt), mxEvent.getClientY(evt));
						var cell = graph.getCellAt(pt.x, pt.y);
						var state = this.getState(cell);
	
						if (state != null)
						{
							this.graph.fireMouseEvent(mxEvent.MOUSE_UP,
									new mxMouseEvent(evt, state));
						}
						else if (this.isContainerEvent(evt))
						{
							this.graph.fireMouseEvent(mxEvent.MOUSE_UP,
								new mxMouseEvent(evt));
						}
					})
				);
				
				// 添加双击事件
				mxEvent.addListener(container, 'dblclick',
					mxUtils.bind(this, function(evt)
					{
						var pt = mxUtils.convertPoint(graph.container,
							mxEvent.getClientX(evt), mxEvent.getClientY(evt));
						var cell = graph.getCellAt(pt.x, pt.y);
						
						this.graph.dblClick(evt, cell);
					})
				);
							
				// 增加了基本的手势的处理侦听器
				mxEvent.addListener(document, md,
					mxUtils.bind(this, function(evt)
					{
                        this.graph.fireMouseEvent(mxEvent.MOUSE_DOWN,
								new mxMouseEvent(evt));
						if (this.isContainerEvent(evt))
						{
							//this.graph.panningHandler.hideMenu();
						}
					})
				);
				mxEvent.addListener(document, mm,
					mxUtils.bind(this, function(evt)
					{
                      
                        this.graph.fireMouseEvent(mxEvent.MOUSE_MOVE,
								new mxMouseEvent(evt));
						// 鼠标一开容器时隐藏工具提示 
					/*	if (graph.tooltipHandler != null &&
							graph.tooltipHandler.isHideOnHover())
						{
							graph.tooltipHandler.hide();
						}
						
						if (触摸移动1.captureDocumentGesture &&
							graph.isMouseDown &&
							!mxEvent.isConsumed(evt))
						{
							graph.fireMouseEvent(mxEvent.MOUSE_MOVE,
								new mxMouseEvent(evt));
						}*/
					})
				);
				mxEvent.addListener(document, mu,
					mxUtils.bind(this, function(evt)
					{
                        this.graph.fireMouseEvent(mxEvent.MOUSE_UP,
								new mxMouseEvent(evt));
                        //alert("触摸抬起1")
					/*	if (this.captureDocumentGesture)
						{
							graph.fireMouseEvent(mxEvent.MOUSE_UP,
								new mxMouseEvent(evt));
						}*/
					})
				);
			}
		};

    },
    loadMapFile()
    {
        
        var _this = this
        var openid = this.$store.state.mytenant.wxuser.openid
        var fileParam = {user_count:openid,file_name:"testmap1.xml",file_content:""}
        return new Promise((resolve, reject) => {
        getWXUserMapFile(fileParam).then(response => {
        
            const mapContentXml = response.data.data.file_content           
            var layout = new mxFastOrganicLayout();
            _this.graph.getModel().beginUpdate();

            try {
                
            var node = mxUtils.parseXml(mapContentXml);
            var root = node.documentElement;
            var decoder = new mxCodec(root);
            decoder.decode(root, _this.graph.getModel());
            
            }
            finally {
                _this.graph.getModel().endUpdate();
              //  _this.setupMapUserData()
                alert("打开文件成功!")
            }
    
        }).catch(error => {
            reject(error)
            alert("打开文件失败!")
        })
        })
    },

    //创建用户图形数据
    setupMapUserData()
    {
        
        var j = 0
        var _this = this
        var cells = this.graph.model.cells;

        for(let key  in cells)
        {
            var cell = cells[key]
            if (null != cell && cell.value)
            {
                var cellValue = cell.value
                var attributes =cellValue.attributes
                for(var i = 0; i <  attributes.length; i++)
                {
                    var atrribute = attributes.item(i)
                    if (null != atrribute && atrribute.name != "")
                    {
                        var name = atrribute.name
                        var attrValue = atrribute.value

                        //查找设备名称
                       // var testCell = _this.graph.getModel().getCell(id);
                    }
                }

            }
        }

		

    },

    getFeeStr(fee)
    {

        var feeStr = "¥"+fee.toFixed(2)+"元"
        return feeStr
    },
     //初始化窗口的尺寸
    loadsize()
    {
        //计算父窗口的大小，然后指定
    　 　this.bodysize.height=(window.innerHeight-60)+'px';
        this.bodysize.width = window.width+'px';
　　},
   

   
},
 
}
</script>