// ↓的arr1为any-array类型
let arr1 = []

// ↓的arr2为string数组类型
let arr2: string[] = []
// arr2.push('') // true
// arr2.push(1) // error

// 二维数组如下操作，利用泛型
let arr3: Array<string[]> = []

// arr3.push(['']) // true
// arr3.push('') // error

// ↓的obj1为any-object类型
let obj1 = {}
