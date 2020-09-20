import request from '@/utils/request'

// 新增房间
export function sqlquery(parms) {
    return request({
      url: '/sql',
      method: 'get',
      params: parms,
    })
  }
  export function insertsql(parms) {
    return request({
      url: '/sql/insert',
      method: 'get',
      params: parms
    })
  }


  