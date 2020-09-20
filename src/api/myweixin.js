import request from '@/utils/request'


// 通过微信认证获取业主的图形文件
export function getWXUserMapFile(userqueryParam) {

  debugger
  return request({
    url: '/weixin/getmapfile',
    method: 'post',
    params: userqueryParam
  })
}  

// 通过code获取微信用户信息
export function getWXUserInfo(codeparam) {
    
  return request({
    url: '/weixin/getwxuserinfo',
    method: 'post',
    params: codeparam
  })
}

// 用户扫码后通过功能码+uuid的方式获取用户信息
export function getwxuserinfobyuuid(uuidparam) {
return request({
  url: '/weixin/getwxuserinfobyuuid',
  method: 'post',
  params: uuidparam
})
}

// 创建一个统一下单
export function crtunifiledorder(orderdetail) {
  return request({
    url: '/weixin/crtunifiledorder',
    method: 'post',
    params: orderdetail
  })
  }


  // 创建一个统一下单
export function createwxpayment(payParam) {
  return request({
    url: '/weixin/crtfeeprepay',
    method: 'post',
    data: payParam
  })
}

  
// 获取租户的电表列表
export function getmetersbytenantopenid(openid) {

  debugger
  var meterfilter = {area_id:0,room_id:0,meter_id:0,tenant_openid:openid}
  return request({
    url: '/weixin/getmetersbytenantopenid',
    method: 'post',
    params: meterfilter
  })
}

// 根据电表ID获取电表详细数据和实时数据
export function getmeterbyid(meterid) {

  debugger
  var meterfilter = {area_id:0,room_id:0,meter_id:meterid,tenant_openid:""}
  return request({
    url: '/weixin/getmeterbyid',
    method: 'post',
    params: meterfilter
  })
}


  // 请求一个新的命令编号
  export function getnewcmdsn() {
    return request({
      url: '/weixin/getnewcmdsn',
      method: 'post',
      data: ""
    })
  }

    // 请求一个新的命令编号
    export function fetchcmdstate(cmdparam) {

      debugger
      return request({
        url: '/weixin/fetchcmdstate',
        method: 'post',
        params: cmdparam
      })
    }




    
  
