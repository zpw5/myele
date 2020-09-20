import {
  sqlquery,
  insertsql
} from "@/api/sql";

var paramlist1 = [];
//查询所有数据库表名
export function getalltable(obj) {
  //   this.loading = true;
  var sqlstr = "select table_name from information_schema.tables where table_schema='shiro'";
  const params = new URLSearchParams();
  params.append("sql", sqlstr);
  sqlquery(params).then(response => {
    var alltable = response.data.data;
    for (var i = 0; i < alltable.length; i++) {
      // this.mydata[0].children.push
      obj.push({
        id: i + 100000,
        label: alltable[i].table_name
      });
    }
    //   this.loading = false;
  });

}
//查询所有参数名
export function getallparam(obj) {

  var sqlstr = "select * from my_param";
  const params = new URLSearchParams();
  params.append("sql", sqlstr);
  sqlquery(params).then(response => {
    var paramset = response.data.data;
    for (var i = 0; i < paramset.length; i++) {
      obj.push({
        id: i + 1000,
        label: paramset[i].param_name,
        type: paramset[i].type,
        style: paramset[i].style,
        leixin: "参数",
        defaultvalue: paramset[i].defaultvalue,
        valuelist: paramset[i].valuelist
      })
    }
  });
}

//查询所有数据集
export function getalldataset(obj) {
  var sqlstr = "select * from my_dataset"
  const params = new URLSearchParams();
  params.append("sql", sqlstr);
  sqlquery(params).then(response => {
    var tble = response.data.data;
    for (var i = 0; i < tble.length; i++) {
      obj.push({
        id: i + 1000000,
        label: tble[i].dataset_name,
        con: tble[i].dataset_con,
        leixin: "数据集"
      });
    }
  })
}

//保存参数
export function saveparam(obj, dia, tree) {
  var sqlstr = "insert into my_param values('" + obj.name + "','" +
    obj.type + "','" + obj.style + "','" + obj.defaultvalue + "','" +
    obj.valuelist + "')";
  const params = new URLSearchParams();
  params.append("sql", sqlstr);
  insertsql(params).then(response => {
    //this.paramdialogVisible
    dia = false;
    tree.push({
      id: obj.name,
      label: obj.name,
      type: obj.type,
      defaultvalue: obj.defaultvalue,
      valuelist: obj.valuelist,
      leixin: "参数"
    })
  })
}

//保存数据集，含更新及新增
export function savedataset(datesetname, dataset, datasetsql) {
  //如果当前的数据集已存在，则更新操作
  if (if_exit(datesetname, dataset) !== -1) {
    var i = if_exit(datesetname, dataset);
    var sqlstr =
      "update my_dataset set dataset_name='" +
      datesetname +
      "',dataset_con='" +
      datasetsql +
      "' where" +
      " dataset_name='" +
      datesetname +
      "'";
    const params = new URLSearchParams();
    params.append("sql", sqlstr);
    insertsql(params).then(response => {
      console.log('更新数据集成功');
    });
  }
  //如果当前的数据集不存在，则执行新增操作
  else {
    var sqlstr = "insert into my_dataset values('" + datesetname + "','" + datasetsql + "')";
    const params = new URLSearchParams();
    params.append("sql", sqlstr);
    insertsql(params).then(response => {
      dataset.push({
        id: datesetname,
        label: datesetname
      });
    });
  }
}
//判断数据集是否已经存在
function if_exit(str, obj) {

  for (var i = 0; i < obj.length; i++) {
    if (str == obj[i].label) {
      return i;
    }
  }
  return -1;
}
/**
 * 方法：
 * 
 */
export function excutesql(str, list) {
  var sqllist = str.split("!");
  var str1 = ""
  for (var i = 0; i < sqllist.length; i++) {
    if (i % 2 == 0) {
      str1 = str1 + sqllist[i]
    }
    else {
      str1 = str1 + list[i - 1].defaultdisplayvalue[0][Object.keys(list[i - 1].defaultdisplayvalue[0])[0]]
    }
  }
  return str1;
}

