/**
 * 函数组合调用
 *
 * @param  {...any} funcs
 * @returns
 */
function compose(...args) {
  // let args = [].prototype.slice.call(arguments); // 参数转数组
  return function (x) {
    return args.reduceRight(function (arg, fn) { // compose 调用顺序从右向左 pipe 从左向右
      return fn(arg);
    }, x);
  };
}
let pipeEs6 = (...args) => (x => (args.reduce((res,cb)=>(cb(res)),x)));

/**
 * 柯里化
 * 参数复用&延迟计算
 * @param {*} func 
 * @returns 
 */
function curry(func) {
  return function curried(...args) {
    if (args.length >= func.length) { // 通过函数的length属性，来获取函数的形参个数
      return func.apply(this, args); // 如果参数累积超过形参个数则执行
    } else {
      return function (...args2) {
        return curried.apply(this, args.concat(args2)); // 参数不足继续累积
      };
    }
  }
}

/**
 * 偏函数
 * 固定一个函数的一个或多个参数，并返回一个可以接收剩余参数的函数
 * @param {*} fn 
 * @returns 
 */
function partial(fn) {
  let args = [].slice.call(arguments, 1);
  return function () {
    const newArgs = args.concat([].slice.call(arguments));
    return fn.apply(this, newArgs);
  };
}

/**
 * 惰性函数
 * @param {*} element 
 * @param {*} type 
 * @param {*} handler 
 * @returns 
 */
function addHandler(element, type, handler) {
  if (element.addEventListener) {
    addHandler = function (element, type, handler) {
      element.addEventListener(type, handler, false);
    };
  } else if (element.attachEvent) {
    addHandler = function (element, type, handler) {
      element.attachEvent("on" + type, handler);
    };
  } else {
    addHandler = function (element, type, handler) {
      element["on" + type] = handler;
    };
  }
  // 保证首次调用能正常执行监听
  return addHandler(element, type, handler);
}

/**
 * 缓存函数
 * @param {*} fn 
 * @returns 
 */
function memorize(fn) {
  const cache = Object.create(null); // 存储缓存数据的对象
  return function (...args) {
    const _args = JSON.stringify(args);
    return cache[_args] || (cache[_args] = fn.apply(fn, args));
  };
};
module.exports = { compose, pipeEs6, curry, partial, addHandler, memorize };