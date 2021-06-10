

/**
 * 将只读的数组，将所有可用的索引变成联合类型
 */

const TypeList = [{}, {}, {}, {}, {}] as const

type GetArrayIndexs<A extends readonly any[], B extends any[] = []> = A extends readonly [
  infer Start,
  ...infer Rest
]
  ? GetArrayIndexs<Rest, [...B, B['length']]>
  : B[number]
type TypeIndex = GetArrayIndexs<typeof TypeList> // 0 | 1 | 2 | 4 | 5
