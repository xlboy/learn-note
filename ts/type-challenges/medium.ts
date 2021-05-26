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
