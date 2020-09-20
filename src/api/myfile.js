import request from '@/utils/request'




// 从服务器获取xml文件
export function getMapFile(queryParam) {

  return request({
    url: '/myfile/getmapfile',
    method: 'post',
    params: queryParam
  })
}  

// 获取用户图形列表
export function getMapFileList() {

  return request({
    url: '/myfile/getmapfilelist',
    method: 'post',
    params: ''
  })
}  

// 保存文件
export function saveMapFile(queryParam) {

  return request({
    url: '/myfile/savemapfile',
    method: 'post',
    params: queryParam
  })
}  