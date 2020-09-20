import request from '@/utils/request'

// 获取电费数据:根据园区、房间、表号过滤
export function getMeterFee(queryParam) {

  return request({
    url: '/fee/getmeterfee',
    method: 'post',
    params: queryParam
  })
}  

// 获取电费数据:根据用户的openid获取电费单
export function getMeterFeeByTenantOpenid(queryParam) {

  return request({
    url: '/weixin/gettenantmeterfee',
    method: 'post',
    params: queryParam
  })
}  

// 获取水费数据:根据用户的openid获取水费单
export function getWaterFeeByTenantOpenid(queryParam) {

  return request({
    url: '/weixin/gettenantwaterfee',
    method: 'post',
    params: queryParam
  })
} 


 
// 批量修改水费单
export function BatchUptWMeterFee(uptParam) {

  return request({
    url: '/fee/batchuptwmeterfee',
    method: 'post',
    data: uptParam
    
  })
}  
export function BatchUptMeterFee(uptParam) {

  return request({
    url: '/fee/batchuptmeterfee',
    method: 'post',
    data: uptParam
    
  })
} 


// 获取水费数据:根据园区、房间、表号过滤
export function getWaterFee(queryParam) {

  
  
  return request({
    url: '/fee/getwaterfee',
    method: 'post',
    params: queryParam
  })
}  

// 获取充值费单
export function getChargeFee(queryParam) {

  return request({
    url: '/fee/getchargefee',
    method: 'post',
    params: queryParam
  })
}  
