
import { getWXUserInfo } from '@/api/myweixin'


//租户登录信息
const mytenant = {
  state: {
    
    wxuser:null,      //租户的微信登录信息
   
  },

  mutations: {
    
    SET_CUR_TENANTUSER: (state, userinfo) => {
      state.wxuser = userinfo
    }
  },

  actions: {
    
    
  
   

  
  
  
  }
}

export default mytenant
