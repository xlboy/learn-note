/**
 * 第一题
 * 简单的 Vue 类型
 */
/*
    实现类似Vue的类型支持的简化版本。
    通过提供函数名称SimpleVue（类似于Vue.extend或defineComponent），它应该正确地推断出计算和方法内部的this类型。
    在此挑战中，我们假设SimpleVue接受带有data，computed和methods字段的Object作为唯一参数，
    -data是一个简单的函数，它返回一个公开上下文this的对象，但是您无法访问data中的数据本身或其他计算机值或方法。
    -computed是将上下文作为this的函数的对象，进行一些计算并返回结果。计算结果应作为简单的返回值而不是函数显示给上下文。
    -methods是函数的对象，其上下文也与this相同。方法可以访问data，computed以及其他methods公开的字段。 computed与methods的不同之处在于按原样公开的功能。
    SimpleVue的返回值类型可以是任意的。
 */

// 牛逼 ThisType, ThisType会影响 { [k: string]: () => void } 下任意名称函数的this。若想让本函数生效，则用(this: xxxx) => void
type GetComputedValue<C> = {
  [K in keyof C]: C[K] extends () => any ? ReturnType<C[K]> : never;
};

type VueComponentOptions<Data, Computed, Methods, Created> =
  VueComponentInstance<Data, Computed, Methods> &
    ThisType<Data & GetComputedValue<Computed> & Methods>;

type VueComponentInstance<Data, Computed, Methods> = {
  data(): Data;
  computed: Computed & ThisType<Data & GetComputedValue<Computed> & Methods>;
  methods: Methods & ThisType<Data & GetComputedValue<Computed> & Methods>;
  created?();
};
declare function SimpleVue<Data, Computed, Methods, Created>(
  options: VueComponentOptions<Data, Computed, Methods, Created>
): void;

SimpleVue({
  data() {
    return {
      name: "蒙奇D孙悟空",
    };
  },
  computed: {
    fullname() {
      this.fullname;
      this.hi();
    },
  },
  created() {},
  methods: {
    hi(): string {
      return "1";
    },
  },
});

export default 1;
