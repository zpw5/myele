export function PrefixInteger(num, length) {
    return ( "00000000000000" + num ).substr( -length );
   }

   export  function getUrlVars(url) {
    var vars = [],
        hash;
    var hashes = url.slice(url.indexOf('?') + 1).split('&');
    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}

export  function GetWeixinAPPID() {
  var url = "wx5c451c1c46ba0ff9";
  return url;
}

//提取request参数
export function GetRequest(strParame) { 
	var args = new Object( ); 
	var query = location.search.substring(1); 
	
	var pairs = query.split("&"); // Break at ampersand 
	for(var i = 0; i < pairs.length; i++) { 
	var pos = pairs[i].indexOf('='); 
	if (pos == -1) continue; 
	var argname = pairs[i].substring(0,pos); 
	var value = pairs[i].substring(pos+1); 
	value = decodeURIComponent(value); 
	args[argname] = value; 
	} 
	return args[strParame]; 
}

export  function GetServerURL() {
    var url = "http://www.ambcharge.com";
    return url;
}

//将sql的timestamp转换成DateTime对象
export function sqlstr_2_timestamp(timestr)
{
  
  if (timestr != null && timestr != "")
  {
     var str = timestr.replace("T"," "); 
     str = str.substring(0,19)
     var timestamp2 = Date.parse(str) 
     var dependedDate=new Date();
     dependedDate.setTime(timestamp2);
     return dependedDate
  }
  else
  {
    return ""
  }

  
}

//将秒数转换成日期
export function SecToDateTime(seconds)
{
    
    var formatTimeS = new Date('1970/01/01 00:00:00').getTime();
    var newDate = new Date(formatTimeS + seconds*1000);
    return newDate;
}



//获取当前的秒数    
export function TimeToSec(tTime)
{
  var   tmTick = tTime.getTime()/1000;
  var  startTick = (new Date('2018/01/01 00:00:00').getTime())/1000;
    
    if(tmTick < startTick)
    {
        return 0;    
    }

     return Math.floor(tmTick - startTick);
   
}


//获取当前的秒数
export function GetCurrentSec()
{
    var tTime = new Date();

    var  tmTick = tTime.getTime()/1000;
   var  startTick = (new Date('2018/01/01 00:00:00').getTime())/1000;
    var result = 0;
    if(tmTick < startTick)
    {
        return 0;    
    }
   
     return parseInt(tmTick - startTick);

}
  
export function monDiff(startTime,endTime){
    startTime=new Date(startTime);
    endTime=new Date(endTime);
    var date2Mon;
     var startDate=startTime.getDate()+startTime.getHours()/24+startTime.getMinutes()/24/60;
    var endDate=endTime.getDate()+endTime.getHours()/24+endTime.getMinutes()/24/60;
    var months=  0
    if(endDate>=startDate){
        date2Mon=0;
    }else{
        date2Mon=-1;
    }
    months = (endTime.getYear()-startTime.getYear())*12+endTime.getMonth()-startTime.getMonth();
    return months;
}

//将计费单状态转换成文字
export function billstate2str(billstate)
{
  
    var str = ""
            switch(billstate)
            {
              case 0:
                {
                  str = '待审核'
                  break;
                }
              case 1: 
                {
                  str = '待付款'
                  break;
                }
              case 2:
                {
                  str = '已付款(现金)'
                  break;
                }
                case 3:
                {
                  str = '费单取消'
                  break;
                }
                 case 4:
                {
                  str = '已付(未到账)'
                  break;
                }
                case 5:
                  {
                    str = '已付款(在线)'
                    break;
                  }
            }
          return str
}

//将计费单起止日期
export function billdayscope2str(tmStart,tmEnd)
{
   
          var str = ""
          str = (tmStart.getMonth()+1)+"月"+ tmStart.getDate()+"号 至 "+(tmEnd.getMonth()+1)+"月"+tmEnd.getDate()+"号"
          return str 
}

//根据计费单的时间和房间编号获取流水号,6位时间和6位房间编号
export function getbillsn(startTick,roomid)
{
   var tm = SecToDateTime(startTick)
   var str = PrefixInteger(roomid,6)+tm.getFullYear()+PrefixInteger(tm.getMonth(),2)+PrefixInteger(tm.getDate(),2)
              +PrefixInteger(tm.getHours(),2)+PrefixInteger(tm.getMinutes(),2)+PrefixInteger(tm.getSeconds(),2)
              
   return str 
}

//根据计费单的时间和房间编号获取流水号,6位时间和6位房间编号
export function timestam_2_str(tm)
{
  
  var month = (tm.getMonth()+1)%12
   var str = tm.getFullYear()+"-"+PrefixInteger(month,2)+"-"+PrefixInteger(tm.getDate(),2)+" "
            +PrefixInteger(tm.getHours(),2)+":"
            +PrefixInteger(tm.getMinutes(),2)+":"
            +PrefixInteger(tm.getSeconds(),2)
        
   return str 
}