/**
 * 方法：根据参数list，封装参数对应的对象，以对象的形式返回
 * 描述：封装的对象包括以下属性：
 * 1、参数的名称，
 * 2、参数的类型，
 * 3、备选值的sql语句，
 * 4、备选的sql的值，以数组形式返回
 * 5、默认值的sql语句，
 * 6、默认sql的值
 */
export function paramlist(str) {
  var list = getparamlistfromsql(str)
  var sqlstr;
  for (var i = 0; i < list.length; i++) {

    (function (i) {
      sqlstr = "select * from my_param where param_name='" + list[i].param + "'";
      getsqlparam(sqlstr, res => {
        paramlist1[i].push(res)
      })
    }(i))
  }
  console.log('????')
  console.log(paramlist1)
  return paramlist1
}

function getsqlparam(sqlstr, paramlist, callback) {
  const params = new URLSearchParams();
  params.append("sql", sqlstr);
  sqlquery(params).then(response => {
    paramlist = response.data.data;
    for (var j = 0; j < paramlist1.length; j++) {
      (function (j) {

        getparamdefaultvalue(paramlist1[j].defaultvalue, j, res => {
          console.log(11111);
          console.log(paramlist1[j])
          console.log('得到的数据1是' + j);
          paramlist[j].defaultdisplayvalue = res;
        });
        getparamvaluelist(paramlist1[j].valuelist, j, res => {
          console.log(2222);
          console.log(res);
          console.log('得到的数据2是' + j);
          paramlist[j].displayvaluelist = res;
        });
      }(j))
    }
    callback(paramlist1);
  })

}
/**
 * 方法：从sql语句中分割出参数
 * 描述：分割带参数的sql语句，并将参数封装在数组list中，并返回数据list
 */
export function getparamlistfromsql(str) {
  var sqllist = str.split("!");
  var list = [];
  var p = 0;
  for (var i = 0; i < sqllist.length; i++) {
    if (i % 2 == 1) {
      getparamdefaultvalue(sqllist[i], res => {
        list.push({
          name: res.sql.param_name,
          type: res.sql.type,
          style: 'el-input',
          defaultvalue: res.data[0],
          valuelist: res.data[0],
          defaultdisplayvalue: res.data
        })
      })
    }
  }
  return list;
}
/**
 * 
 * 方法：根据参数的defaultvalue的sql，获取参数的默认值
 */
export function getparamdefaultvalue(sqlstr1, callback) {
  var sqlstr = "select * from my_param where param_name='" + sqlstr1 + "'";
  const params1 = new URLSearchParams();
  params1.append("sql", sqlstr);
  sqlquery(params1).then(response => {
    console.log(11111);
    console.log(response.data.data[0]);
    getparamvaluelist(response.data.data[0].defaultvalue, response.data.data[0], res1 => {
      callback(res1)
    })

  })
}
/**
 * 
 * 方法：根据参数的valuelist的sql，获取参数的备选值
 */
export function getparamvaluelist(sqlstr, res2, callback) {
  const params1 = new URLSearchParams();
  params1.append("sql", sqlstr);
  var list;
  sqlquery(params1).then(response1 => {
    callback({ sql: res2, data: response1.data.data })
  })
}





/**
 *方法描述 ：
 1、通过循环遍历是canvasmap
 2.如果canvasmap.data[i].packageJson.api_data.bindtype=='参数'，
 3、调用paramdefaultvalue【获取默认值】方法与paramvaluelist【获取备选值】方法，
 4、在所有的回调函数完成后，修改对应的canvasmap.data[rs[j].name].packageJson.api_data.source.rows
    以及canvasmap.data[rs[j].name].packageJson.api_data.sourcedefaultvalue
 */

export function paramvaluelist(i, api_data) {
  var sqlstr = api_data.dataDefault.split(";")[2];
  var p = new Promise(function (resolve, reject) {
    const params = new URLSearchParams();
    params.append("sql", sqlstr);
    sqlquery(params).then(response => {
      resolve({ name: i, dt: response.data.data })
    })
  })
  return p;
}

export function paramdefaultvalue(i, api_data) {
  var sqlstr = api_data.dataDefault.split(";")[1];
  var p = new Promise(function (resolve, reject) {
    const params = new URLSearchParams();
    params.append("sql", sqlstr);
    sqlquery(params).then(response => {
      resolve({ name: i, dt: response.data.data })
    })
  })
  return p;
}

