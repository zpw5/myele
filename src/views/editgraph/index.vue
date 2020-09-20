<template>
  <div class="container-div" >
     <el-dialog
         
            title="文件对话框"
            :visible.sync="file_dlg_visible"
            width="40%"
          >
          <filedlg ref="setmeterdlg" v-on:onclickOK="onFileDlgOK" :fileContent="mapContent" v-on:onClickCancel="onFileDlgCancel" />
     </el-dialog>
       <el-dialog
         
            title="打开图形文件"
            :visible.sync="fileopen_dlg_visible"
            width="40%"
          >
          <fileopendlg ref="fileopendlg" v-on:onFileOpenDlgOK="onFileOpenDlgOK"  v-on:onFileOpenDlgCancel="onFileOpenDlgCancel" />
     </el-dialog>
    <div class="toolbar-div">
        <el-collapse v-model="activeName" >
            <el-collapse-item title="基本图形" name="1">
                <div class="mytoolbar" ref="toolbarbasic">
                </div>
            </el-collapse-item>
            <el-collapse-item title="电力图符" name="2">
              <div>控制反馈：</div>
              <div>页面反馈</div>
            </el-collapse-item>
            <el-collapse-item title="道路图符" name="3">
              <div>控制反馈：</div>
              <div>页面反馈</div>
            </el-collapse-item>
            <el-collapse-item title="SVG图符" name="4">
              <div>控制反馈：</div>
              <div>页面反馈</div>
            </el-collapse-item>
        </el-collapse>
        
    </div>
    <div class="right-pannel">
        <div class="menu-pannel">
          <div class="gap-div"/>
           <el-link icon="el-icon-suitcase" @click="onOpenFile()">打开</el-link>
           <el-divider direction="vertical"></el-divider>
          <div class="gap-div"/>
          <div class="gap-div"/>
           <el-link icon="el-icon-suitcase" @click="onMenuExport">保存</el-link>
           <el-divider direction="vertical"></el-divider>
          <div class="gap-div"/>
          <i class="el-icon-share" style="font-size:20px"></i>
          <el-divider direction="vertical"></el-divider>
          <div class="gap-div"/>
          <el-link icon="el-icon-delete" @click="onDelCell">删除</el-link>
        </div>
        <div class="content-pannel">
          <div class="canvas-pannel" ref="mygraphDiv">
          </div>
          <div class="attribute-pannel" v-if="isDspAttributePannel===true">
            <el-tabs v-model="activeTabName">
              <el-tab-pane label="样式" name="styletab" >
                <div style="width: 100%; display: inline">
                  <el-row type="flex" justify="space-around" align="middle">
                    <el-col :span="2">
                    </el-col>
                    <el-col :span="5">
                        样式
                    </el-col>
                     <el-col :span="15">
                         <el-select v-model="curStyleName" size="mini" @change="onSelStyle" placeholder="请选择">
                            <el-option
                              v-for="item in mySheets"
                              :key="item.label"
                              :label="item.label"
                              :value="item.label">
                            </el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="2"/>
                  </el-row>
                  <el-row type="flex" justify="space-around" align="middle">
                    <el-col :span="2">
                    </el-col>
                    <el-col :span="15">
                        <el-checkbox size="mini" v-model="curCellStyle.Fill" @change="onStyleChange">填充</el-checkbox>
                    </el-col>
                     <el-col :span="6">
                        <el-color-picker 
                          size="mini" 
                          v-model="curCellStyle.FillColor" 
                          color-format='hex' 
	                        @change='onStyleChange'></el-color-picker>
                    </el-col>
                    <el-col :span="2"/>
                  </el-row>
                  <el-row  type="flex" justify="space-around" align="middle">
                    <el-col :span="2">
                    
                    </el-col>
                    <el-col :span="15">
                       <el-checkbox size="mini" v-model="curCellStyle.Gradient" @change="onStyleChange">渐进填充</el-checkbox>
                    </el-col>
                    <el-col :span="6">
                      <el-color-picker 
                          size="mini" 
                          v-model="curCellStyle.GradientColor"
                           color-format='hex' 
	                        @change='onStyleChange'>
                      </el-color-picker>
                    </el-col>
                    <el-col :span="2"/>
                  </el-row>
                  <el-divider></el-divider>
                  <el-row  type="flex" justify="space-around" align="middle">
                   <el-col :span="2">
                    </el-col>
                    <el-col :span="6">
                        边框
                    </el-col>
                     <el-col :span="12">
                        <el-input-number 
                        size="mini" 
                        v-model="curCellStyle.BorderWidth" 
                        @change="onStyleChange">
                      </el-input-number>
                    </el-col>
                    <el-col :span="2"/>
                  </el-row>
                  <el-row  type="flex" justify="space-around" align="middle">
                    <el-col :span="2">
                    
                    </el-col>
                    <el-col :span="15">
                       颜色
                    </el-col>
                    <el-col :span="6">
                      <el-color-picker 
                          size="mini" 
                          v-model="curCellStyle.StrokeColor"
                           color-format='hex' 
	                        @change='onStyleChange'>
                      </el-color-picker>
                    </el-col>
                    <el-col :span="2"/>
                  </el-row>
                </div>
              </el-tab-pane>
               <el-tab-pane label="文本" name="texttab" >
                  <div style="background: yellow; display: inline">
                      tab2内容
              
                  </div>
              </el-tab-pane>
              <el-tab-pane label="布局" name="layouttab" >
                  <div style="background: yellow; display: inline">
                      tab3内容
              
                  </div>
              </el-tab-pane>
            </el-tabs>

          </div>
        </div>
    </div>
  </div>
