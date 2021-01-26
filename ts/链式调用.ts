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