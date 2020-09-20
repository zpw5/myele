import request from '@/utils/request'


// 获取房间的水表列表
export function getRoomWMeterList(roomid) {

  
  var watermeterfilter = {room_id:roomid+''}
  return request({
    url: '/wmeter/getroomwmeters',
    method: 'post',
    params: watermeterfilter
  })
}

// 获取园区的水表列表
export function getAreaWMeterList(areaid) {

  
  var watermeterfilter = {area_id:areaid+''}
  return request({
    url: '/wmeter/getareawmeters',
    method: 'post',
    params: watermeterfilter
  })
}

// 绑定水表到房间
export function bindWMeter(wmeter) {

return request({
  url: '/wmeter/bindwmeter',
  method: 'post',
  params: wmeter
})
}

// 解绑释放水表
export function unbindWMeter(wmeterid) {
  var wmeterfilter = {room_id:0,meter_id:wmeterid}
  return request({
    url: '/wmeter/unbindwmeter',
    method: 'post',
    params: wmeterfilter
  })
  }

  // 设置水表的期初值和水价
  export function setWMeterBasePrice(wmeterBasePrice) {
    return request({
      url: '/wmeter/setwmeterbaseprice',
      method: 'post',
      params: wmeterBasePrice
    })
    }
  