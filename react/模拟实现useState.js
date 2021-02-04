var isInitialStatus = false;
var activeComponentSym;
var activeComponentHooks;
var currentHookIndex = 0;
var componentMap = new Map();
var AppComponent = function () {
    var _a = useState(0), count = _a[0], setCount = _a[1];
    console.log('更新了,count -> ', count);
    setCount(1);
    // const [size, setSize] = useState('size')
    // console.log('更新了,size -> ', size)
};
// 初始化组件
function initComponent(structure) {
    isInitialStatus = true;
    activeComponentHooks = [];
    activeComponentSym = Symbol();
    // 初始化组件时进行钩子收集
    structure();
    componentMap.set(activeComponentSym, {
        hooks: activeComponentHooks,
        structure: structure
    });
    currentHookIndex = 0;
    activeComponentHooks = [];
    activeComponentSym = undefined;
    isInitialStatus = false;
}
function useState(initialValue) {
    var _currentHooksIndex = currentHookIndex;
    // 当前组件状态是否为初始化状态
    if (isInitialStatus) {
        activeComponentHooks.push(initialValue);
    }
    else {
        // 不是初始化状态，就是组件内有触发setState的钩子,将缓存好的数据替换给initialValue
        if (activeComponentSym) {
            var _componentMap = componentMap.get(activeComponentSym);
            initialValue = _componentMap === null || _componentMap === void 0 ? void 0 : _componentMap.hooks[_currentHooksIndex];
        }
    }
    // 将当前活跃的全局组件标记赋给此作用域内，留setState闭包引用
    var _activeComponentSym = activeComponentSym;
    var setState = function (newVal) {
        if (_activeComponentSym) {
            // 根据闭包留下的Sym,拿到集合中钩子 对应的 组件数据
            var _componentMap = componentMap.get(_activeComponentSym);
            if (_componentMap) {
                // 将闭包那留下的标记Sym赋给全局，而后再进行组件构造函数调用
                activeComponentSym = _activeComponentSym;
                _componentMap.hooks[_currentHooksIndex] = newVal;
                _componentMap.structure();
            }
        }
        return newVal;
    };
    currentHookIndex++;
    return [
        initialValue,
        setState
    ];
}
initComponent(AppComponent);
var isInitialStatus = false;
var activeComponentSym;
var activeComponentHooks;
var currentHookIndex = 0;
var componentMap = new Map();
var AppComponent = function () {
    var _a = useState(0), count = _a[0], setCount = _a[1];
    console.log('更新了,count -> ', count);
    setCount(1);
    // const [size, setSize] = useState('size')
    // console.log('更新了,size -> ', size)
};
// 初始化组件
function initComponent(structure) {
    isInitialStatus = true;
    activeComponentHooks = [];
    activeComponentSym = Symbol();
    // 初始化组件时进行钩子收集
    structure();
    componentMap.set(activeComponentSym, {
        hooks: activeComponentHooks,
        structure: structure
    });
    currentHookIndex = 0;
    activeComponentHooks = [];
    activeComponentSym = undefined;
    isInitialStatus = false;
}
function useState(initialValue) {
    var _currentHooksIndex = currentHookIndex;
    // 当前组件状态是否为初始化状态
    if (isInitialStatus) {
        activeComponentHooks.push(initialValue);
    }
    else {
        // 不是初始化状态，就是组件内有触发setState的钩子,将缓存好的数据替换给initialValue
        if (activeComponentSym) {
            var _componentMap = componentMap.get(activeComponentSym);
            initialValue = _componentMap === null || _componentMap === void 0 ? void 0 : _componentMap.hooks[_currentHooksIndex];
        }
    }
    // 将当前活跃的全局组件标记赋给此作用域内，留setState闭包引用
    var _activeComponentSym = activeComponentSym;
    var setState = function (newVal) {
        if (_activeComponentSym) {
            // 根据闭包留下的Sym,拿到集合中钩子 对应的 组件数据
            var _componentMap = componentMap.get(_activeComponentSym);
            if (_componentMap) {
                // 将闭包那留下的标记Sym赋给全局，而后再进行组件构造函数调用
                activeComponentSym = _activeComponentSym;
                _componentMap.hooks[_currentHooksIndex] = newVal;
                _componentMap.structure();
            }
        }
        return newVal;
    };
    currentHookIndex++;
    return [
        initialValue,
        setState
    ];
}
initComponent(AppComponent);
