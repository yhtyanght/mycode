class Stack{
    constructor(){
        this.count = 0;
        this.items = {};
    }
    push(element){
        this.items[this.count] = element;
        this.count++;
    }
    size(){
        return this.count;
    }
    isEmpty(){
        return this.count == 0;
    }
    pop(){
        if(this.isEmpty()){
            return undefined;
        }
        this.count--;
        const result = this.items[this.count];
        delete this.items[this.count];
        return result;
    }
    peek(){
        if(this.isEmpty()){
            return undefined;
        }
        return this.items[this.count-1];
    }
    clear(){
        this.items = {};
        this.count = 0;
    }
    toString(){
        if(this.isEmpty()){
            return '';
        }
        let result = `${this.items['0']}`;
        for(let i = 1;i<this.count;i++){
            result=`${result},${this.items[i]}`
        }
        return result;
    }
}
/* TODO: 保护数据结构的内部元素 利用symbol或weakmap(this为键)实现private
const _items = new Symbol('stackItem');
class stack{
    constructor(){
        this[_items]=[];
    }
}
const items = new WeakMap();

class stack{
    constructor(){
        items.set(this, {});
    }
} */

// 十进制转二进制
function decimalToBinary(num){
    const tempStack = new Stack();
    let result = '';
    while(num>0){
        tempStack.push(Math.floor(num%2));
        num=Math.floor(num/2);
    }
    while(!tempStack.isEmpty()){
        result+=tempStack.pop();
    }
    return result;
}

// 进制转换算法
function baseConvert(num, base){
    if(base<2 || base>36){
        return ''
    }
    const tempStack = new Stack();
    const digits = '0123456789abcdefghijklmnopqrstuvwxyz';
    let result = '';
    while(num>0){
        tempStack.push(Math.floor(num%base));
        num=Math.floor(num/base);
    }
    while(!tempStack.isEmpty()){
        result+=digits[tempStack.pop()];
    }
    return result
}