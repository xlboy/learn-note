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

type TestResult = InUnionFillArrayItem<{ a: 1; c: 2 }, LocaleTypes>; // [{ a: 1; c: 2 }, { a: 1; c: 2 }, { a: 1; c: 2 }]

/**
 * 取模板字符串中指定的单个重复字符括住的内容，例取出 * 字符括住的内容： `123*912*112`，即912
 */

type GetStrOneCharRangeContent<
  Str extends string,
  Char extends string,
  DefaultStr extends string = "",
  ContentArray extends string[] = [],
  IsRange extends boolean = false
> = LengthOfString<Char> extends 1
  ? Str extends `${infer S}${infer RestS}`
    ? [S, IsRange] extends [Char, false]
      ? GetStrOneCharRangeContent<RestS, Char, "", ContentArray, true>
      : [S, IsRange] extends [Char, true]
      ? GetStrOneCharRangeContent<
          RestS,
          Char,
          ``,
          [DefaultStr, ...ContentArray],
          false
        >
      : IsRange extends true
      ? GetStrOneCharRangeContent<
          RestS,
          Char,
          `${DefaultStr}${S}`,
          ContentArray,
          true
        >
      : GetStrOneCharRangeContent<RestS, Char, "", ContentArray, false>
    : ContentArray[number]
  : "Char字符长度不可超过1";

type TestStrOneRange = GetStrOneCharRangeContent<"123*912*112*020202*", "*">;

/**
 * 取模板字符串中指定的两个字符括住的内容，例取出 {与} 字符括住的内容： `Hello, {name}`，即name
 */

type GetStrTowCharRangeContent<
  Str extends string,
  OneChar extends string,
  TowChar extends string,
  DefaultStr extends string = "",
  ContentArray extends string[] = [],
  IsRange extends boolean = false
> = [LengthOfString<OneChar>, LengthOfString<TowChar>] extends [1, 1]
  ? Str extends `${infer S}${infer RestS}`
    ? [S, IsRange] extends [OneChar, false]
      ? GetStrTowCharRangeContent<RestS, OneChar,TowChar, "", ContentArray, true>
      : [S, IsRange] extends [TowChar, true]
      ? GetStrTowCharRangeContent<
          RestS,
          OneChar,
          TowChar,
          ``,
          [DefaultStr, ...ContentArray],
          false
        >
      : IsRange extends true
      ? GetStrTowCharRangeContent<
          RestS,
          OneChar,
          TowChar,
          `${DefaultStr}${S}`,
          ContentArray,
          true
        >
      : GetStrTowCharRangeContent<RestS,OneChar,TowChar, "", ContentArray, false>
    : ContentArray[number]
  : "第一个或第二个字符的长度不可超过1";


type TestStrTowRange = GetStrTowCharRangeContent<"Hello, {name}, My name is {myName}", "{", "}">; // name | myName
