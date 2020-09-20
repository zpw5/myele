import request from '@/utils/request'


// 获取业主园区的房间列表
export function getRooms(roomfilter) {
  return request({
    url: '/room/gettenantrooms',
    method: 'post',
    params: roomfilter
  })
}

// 创建房间
export function createroom(roomparam) {
  
return request({
  url: '/room/createroom',
  method: 'post',
  params: roomparam
})
}

// 更新房间基本信息
export function updateroominfo(room) {
  
return request({
  url: '/room/updateroominfo',
  method: 'post',
  params: room
})
}

// 更新房间租户信息updateroomtenant
export function updateroomtenant(room) {
  
  return request({
    url: '/room/updateroomtenant',
    method: 'post',
    params: room
  })
  }

  // 出租房间
export function lessorroom(lessorparam) {
  
  return request({
    url: '/room/lessorroom',
    method: 'post',
    params: lessorparam
  })
  }
  
    //退租房间
export function unlessorroom(lessorparam) {
  
  return request({
    url: '/room/unlessorroom',
    method: 'post',
    params: lessorparam
  })
  }