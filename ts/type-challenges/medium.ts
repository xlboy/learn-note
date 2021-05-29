/**
 * @description 中等难度的类型挑战，github地址 https://github.com/type-challenges/type-challenges
 */

/**
 * 第一题
 * 获取函数返回类型
 * 不使用 ReturnType 实现 TypeScript 的 ReturnType<T> 范型。
 */
const fn = (v: boolean) => {
  if (v) return 1;
  else return 2;
};

type a = MyReturnType<typeof fn>; // 应推导出 "1 | 2"
// extends、infer -> YYDS
type MyReturnType<F> = F extends (...args) => infer R ? R : never;

/**
 * 第二题
 * 不使用 Omit 实现 TypeScript 的 Omit<T, K> 范型
 * Omit 会创建一个省略 K 中字段的 T 对象
 */
interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

type TodoPreview = MyOmit<Todo, "title" | "description">;

const todo: TodoPreview = {
  completed: false,
};

type MyOmit<
  T extends object,
  K extends keyof T,
  AllKey extends keyof T = keyof T
> = {
  [key in AllKey extends K ? never : AllKey]: T[key];
};

/**
 * 第三题
 * Readonly 2
 * 实现一个通用MyReadonly2<T, K>，它带有两种类型的参数T和K。
 * K指定应设置为Readonly的T的属性集。如果未提供K，则应使所有属性都变为只读，就像普通的Readonly<T>一样。
 */

interface Todo1 {
  title: string;
  description: string;
  completed: boolean;
}

const todo1: MyReadonly2<Todo, "title" | "description"> = {
  title: "Hey",
  description: "foobar",
  completed: false,
};

todo1.title = "Hello"; // Error: cannot reassign a readonly property
todo1.description = "barFoo"; // Error: cannot reassign a readonly property
todo1.completed = true; // OK

type MyReadonly2<
  T extends object,
  K extends keyof T,
  AllKey extends keyof T = keyof T
> = {
  [k in AllKey extends K ? never : AllKey]: T[k];
} &
  {
    readonly [k in K]: T[k];
  };

/**
 * 第四题
 * 深度 Readonly
 * 实现一个通用的DeepReadonly<T>，它将对象的每个参数及其子对象递归地设为只读。
 * 您可以假设在此挑战中我们仅处理对象。数组，函数，类等都无需考虑。但是，您仍然可以通过覆盖尽可能多的不同案例来挑战自己。
 */

type X = {
  x: {
    a: 1;
    b: "hi";
  };
  y: "hey";
};
type todoX = DeepReadonly<X>;

type DeepReadonly<O extends object> = {
  readonly [k in keyof O]: O[k] extends object ? DeepReadonly<O[k]> : O[k];
};

const todo222: todoX = {
  x: {
    a: 1,
    b: "hi",
  },
  y: "hey",
};

todo222.x.a = ""; // 无法分配到 "a" ，因为它是只读属性。

/**
 * 第五题
 * 元组转合集
 * 实现泛型TupleToUnion<T>，它覆盖元组的值与其值联合。
 */
type Arr = ["1", "2", "3"];
const a: TupleToUnion<Arr> = "1"; // expected to be '1' | '2' | '3'
type TupleToUnion<A extends any[]> = A[number];

/**
 * 第六题
 * 可串联构造器
 * 在 JavaScript 中我们很常会使用可串联（Chainable/Pipeline）的函数构造一个对象，但在 TypeScript 中，你能合理的给他附上类型吗？
 * 在这个挑战中，你可以使用任意你喜欢的方式实现这个类型 - Interface, Type 或 Class 都行。你需要提供两个函数 option(key, value) 和 get()。在 option 中你需要使用提供的 key 和 value 扩展当前的对象类型，通过 get 获取最终结果。
 */
declare const config: Chainable;

const result = config
  .option("foo", 123)
  .option("name", "type-challenges")
  .option("bar", { value: "Hello World" })
  .get();

// 期望 result 的类型是：
interface Result {
  foo: number;
  name: string;
  bar: {
    value: string;
  };
}

type Chainable<O = {}> = {
  option<Key extends string, ValType = any>(
    key: Key,
    val: ValType
  ): Chainable<O & { [k in Key]: ValType }>;
  get(): O;
};

