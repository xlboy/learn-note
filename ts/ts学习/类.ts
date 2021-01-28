type _class = {
    new(): any
}
const c: _class = class cc {
    constructor() {
        return 1
    }
}
new c()


// 继承
class name1 {
    nb = 1
    nb2 = ''
    constructor() {

    }
}
class name2 extends name1 {
    constructor() {
        super()
        console.log(this.nb)
    }
}

// 实现
interface test {
    run(): Function[];
    data: Boolean[]
}
class name3 extends name1 implements test {
    constructor() {
        super()
        console.log(this.nb)
    }
    run(): Function[] {
        throw new Error("Method not implemented.")
    }
    data: Boolean[]
}
// 实现或继承都可多个，使用,符隔开即可