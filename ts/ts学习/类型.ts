// 类型别名是type type type


// 可以单独为一个数据定义单个类型

type Name = boolean | string
const n: Name = false
const n1: Name = ''
// const n2: Name = 1 // number -> error，只可boolean / string


// 也可以为函数定义

type Fun = (age1: string, age2: number) => number

const fun: Fun = () => 1