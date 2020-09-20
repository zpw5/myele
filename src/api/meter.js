import request from '@/utils/request'



// 获取园区的电表列表
export function getAreaMeterList(areaid) {

    
  var meterfilter = {area_id:areaid}
  return request({
    url: '/meter/getareameters',
    method: 'post',
    params: meterfilter
  })
}



// 获取房间的电表列表
export function getRoomMeterList(roomid) {

    
  var meterfilter = {room_id:roomid+''}
  return request({
    url: '/meter/getroommeters',
    method: 'post',
    params: meterfilter
  })
}




// 绑定电表到房间
export function bindMeter(meter) {

return request({
  url: '/meter/bindmeter',
  method: 'post',
  params: meter
})
}

// 解绑释放电表
export function unbindMeter(meterid) {
  var meterfilter = {room_id:0,meter_id:meterid}
  return request({
    url: '/meter/unbindmeter',
    method: 'post',
    params: meterfilter
  })
  }

  // 设置电表的期初值和电价
export function setMeterBasePrice(meterBasePrice) {
  return request({
    url: '/meter/setmeterbaseprice',
    method: 'post',
    params: meterBasePrice
  })
  }

  
// 执行电表人工命令
export function GetNewMeterCommandSN() {
  
  return request({
    url: '/meter/getmetercommandsn',
    method: 'post',
    params: ''
  })
  }

  // 执行电表人工命令
  export function CommitMeterCommand(meterCommand) {
    return request({
      url: '/meter/metercommand',
      method: 'post',
      params: meterCommand
    })
    }

// 查询电表命令执行的结果
export function fetchmetercmdstate(cmdparam) {

  
  return request({
    url: '/meter/fetchmetercmdstate',
    method: 'post',
    params: cmdparam
  })
}
