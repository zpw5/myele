import {  getMeterByID,registePreMeter} from '@/api/premeter'


const premeter = {
  state: {
    currentpremeter:null,     //当前预付费电表
    premeters:[],             //当前所有的预付费电表
  },

  mutations: {
      SET_CUR_PREMETER: (state, premeter) => {
        state.currentpremeter = premeter
      },
      SET_PREMETERS: (state, premeters) => {
        state.premeters = premeters
      } 
  },

  actions: {


    // 获取房间所有的电表
    GetPreMeterByID({ commit },meterid) {
        
      
      return new Promise((resolve, reject) => {
        getMeterByID(meterid).then(response => {
          const data = response.data
          commit('SET_CUR_PREMETER', data.data)
          resolve(data.data)
        }).catch(error => {
          reject(error)
        })
      })
    },
    //注册电表
    RegistePreMeter({ commit },preMeter) {

      return new Promise((resolve, reject) => {
        registePreMeter(preMeter).then(response => {
          debugger
          const data = response.data
          resolve(data.data)
        }).catch(error => {
          reject(error)
        })
      })
    },


  }
}

export default premeter
