/**
 * 
 * typeof操作符可获取一个变量或函数的相对类型
 */

// 例1

const json = {
    name: '',
    age: 1
}

// 定义的__TY类型 = json这个对象赋值后推导出的类型
type __TY = typeof json


// 例2

interface test {
    run(): void;
    name: string
}
const json2: test = {
    run() { },
    name: ''
}

type _TY = typeof json2


// 例三
class nb implements test{
    run(): void {
        throw new Error("Method not implemented.")
    }
    name: string

}
const n = new nb()
type TY = typeof n



// 使用typeof获取字面量类型
const str = '我真的服了'

type _str = typeof str
// 此时的_str为'我真的服了'，而后可用来当属性名，或者字符串字面量
let s: _str
s = '我真的服了' // success
// s = '我你爱你' // error
