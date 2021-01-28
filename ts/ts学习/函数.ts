// 定义函数的多个方式

// 重载
function add(age: number, age2: number): number;
function add(age: string, age2: string): string;
function add
    (
        a: number | string,
        a2: number | string
    ): number | string {
    return 1
}

// add(1, '') // 表面上看add函数的实现，看着是可以number与string混入的，但实际上不可，因为在重构定义时规定好了

add(1, 1)
add('', '')



// 非必须参数
function _add(a: number, b?: string): void {
    console.log(a, b)
}

// 默认值，会自动将其当为“非必须”项。只可在后面使用，不可在前
function __add(a: number, b: string = '1'): void {
    console.log(a, b)
}

// 剩余参数 
function ___add(a: number, ...bs: string[]) {
    console.log(a, bs)
}
// ___add(1, 2, 1) // 参数 2 开始，不为字符串组 -> error

___add(1, '', '', '') // 正常



// 使用type来实现函数重载

// type FunType = {
//     (a: number): number;
//     (a: string): string;
//     // (arr: boolean[]): boolean
// }
// let fun: FunType = function
//     (a: number | string)
//     : number | string {
//     if (typeof a === 'string') {
//         return ''
//     }
//     if (typeof a === 'number') {
//         return 1
//     }
// }