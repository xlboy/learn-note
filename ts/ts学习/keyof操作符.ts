const json = {
    name: '',
    age: 1,
    qq: 52852983,
    email: '52852983@qq.com'
}

type JsonKeys = keyof typeof json

// JsonKeys 通过keyof获取出json类型的所有属性名称，即name、age、qq、email
const str: JsonKeys = 'age'