/**
 * 方法：通过循环，获取所有参数的备选值与默认值
 * @param {} canvasmap 
 */

export function all_paramvaluelist(canvasmap) {
  var p = new Promise(function (resolve, reject) {
  let promiseArr = [];
  let promiseArrD = [];
  for (var i = 0; i < canvasmap.data.length; i++) {
    if (canvasmap.data[i].packageJson.api_data.bindtype=='参数') {
      promiseArr.push(paramdefaultvalue(i, canvasmap.data[i].packageJson.api_data))
      promiseArrD.push(paramvaluelist(i, canvasmap.data[i].packageJson.api_data))
    }
  }

  //获取下拉框的备选值
  Promise.all(promiseArrD).then(rs => {
    for (var j = 0; j < rs.length; j++) {
      canvasmap.data[rs[j].name].packageJson.api_data.source.rows = rs[j].dt;
    }
  })
  //获取下拉框的默认值
  Promise.all(promiseArr).then(rs => {
    for (var j = 0; j < rs.length; j++) {
      canvasmap.data[rs[j].name].packageJson.api_data.sourcedefaultvalue = rs[j].dt[0][Object.keys(rs[j].dt[0])[0]]
    }
    resolve(canvasmap)
  })
 
})
return p
}


/**
 * 下面的函数主要是解决图表数据源的问题，解决思路整体如下：
 * 1、遍历canvasmap,将其中是图表的数据抽取出，提取他x其中的sql语句，
 * canvasmap.data[2].data_api.dataDefault: "select dept_id as 部门ID,
 * name as 部门名称↵ from sys_dept↵where dept_id<>!参数1!"
 * 2、将其中的参数1分割出来，用了split函数，分割后将参数进行转换为值，调用了converparam方法，再拼接成sql语句；
 * 3、调用
 * @param {} canvasmap 
 */

export function get_CharData(canvasmap){
  let promiseArr = [];
 // let  columns=[];
  for (var i = 0; i < canvasmap.data.length; i++) {
    if (canvasmap.data[i].packageJson.api_data.bindtype=='图表') {
      promiseArr.push(chart_sqlquer(i, tosql(canvasmap.data[i].packageJson.api_data.dataDefault,canvasmap)))
    }
  }
  Promise.all(promiseArr).then(rs => {
    for (var j = 0; j < rs.length; j++) {
      console.log(rs[j].dt)
      let  columns=[];    
      for (var ii in rs[j].dt[0]){
        columns.push(ii);
      }
      canvasmap.data[rs[j].name].packageJson.api_data.source.rows = rs[j].dt;
      canvasmap.data[rs[j].name].packageJson.api_data.source.columns = columns;
      console.log(columns);
 //     canvasmap.data[rs[j].name].packageJson.api_data.source.rows = rs[j].dt;
    }
  })
}
function chart_sqlquer(i,sql){
  var p = new Promise(function (resolve, reject) {
    const params = new URLSearchParams();
    params.append("sql", sql);
    sqlquery(params).then(response => {
      resolve({ name: i, dt: response.data.data })
    })
  })
  return p;
}

export function tosql(sql,canvasmap) {
  var sqllist = sql.split("!");
  var str1 = ""
  for (var i = 0; i < sqllist.length; i++) {
    if (i % 2 == 0) {
      str1 = str1 + sqllist[i]
    }
    else {
      str1 = str1 + converparam(sqllist[i],canvasmap)
    }
  }
  var str2=str1.replace(/~/g,"'")
  console.log(str1)
  console.log(str2);
  return str2;

}

//将参数的名称转为参数的默认值;
function converparam(parm,red){
for(var i=0;i<red.data.length;i++){
  if(parm==red.data[i].packageJson.api_data.dataDefault.split(";")[0]){
    console.log(red.data[i].packageJson.api_data)
    return red.data[i].packageJson.api_data.sourcedefaultvalue 
  }
}
}

//将canvasmap套上一层data
export function data_canvasmap(canvasmap){
  return {data:canvasmap};
}






