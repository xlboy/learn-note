// 类型别名听着就明白，给类型起一个名称

interface person {
    name: string;
    age: number
}
type Name = boolean | string

const n: Name = false
const n1: Name = ''
// const n2: Name = 1 // number -> error，只可boolean / string


// 也可以为函数定义
type Fun = (age1: string, age2: number) => number

// 居然可以填也可以不填…定义这个函数时传的参
const fun: Fun = () => 1
// fun() // error -> 虽然说定义函数的时候没写那两个参，但在调用的时候没传参也会出问题


const fun1: Fun = (a: string, a2: number) => a2
// 两个参数都带上，正常运行无碍
fun1('', 3)


// 字符串字面量类型
type strType = '像天空一望无际' | '是海岸的倒影' | '真的就这样吧'
const str: strType = '像天空一望无际'
// const str1: strType = '1' // error，字符串内容不是strType定义的那三其中之一
const str2: strType = '真的就这样吧'


type nb = Name | person
const test: nb = ''
const test2: nb = false
const test3: nb = {
    name: '',
    age: 1
}

// in映射一波 字符串字面量类型
type wdn = {
    [k in strType]: number
}

type wdnm = {
    [k in keyof typeof test3]: string
}