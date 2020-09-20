import request from '@/utils/request'

// 新增用户
export function addUser(data) {
  return request({
    url: '/user',
    method: 'post',
    data: data
  })
}

// 获取用户列表
export function getUserList(parms) {
  return request({
    url: '/user',
    method: 'get',
    params: parms
  })
}

// 编辑用户
export function editUser(data) {
  return request({
    url: '/user',
    method: 'put',
    data: data
  })
}

// 重置密码
export function restPass(id) {
  return request({
    url: '/user/' + id,
    method: 'put'
  })
}

// 删除用户
export function deleteUser(id) {
  return request({
    url: '/user/' + id,
    method: 'delete'
  })
}

// 获取用户个人信息
export function getUserInfo() {
  return request({
    url: '/user/info',
    method: 'get'
  })
}

// 修改密码
export function updatePass(parms) {
  return request({
    url: '/user/updatePass',
    method: 'put',
    params: parms
  })
}

// 修改邮箱
export function updateEmail(parms) {
  return request({
    url: '/user/updateEmail',
    method: 'put',
    params: parms
  })
}

// 发送邮箱验证码
export function resetEmail(parms) {
  return request({
    url: '/user/sendMailCode',
    method: 'post',
    params: parms
  })
}

// 发送短信验证码
export function sendSms(phone) {
  return request({
    url: '/auth/sendCode/' + phone,
    method: 'post'
  })
}

// 绑定用户
export function bindUser(data) {
  return request({
    url: '/bind',
    method: 'post',
    data: data
  })
}
// 绑定用户
export function registerUser(data) {
  return request({
    url: '/register',
    method: 'post',
    data: data
  })
}

// 用户扫码后通过功能码+uuid的方式获取用户信息
export function getwxuserinfobyuuid(uuidparam) {
  return request({
    url: '/user/getwxuserinfobyuuid',
    method: 'post',
    params: uuidparam
  })
  }
  
// 通过openid获取用户微信详细信息
export function getWXUserInfoByOpenid(userfilter) {
  
  return request({
    url: '/room/getwxuserdetail',
    method: 'post',
    params: userfilter
  })
  }

  // 获取用户的结算信息
export function getUserPromotionCount() {
  
  return request({
    url: '/user/getpromotioncount',
    method: 'post',
    params: ''
  })
  }

  
  // 更新业主结算信息
export function updatePromotionCount(usercount) {
  
  debugger
  return request({
    url: '/user/updatepromotioncount',
    method: 'post',
    params: usercount
  })
  }
  
  
