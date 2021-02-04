interface Person1 {
    name: string;
    age: number;
}

let p1: Person1 = {
    name: '',
    age: 1
}

// let _p1: Person1 = {
//     name: '',
//     age: '', // error ，接口定义的类型是number，赋string -> error
// }

// let _p1: Person1 = {
//     name: ''
//     // 少一个age属性 -> error
// }

// let _p1: Person1 = {
//     name: '',
//     age: 1,
//     test: '', // 多一个类型也不行，接口中尚未定义此类型
// }

// 只读字段 readonly
interface Person2 {
    readonly name: string;
    age: number
}
let p2: Person2 = {
    name: '11',
    age: 2
}
p2.age = 1 // success
// p2.name = '' // error，不可更改，仅供只读

// 任意属性名称
interface Person3 {
    name: string;
    [key: string]: string | number;
}

let p3: Person3 = {
    name: '',
    nb: '',
    nb1: 1,
    // nb3: true // error，如上操作中，任意属性中只允许number/string,boolean直接 -> error
}


// 接口继承
interface f {
    name: string;
    age: number;
}
interface f2 extends f {
    bbb: boolean;
    ccc: string[];
}

let _f2: f2 = {
    name: '',
    age: 1,
    bbb: false,
    ccc: ['']
}


// 类-接口实现
class c implements f2 {
    bbb: boolean
    ccc: string[]
    name: string
    age: number
}
interface f3 {
    run(): number;
}

// 类-接口实现多个
class c2 implements f2, f3 {
    bbb: boolean
    ccc: string[]
    name: string
    age: number

    run(): number {
        // throw new Error("Method not implemented.")
        return 1
    }
}



// 我服了，还有这个操作……代替了命名空间似的

interface Route {
    keys: 'n' | 'b' | 'a';
    age: number;
}

let a:Route['keys']

a = 'a'