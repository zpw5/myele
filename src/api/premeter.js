import request from '@/utils/request'


// 通过电表编号获取预付费电表
export function getMeterByID(meterid) {

    
  var meterfilter = {meter_id:meterid}
  return request({
    url: '/premeter/getpremeterbyid',
    method: 'post',
    params: meterfilter
  })
}

// 注册电表
export function registePreMeter(preMeter) {

  return request({
    url: '/premeter/registepremeter',
    method: 'post',
    params: preMeter
  })
}
