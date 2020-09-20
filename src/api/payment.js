import request from '@/utils/request'

// 创建一个统一下单
export function createpayment(payParam) {

  debugger
  var prepayParam = {quest_param:payParam}
    return request({
      url: '/weixin/crtfeeprepay',
      method: 'post',
      data: payParam
    })
  }
// 查询支付账单清单
export function querypayment(qryParam) {

  debugger
    return request({
      url: '/weixin/querypament',
      method: 'post',
      params: qryParam
    })
  }
      // 创建一个统一下单
export function createchargepayment(charge) {
  debugger
  return request({
    url: '/weixin/crtchargeprepay',
    method: 'post',
    params: charge
  })
}

  // 通知支付单取消
  export function notifypaymentcancel(paymentid) {
    debugger
    return request({
      url: '/weixin/notifypaymentcancel',
      method: 'post',
      data: paymentid
    })
  }

    // 查询支付状态
    export function querypaystate(paydto) {

      return request({
        url: '/weixin/querypaystate',
        method: 'post',
        params: paydto
      })
    }
