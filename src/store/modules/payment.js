import {  createpayment,querypayment,querypaystate,createchargepayment,notifypaymentcancel} from '@/api/payment'



const payment = {
  state: {
    payment_list:[],             //电费清单
    cur_payment:null,
   
  },

  mutations: {
      SET_PAYMENTS: (state, payments) => {
        state.payment_list = payments
      },
      SET_CUR_PAYMENT: (state, payment) => {
        state.cur_payment = payment
      },
      

  },

  actions: {

  // 查询支付账单清单
  QueryPayment({ commit },qryParam) {
        

    return new Promise((resolve, reject) => {
      querypayment(qryParam).then(response => {
       
        const data = response.data
      
        resolve(data.data)
      }).catch(error => {
        reject(error)
      })
    })
  },
   
    // 创建支付单
    CreateNewPayment({ commit },payParam) {
        
      
      return new Promise((resolve, reject) => {
        createpayment(payParam).then(response => {
         
          const data = response.data
        
          resolve(data.data)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 创建充值支付单
    CreateNewChargePayment({ commit },chargeParam) {
        
      
      return new Promise((resolve, reject) => {
        createchargepayment(chargeParam).then(response => {
         
          const data = response.data
        
          resolve(data.data)
        }).catch(error => {
          reject(error)
        })
      })
    },

   
     // 通知支付单取消
     NotifyPayCancel({ commit },paymentid) {
        

      return new Promise((resolve, reject) => {
        notifypaymentcancel(paymentid).then(response => {
         
          const data = response.data
        
          resolve(data.data)
        }).catch(error => {
          reject(error)
        })
      })
    },

      // 查询支付单状态
      QueryPayState({ commit },paymentid) {
        
        var qryParam = {payment_id:paymentid,payment_state:0}
        return new Promise((resolve, reject) => {
          querypaystate(qryParam).then(response => {
           
            const data = response.data
          
            resolve(data.data)
          }).catch(error => {
            reject(error)
          })
        })
      },

  }
}

export default payment
