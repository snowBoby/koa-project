const cp = require('child_process');
const { resolve } = require('path');

(async () => {
  const script = resolve(__dirname, '../crawler/trailer-list.js');
  const child = cp.fork(script,[]);//fork可以派生出一个子进程
  let invoked = false; //是否调用过
  child.on('error',err=>{
    if(invoked) return;
    invoked = true;
    console.log(err);
  })
  child.on('exit',code=>{
    if(invoked) return;
    invoked = true;
    let err = code === 0 ? null :new Error('exit code'+code);
    console.log(err)
  })
  child.on('message',data=>{
    let result = data.result;
    console.log(result)
  })
})()