/**
 * 第三题
 * Union to Intersection
 * 实现高级util类型UnionToIntersection<U>
 */

// // type Union2Intersection<U, B = U> = U extends B
// //   ? Exclude<B, U> extends infer C
// //     ? [C] extends [never]
// //       ? U
// //       : U & Union2Intersection<C>
// //     : true
// //   : false;
// // type Union2Intersection<U> = (U extends any ? (x: U) => any : never) extends (x: infer V) => any ? V : never
// type UnionToIntersection<U> = (U extends unknown ? (args: U) => void : never) extends (args: infer T) => void ? T : never
// // type Union2Intersection<U, B = U> = U extends U ? Union2Intersection<Exclude<B, U>> : "wcnmd";

// type wcnmdb = Exclude<"foo" | 1111, "f1oo"> extends infer C
//   ? [C] extends [never]
//     ? `wcnm-`
//     : C
//   : false;

// type cnbc = "1" & true & true;

// type IAAAAAAAA = UnionToIntersection2<"foo" | 42 | true>; // expected to be 'foo' & 42 & true

// type UnionToIntersection2<U> = (
//   U extends infer R ? (x: R) => any : false
// ) extends (x: infer V) => any
//   ? V
//   : never;

type Testt = "foo" & 42 & true; // never …无助

type SuperSet<T> = T extends (x: infer V) => any ? V : never;
type T4 = ((x: "fff") => any) | ((x: 44) => any);
type T5 = SuperSet<T4>; // T5:     "fff" | 44
type T6 = T4 extends (x: infer V) => any ? V : never; // T6:     never

// 看来交集是不允许普通数据类型穿插的，只允许object

export default 1;
