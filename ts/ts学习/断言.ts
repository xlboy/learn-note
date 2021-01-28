// 断言的各种操作噢


let str: string = ''

const num: number = 1
str = num as unknown as string

    ; ((num: number) => {
        str = num as unknown as string
    })(10);

interface test {
    name: string,
    age: number
}
let json: test

json = {
    b: 1
} as unknown as test 
 
// as可以多层使用，又是test又是number又是string
// as test as number as string，直接杂jio，笑死


// 一般断言只用as 形式，尽量少用<>

// xx as string
// or 
// <string>xx
const b = <string>''
const c = ('' as string)

// 双重断言了解一波

// const any = window as test // error 
const any = (window as any) as test // success -> 唯独你没懂我

// #TypeScript 是怎么确定单个断言是否足够
/**
 * 当 S 类型是 T 类型的子集，或者 T 类型是 S 类型的子集时，S 能被成功断言成 T。这是为了在进行
 * 类型断言时提供额外的安全性，完全毫无根据的断言是危险的，如果你想这么做，你可以使用 any。
 * https://jkchao.github.io/typescript-book-chinese/typings/typeAssertion.html#%E5%8F%8C%E9%87%8D%E6%96%AD%E8%A8%80
 */