/**
 * 第七题
 * 最后一个元素
 * 实现一个通用Last<T>，它接受一个数组T并返回其最后一个元素的类型。
 */
type arr1 = ["a", "b", "c"];
type arr2 = [3, 2, 1];

type tail1 = Last<arr1>; // expected to be 'c'
type tail2 = Last<arr2>; // expected to be 1

// 我没想到的是，居然是以extends-infer解，本以为是A[A["length"] - 1]
type Last<A extends any[]> = A extends [...infer Q, infer LastVal]
  ? LastVal
  : never;

/**
 * 第八题
 * 出堆
 * 实现一个通用Pop<T>，它接受一个数组T并返回一个没有最后一个元素的数组。
 */

type arr11 = ["a", "b", "c", "d"];
type arr22 = [3, 2, 1];
type re1 = Pop<arr11>; // expected to be ['a', 'b', 'c']
type re2 = Pop<arr22>; // expected to be [3, 2]
// 与第七题相似，巩固加深。感谢！
type Pop<A extends any[]> = A extends [...infer Q, infer LastVal] ? Q : never;

/**
 * 第九题
 * Promise.all
 * 键入函数PromiseAll，它接受PromiseLike对象数组，返回值应为Promise<T>，其中T是解析的结果数组。
 */

const promise1 = Promise.resolve(3);
const promise2 = 42;
const promise3 = new Promise<string>((resolve, reject) => {
  setTimeout(resolve, 100, "foo");
});

const p = PromiseAll([promise1, promise2, promise3]); // expected to be `Promise<[number, number, string]>`

type ArrayToObject<A extends any[], T = [...A]> = {
  [k in keyof T]: number;
};
type ArrayToObject2<A extends readonly any[]> = keyof [...A];
type cb = ArrayToObject2<["nb"]>;
declare const PromiseAll: PromiseAllType;
type PromiseAllType = <A extends any[]>(
  // 此处的[...A]会变成{ 0: xxx, 1: xxx }那样
  arr: [...A]
) => Promise<
  {
    [K in keyof A]: A[K] extends Promise<infer PVal> ? PVal : A[K];
  }
>;

/**
 * 第十题
 * Type Lookup
 * 有时，您可能希望根据其属性在并集中查找类型。
 * 在此挑战中，我们想通过在联合Cat | Dog中搜索公共type字段来获取相应的类型。换句话说，在以下示例中，我们期望LookUp<Dog | Cat, 'dog'>获得Dog，LookUp<Dog | Cat, 'cat'>获得Cat。
 */

interface Cat {
  type: "cat";
  breeds: "Abyssinian" | "Shorthair" | "Curl" | "Bengal";
}

interface Dog {
  type: "dog";
  breeds: "Hound" | "Brittany" | "Bulldog" | "Boxer";
  color: "brown" | "white" | "black";
}

type MyDog = LookUp<Cat | Dog, "dog">; // expected to be `Dog`

// 将K -> dog作为type的值,这里可以用键名又或者直接当值用…而后继承出后,会拿出对应的O来进行返回
type LookUp<O extends object, K extends string> = O extends { type: K }
  ? O
  : never;

/**
 * 第十一题
 * Trim Left
 * 实现TrimLeft <T>，它采用精确的字符串类型，并返回一个新的字符串，其中空格开始删除。
 */

type trimed = TrimLeft<"  Hello World  ">; // expected to be 'Hello World  '
// 我是真没想到，这里居然也可以用递归的思维去解…哈哈，真棒。
type TrimLeft<S extends string> = S extends ` ${infer Val}` ? TrimLeft<Val> : S;

/**
 * 第十二题
 * Trim
 * 实现Trim <T>，它采用确切的字符串类型，并返回一个新字符串，该字符串的两端都删除了空格。
 */

type trimed2 = Trim<"  Hello World  ">; // expected to be 'Hello World'
// 我是真没想到，这里居然也可以用递归的思维去解…哈哈，真棒。
type Trim<S extends string> = S extends ` ${infer Val}`
  ? Trim<Val>
  : S extends `${infer Val} `
  ? Trim<Val>
  : S;

/**
 * 第十三题
 * Capitalize
 * 实现Capitalize <T>，它将字符串的第一个字母转换为大写，而其余部分保持原样。
 */

type capitalized = Capitalize1<"hello world">; // expected to be 'Hello world'