//根据计费单的时间和房间编号获取流水号,6位时间和6位房间编号
export function timestam_2_shortstr(tm)
{
   var str = tm.getFullYear()+"-"+PrefixInteger(tm.getMonth(),2)+PrefixInteger(tm.getDate(),2)+" "
        
   return str 
}
   
//将mysql的时间字符串转换成时间
export function conversqltimestr_2_time(timestr)
{
  if (timestr) { 
    var arr1 = timestr.split("T"); 
    var sdate = arr1[0].split('-'); 
    var date = new Date(sdate[0], sdate[1]-1, sdate[2]); 
    return date;
    } 
        
   return null 
}



//获取32位
export function uuidGenerator() {
	var originStr = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
		originChar = '0123456789abcdef',
		len = originChar.length;
	return originStr.replace(/x/g, function(match) {
		return originChar.charAt(Math.floor(Math.random() * len))
  })
}

//将mysql的时间字符串转换成北京时间
export function conversqltimestr_2_Beijingtime(timestr)
{
  if (timestr) { 
    var arr1 = timestr.split("T")
    var sdate = arr1[0].split('-')
    var sTime = arr1[1].split(':')
    var sSec = sTime[2].split(".")
    var date = new Date(sdate[0], sdate[1]-1, sdate[2],sTime[0],sTime[1],sSec[0]); 

    date.setHours(date.getHours() + 8)

    return date
    } 
        
   return null 
}

//将时间转换成北京时间
export function time2BeijingTime(tm) {

  

  //获得当前运行环境时间
  var d = new Date();
  var currentDate = tm;
  var tmpHours = currentDate.getHours();
  //算得时区
  var time_zone = -d.getTimezoneOffset() / 60;
  if (time_zone < 0) {
      time_zone = Math.abs(time_zone) + 8; currentDate.setHours(tmpHours + time_zone);
  } else {
      time_zone -= 8; 
      currentDate.setHours(tmpHours - time_zone);
  }
  return currentDate;
}

//将客户端的时间转换成北京时间
export function getBeijingtime() {
  //获得当前运行环境时间
  var d = new Date();
  var currentDate = new Date();
  var tmpHours = currentDate.getHours();
  //算得时区
  var time_zone = -d.getTimezoneOffset() / 60;
  if (time_zone < 0) {
      time_zone = Math.abs(time_zone) + 8; currentDate.setHours(tmpHours + time_zone);
  } else {
      time_zone -= 8; currentDate.setHours(tmpHours - time_zone);
  }
  return currentDate;
}

//获取时间戳
export function getBeijingtimeStam() {
  //获得当前运行环境时间
  var d = new Date();
  var currentDate = new Date();
  var tmpHours = currentDate.getHours();
  //算得时区
  var time_zone = -d.getTimezoneOffset() / 60;
  if (time_zone < 0) {
      time_zone = Math.abs(time_zone) + 8; currentDate.setHours(tmpHours + time_zone);
  } else {
      time_zone -= 8; currentDate.setHours(tmpHours - time_zone);
  }

  var   tmTick = currentDate.getTime()/1000;
  var  startTick = (new Date('1970/01/01 00:00:00').getTime())/1000;
    
    if(tmTick < startTick)
    {
        return 0;    
    }

     return Math.floor(tmTick - startTick);

}

//将样式字符串转换成Object数组
export function styleToMap(style) {

  if (!style || style == '') { return }


  var Arr = style.split(';')    //检查元素是否为空
  Arr = Arr.filter(item => {
  return item != ''
  })

  var styleMap = new Map()
  var str = ''
  Arr.forEach(item => {     
          
    var styleItem =  trim(item).split('=')
    if (null != styleItem)
    {
       if (styleItem.length == 1)     //只有样式模板名称
       {
          styleMap.set(styleItem[0],'')
       }
       if (styleItem.length == 2)     //样式描述
       {
          styleMap.set(styleItem[0],styleItem[1])
       }
       
    }
  })
 
    return styleMap
  }

  //将样式映射表转换成字符串
  export function mapToStyle(styleMap)
  {
      if (null == styleMap)
      {
        return ''
      }
      var str = ''

      styleMap.forEach(function(value,key){
        if (value == null || value == "")
        {
          //str = str+key+";"
        }
        else
        {
          str = str+key+"="+value+";"
        }
        
      });

      return str
  }
  
  
  /**
  * 去掉字符串前后所有空格
  */
 export function trim (str, isglobal) {
  var result
  result = str.replace(/(^\s+)|(\s+$)/g, '')
  if (isglobal && isglobal.toLowerCase() === 'g') {
  result = result.replace(/\s/g, '')
  }
  return result
  }

  //判断浏览器是否为微信浏览器
  export function CheckWeChatBrowser() {
    　　var ua = navigator.userAgent.toLowerCase();
    　　if (ua.match(/MicroMessenger/i) == "micromessenger")
    　　{
    　　　　return true; // 微信浏览器
    　　}
    　　else
    　　{
    　　　　return false; // 非微信浏览器
    　　}
    }
