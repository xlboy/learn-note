
interface IComponentState {
    hooks: any[],
    structure: Function
}

let isInitialStatus = false

let activeComponentSym: Symbol | undefined
let activeComponentHooks: any[]

let currentHookIndex = 0

const componentMap: Map<Symbol, IComponentState> = new Map()

const AppComponent = () => {
    const [count, setCount] = useState(0)
    const [size, setSize] = useState(Math.random())
    console.log(`count -> ${count} ---- size -> ${size}`)
    setTimeout(() => {
        setCount(count + 1)
        setSize(Math.random())
    }, 1000);
}

// 初始化组件
function initComponent(structure: Function) {
    isInitialStatus = true
    activeComponentHooks = []
    activeComponentSym = Symbol()

    // 初始化组件时进行钩子收集
    structure()

    componentMap.set(activeComponentSym, {
        hooks: activeComponentHooks,
        structure
    })
    currentHookIndex = 0
    activeComponentHooks = []
    activeComponentSym = undefined
    isInitialStatus = false
}

function useState<T>(initialValue: T): [T, (newVal: T) => T]
function useState<T>(initialValue: T) {
    let _currentHooksIndex = currentHookIndex

    // 当前组件状态是否为初始化状态
    if (isInitialStatus) {
        activeComponentHooks.push(initialValue)
    } else {
        // 不是初始化状态，就是组件内有触发setState的钩子,将缓存好的数据替换给initialValue
        if (activeComponentSym) {
            const _componentMap = componentMap.get(activeComponentSym)
            initialValue = _componentMap?.hooks[_currentHooksIndex]
        }
    }

    // 将当前活跃的全局组件标记赋给此作用域内，留setState闭包引用
    const _activeComponentSym = activeComponentSym

    const setState = (newVal: T) => {
        if (_activeComponentSym) {
            // 根据闭包留下的Sym,拿到集合中钩子 对应的 组件数据
            const _componentMap = componentMap.get(_activeComponentSym)
            if (_componentMap) {
                // 将闭包那留下的标记Sym赋给全局，而后再进行组件构造函数调用
                activeComponentSym = _activeComponentSym
                _componentMap.hooks[_currentHooksIndex] = newVal
                currentHookIndex = 0
                _componentMap.structure()
            }
        }
        return newVal
    }

    currentHookIndex++

    return [
        initialValue,
        setState
    ]

}

initComponent(AppComponent)