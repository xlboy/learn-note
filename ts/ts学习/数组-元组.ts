// any-array
const anys = []

// string-array
const strs: string[] = []

// number-array
const numbers: number[] = []

// boolean-array
const booleans: boolean[] = []

// 混合类型的
const mixs: Array<boolean | number> = []
const _mixs: (number | boolean)[] = [1, true]

// 元组，前面字段类型的确认
// 延伸时，只可延伸元组内定义的数据字段
const tom: [string, boolean] = ['', false]
tom.push('1')
tom.push(true)
// tom.push(1) // number -> error