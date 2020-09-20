<template>
  <div>
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
export default {
  data() {
    return {
      id: "",
      list2: [],
      list4: [],
      bashboard: {
        display: "grid",
        width: "1780px",
        height: "1280px",
        margin: "0px 0px 0px 0px",
        padding: "0px 0px 0px 0px",
        background: "#FFFFFF",
        border: "0px solid grey"
      }
    };
  },
  created() {
    //  let idt = this.$route.query.id
    console.log(this.$route.params.Id);
  },

  mounted() {},

  methods: {
    getid() {
      // this.id = this.$route.params.id;
    }
  }
};
</script>
