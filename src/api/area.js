import request from '@/utils/request'

// 新增园区
export function addArea(data) {
  return request({
    url: '/area',
    method: 'post',
    data: data
  })
}  

// 获取业主园区列表
export function getTenantAreaList() {
  return request({
    url: '/area/gettenantareas',
    method: 'get',
    params: ''
  })
}