// 字符模板中的占位，也跟函数的形参有点相似啊，infer Rest实则占完后面的...args那样，而前面就用单个字符占位，后面则为rest
type Capitalize1<S extends string> = S extends `${infer StartChar}${infer Rest}`
  ? `${Uppercase<StartChar>}${Rest}`
  : S;

/**
 * 第十四题
 * Replace
 * 实现Replace <S，From，To>，将给定字符串S中的字符串替换
 */

type replaced = Replace<"types are fun!", "fun", "awesome">; // expected to be 'types are awesome!'

type Replace<
  SrouceStr extends string,
  TargetStr extends string,
  ResultStr extends string
> = SrouceStr extends `${infer StartChar}${TargetStr}${infer Rest}`
  ? `${StartChar}${ResultStr}${Rest}`
  : never;

/**
 * 第十五题
 * Replace
 * 实现ReplaceAll <S，From，To>，将给定字符串S中的所有子字符串From替换为To
 */

type replaced2 = ReplaceAll<"t y p e s", " ", "">; // expected to be 'types'
type ReplaceAll<
  SrouceStr extends string,
  TargetStr extends string,
  ResultStr extends string
> = SrouceStr extends `${infer StartChar}${TargetStr}${infer Rest}`
  ? ReplaceAll<`${StartChar}${ResultStr}${Rest}`, TargetStr, ResultStr>
  : SrouceStr;

/**
 * 第十六题
 * 追加参数
 * 实现一个范型 AppendArgument<Fn, A>，对于给定的函数类型 Fn，以及一个任意类型 A，返回一个新的函数 G。G 拥有 Fn 的所有参数并在末尾追加类型为 A 的参数。
 */

type Fn = (a: number, b: string) => number;

type Result2 = AppendArgument<Fn, boolean>;
// 期望是 (a: number, b: string, x: boolean) => number

// ... Type，会将一个数组解成key -> value的样子…
type AppendArgument<Fn extends Function, A> = Fn extends (
  ...args: infer FnArgs
) => infer ReturnType
  ? (...args: [...FnArgs, A]) => ReturnType
  : never;

/**
 * 第十七题
 * Permutation
 * 实现将联合类型转换为包含联合排列的数组的排列类型。
 */
// ['A', 'B', 'C'] | ['A', 'C', 'B'] | ['B', 'A', 'C'] |
// ['B', 'C', 'A'] | ['C', 'A', 'B'] | ['C', 'B', 'A']
type perm = Permutation<"A" | "B" | "C">;
type Permutation<T, B = T> = [T] extends [never]
  ? []
  : // T extends T -> 'AAA' | 'BBB' | 'CCC' extends 本身的时候，会迭代下去。。AAA到BBB又到CCC
  T extends T
  ? // T extends T迭代时，当前值都抽出来安排在数组第一位，而后再将 当前值以外的值分割出来（Exclude）安排给自身
    // 如若当前值以外的值分隔不出来，为never（Exclude割不出来即never）后，则到底了，返回[]回去告知已结束
    [T, ...Permutation<Exclude<B, T>>]
  : [];

/**
 * 第十八题
 * Length of String
 * 计算字符串文字的长度，其行为类似于String＃length。
 */
// 将开头的字符拆下来装进StrArray数组里,然后递归载入,直至最后获取数组的length长度…一个静态东西整出这么多花样,蛋疼
type LengthOfString<StrSrouce extends string, StrArray extends string[] = []> =
  StrSrouce extends `${infer StartChar}${infer RestChar}`
    ? LengthOfString<RestChar, [...StrArray, StartChar]>
    : StrArray["length"];

type StrLength = LengthOfString<"xbzzo">;

/**
 * 第十九题
 * Flatten
 * 在此挑战中，您将需要编写一个接受数组并发出扁平化数组类型的类型。
 */

type flatten = Flatten<[1, 2, [3, 4], [[[5]]]]>; // [1, 2, 3, 4, 5]
type flatten2 = Flatten2<[1, 2, [3, 4], [[[5, 6, [7, [8, [9]]]]]]]>; // [1, 2, 3, 4, 5, 6, 7, 8, 9]
type Flatten<A extends any[]> = A extends [infer StartItem, ...infer RestItem]
  ? StartItem extends any[]
    ? Flatten<[...StartItem, ...RestItem]>
    : [StartItem, ...Flatten<RestItem>]
  : A;

