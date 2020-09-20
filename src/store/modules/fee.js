import {  getMeterFee,getWaterFee,getChargeFee,BatchUptMeterFee,BatchUptWMeterFee,getMeterFeeByTenantOpenid,getWaterFeeByTenantOpenid} from '@/api/fee'


const fee = {
  state: {
    meterfees:[],             //电费清单
    cur_meterfee:null,
    waterfees:[],             //电费清单
    cur_waterfee:null
  },

  mutations: {
      SET_METERFEES: (state, meterfees) => {
        state.meterfees = meterfees
      },
      SET_CUR_METERFEE: (state, meterfee) => {
        state.cur_meterfee = meterfee
      },
      SET_WATERFEES: (state, waterfees) => {
        state.waterfees = waterfees
      },
      SET_CUR_WATERFEE: (state, waterfee) => {
        state.cur_waterfee = waterfee
      } 

  },

  actions: {


    // 获取房间电费清单
    GetMeterFee({ commit },queryParam) {
        
      
      return new Promise((resolve, reject) => {
        getMeterFee(queryParam).then(response => {
         
          const data = response.data
          commit('SET_METERFEES', data.data)
          resolve(data.data)
        }).catch(error => {
          reject(error)
        })
      })
    },

     // 获取租户的电费单
     GetTenantMeterFee({ commit },tenantQueryParam) {
        
      debugger
      return new Promise((resolve, reject) => {
        getMeterFeeByTenantOpenid(tenantQueryParam).then(response => {
         
          const data = response.data
          commit('SET_METERFEES', data.data)
          resolve(data.data)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 批量更新电费
    BatchUptMeterFee({ commit },uptParam) {

      
      return new Promise((resolve, reject) => {
        BatchUptMeterFee(uptParam).then(response => {
         
          resolve(response.data)
        }).catch(error => {
          reject(error)
        })
      })
    },

     // 批量更新水费
     BatchUptWMeterFee({ commit },uptParam) {

      
      return new Promise((resolve, reject) => {
        BatchUptWMeterFee(uptParam).then(response => {
         
          resolve(response.data)
        }).catch(error => {
          reject(error)
        })
      })
    },

     // 获取租户的水费单
     GetTenantWaterFee({ commit },tenantQueryParam) {
        
      debugger
      return new Promise((resolve, reject) => {
        getWaterFeeByTenantOpenid(tenantQueryParam).then(response => {
         
          const data = response.data
          commit('SET_WMETERFEES', data.data)
          resolve(data.data)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取房间水费清单
    GetWaterFee({ commit },queryParam) {
        
      
      return new Promise((resolve, reject) => {
        getWaterFee(queryParam).then(response => {
         
          const data = response.data
          commit('SET_WATERFEES', data.data)
          resolve(data.data)
        }).catch(error => {
          reject(error)
        })
      })
    },
     // 获取充值费单
     GetChargeFee({ commit },queryParam) {
        
      
      return new Promise((resolve, reject) => {
        getChargeFee(queryParam).then(response => {
         
          const data = response.data
          resolve(data.data)
        }).catch(error => {
          reject(error)
        })
      })
    },

  }
}

export default fee
