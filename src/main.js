import Vue from 'vue'

import Cookies from 'js-cookie'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'vant/lib/index.css';
import '@/styles/index.scss' // global css
import '@/assets/icon/iconfont.css' //引入阿里图标

import Swiper from 'swiper'
import 'swiper/dist/css/swiper.min.css';

import App from './App'
import store from './store'
import router from './router'

// import i18n from './lang' // Internationalization
import './icons' // icon
import './errorLog' // error log
import './permission' // permission control

import * as filters from './filters' // global filters
import Hammer from 'hammerjs';
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.min.css';
import { Checkbox } from 'vant'
import { Button } from 'vant'
import { NumberKeyboard } from 'vant'
import { Popup } from 'vant'
import { Toast } from 'vant'
import { Tabbar, TabbarItem } from 'vant';
import { Tab, Tabs } from 'vant';
import { Icon } from 'vant';
import { Field } from 'vant';
import { Picker } from 'vant';
import { Cell } from 'vant';
import mqtt from 'mqtt'
import mx from 'mxgraph';
import shKeyBoard from 'vue-num-keyboard'
import 'vue-num-keyboard/style.css'

import echarts from 'echarts'

const mxgraph = mx({
  mxImageBasePath: '../../images',
  mxBasePath: '../../'
});


window.mxToolbar = mxgraph.mxToolbar;
window.mxCodec = mxgraph.mxCodec;
window.mxClient  = mxgraph.mxClient;
window.mxUtils = mxgraph.mxUtils;
window.mxGraph = mxgraph.mxGraph;
window.mxGraphModel = mxgraph.mxGraphModel;
window.mxEditor = mxgraph.mxEditor;
window.mxGeometry = mxgraph.mxGeometry;
window.mxDefaultKeyHandler = mxgraph.mxDefaultKeyHandler;
window.mxDefaultPopupMenu = mxgraph.mxDefaultPopupMenu;
window.mxStylesheet = mxgraph.mxStylesheet;
window.mxDefaultToolbar = mxgraph.mxDefaultToolbar;
window.mxFastOrganicLayout=mxgraph.mxFastOrganicLayout
window.mxCell = mxgraph.mxCell
window.mxEvent = mxgraph.mxEvent
window.mxPoint = mxgraph.mxPoint
window.mxActor=mxgraph.mxActor
window.mxConstants=mxgraph.mxConstants
window.mxCellRenderer = mxgraph.mxCellRenderer
window.mxShape = mxgraph.mxShape
window.mxGraphView=mxgraph.mxGraphView
window.mxMouseEvent=mxgraph.mxMouseEvent

Vue.use(NumberKeyboard)
Vue.use(Popup)
Vue.use(Button)
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(Checkbox);
Vue.use(Toast)
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(Icon);
Vue.use(Field);
Vue.use(Cell);
Vue.use(VueAwesomeSwiper)
Vue.use(shKeyBoard);
Vue.use(Picker)

Vue.prototype.$echarts = echarts


Vue.use(Element, {
  size: Cookies.get('size') || 'medium' // set element-ui default size
  // i18n: (key, value) => i18n.t(key, value)
})

// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  // i18n,
  render: h => h(App)
})
