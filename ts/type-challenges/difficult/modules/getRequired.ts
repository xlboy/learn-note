/**
 * 第四题
 * Get Required
 * 实现高级util类型GetRequired<T>，该类型保留所有必填字段
 */

// 参考 https://github.com/type-challenges/type-challenges/issues/1052

type I = GetRequired<{ foo: number; bar?: string }>; // expected to be { foo: number }

type GetRequired<O> = {
  [K in keyof O as Pick<O, K> extends Record<K, O[K]> ? K : never]: O[K];
};

// 如下是突破口… 利用Pick、Record将内容抽出来后，意义就不同了…

type obj = { foo: number; bar?: string };

type foo = Pick<obj, "foo">; // { foo: number }
type bar = Pick<obj, "bar">; // { bar?: string | undefined }

type foo2 = Record<"foo", obj["foo"]>; // { foo: number }
type bar2 = Record<"bar", obj["bar"]>; // { bar: string | undefined }

type result1 = foo extends foo2 ? true : false; // true
type result2 = bar extends bar2 ? true : false; // false

export default 1;
