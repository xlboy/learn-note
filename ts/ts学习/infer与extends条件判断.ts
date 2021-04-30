/**
 * infer好啊，好啊
 * 资料地址： https://segmentfault.com/a/1190000018514540?utm_source=tag-newest
 * 表示在 extends 条件语句中待推断的类型变量。
 */

async function promiseFun(): Promise<number[]> {
    return [1, 2, 3, 4]
}

type PromiseType<T> = T extends Promise<(infer P)> ? P : never

type PromiseFunType = PromiseType<ReturnType<typeof promiseFun>>
