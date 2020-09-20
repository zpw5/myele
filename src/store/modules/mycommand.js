import {  getnewcmdsn,fetchcmdstate} from '@/api/myweixin'



const mycommand = {
  state: {
    cur_command:null,
   
  },

  mutations: {

      SET_CUR_COMMAND: (state, command) => {
        state.cur_command = command
      },
      

  },

  actions: {


   
    // 创建支付单
    GetNewCommandSN({ commit }) {
        
      
      return new Promise((resolve, reject) => {
        getnewcmdsn().then(response => {
         
          const data = response.data
        
          resolve(data.data)
        }).catch(error => {
          reject(error)
        })
      })
    },
     // 创建支付单
     FetchCommandState({ commitN },cmdSN) {
        
      
      return new Promise((resolve, reject) => {
        fetchcmdstate(cmdSN).then(response => {
         
          const data = response.data
        
          resolve(data.data)
        }).catch(error => {
          reject(error)
        })
      })
    },

    


  }
}

export default mycommand
