type ObjectDescriptor<D, M> = {
  data?: D;
  methods?: M & ThisType<D & M>; // Type of 'this' in methods is D & M
};

function makeObject<D, M>(desc: ObjectDescriptor<D, M>): D & M {
  let data: object = desc.data || {};
  let methods: object = desc.methods || {};
  return { ...data, ...methods } as D & M;
}

let obj = makeObject({
  data: { x: 0, y: 0 },
  methods: {
    moveBy(dx: number, dy: number) {
      this.x += dx; // Strongly typed 
      this.y += dy; // Strongly typed this
    }
  }
});
obj.x = 10;
obj.y = 20;
obj.moveBy(5, 5);

// "use strict";
interface MouseEvent {
  layerX: number;
}
const el = {} as HTMLElement
el.addEventListener('click', e => {
  e.layerX
  e.target
})

interface testThis<T> {
  [k: string]: ThisType<T>
}
const demo: ThisType<{ num: number }> = {
  a() {
    this.num
  }
}


// 最后还不是落的情人的立场……你从来不会想……我何必这样……

// 我慢慢的回到自己的生活圈，也开始接受新的人选，爱你到最后，不痛不痒

