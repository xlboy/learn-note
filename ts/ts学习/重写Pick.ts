interface test {
    name: string;
    age: number;
    texts: string[]
}

type test2 = Pick<test, 'age'>

type Copy<T> = {
    [k in keyof T]: any
}

type test3 = Copy<test>

type MyPick<T, K extends keyof T> = {
    [k in K]: T[k]
}

// pick抽取，原来如此，通过exrends继承
type person = MyPick<test, 'age' | 'texts'>
