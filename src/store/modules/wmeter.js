import {  getRoomWMeterList,bindWMeter, unbindWMeter,setWMeterBasePrice,getAreaWMeterList} from '@/api/wmeter'


const wmeter = {
  state: {
    currentwmeter:null,     //当前水表
    wmeters:[],             //当前所有的水表
  },

  mutations: {
      SET_CUR_WMETER: (state, wmeter) => {
        state.currentwmeter = wmeter
      },
      SET_WMETERS: (state, wmeters) => {
        state.wmeters = wmeters
      } 
  },

  actions: {

    
    // 获取房间所有的水表
    GetRoomWMeters({ commit },roomid) {
        
      return new Promise((resolve, reject) => {
        getRoomWMeterList(roomid).then(response => {
         
          const data = response.data
          commit('SET_WMETERS', data.data)
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取园区所有的水表
    GetAreaWMeters({ commit },areaid) {
        
      debugger
    return new Promise((resolve, reject) => {
      getAreaWMeterList(areaid).then(response => {
       
        const data = response.data
        commit('SET_WMETERS', data.data)
        resolve(data.data)
      }).catch(error => {
        reject(error)
      })
    })
  },

    // 绑定水表
    BindWMeter({ commit },wmeterinfo) {
      return new Promise((resolve, reject) => {
        bindWMeter(wmeterinfo).then(response => {
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
      
      // 解绑水表
       UnbindWMeter({ commit },wmeterid) {
        
        return new Promise((resolve, reject) => {
          unbindWMeter(wmeterid).then(response => {
            resolve()
          }).catch(error => {
            reject(error)
          })
        })
      },

       // 修改水表的水价和期初值
    SetWMeterBasePrice({ commit },wmeterBasePrice) {
      return new Promise((resolve, reject) => {
        setWMeterBasePrice(wmeterBasePrice).then(response => {
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
  }
}

export default wmeter