</template>

<script>


import swimlaneImg from '@/assets/images/swimlane.gif'
import rectangleImg from '@/assets/images/rectangle.gif'
import roundedImg from '@/assets/images/rounded.gif'
import ellipseImg from '@/assets/images/ellipse.gif'
import rhombusImg from '@/assets/images/rhombus.gif'
import triangleImg from '@/assets/images/triangle.gif'
import cylinderImg from '@/assets/images/cylinder.gif'
import actorImg from '@/assets/images/actor.gif'
import bngImg from '@/assets/images/grid.gif'
import {  getMapFile } from '@/api/myfile'
import {  styleToMap,mapToStyle } from '@/api/common'
import  filedlg  from './filedlg'
import  fileopendlg  from './fileopendlg'
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition';
import {  getMapFileList,saveMapFile } from '@/api/myfile'
import {  setupmxShapeBasic } from '@/utils/mxBasic'


export default {
  name: 'Index',
  components: { filedlg,fileopendlg },
  data() {
     
    return {
        activeName:'1',
        isDspAttributePannel:false,
        activeTabName:'styletab',
        value2:'',
        graph:null,
        v1:null,
        V2:null,
        curStyle:null,
        curStyleName:'',
        mySheets:[],
        mapContent:'',         //图形文件的内容
        file_dlg_visible:false,
        fileopen_dlg_visible:false,
        curCellStyle:{
          Fill:false,
          Gradient:false,
          Line:false,
          LineWidth:1,
          LineColor:'#cccccc',
          FillColor:'#cccccc',
          GradientColor:'#cccccc',
          GradientDirection:0,
          StrokeColor:'#cccccc',
          Border:true,
          BorderWidth:1,
          BorderStyle:0,
        },
    }
  },
  computed: {
  
  },
  created() {
    
    //扩展图形
    setupmxShapeBasic()

      
  },
  mounted()
  {
      
      var _this = this
      this.$nextTick(function () {

        if (!mxClient.isBrowserSupported()) 
        {
            // 判断是否支持mxgraph
            mxUtils.error('Browser is not supported!', 200, false);
        } else 
        {
            // 再容器中创建图表
            let MxGraph = mxGraph;
            let MxCodec = mxCodec;
      
            _this.graph = new MxGraph(_this.$refs.mygraphDiv);

            //允许移动视图
            _this.graph.setPanning(true)

            // 生成 Hello world!
            var parent = _this.graph.getDefaultParent();
            _this.graph.getModel().beginUpdate();
            try {

              //装载样式表
              _this.configStyle()

              
            
              

                  //注册工具栏
              _this.loadToolbar()

            } finally {
                
                _this.graph.getModel().endUpdate();
            }

          
          //添加交互事件处理
          _this.addListen()
            
          
          let encoder = new MxCodec();
          let xx = encoder.encode(_this.graph.getModel());
          var xml=mxUtils.getXml(xx);


            // 保存到getXml参数中
            //装载文件
              
          }

      })
   

  },
   

  methods: {
    
        onOpenFile()
        {
            debugger
            this.fileopen_dlg_visible = true
        },
        
        //文件对话框点击确认
        onFileDlgOK(fileName)
        {
          debugger
            if (!fileName || fileName=='')
            {
                alert('请输入文件名称!')
                return
            }
            this.file_dlg_visible = false

            this.saveMapFileToserver(fileName)
        },

        //文件对话框点击取消
        onFileDlgCancel()
        {
            this.file_dlg_visible = false
        },

        //打开新文件
        onFileOpenDlgOK(filename)
        {
            debugger
            this.loadXmlFile(filename)
            this.fileopen_dlg_visible = false
            
        },
         //文件对话框点击取消
        onFileOpenDlgCancel()
        {
            this.fileopen_dlg_visible = false
        },
        //获取当前的选择图元
        getCurSelCell()
        {
             if ( this.graph.getSelectionCount() == 1)
             {
               var cell = this.graph.getSelectionCell()
               return cell
             }

             return null
        },
        //配置图形的样式表
        configStyle()
        {
            var _this = this

             //允许动态改变样式
            _this.graph.getView().updateStyle = true;

            var style = new Object()                                      //添加样式1
            style[mxConstants.STYLE_FILLCOLOR] = '#000000'
            style[mxConstants.STYLE_GRADIENTCOLOR] = '#F8C48B';
            style[mxConstants.STYLE_FONTCOLOR] = '#000000';
            _this.graph.getStylesheet().putCellStyle('myStyle1', style)

            style = new Object();                                         //添加样式2
            style[mxConstants.STYLE_FILLCOLOR] = '#FF0000;';
            style[mxConstants.STYLE_GRADIENTCOLOR] = '#F8C48B';
            style[mxConstants.STYLE_STROKECOLOR] = '#E86A00';
            style[mxConstants.STYLE_FONTCOLOR] = '#000000';
            style[mxConstants.STYLE_FONTSIZE] = '16';
            style[mxConstants.STYLE_FONTSTYLE] = 1;

            _this.graph.getStylesheet().putCellStyle('myStyle2', style);

            //将样式表添加到样式选择框
            var styles = this.graph.getStylesheet().styles
            
            for (var styleName in styles)
            {
              var option = {}
              option.label = styleName
              option.value = styles[styleName]
              _this.mySheets.push(option)
              
            }

            _this.$forceUpdate()

           //设置图形的动态样式
           

           /* xx = encoder.encode(styles);
            xml=mxUtils.getXml(xx);

            //提取样式
            var node = mxUtils.parseXml(xml);
            var root = node.documentElement;
            var decoder = new mxCodec(root);
            
            var sheets = decoder.decode(root, null);
            if (null != sheets && sheets.styles != null)
            {
              this.mySheets = sheets.styles
            }
            
            
            var str = ""
            for (var style in _this.mySheets)
            {
                str +=style+":"+_this.mySheets[style]+"\n";
            }*/

            
        },

        //修改填充颜色
        onStyleChange()
        {
            
            var cell = this.getCurSelCell()
            if (null == cell)
            {
                return
            }
 
            var fillcolor = 'none'
            var gradientColor = 'none'
            var strokeColor = 'none'
            var strokeWidth = 0


            var previous = cell.getStyle();                           //获取样式映射表
            var styleMap = styleToMap(previous)
            if (!styleMap)
            {
                styleMap = new Map()
            }

            if(this.curCellStyle.Fill)                                //获取填充颜色
            {
               fillcolor = this.curCellStyle.FillColor
            }

            if(this.curCellStyle.Gradient)                            //获取渐进色
            {
               gradientColor = this.curCellStyle.GradientColor
            }

            if (this.curCellStyle.BorderWidth > 0)                   //边框样式和颜色
            {
                strokeColor = this.curCellStyle.StrokeColor
                strokeWidth = this.curCellStyle.BorderWidth
            }


            
            styleMap.set("fillColor",fillcolor)                            //更新样式
            styleMap.set("gradientColor",gradientColor)
            styleMap.set("strokeWidth",strokeWidth)
            styleMap.set("strokeColor",strokeColor)
            var clrStyle = mapToStyle(styleMap)
            this.graph.getModel().setStyle(cell,clrStyle)
            this.graph.getView().invalidate(cell)
        },
      

        //选择图形样式
        onSelStyle()
        {
        
          

          if (this.graph.getSelectionCount() == 1)
          {
              this.isDspAttributePannel = true
              
          }
          else
          {
             this.isDspAttributePannel = false
          }

      
       
        },
        //添加图形事件处理
        addListen()
        {
            var _this = this

            
             //鼠标点击事件
            this.graph.addListener(mxEvent.CLICK, function(sender, evt) {

              
              if (_this.graph.getSelectionCount() == 1)
              {
                  _this.isDspAttributePannel = true
                  
              }
              else
              {
                _this.isDspAttributePannel = false
              }
          //    var cell = evt.getProperty('cell');
           //   var nodeId = self.getTaskId(cell);
             // if (nodeId.length > 0) {
             //   self.clickCell(self.graphId, nodeId);
           //   }
            });

           /* this.graph.addMouseListener({
                mouseDown: function (sender, me) {

                  
                    console.log('mouseDown');
                },
                mouseMove: function (sender, me) {
                    // console.log('mouseMove');
                },
                mouseUp: function (sender, me) {
                    console.log('mouseUp');
                },
                dragEnter: function (evt, state) {
                    console.log('dragEnter');
                    // if (state != null) {
                    //     this.previousStyle = state.style;
                    //     state.style = mxUtils.clone(state.style);
                    //     updateStyle(state, true);
                    //     state.shape.apply(state);
                    //     state.shape.redraw();
                    //
                    //     if (state.text != null) {
                    //         state.text.apply(state);
                    //         state.text.redraw();
                    //     }
                    // }
                },
                dragLeave: function (evt, state) {
                    console.log('dragLeave');
                    // if (state != null) {
                    //     state.style = this.previousStyle;
                    //     updateStyle(state, false);
                    //     state.shape.apply(state);
                    //     state.shape.redraw();
                    //
                    //     if (state.text != null) {
                    //         state.text.apply(state);
                    //         state.text.redraw();
                    //     }
                    // }
                },
                dragover: function (evt, state) {
                    console.log('dragover');
                },
                drop: function (evt, state) {
                    console.log('drop');
                }
            });*/

        },
         
      addToolbarItem(graph, toolbar, prototype, image)  
      {  
        
          var _this = this
            
            // 添加、删除功能  
            var funct = function(graph, evt, cell)  
            {  
                
                var _this = this
                graph.stopEditing(false);  
                var pt = graph.getPointForEvent(evt);  
                var vertex = graph.getModel().cloneCell(prototype);  
                vertex.geometry.x = pt.x;  
                vertex.geometry.y = pt.y;  
                      
                graph.addCell(vertex);  
                graph.setSelectionCell(vertex);   
            }  
  
            // 创建拖动预览图标  
            var img = toolbar.addMode(null, image, funct);  
            mxUtils.makeDraggable(img, graph, funct);  
        },
        
        //装载普通图形工具栏
        loadBasicToolbar()
        {
            var toolbar = new mxToolbar(this.$refs.toolbarbasic);
            toolbar.enabled = false
            var _this = this
        
            var addVertex = function(icon, w, h, style)
            {
              
              var vertex = new mxCell(null, new mxGeometry(0, 0, w, h), style);
              vertex.setVertex(true);
              _this.addToolbarItem(_this.graph, toolbar, vertex, icon);
            };
            var addArcVertex = function(icon, w, h, style)
            {
              debugger
              var style = _this.graph.getStylesheet().getDefaultVertexStyle();
				      style[mxConstants.STYLE_SHAPE] = 'mxgraph.basic.arc';
              var vertex = _this.graph.insertVertex(_this.graph.getDefaultParent(), null, 'mxgraph.basic.arc', 0, 0, w, h,style);
              _this.addToolbarItem(_this.graph, toolbar, vertex, icon);
            };
            

            //添加线段
            var addEdge = function(icon, w, h, style)
            {
                var edge = _this.graph.insertEdge(_this.graph.getDefaultParent(), null, '连线', null,  null,style);
                var ge = edge.geometry
                ge.sourcePoint = new mxPoint(0,0)
                ge.targetPoint = new mxPoint(0,100)
                _this.addToolbarItem(_this.graph, toolbar, edge, icon);
            };

            addVertex(swimlaneImg, 16, 16, 'shape=swimlane;startSize=20;fillColor=none;');
            addVertex(rectangleImg, 16, 16, 'whiteSpace=wrap;html=1;aspect=fixed;gradientColor=#FF6666;fillColor=#FFCCCC;');
            addVertex(roundedImg, 16, 16, 'shape=rounded;fillColor=none;');
            addVertex(ellipseImg, 80, 80, 'shape=ellipse;fillColor=none;');
            addVertex(rhombusImg, 80, 80, 'shape=rhombus;fillColor=none;');
            addVertex(triangleImg, 80, 80, 'shape=triangle;fillColor=none;');
           // addArcVertex(cylinderImg, 80, 80, 'verticalLabelPosition=bottom;verticalAlign=top;html=1;shape=mxgraph.basic.arc;startAngle=0.3;endAngle=0.1;');
            addEdge(triangleImg,80, 80,   'endArrow=none;html=1;edgeStyle=elbowEdgeStyle;strokeWidth=5;fillColor=#e51400;strokeColor=#B20000;shadow=1;');
            toolbar.addLine();
        },

        //删除所选的Cell
        onMenuExport()
        {
            this.mapContent = this.exportXml()
            this.file_dlg_visible = true
           // this.exportXml()
        },
        //响应命令
        onDelCell()
        {
            var cell =   this.getCurSelCell()
            cell.removeFromParent();//删除了此cell 
            this.graph.refresh(cell);
    
        },

         //装载工具栏
        loadToolbar()
        {
        
            this.loadBasicToolbar()
            
        },

        //保存文件到服务器
        saveMapFileToserver(fileName)
        {
            
            var _this = this
            var strContent = this.exportXml()
            var fileParam={file_name:fileName,file_content:strContent}
              return new Promise((resolve, reject) => {
              saveMapFile(fileParam).then(response => {
              
              alert("文件保存成功")    
                
      
              }).catch(error => {
                reject(error)
                alert("文件保存异常")
              })
            })
        },

        //导出Xml文件
        exportXml()
        {
            
            var _this = this
            let MxGraph = mxGraph;
            let MxCodec = mxCodec;
            let encoder = new MxCodec();
            let xx = encoder.encode(this.graph.getModel());
            var xml=mxUtils.getXml(xx);

            //保存样式
       /*     
            var styles = this.graph.getStylesheet()
             xx = encoder.encode(styles);
             xml=mxUtils.getXml(xx);

            //提取样式
            var node = mxUtils.parseXml(xml);
            var root = node.documentElement;
            var decoder = new mxCodec(root);
            
            var sheets = decoder.decode(root, null);
            if (null != sheets && sheets.styles != null)
            {
              this.mySheets = sheets.styles
            }
            
            
            var str = ""
            for (var style in _this.mySheets)
            {
                str +=style+":"+_this.mySheets[style]+"\n";
            }
          */
            return xml
           

        },
        //从服务器下面用户目录下的图形文件列表
        getMapFileList()
        {
            
           
            var _this = this
            var filename = "testmap1.xml"
            var fileParam = {file_name:filename,file_conttent:""}
            return new Promise((resolve, reject) => {
            getMapFile(fileParam).then(response => {
            
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
              }
     
            }).catch(error => {
              reject(error)
            })
          })
        },
        //从服务器下面用户目录下的图形文件
        loadXmlFile(mapfileName)
        {
            
           
            var _this = this
    
            var fileParam = {file_name:mapfileName,file_conttent:""}
            return new Promise((resolve, reject) => {
            getMapFile(fileParam).then(response => {
            
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

              alert("打开文件成功!")
              }
     
            }).catch(error => {
              reject(error)
               alert("打开文件失败!")
            })
          })
        },
     
  }
}
</script>

