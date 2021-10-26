const {compose,pipeEs6}  = require('../../FunctionalProgramming/index');
function left(s){
    return s+='left'
}
function right(s){
    return s+='right'
}
test('compose & pipe',() => {
    expect(compose(left,right)('')).toEqual('rightleft');
    expect(pipeEs6(left,right)('')).toEqual('leftright');
})
// TODO: 补充其余函数式编程的单测