type Flatten2<A extends any[], OldArr extends any[] = []> = A extends [
  infer StartItem,
  ...infer RestItem
]
  ? StartItem extends any[]
    ? Flatten2<[...StartItem, ...RestItem], OldArr>
    : Flatten2<RestItem, [...OldArr, StartItem]>
  : OldArr;

/**
 * 第二十题
 * Append to object
 * 实现一种类型，将新字段添加到接口。 该类型采用三个参数。 输出应该是具有新字段的对象
 */

type Test = { id: "1" };
type Result22 = AppendToObject<Test, "value", 4>; // expected to be { id: '1', value: 4 }
// 啊啊啊啊啊啊 ，我太棒了吧
type AppendToObject<
  O extends object,
  K extends string,
  V extends any,
  OKeys extends keyof O = keyof O
> = {
  [key in OKeys | K]: key extends OKeys ? O[key] : V;
};

/**
 * 第二十一题
 * Absolute
 * 实现绝对类型。 一种采用字符串，数字或bigint的类型。 输出应为正数字符串
 */
type Test22 = -100;
type Result222 = Absolute<Test22>; // expected to be "100"

type Absolute<Val extends string | number | bigint> =
  // 通过``模板字符串将number转成字符串，而后使用infer抽取出来截掉负号
  `${Val}` extends `-${infer Num}` ? Num : `${Val}`;

/**
 * 第二十二题
 * String to Union
 * 实现String to Union类型。 键入take string参数。 输出应为输入字母的并集
 */

type Test33 = "123";
type Result33 = StringToUnion<Test33>; // expected to be "1" | "2" | "3"

type StringToUnion<Val extends string, Arr extends any[] = []> =
  Val extends `${infer StartChar}${infer RestChar}`
    ? StringToUnion<RestChar, [...Arr, StartChar]>
    : Arr[number];

/**
 * 第二十三题
 * Merge
 * 将两种类型合并为新类型。 第二种类型的键将覆盖第一种类型的键。
 */

interface MergeType1 {
  name: number;
  age: string;
  phone: number;
}
interface MergeType2 {
  name: string;
  age: number;
}

type MergeTest = Merge<MergeType1, MergeType2>;
type Merge<T1 extends {}, T2 extends {}> = {
  [k in keyof T1 | keyof T2]: k extends keyof T2
    ? T2[k]
    : k extends keyof T1
    ? T1[k]
    : never;
};

/**
 * 第二十四题
 * CamelCase
 * for-bar-baz -> forBarBaz
 */

type CameCaseResult = CamelCase<"for-bar-baz">;

type FirstLetterToCamelCase<Val extends string> =
  Val extends `${infer StartChar}${infer RestVal}`
    ? `${Uppercase<StartChar>}${RestVal}`
    : Uppercase<Val>;
type CamelCase<Val extends string> =
  Val extends `${infer StartVal}-${infer RestVal}`
    ? `${FirstLetterToCamelCase<StartVal>}${CamelCase<RestVal>}`
    : FirstLetterToCamelCase<Val>;

/**
 * 第二十五题
 * KebabCase
 * FooBarBaz -> for-bar-baz
 */

type KebabCaseResult = KebabCase<"FooBarBaz">;
type KebabCase<Val extends string, IsFirst extends boolean = true> =
  Val extends `${infer StartChar}${infer RestVal}`
    ? StartChar extends `${Uppercase<StartChar>}`
      ? `${IsFirst extends true ? "" : "-"}${Lowercase<StartChar>}${KebabCase<
          RestVal,
          false
        >}`
      : `${StartChar}${KebabCase<RestVal, false>}`
    : Val;

/**
 * 第二十四题
 * Diff
 * Get an Object that is the difference between O & O1
 */

interface O {
  name: string;
  age: number;
  test: any;
}
interface O1 {
  name: string;
  age: number;
  phone: number;
  password: string;
}

type DiffResult = Diff<O, O1>;

type Diff<
  O extends {},
  O1 extends {},
  K extends keyof O = keyof O,
  K1 extends keyof O1 = keyof O1
> = {
  [k in Exclude<K, K1> | Exclude<K1, K>]: k extends K
    ? O[k]
    : k extends K1
    ? O1[k]
    : never;
};

