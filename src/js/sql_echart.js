/**
 * 页面：vvt15
 * 将JSON对象数据转出1列的数据，以便echart使用
 *
 *  * 
 */

export function jsontoarray(jsondata,ele_id,ele_value,series_id,series_value,col) {
  var dt=[];
  for(var i=0;i<jsondata.length;i++){
    if(jsondata[i][ele_id]==ele_value && jsondata[i][series_id]==series_value )
    {
    dt.push(jsondata[i][col]);
  }
  }
  return dt;
}
/**
 * 页面：vvt15
 * 过滤json，取出符合条件的json
 *
 *  * 
 */

export function jsontfilter(jsondata,ele_id,ele_value) {
  var dt=[];
  for(var i=0;i<jsondata.length;i++){
    if(jsondata[i][ele_id]==ele_value)
    {
    dt.push(jsondata[i]);
  }
  }
  return dt;
};
/**
 * 页面：vvt15
 * 过滤json，取出符合条件的json,
 *绘制饼图的series
 *  * 
 */


export function pieseries(jsondata,ele_id,ele_value,series_id,col) {
  var dt=[];
  var j=0
  for(var i=0;i<jsondata.length;i++){
    if(jsondata[i][ele_id]==ele_value)
    {
    if(j==0){dt.push({value:jsondata[i][col],name:jsondata[i][series_id],itemStyle: {color: '#23A8F2'}});}
    if(j==1){dt.push({value:jsondata[i][col],name:jsondata[i][series_id],itemStyle: {color: '#71AB2B'}});}
    if(j==2){dt.push({value:jsondata[i][col],name:jsondata[i][series_id],itemStyle: {color: '#B4B4B4'}});}
    if(j==3){dt.push({value:jsondata[i][col],name:jsondata[i][series_id],itemStyle: {color: '#B6A2DE'}});}
    if(j==4){dt.push({value:jsondata[i][col],name:jsondata[i][series_id],itemStyle: {color: '#84B59B'}});}
    j++;
  }
  }
  return dt;
}
/**
 * 页面：vvt15
 * 将JSON对象数据转出1列的数据，以便echart使用
 *
 *  * 
 */

export function getcol(jsondata,col) {
  var dt=[];
  for(var i=0;i<jsondata.length;i++)
    {
    dt.push(jsondata[i][col]);
  }
  return dt;

}

/**
 * 页面：vvt15
 * 将JSON对象数据转出1列的数据，以便echart使用
 *
 *  * 
 */

export function tosqlin(jsondata) {
  var dt="";
  if(jsondata.length==0){
    return "1999999999"
  }
  else{
  for(var i=0;i<jsondata.length;i++)
    {
      if(i!=jsondata.length-1){ dt=dt + jsondata[i] + ","}
      else if(i==jsondata.length-1){dt=dt + jsondata[i]}
  }
  return dt;
}

}
export function strin(arr){
  var dt=""
    if(arr.length==0){
     dt= "'" + arr[i] + "'";
     return dt;
    }
    else
    {
      for(var i=0;i<arr.length;i++)
      {
        if(i!=arr.length-1)
        {
          dt= dt + "'" + arr[i] + "',";
        }
        else{
          dt= dt + "'" + arr[i] + "'";
        }
      }
      return dt;
    }


  
}
    

 