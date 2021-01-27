let _boolean = false
// or 
const boolean: boolean = false

// _boolean = 1 
/**
 * 不能将类型“number”分配给类型“boolean”
 * 在开始，我们没有给_boolean设置固定的变量类型，编译器则会自动帮我们推导出类型（根据赋值）
 * 推导后，如重新赋值，所赋的值是其他类型则会error
 */

// 其他类型也是这个道理，以此类推

const _number: number = 1
const number = 1

const _string: string = ''
const string = ''


// 特殊情况，所有数据类型的子类型undefined与null
const _void = undefined
const _null = null
// 可将子类型数据赋给所有类型
const age: number = _void
const name: string = _null


