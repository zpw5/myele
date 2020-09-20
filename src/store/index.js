import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import errorLog from './modules/errorLog'
import permission from './modules/permission'
import tagsView from './modules/tagsView'
import user from './modules/user'
import mytenant from './modules/mytenant'
import area from './modules/area'
import room from './modules/room'
import meter from './modules/meter'
import wmeter from './modules/wmeter'
import fee from './modules/fee'
import premeter from './modules/premeter'
import payment from './modules/payment'
import mycommand from './modules/mycommand'
import setting from './modules/setting'
import getters from './getters'


Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    errorLog,
    permission,
    tagsView,
    user,
    mytenant,
    setting,
    area,
    room,
    meter,
    wmeter,
    fee,
    premeter,
    payment,
    mycommand
  },
  getters
})

export default store
