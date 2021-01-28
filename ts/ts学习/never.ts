/**
 * never 是啥？？
 * never 是一个…ts底层函数，代表着永远不存在的值
 * 又或者说，代表着一个不会正常返回数据的函数
 */

 function test(): never {
     throw new Error("我都报错了，艹");
 }