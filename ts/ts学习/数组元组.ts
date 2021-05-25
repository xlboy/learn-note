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
  
type a = {
  name: '小逼崽子'
  ref: number
}
type b = {
  name: '逼崽子'
  color: string
}

type a_b = Array<a | b>

let c: a_b = [
  {
    name: '小逼崽子',
    ref: 1
  },
  {
    name: '逼崽子',
    color: ''
  }
]