/**
 * 第二十五题
 * AnyOf
 * 数组内的值 含有隐式转换，如若数组内全部元素为true，那则返回true
 */

type Sample1 = AnyOf<[1, "1", true, [], {}]>; // expected to be true.
type Sample2 = AnyOf<[0, "", false, [], {}]>; // expected to be false.

type VerifBool<R> = R extends 0
  ? false
  : R extends ""
  ? false
  : R extends false
  ? false
  : R extends []
  ? true
  : R extends {}
  ? true
  : true;

type AnyOf<Arr extends Array<number | string | boolean | [] | {}>> =
  Arr extends [infer StartItem, ...infer RestItem]
    ? VerifBool<StartItem> extends true
      ? [true, ...AnyOf<RestItem>] extends true[]
        ? true
        : false
      : false
    : [VerifBool<Arr>];

/**
 * 第二十六题
 * IsNever
 * 实现类型IsNever，它接受输入类型T。如果的类型解析为Never，则返回true，否则返回false。
 */

type A = IsNever<never>; // expected to be true
type B = IsNever<undefined>; // expected to be false
type C = IsNever<null>; // expected to be false
type D = IsNever<[]>; // expected to be false
type E = IsNever<number>; // expected to be false

type IsNever<Val> = [Val] extends [never] ? true : false;

/**
 * 第二十七题
 * 实现类型IsUnion，该类型接受输入类型T并返回T是否解析为联合类型。
 */

type case1 = IsUnion<string>; // false
type case2 = IsUnion<string | number>; // true
type case3 = IsUnion<[string | number]>; // false

// 我
type IsUnion<T, B = T> = T extends T
  ? [Exclude<B, T>] extends [never]
    ? false
    : true
  : never;
// 他人，妙
type IsUnion2<T, B = T> = T extends B
  ? [B] extends [T]
    ? false
    : true
  : never;

/**
 * 第二十八题
 * ReplaceKeys
 * 实现一个类型ReplaceKeys，它替换联合类型中的键，如果某个类型没有这个键，只需跳过替换，A类型有三个参数。
 */

type NodeA = {
  type: "A";
  name: string;
  flag: number;
};

type NodeB = {
  type: "B";
  id: number;
  flag: number;
};

type NodeC = {
  type: "C";
  name: string;
  flag: number;
};

type Nodes = NodeA | NodeB | NodeC;

// {type: 'A', name: number, flag: string} | {type: 'B', id: number, flag: string} | {type: 'C', name: number, flag: string}
// would replace name from string to number, replace flag from number to string.
type ReplacedNodes = ReplaceKeys<
  Nodes,
  "name" | "flag",
  { name: number; flag: string }
>;

// {type: 'A', name: never} | NodeB | {type: 'C', name: never} // would replace name to never
type ReplacedNotExistKeys = ReplaceKeys<Nodes, "name", { aa: number }>;

type ReplaceKeys<Types extends {}, Keys, Srouces> = Types extends Types
  ? {
      [k in keyof Types]: k extends Keys
        ? k extends keyof Srouces
          ? Srouces[k]
          : never
        : Types[k];
    }
  : never;

/**
 * 第二十九题
 * Remove Index Signature
 * 实现RemoveIndexSignature <T>，从对象类型中排除索引签名。
 */
type Foo = {
  [key: string]: any;
  foo(): void;
  name: string;
};
type BB = RemoveIndexSignature<Foo>; // expected { foo(): void }
type RemoveIndexSignature<O extends {}> = {
  [K in keyof O as string extends K
    ? never
    : number extends K
    ? never
    : K]: O[K];
};

/* 核心知识点如下↓↓↓↓↓↓↓↓↓↓↓↓↓↓ */

type TestType = KeyAddTestStr<Foo>; // expected { foo-test(): void }
type KeyAddTestStr<O extends {}> = {
  // as符可用在静态类型中的in上，后面可跟上其他操作
  [K in keyof O as K extends string ? `${K}-test` : K]: O[K];
};

// string原型不可能继承于原型下延伸的内容，简单点就是说“父亲怎么可能被儿子生出来”。。为false
type aaaaaaaaaa = string extends "f" ? true : false;

// 字符串因为是string原型下延伸的内容,所以继承判断有效,为true
type bbbbbbbbb = "f" extends string  ? true : false;

// type-challenges中级难度完成… 2021/5/29 0:29