<style lang="scss" scoped>

 .container-div{
  display: flex;
  flex-direction: row;
  justify-content: stretch;
  align-content: stretch;
  flex-wrap: nowrap;
  overflow: hidden;
  width:100%;
  height: 100%;
  }

  /* 左边工具栏区域*/
  .toolbar-div{
    display: flex;
    flex-direction: row;
    height: 100%;
    flex-basis: 0px;
    flex-grow: 15;
    flex-shrink: 15;
     justify-content: stretch;
    align-content: stretch;
  }

  .mytoolbar{

    display: flex;
    flex-direction: row;
    flex-wrap:wrap;
    width: 100%;
    
  }

   /* 绘图区右边区域*/
  .right-pannel{
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: stretch;
    align-content: stretch;
    flex-basis: 0px;
    flex-grow: 85;
    flex-shrink: 85;
    flex-wrap: nowrap;
    overflow: hidden;
    }

    /* 菜单栏*/
    .menu-pannel{
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    flex-basis: 50px;
    flex-grow: 10;
    flex-shrink: 10;

    border: 1px solid #cccccc;
    }

    /* 菜单栏*/
    .content-pannel{
    display: flex;
    flex-direction: row;
    width: 100%;
    flex-grow: 10;
    flex-shrink: 10;
    }

  .canvas-pannel{
  display: flex;
  overflow: hidden;
  height:  2000px;
  flex-basis: 0px;
  flex-grow: 90;
  flex-shrink: 90;
  flex-wrap: nowrap;
  background: url('~@/assets/images/grid.gif');
  }

  .attribute-pannel{
  display: flex;
  height:  100%;
  flex-basis: 0px;
  flex-grow: 20;
  flex-shrink: 20;
  border: 1px solid #cccccc;
  flex-wrap: nowrap;
  overflow: hidden;
  }
  

  .gap-div{
    display: flex;
    flex-direction: row;
    width: 100%;
    flex-basis: 20px;
    flex-grow: 0;
    flex-shrink: 0;
    background-color: #cccccc;
  }
  
  
  
</style>
