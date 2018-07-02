function stringify (obj) {
  let res = '{'
  for (let i in obj) {
    if (obj[i] != null && obj[i].toString() != '[object Object]') {
      res += '"' + i.toString() + '"' + ':' + obj[i].toString() + ','
    } else if (obj[i] == null) {
      res += '"' + i.toString() + '"' + ':' + '\"null\"' + ','
    } else if (obj[i].toString() == '[object Object]') {
      res += '"' + i.toString() + '"' + ':' + stringify(obj[i]) + ','  // 这里做一个递归
    }
  }
  res = res.substr(0, res.length-1) // 去掉最后一个多余的逗号
  res += '}'
  return res
}

let obj1 = {
  "a": { 
    "aa":11111, 
    "bb":1,
    "cc": {
      "ccc": "wwwwww",
      "ccccc": 'qqqqqq'
    }
  },
  "b1": true,
  "b2": false,
  "q": null,
  "n1": -1,
  "n2": 2.1,
  "arr": [1,2,4],
  "str": "ssss",
  "exp": /^hello/
}
console.log(stringify(obj1))

module.exports = stringify
