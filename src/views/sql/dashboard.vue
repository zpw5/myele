<template>
  <div id="container">
    <!--设置图表选项-->
    <div id="chart_opt">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="仪表板设置" name="first">
          <div id="left_drag">
            <div>图表</div>
            <div id="left_drag_01">
              <div v-for="element in list1" :key="element.id">
                <img
                  :src="element.name"
                  :title="element.title"
                  class="drag-img"
                  @click="addchart(element.type)"
                />
              </div>
            </div>
            <div>控件</div>
            <div id="left_drag_01">
              <div v-for="element in list3" :key="element.id">
                <img
                  :src="element.name"
                  :title="element.title"
                  class="drag-img"
                  @click="addobj(element.type)"
                />
              </div>
            </div>
          </div>
          <div>宽度</div>
          <div>
            <el-input v-model="bashboard.width" placeholder="请设置宽度"></el-input>
          </div>
          <div>高度</div>
          <div>
            <el-input v-model="bashboard.height" placeholder="请设置高度"></el-input>
          </div>
          <div>外边距</div>
          <div>
            <el-input v-model="bashboard.margin" placeholder="请设置外边距"></el-input>
          </div>
          <div>内边距</div>
          <div>
            <el-input v-model="bashboard.padding" placeholder="内边框"></el-input>
          </div>
          <div>边框</div>
          <div>
            <el-input v-model="bashboard.border" placeholder="边框"></el-input>
          </div>
          <div>背景色</div>
          <div>
            <el-color-picker v-model="bashboard.background"></el-color-picker>
          </div>
        </el-tab-pane>
        <el-tab-pane label="图表设置" name="second">
          <div>
            <el-button type="primary" @click="updateset()">更新设置</el-button>
          </div>
          <div>图表标题</div>
          <div>
            <el-input v-model="currentchart.title" placeholder="请设置图表标题"></el-input>
          </div>
          <div>行起始位置</div>
          <div>
            <el-input v-model="currentchart.rowstart" placeholder="请设置行起始位置"></el-input>
          </div>
          <div>行结束位置</div>
          <div>
            <el-input v-model="currentchart.rowend" placeholder="请设置行起始位置"></el-input>
          </div>
          <div>列起始位置</div>
          <div>
            <el-input v-model="currentchart.columnstart" placeholder="请设置行起始位置"></el-input>
          </div>
          <div>列结束位置</div>
          <div>
            <el-input v-model="currentchart.columnend" placeholder="请设置行起始位置"></el-input>
          </div>
          <div>面板背景颜色</div>
          <div>
            <el-color-picker v-model="currentchart.background"></el-color-picker>
          </div>
          <div>图表背景颜色</div>
          <div>
            <el-color-picker v-model="currentchart.color"></el-color-picker>
          </div>
          <div>图表宽度</div>
          <div>
            <el-input v-model="currentchart.width" placeholder="请设置行起始位置"></el-input>
          </div>
          <div>图表高度</div>
          <div>
            <el-input v-model="currentchart.height" placeholder="请设置行起始位置"></el-input>
          </div>
          <div>边框</div>
          <div>
            <el-input v-model="currentchart.border" placeholder="请设置行起始位置"></el-input>
          </div>
          <div>内边距</div>
          <div>
            <el-input v-model="currentchart.margin" placeholder="请设置行起始位置"></el-input>
          </div>
          <div>字体类型</div>
          <div>
            <el-color-picker v-model="bashboard.fontcolor"></el-color-picker>
          </div>
          <div>字体大小</div>
          <div>
            <el-input v-model="currentchart.fontsize" placeholder="请设置行起始位置"></el-input>
          </div>
          <div>字体色</div>
          <div>
            <el-color-picker v-model="bashboard.fontcolor"></el-color-picker>
          </div>

          <div>数据源</div>
          <div>
            <el-select v-model="currentchart.datasource" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
          <div>设置X轴</div>
          <div>
            <el-select v-model="currentchart.X" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
          <div>设置Y轴</div>
          <div>
            <el-select v-model="currentchart.Y" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
          <div>设置系列</div>
          <div>
            <el-select v-model="currentchart.series" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div
      id="right_drag"
      :style="{
        display:this.bashboard.display,
        width:this.bashboard.width,
        height:this.bashboard.height,
        border:this.bashboard.border,
        background:this.bashboard.background,
        paddding:this.bashboard.paddding,
        marrgin:this.bashboard.margin
        }"
    >
      <!--图表生成的区域-->
      <div
        id="right_drag_02"
        style="display:grid;grid-template-columns:repeat(100, 1%);grid-template-rows:repeat(100, 1%);"
      >
        <div
          v-for="element in list2"
          :key="element.name"
          class="griditem"
          @click="chartclick(element)"
          :style="{'grid-column-start':element.columnstart,'grid-column-end':element.columnend,
        'grid-row-start':element.rowstart,'grid-row-end':element.rowend,background:element.background
        }"
        >
          <div :style="{width:element.width,height:element.height,border:element.border}">
            <div :id="element.type + element.id" :style="{width: '99%', height: '99%'}"></div>
          </div>
        </div>
        <!--控件生成的区域-->
        <div
          v-for="element in list4"
          :key="element.name"
          class="griditem"
          @click="objclick(element)"
          :style="{'grid-column-start':element.columnstart,'grid-column-end':element.columnend,
        'grid-row-start':element.rowstart,'grid-row-end':element.rowend,background:element.background
        }"
        >
          <div
            :id="element.type + element.id"
            :style="{width:element.width,
           height:element.height,
           border:element.border,
          'font-size':element.fontsize,
           color:element.fontcolor,
           font:element.font,
           padding:element.padding
          }"
          >
            <div v-if="element.type == 'lable'">{{element.title}}</div>
            <div v-if="element.type == 'inputtext'">
              <el-input v-model="element.title"></el-input>
            </div>
            <div v-if="element.type == 'select'">
              <el-select v-model="element.title" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </div>
            <div v-if="element.type == 'douxian'">
              <el-checkbox v-model="element.checked">{{element.title}}</el-checkbox>
            </div>
            <div v-if="element.type == 'danxian'">
              <el-radio-group v-model="element.radio" disabled size="mini">
                <el-radio-button v-for="item in element.ra" :key="item.key" :label="item.lab"></el-radio-button>
              </el-radio-group>
            </div>
            <div v-if="element.type == 'count'">
              <el-input-number
                v-model="element.num"
                :min="element.min"
                :max="element.max"
                label="描述文字"
              ></el-input-number>
            </div>
            <div v-if="element.type == 'data'">
              <el-date-picker v-model="element.value" :type="element.types" placeholder="选择日期"></el-date-picker>
            </div>
            <div v-if="element.type == 'slide'">
              <el-slider v-model="element.slidervalue"></el-slider>
            </div>
            <div v-if="element.type == 'switch'">
              <el-switch
                v-model="element.checked"
                :active-color="element.background"
                :inactive-color="element.color"
              ></el-switch>
            </div>
            <div v-if="element.type == 'progress_bar'">
              <el-progress
                :text-inside="true"
                :stroke-width="20"
                :percentage="50"
                status="exception"
              ></el-progress>
            </div>
          </div>
        </div>

        <!--控件生成区域结束-->
      </div>
    </div>
  </div>
