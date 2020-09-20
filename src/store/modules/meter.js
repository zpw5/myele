import {  fetchmetercmdstate,GetNewMeterCommandSN,getRoomMeterList,getAreaMeterList,bindMeter, unbindMeter,setMeterBasePrice,CommitMeterCommand} from '@/api/meter'
import {  getmetersbytenantopenid,getmeterbyid} from '@/api/myweixin'


const meter = {
  state: {
    currentmeter:null,     //当前电表
    meters:[],             //当前所有的电表
  },

  mutations: {
      SET_CUR_METER: (state, meter) => {
        state.currentmeter = meter
      },
      SET_METERS: (state, meters) => {
        state.meters = meters
      } 
  },

  actions: {


     // 获取园区的所有电表
     GetAreaMeters({ commit },areaid) {
        
      return new Promise((resolve, reject) => {
        getAreaMeterList(areaid).then(response => {
         
          const data = response.data
          commit('SET_METERS', data.data)
          resolve(data.data)
        }).catch(error => {
          reject(error)
        })
      })
    },



    // 获取房间所有的电表
    GetRoomMeters({ commit },roomid) {
        
      return new Promise((resolve, reject) => {
        getRoomMeterList(roomid).then(response => {
         
          const data = response.data
          commit('SET_METERS', data.data)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取租户的电表
    GetTenantMetersByOpenid({ commit },openid) {
        
      return new Promise((resolve, reject) => {
        getmetersbytenantopenid(openid).then(response => {
         
          const data = response.data
          commit('SET_METERS', data.data)
          resolve(data.data)
        }).catch(error => {
          reject(error)
        })
      })
    },

     // 根据电表ID获取电表信息
     GetMeterByID({ commit },meterid) {
        
      return new Promise((resolve, reject) => {
        getmeterbyid(meterid).then(response => {
         
          const data = response.data
          commit('SET_CUR_METER', data.data)
          resolve(data.data)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 绑定电表
    BindMeter({ commit },meterinfo) {
      return new Promise((resolve, reject) => {
        bindMeter(meterinfo).then(response => {
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
      
    // 绑定电表
    UnbindMeter({ commit },meterid) {
    return new Promise((resolve, reject) => {
      unbindMeter(meterid).then(response => {
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 修改电表的电价和期初值
  SetMeterBasePrice({ commit },meterBasePrice) {
    return new Promise((resolve, reject) => {
      setMeterBasePrice(meterBasePrice).then(response => {
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

   // 获取新的命令序号SN
 GetNewMeterCommandSN({ commit }) {

  
  return new Promise((resolve, reject) => {
    GetNewMeterCommandSN().then(response => {
      resolve(response.data.data)
    }).catch(error => {
      reject(error)
    })
  })
},


 // 查询命令执行结果
FetchMeterCommandState({ commitN },cmdSN) {
        
  return new Promise((resolve, reject) => {
    fetchmetercmdstate(cmdSN).then(response => {
     
      const data = response.data
    
      resolve(data.data)
    }).catch(error => {
      reject(error)
    })
  })
},

 // 执行电表操作命令
 CommitMeterCommand({ commit },meterCommandParam) {

  
  return new Promise((resolve, reject) => {
    CommitMeterCommand(meterCommandParam).then(response => {
      resolve()
    }).catch(error => {
      reject(error)
    })
  })
},

  }
}

export default meter
