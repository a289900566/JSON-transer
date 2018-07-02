// 处理 json 中空格的思路：在字符串和键中的空格保留，其余空格跳过

let json = '{"a":{"aa":11111,"bb":1},   "b1":true,"b2":   false,"q":null,"n1":-1  ,  "n2":2.1,"arr"   :[1,2,4],"str":"ssss","exp":/^hello/}'
let i = 0 // 指针

function parseValue(){
  console.log(json[i])
  if (json[i] == "{") {
    return parseObject()
  } else if (json[i] == "[") {
    return parseArr()
  } else if (json[i] == "t" || json[i] == "f") {
    return parseBoolean()
  } else if (json[i] == '"') {
    return parseString()
  } else if (json[i] == "n") {
    return parseNull()
  } else if (isNumChar()) {
    return parseNum()
  } else if (json[i] == '/') {
    return parseReg()
  } else {
    throw new Error('parse error')
  }
}

function parseObject () {
  i++
  let res = {}
  while (json[i] != '}') {
    let key = parseString()
    while (json[i] == ':' || json[i] == ' ') i++   // 处理空格
    let value = parseValue()
    res[key] = value
    while (json[i] == ',' || json[i] == ' ') i++   // 处理空格
  }
  i++
  return res
}

function parseArr () {
  i++
  let res = []
  while (json[i] != "]") {
    res.push(parseValue())
    if (json[i] == ',') i++
  }
  i++
  return res
}

function parseString () {
  let res = ""
  i++
  while(json[i] != '"'){
    res += json[i++]
  }
  i++
  if (json[i] == ',') i++
  return res
}

function parseReg () {
  let res = ""
  i++
  while(json[i] != '/'){
    res += json[i++]
  }
  i++
  if (json[i] == ',') i++
  return new RegExp(res)
}

function parseBoolean () {
  let s4 = json.substr(i,4)
  let s5 = json.substr(i,5)
  if (s4 == "true") {
    i += 4
    return true
  } else if (s5 == 'false') {
    i += 5
    return false
  } else {
    throw new Error('parse boolean error')
  }
  if (json[i] == ',') i++
}

function parseNull () {
  let s4 = json.substr(i,4)

  if (s4 == 'null') {
    i += 4
    return null
  } else {
    throw new Error('parse null error')
  }
  if (json[i] == ',') i++
}

function parseNum () {
  let res = ''
  while (isNumChar()) {
    res += json[i++]
  }
  return parseFloat(res)
}

function isNumChar () {
  // 数字白名单
  return ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.', '-', '+', 'e', 'E'].some(j => json[i] == j)
}

console.log(parseValue())