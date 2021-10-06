/**
 * 将只读的数组，将所有可用的索引变成联合类型
 */

const TypeList = [{}, {}, {}, {}, {}] as const;

type GetArrayIndexs<
  A extends readonly any[],
  B extends any[] = []
> = A extends readonly [infer Start, ...infer Rest]
  ? GetArrayIndexs<Rest, [...B, B["length"]]>
  : B[number];
type TypeIndex = GetArrayIndexs<typeof TypeList>; // 0 | 1 | 2 | 4 | 5

/**
 * 获取联合类型的总个数
 */
type Test2 = undefined | boolean | "";

type UtilGetUnionLength<
  Union,
  ArrUnion extends any[] = [],
  S extends Union = Union
> = [S] extends [never]
  ? ArrUnion["length"]
  : S extends S
  ? UtilGetUnionLength<Exclude<Union, S>, [S, ...ArrUnion]>
  : never;

type Reu = UtilGetUnionLength<Test2>;

/**
 * 根据联合类型的长度 填充N个指定的子元素至数组
 */

type LocaleTypes = "zh_CN" | "zh_TW" | "en_US";

type InUnionFillArrayItem<
  FillItem,
  Union,
  FillArray extends FillItem[] = [],
  C extends Union = Union
> = [C] extends [never]
  ? FillArray
  : C extends C
  ? InUnionFillArrayItem<FillItem, Exclude<Union, C>, [...FillArray, FillItem]>
  : never;

type TestResult = InUnionFillArrayItem<{ a: 1; c: 2 }, LocaleTypes>;
