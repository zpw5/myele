import {  getTenantAreaList } from '@/api/area'


const area = {
  state: {
    currentarea:null,     //当前园区
    areas:[],           //用户有权限的园区
  },

  mutations: {
      SET_CUR_AREA: (state, area) => {
        state.currentarea = area
      },
      SET_TALENT_AREAS: (state, areas) => {
        state.areas = areas
      }
  },

  actions: {


    // 通过Token获取业主所有的园区列表
    GetTenantAreaList({ commit }) {
        
      return new Promise((resolve, reject) => {
        getTenantAreaList().then(response => {
          console.log(response)
          const data = response.data
          commit('SET_TALENT_AREAS', data.data)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
      
  }
}

export default area
