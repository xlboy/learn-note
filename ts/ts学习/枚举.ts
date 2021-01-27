// 默认
enum Person {
    __TEXT__,
    __NB__
}

Person.__NB__

Person.__TEXT__


// 可重新赋值，赋的值不可进行计算处理，例'sss'.length / true / false 等
enum Person2 {
    __TEXT__ = '111',
    __NB__ = 3
}

Person2.__TEXT__
Person2.__NB__