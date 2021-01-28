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