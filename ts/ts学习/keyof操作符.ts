const json = {
    name: '',
    age: 1,
    qq: 52852983,
    email: '52852983@qq.com'
}

type JsonKeys = keyof typeof json

// 原来keyof可以直接将泛型解解解
// 如果是object类型的，keyof就解出这个object的key
// 如果是number,boolean,string，就解了个寂寞
// 但如果是数组的话…也解了个寂寞，解了它自己本身的样子
type ToRefs<T> = {
    [K in keyof T]: T[K]
}

function a<T>(obj: T): ToRefs<T> {
    return obj
}
const aa = ['1', 2]

const cc = a(aa)

// JsonKeys 通过keyof获取出json类型的所有属性名称，即name、age、qq、email
const str: JsonKeys = 'age'