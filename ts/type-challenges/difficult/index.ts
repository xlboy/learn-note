/* 第一题，简单的 Vue 类型 */
import "./modules/vue";

/* 第二题，实现科里化函数定义 */
import "./modules/currying";

/* 第三题，题目有误的样子，做不到（联合类型转换成交叉类型…） */
import "./modules/unionToIntersection";

/* 第四题，实现高级util类型GetRequired<T>，该类型保留所有必填字段 */
import "./modules/getRequired";

type XOR<T, U> = T | U extends object
  ? T | U // (Without<T, U> & U) | (Without<U, T> & T)
  : T | U;

type Person = XOR<NameOnly, FirstAndLastName>;
let person: Person;

person = { is: "NameOnly", name: "Foo" };
person = { is: "FirstAndLastName", firstname: "Foo", lastname: "Bar" };

let stringOrNumber: XOR<string, number>;
stringOrNumber = 14;
stringOrNumber = "foo";

let primitiveOrObject: XOR<"wcnm", Person>;

primitiveOrObject = "wcnm";
primitiveOrObject = { is: "NameOnly", name: "" };
primitiveOrObject = {
  is: "FirstAndLastName",
  firstname: "Foo",
  lastname: "Bar",
};

type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

type NameOnly = { is: "NameOnly"; name: string };
type FirstAndLastName = {
  is: "FirstAndLastName";
  firstname: string;
  lastname: string;
};

// { name?: never} & FirstAndLastName // 把前者与后者有相同的保留起来
type ttt = Without<NameOnly, FirstAndLastName> & FirstAndLastName;
type jklsjkls = Omit<FirstAndLastName, "is">;

// { firstname?: never; lastname?: never; } & NameOnly // 把前者与后者有相同的保留起来
type ttt2 = Without<FirstAndLastName, NameOnly> & NameOnly;

type T0 = Omit<{ a: string; b: string }, "a">; //  { b: string; }, a is removed
type T1 = Exclude<{ a: string; b: string }, "a">; // { a: string, b: string }, a does not extend { a: string, b: string } so Exclude does nothing

type T2 = Omit<string | number, string>; // Attempts to remove all string keys (basically all keys) from string | number , we get {}
type T3 = Exclude<string | number, string>; // string extends string so is removed from the union so we get number