</template>

<script>
//
let id = 0;
var echarts = require("echarts");
import { chartopt } from "@/js/opt";
import draggable from "vuedraggable";
export default {
  name: "HelloWorld",
  data() {
    return {
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      activeName: "first",
      bashboard: {
        display: "grid",
        width: "1780px",
        height: "1280px",
        margin: "0px 0px 0px 0px",
        padding: "0px 0px 0px 0px",
        background: "#FFFFFF",
        border: "0px solid grey"
      },
      currentchart: {
        pid: null,
        type: null,
        chartid: null,
        title: "",
        rowstart: null,
        rowend: null,
        columnstart: null,
        columnend: null,
        background: null,
        color: null,
        height: "",
        width: "",
        border: "",
        datasource: "",
        X: "",
        Y: "",
        series: ""
      },
      list1: [
        {
          name: "../../../static/images/line_1.png",
          id: 1,
          title: "折线图",
          type: "line",
          pid: "echart",
          cs: { width: "450px", height: "350px", border: "1px solid #F1F1F1" }
        },
        {
          name: "../../../static/images/bar.png",
          id: 2,
          title: "柱状图",
          type: "bar",
          cs: { width: "450px", height: "250px", border: "1px solid #F1F1F1" }
        },
        {
          name: "../../../static/images/pie.png",
          id: 3,
          title: "饼图",
          type: "pie",
          cs: { width: "450px", height: "250px", border: "1px solid #F1F1F1" }
        },
        {
          name: "../../../static/images/sandian.png",
          id: 4,
          title: "散点图",
          type: "sandian",
          cs: { width: "450px", height: "250px", border: "1px solid #F1F1F1" }
        },
        {
          name: "../../../static/images/map.png",
          id: 5,
          title: "地图",
          type: "ditou",
          cs: { width: "450px", height: "250px", border: "1px solid #F1F1F1" }
        },
        {
          name: "../../../static/images/K_line.png",
          id: 6,
          title: "K线图",
          type: "k_line",
          cs: { width: "450px", height: "250px", border: "1px solid #F1F1F1" }
        },
        {
          name: "../../../static/images/ldt.png",
          id: 7,
          title: "雷达图",
          type: "ldt",
          cs: { width: "450px", height: "250px", border: "1px solid #F1F1F1" }
        },
        {
          name: "../../../static/images/reli.png",
          id: 8,
          title: "热力图",
          type: "reli",
          cs: { width: "450px", height: "250px", border: "1px solid #F1F1F1" }
        },
        {
          name: "../../../static/images/gxt.png",
          id: 9,
          title: "关系图",
          type: "gxt",
          cs: { width: "450px", height: "250px", border: "1px solid #F1F1F1" }
        },
        {
          name: "../../../static/images/tree.png",
          id: 10,
          title: "树图",
          type: "tree",
          cs: { width: "450px", height: "250px", border: "1px solid #F1F1F1" }
        },
        {
          name: "../../../static/images/jx.png",
          id: 11,
          title: "矩形树图",
          type: "tjx",
          cs: { width: "450px", height: "250px", border: "1px solid #F1F1F1" }
        },
        {
          name: "../../../static/images/fsux.png",
          id: 12,
          title: "旭日图",
          type: "fsux",
          cs: { width: "450px", height: "250px", border: "1px solid #F1F1F1" }
        },
        {
          name: "../../../static/images/suji.png",
          id: 13,
          title: "桑基图",
          type: "suji",
          cs: { width: "450px", height: "250px", border: "1px solid #F1F1F1" }
        },
        {
          name: "../../../static/images/ld.png",
          id: 14,
          title: "漏斗图",
          type: "ld",
          cs: { width: "450px", height: "250px", border: "1px solid #F1F1F1" }
        },
        {
          name: "../../../static/images/ybp.png",
          id: 15,
          title: "仪表图",
          type: "ybp",
          cs: { width: "450px", height: "250px", border: "1px solid #F1F1F1" }
        },
        {
          name: "../../../static/images/table.png",
          id: 16,
          title: "表格",
          type: "t_table",
          cs: { width: "450px", height: "250px", border: "1px solid #F1F1F1" }
        }
      ],
      list2: [],
      list3: [
        {
          name: "../../../static/images/lable.png",
          id: 17,
          title: "标题",
          type: "lable",
          cs: { width: "50px", height: "50px", border: "1px solid #F1F1F1" }
        },
        {
          name: "../../../static/images/text.png",
          id: 18,
          title: "文本框",
          type: "inputtext",
          cs: { width: "50px", height: "50px", border: "1px solid #F1F1F1" }
        },
        {
          name: "../../../static/images/text_link.png",
          id: 19,
          title: "文本链接",
          type: "linktext",
          cs: { width: "50px", height: "50px", border: "1px solid #F1F1F1" }
        },
        {
          name: "../../../static/images/select.png",
          id: 20,
          title: "下拉框",
          type: "select",
          cs: { width: "50px", height: "50px", border: "1px solid #F1F1F1" }
        },
        {
          name: "../../../static/images/douxian.png",
          id: 21,
          title: "多选框",
          type: "douxian",
          cs: { width: "50px", height: "50px", border: "1px solid #F1F1F1" }
        },
        {
          name: "../../../static/images/danxian.png",
          id: 22,
          title: "单选框",
          type: "danxian",
          cs: { width: "50px", height: "50px", border: "1px solid #F1F1F1" }
        },
        {
          name: "../../../static/images/count.png",
          id: 23,
          title: "计数器",
          type: "count",
          cs: { width: "50px", height: "50px", border: "1px solid #F1F1F1" }
        },
        {
          name: "../../../static/images/data.png",
          id: 24,
          title: "日期",
          type: "data",
          cs: { width: "50px", height: "50px", border: "1px solid #F1F1F1" }
        },
        {
          name: "../../../static/images/slide.png",
          id: 25,
          title: "滑块",
          type: "slide",
          cs: { width: "50px", height: "50px", border: "1px solid #F1F1F1" }
        },
        {
          name: "../../../static/images/switch.png",
          id: 26,
          title: "开关按钮",
          type: "switch",
          cs: { width: "50px", height: "50px", border: "1px solid #F1F1F1" }
        },
        {
          name: "../../../static/images/progress_bar.png",
          id: 27,
          title: "进度条",
          type: "progress_bar",
          cs: { width: "50px", height: "50px", border: "1px solid #F1F1F1" }
        }
      ],
      list4: []
    };
  },
  components: {
    draggable
  },
  mounted() {},
  methods: {
    log: function(e) {
      this.$nextTick(function() {
        for (var i = 0; i < this.list2.length; i++) {
          console.log(this.list2[i]);
          this.drawLine(
            this.list2[i].type + this.list2[i].id,
            this.list2[i].opt
          );
        }
      });
    },
    chartclick(element) {
      //点击右边的图表，将图表的属性写到图表设置里面，获取图表的属性；
      this.activeName = "second";
      this.currentchart.pid = element.pid;
      this.currentchart.type = element.type;
      this.currentchart.title = element.title;
      (this.currentchart.rowstart = element.rowstart),
        (this.currentchart.rowend = element.rowend),
        (this.currentchart.columnstart = element.columnstart),
        (this.currentchart.columnend = element.columnend),
        (this.currentchart.background = element.background),
        (this.currentchart.color = element.color);
      (this.currentchart.height = element.height),
        (this.currentchart.width = element.width),
        (this.currentchart.border = element.border),
        (this.currentchart.datasource = element.datasource),
        (this.currentchart.X = element.X),
        (this.currentchart.Y = element.Y),
        (this.currentchart.series = element.series);
      this.currentchart.chartid = element.id;
      console.log(this.currentchart.type);
    },
    addchart: function(str) {
      console.log(str);
      var t_chart = {};
      if (str == "line") {
        t_chart.opt = chartopt().lineopt;
        t_chart.type = "line";
        console.log(chartopt);
      } else if (str == "pie") {
        t_chart.opt = chartopt().pieopt;
        t_chart.type = "pie";
      } else if (str == "sandian") {
        t_chart.opt = chartopt().sandianopt;
        t_chart.type = "sandian";
      } else if (str == "k_line") {
        t_chart.opt = chartopt().k_lineopt;
        t_chart.type = "k_line";
      } else if (str == "ldt") {
        t_chart.opt = chartopt().ldtopt;
        t_chart.type = "ldt";
      } else if (str == "reli") {
        t_chart.opt = chartopt().reliopt;
        t_chart.type = "reli";
      } else if (str == "gxt") {
        t_chart.opt = chartopt().gxtopt;
        t_chart.type = "gxt";
      } else if (str == "tree") {
        t_chart.opt = chartopt().treeopt;
        t_chart.type = "tree";
      } else if (str == "tjx") {
        t_chart.opt = chartopt().tjxopt;
        t_chart.type = "tjx";
      } else if (str == "fsux") {
        t_chart.opt = chartopt().fsuxopt;
        t_chart.type = "fsux";
      } else if (str == "ld") {
        t_chart.opt = chartopt().ldopt;
        t_chart.type = "ld";
      } else if (str == "ybp") {
        t_chart.opt = chartopt().ybpopt;
        t_chart.type = "ybp";
      } else {
        t_chart.opt = chartopt().baropt;
        t_chart.type = "bar";
        console.log("5555");
      }
      this.list2.push({
        pid: t_chart.type + id,
        title: t_chart.type + id,
        type: t_chart.type,
        id: id++,
        opt: t_chart.opt,
        width: "450px",
        height: "350px",
        border: "1px solid #F1F1F1",
        columnstart: 1,
        columnend: 4,
        rowstart: 1,
        rowend: 3,
        background: "",
        color: "",
        datasource: "我的数据源",
        X: "X",
        Y: "Y",
        series: "我的系列",
        opt: t_chart.opt
      });
      this.$nextTick(function() {
        for (var i = 0; i < this.list2.length; i++) {
          console.log(this.list2[i]);
          this.drawLine(
            this.list2[i].type + this.list2[i].id,
            this.list2[i].opt
          );
        }
      });
    },
    addobj: function(str) {
      //增加控件部分代码

      var t_type = "";
      var t_width = "80px";
      var t_height = "50px";
      var t_padding = "0px 0px 0px 0px";
      var t_border = null;
      var t_checked = true;
      var t_ra = [];
      var t_opt = {};
      var t_min = 1;
      var t_max = 100;
      var t_num = 19;
      var t_value = "";
      var t_types = "data";
      if (str == "lable") {
        (t_type = "lable"), (t_width = "80px");
        t_height = "50px";
      }
      if (
        str == "inputtext" ||
        str == "select" ||
        str == "douxian" ||
        str == "count" ||
        str == "data" ||
        str == "slide" ||
        str == "switch" ||
        str == "progress_bar"
      ) {
        t_type = str;
        t_width = "200px";
        t_height = "50px";
        t_padding = "0px auto";
        t_min = 1;
        t_max = 100;
      }
      if (str == "danxian") {
        t_type = str;
        t_width = "450px";
        t_height = "120px";
        t_ra = [
          { key: 1, lab: "rabbion1" },
          { key: 2, lab: "rabbion2" },
          { key: 3, lab: "rabbion3" }
        ];
        t_padding = "0px auto";
      }

      console.log(t_type);
      this.list4.push({
        pid: t_type + id,
        title: t_type + id,
        checked: t_checked,
        type: t_type,
        id: id++,
        opt: t_opt,
        width: t_width,
        height: t_height,
        border: t_border,
        padding: t_padding,
        columnstart: 1,
        columnend: 4,
        rowstart: 1,
        rowend: 3,
        background: "",
        value: t_value,
        types: t_types,
        color: "",
        radio: "rabbion1",
        num: t_num,
        min: t_min,
        max: t_max,
        ra: t_ra,
        slidervalue: 0,
        datasource: "我的数据源",
        X: "X",
        Y: "Y",
        series: "我的系列",
        opt: t_opt
      });
      console.log(this.list4);
    },
    //设置图表
    chart_set() {},
    drawLine(chart, opt) {
      var myChart = echarts.init(document.getElementById(chart), "wonderland");
      console.log(myChart);
      myChart.setOption(opt);
      myChart.resize();
      // console.log(myChart);
    },
    handleClick() {},
    objclick(element){
      this.activeName = "second";
      this.currentchart.pid=element.pid;
      this.currentchart.title=element.title;
      this.currentchart.checked=element.checked;
      this.currentchart.type=element.type;
      this.currentchart.id=element.id;
      this.currentchart.width=element.width;
      this.currentchart.height=element.height;
      this.currentchart.border=element.border;
       this.currentchart. padding=element.padding
       this.currentchart. columnstart=element.columnstart
       this.currentchart. columnend=element.columnend
        this.currentchart.rowstart=element.rowstart
       this.currentchart. rowend=element.rowend
        this.currentchart.background=element.background
        this.currentchart.value=element.value
        this.currentchart.types=element.types
        this.currentchart.color=element.color
       this.currentchart.radio=element.radio
        this.currentchart.num=element.num
        this.currentchart.min=element.min
        this.currentchart.max=element.max
        this.currentchart.ra=element.ra
        this.currentchart.slidervalue=element.slidervalue
        this.currentchart.datasource=element.datasource
        this.currentchart.X=element.X
        this.currentchart.Y=element.Y
        this.currentchart.series=element.series
        this.currentchart.opt=element.opt

    },
    updateset() {
      if(this.currentchart.type=='lable'|| this.currentchart.type=="inputtext" 
      || this.currentchart.type== 'select'|| this.currentchart.type== 'douxian'
      || this.currentchart.type== 'count' || this.currentchart.type== 'data'
      || this.currentchart.type== "slide" || this.currentchart.type== 'switch'
      || this.currentchart.type== 'progress_bar'
       )
       {
                console.log('tttt')
           for (var i = 0; i < this.list4.length; i++) {
          if (this.currentchart.pid == this.list4[i].pid) {
            this.list4[i].title = this.currentchart.title;
            this.list4[i].type = this.currentchart.type;
            this.list4[i].width = this.currentchart.width;
            this.list4[i].height = this.currentchart.height;
            this.list4[i].border = this.currentchart.border;
            this.list4[i].columnstart = this.currentchart.columnstart;
            this.list4[i].columnend = this.currentchart.columnend;
            this.list4[i].rowstart = this.currentchart.rowstart;
            this.list4[i].rowend = this.currentchart.rowend;
            this.list4[i].background = this.currentchart.background;
            this.list4[i].color = this.currentchart.color;
            this.list4[i].opt.backgroundColor = this.currentchart.color;
            console.log(this.list4[i].opt);
          }
           }
       }
       else
      {
      this.$nextTick(function() {
        for (var i = 0; i < this.list2.length; i++) {
          if (this.currentchart.pid == this.list2[i].pid) {
            this.list2[i].title = this.currentchart.title;
            this.list2[i].type = this.currentchart.type;
            this.list2[i].width = this.currentchart.width;
            this.list2[i].height = this.currentchart.height;
            this.list2[i].border = this.currentchart.border;
            this.list2[i].columnstart = this.currentchart.columnstart;
            this.list2[i].columnend = this.currentchart.columnend;
            this.list2[i].rowstart = this.currentchart.rowstart;
            this.list2[i].rowend = this.currentchart.rowend;
            this.list2[i].background = this.currentchart.background;
            this.list2[i].color = this.currentchart.color;
            this.list2[i].opt.backgroundColor = this.currentchart.color;
            console.log(this.list2[i].opt);
            this.drawLine(
              this.list2[i].type + this.list2[i].id,
              this.list2[i].opt
            );
          }
        }
      });
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
#container {
  display: flex;
}

#left_drag_01,
#right_drag_02 {
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
}
.drag-img {
  width: 30px;
  height: 30px;
  margin: 10px 10px 10px 10px;
}
#right_drag {
  width: 85%;
  height: 99%;
  padding: 10px 10px 10px 10px;
  margin: 0px 0px 0px 0px;
  border: 1px solid red;
  display: grid;
}
#chart_opt {
  width: 15%;
  height: 1280px;
  padding: 10px 10px 10px 10px;
  margin: 0px 0px 0px 0px;
  border: 1px solid gainsboro;
  display: flex;
}
</style>
