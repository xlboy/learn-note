/**
 * 第一题
 * 实现 Pick
 * 无需使用内置的Pick<T, K>泛型即可。  通过从K中选择属性T来构造类型
 *
 */
interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

type TodoPreview = MyPick<Todo, "title" | "completed">;

const todo: TodoPreview = {
  title: "Clean room",
  completed: false,
};

type MyPick<O, K extends keyof O> = {
  [k in K]: O[k];
};

/**
 * 第二题
 * 实现 Readonly
 * 无需使用内置的Readonly<T>泛型即可
 * 构造一个类型，并将T的所有属性设置为只读，这意味着无法重新分配所构造类型的属性。
 *
 */
interface Todo1 {
  title: string;
  description: string;
}

const todo1: MyReadonly<Todo1> = {
  title: "Hey",
  description: "foobar",
};

todo1.title = "Hello"; // Error: cannot reassign a readonly property
todo1.description = "barFoo"; // Error: cannot reassign a readonly property

type MyReadonly<O> = {
  readonly [k in keyof O]: O[k];
};

/**
 * 第三题
 * 元组转换为对象
 * 给定数组，转换为对象类型，键/值必须在给定数组中
 */
const tuple = ["tesla", "wc tm"] as const;

const result: TupleToObject<typeof tuple> = {
  tesla: "tesla",
  "wc tm": "wc tm",
}; // expected { tesla: 'tesla', 'model 3': 'model 3', 'model X': 'model X', 'model Y': 'model Y'}

type TupleToObject<T extends readonly string[]> = {
  [K in T[number]]: K;
};

type TupleToObject2 = {
  [K in ["one", "tow", "three"][number]]: number;
};

type TupleToObject3 = {
  [K in "111" | "222"]: number;
};
type c = "111" | "222";
type cc = ["111", "222"][number];

/**
 * 第四题
 * 实现一个通用First<T>，它接受一个数组T并返回它的第一个元素的类型。
 */
type arr1 = ["a", "b", "c"];
type arr2 = [3, 2, 1];

type head1 = First<arr1>; // expected to be 'a'
type head2 = First<arr2>;

type First<A extends any[]> = A[0];

/**
 * 第五题
 * 获取元组长度
 * 对于给定的元组，您需要创建一个通用的Length，选择元组的长度
 */
type tesla = ["tesla", "model 3", "model X", "model Y"];
type spaceX = ["FALCON 9", "FALCON HEAVY", "DRAGON"];

type teslaLength = Length<tesla>; // expected 4
type spaceXLength = Length<spaceX>; // expected 5

type Length<A extends any[]> = A["length"];

/**
 * 第六题
 * Exclude
 * 实现内置的Exclude <T，U>  从T中排除可分配给U的那些类型
 */

// A extends B给我的理解是… AllKey 继承 AllKey其中的key，实际上就是穿插，把AllKey其中的key给穿插掉了
type MyMyExclude<A, B> = A extends B ? never : A;
type KeyA = "a" | "b" | "c" | "d";

type m_1 = MyMyExclude<"c", KeyA>;
type m_2 = MyMyExclude<KeyA, "c">;

/**
 * 第七题
 * 如果我们有一个包装类型的类型，
 * 比如Promise。我们如何才能获得包装类型中的类型呢？
 * 例如，如果我们有Promise<ExampleType>，如何获取ExampleType？
 *  extends Promise<infer A>
 */

// infer与 extends相配合
type GetPromiseValue<T> = T extends Promise<infer A> ? A : never;
type Promise1 = Promise<string>; // Promise<string>
type Promise1Type = GetPromiseValue<Promise1>; // string

/**
 * 第八题
 * 实现一个utils如果它接受条件C，真实返回类型T和错误返回类型F。C应该是true或false，而T和F可以是任何类型。
 */
// 锻炼巩固extendsの一题
type If<C extends boolean, T, F> = C extends true ? T : F;

/**
 * 第九题
 * 在类型系统中实现JavaScript Array.concat函数。 类型接受两个参数。 输出应该是一个新数组，其中包含按ltr顺序输入的
 */
type Concat<A extends any[], B extends any[]> = [...A, ...B];
type Result = Concat<[1, "3"], [2]>; // expected to be [1, 2]

/**
 * 第十题
 * 在类型系统中实现JavaScript Array.includes函数。 类型接受两个参数。 输出应为布尔值true或false。
 */
type Includes<U extends any[], C> = C extends U[number] ? true : false
type isPillarMen1 = Includes<['Kars', 'Esidisi', 'Wamuu', 'Santana'], 'Dio'> // expected to be `false`
type isPillarMen2 = Includes<['Kars', 'Esidisi', 'Wamuu', 'Santana'], 'Santana'> // expected to be `true`