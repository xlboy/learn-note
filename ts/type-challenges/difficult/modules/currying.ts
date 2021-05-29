/**
 * 第二题
 * 科里化
 */

declare function Currying<Fn>(fn: Fn): Curried<Fn>;
type Curried<Fn> = Fn extends (...args: infer A) => infer R
  ? A extends [infer StartArg, ...infer RestArg]
    ? (v: StartArg) => Curried<(...args: RestArg) => R>
    : R
  : A;

const add_ = (a: number, b: string) => a + b;

const curriedAdd = Currying(add_);
const five = curriedAdd(2)("1");

export default 1;
