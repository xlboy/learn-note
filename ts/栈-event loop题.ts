/**
 * 
 * @description 2021-1-26早上一面的有趣一题
 */

// 示例↓↓↓↓↓↓↓↓↓
Person('liu');
// Hi! liu
/* -------------------------------------------------------- */

Person('liu').eat('吃了吗');
// Hi! liu
// eat 吃了吗
/* -------------------------------------------------------- */

Person('liu').eat('吃了吗').eat('吃了吗');
// Hi! liu
// eat 吃了吗
// eat 吃了吗
/* -------------------------------------------------------- */

Person('liu').eat('吃了吗').sleep(10);
// Hi! liu
// eat 吃了吗

/** 10秒后输出↓ **/

// sleep 10
/* -------------------------------------------------------- */

Person('liu').eat('吃了吗').sleep(10).eat('吃饱啦');
// Hi! liu
// eat 吃了吗

/** 10秒后输出↓ **/

// sleep 10
// eat 吃饱啦
/* -------------------------------------------------------- */

Person('liu').eat('吃了吗').sleep(10).eat('吃饱啦').cancel();
// Hi! liu
// eat 吃了吗

/** 10秒后输出↓ **/

// sleep 10
/* -------------------------------------------------------- */

Person('liu').eat('吃了吗').eat('吃饱啦').sleep(10).cancel();
// Hi! liu
// eat 吃了吗
// eat 吃饱啦
/* -------------------------------------------------------- */

Person('liu').eat('吃了吗').cancel().eat('吃了吗').cancel().eat('真的吃了');
// Hi! liu
// eat 真的吃了
/* -------------------------------------------------------- */

Person('liu')
    .eat('吃了吗')
    .sleep(10)
    .cancel()
    .sleep(3)
    .eat('吃饱了')
    .eat('喝口水')
    .sleep(10)
    .eat('再吃点')
    .eat('吃点香蕉')
    .eat('吃屎')
    .cancel();

// Hi! liu (时间: 12.00:00)
// 吃了吗 (时间: 12.00:00)
// 3秒后 "eat 吃饱了" "eat 喝口水" (时间: 12.00:03)
// 10秒后 "eat 再吃点" "eat 吃点香蕉" (时间: 12.00:13)

Person('liu')
    .eat('吃了1')
    .sleep(10)
    .eat('吃了2')
    .eat('吃了3')
    .cancel()
    .cancel() // 两个cancel后，吃了2、吃了3都被清了，如果这时候又来一个.cancel，那sleep也被清
    .sleep(10)
    .cancel();

Person('liu')
    .eat('吃了1')
    .sleep(10)
    .eat('吃了2') // 吃了2是属于sleep这个10秒的延时队列里  （此时sleep(10)数据状态：[吃了2])
    .sleep(20)
    .eat('吃了3')
    .eat('吃了4') // 吃了3 与 吃了4   是属于sleep这个20秒的延时队列里  （此时sleep(20)数据状态：[吃了3，吃了4])
    .cancel() // 把上一个动作 “吃了4” 给清掉了，sleep这个20秒的延时队列 -1。 （此时sleep(20)数据状态：[吃了3])
    .cancel() // 再把上一个动作 “吃了3” 给清掉了，sleep这个20秒的延时队列又 -1 （此时sleep(20)数据状态：[])
    .cancel() // 此时就只剩 sleep这个20秒的延时队列了，又再次-1，这个sleep的延时队列直接没 （此时sleep(20)数据状态：null)
    .cancel(); // 没有了sleep 这个20秒的延时队列了，就再到上一个sleep 10了，又逐一以此类推进行操作…一直影响

// 二哀老叼写的，利用栈思想想问题，借助了await阻塞Promise -> setTimeout轻松实现…
// ↓↓↓↓↓
(async () => {
    const queue = [];
    queue.push(
        () =>
            new Promise((r) => {
                setTimeout(() => {
                    r('1');
                }, 1000);
            })
    );
    queue.push(
        () =>
            new Promise((r) => {
                setTimeout(() => {
                    r('2');
                }, 1000);
            })
    );
    for (const callback of queue) {
        console.log('又输出呗', new Date().toLocaleString());
        const result = await callback();
        console.log('result', result);
    }
})();

function Person(name) {
    const queue = [];
    queue.push(() => {
        console.log('hi', name);
    });

    const events = {
        eat(str) {
            queue.push(() => {
                console.log(str);
            });
            return events;
        },
        sleep(num) {
            queue.push(
                () =>
                    new Promise<void>((resolve) =>
                        setTimeout(() => {
                            console.log('sleep', num);
                            resolve();
                        }, num)
                    )
            );
            return events;
        },
        cancel() {
            queue.pop();
            return events;
        },
    };

    new Promise<void>((_) => _()).then(async () => {
        for (const callback of queue) {
            await callback();
        }
    });

    return events;
}

// ↓↓↓↓我实现的…完成了三分之二的样子，没以栈思想去思考这个题目（尚未学数据结构）
type ActionModel = 'eat' | 'sleep'
class Proson {
    sleepQueue: Array<Function[]> = []
    basicQueue: Function[] = []
    currentSleep = {
        queueIndex: -1,
        sleepDuration: 0
    }
    isFinishBasicQueue = false

    currentModel: ActionModel
    lastAction: ActionModel
    constructor(name) {
        console.log(`hi! ${name}`)
        return this
    }
    eat(content: string) {
        const self = this
        const call = () => console.log(`eat ${content}`)
        this.setAction('eat') // 这里可能要做上一个动作的处理
        if (this.currentModel === 'sleep') {
            handleSleep()
        } else if ([undefined, 'eat'].includes(this.currentModel)) {
            handleBasic()
        }
        return this

        function handleSleep() {
            const queueIndex = self.currentSleep.queueIndex
            // 直接添加进对应的队列内部，后面setTimeout时间一到就会获取执行
            self.sleepQueue[queueIndex].push(call)
        }
        function handleBasic() {
            self.basicQueue.push(call)
            // 如未开始进行微任务（所有回调进行触发）的处理，则安排
            if (!self.isFinishBasicQueue) {
                // 利用微任务来实现 收集一系列操作 后再 将收集的操作逐一执行
                new Promise(r => r(''))
                    .then(_ => {
                        self.basicQueue.forEach(call => call())
                        self.isFinishBasicQueue = false
                    })
                self.isFinishBasicQueue = true
            }
        }
    }
    sleep(_duration) {
        this.setAction('sleep')
        this.setCurrentModel('sleep')
        const duration = this.currentSleep.sleepDuration += _duration
        const queueIndex = ++this.currentSleep.queueIndex
        setTimeout(() => {
            this.sleepQueue[queueIndex].forEach(call => call())
        }, duration * 1000);
        return this
    }
    cancel() {
        const self = this
        // 刚进行Person('liu')时就直接.cancel返回，throw处理
        if (this.currentModel === undefined) {
            throw new Error('刚开始你就cancel，食屎啦雷')
        } else if (this.currentModel === 'sleep') {
            this.lastAction === 'eat' && clearLastSleepQueue()
            this.lastAction === 'sleep' && clearLastSleep()
        } else clearLastBasicQueue()

        return this

        function clearLastSleep() {
            self.sleepQueue.pop()
        }

        function clearLastSleepQueue() {
            const { queueIndex } = self.currentSleep
            self.sleepQueue[queueIndex]?.pop()
        }
        function clearLastBasicQueue() {
            self.basicQueue.pop()
        }
    }
    setAction(action: ActionModel) {
        this.lastAction = action
    }
    setCurrentModel(model: ActionModel) {
        this.currentModel = model
    }
}