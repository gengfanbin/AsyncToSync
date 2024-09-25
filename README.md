<p align="center">eliminate-async</p>

github: https://github.com/gengfanbin/eliminate-async

### 什么是javascript的异步传染性
JavaScript中的异步传染性是一个在编程中常见的现象，它指的是当一个函数内部包含异步操作（如使用Promise、async/await等）时，这种异步特性会传递给调用它的函数，以及调用这些函数的函数，依次传递下去。这可能会导致整个调用链上的函数都需要处理异步操作，从而增加了代码的复杂性和维护难度。

### eliminate-async做了什么
eliminate-async是一个JavaScript库，它使用rust创建一个JavaScript沙盒环境，使当前函数脱离当前文档流，在沙盒环境中执行，从而消除函数的异步特征，进而消除异步传染性问题。

### eliminate-async的缺点
1：eliminate-async它需要创建一个JavaScript沙盒环境，这可能会带来一些**性能上的开销**。同时，由于沙盒环境与当前文档流隔离，因此**无法访问文档流的上下文**。后续版本会优先解决这个问题。
2：由于跨语言调用的原因，rust的类型系统无法完全保证与JavaScript类型系统的兼容性，因此在使用eliminate-async时，需要注意类型转换的问题。**第一个大版本的eliminate-async会强制限制函数入参和出参类型必须能够被JSON格式化**,以这种取巧的方式绕过类型匹配的问题。后续会尝试完善类型系统。

### eliminate-async的安装
```bash
npm install eliminate-async
```

### eliminate-async的使用方式
eliminate-async的使用方式非常简单，只需要将一个异步函数传递给`createHandler`函数，即可创建一个同步函数。然后，可以使用`execHandler`函数来执行这个同步函数，就像执行普通的同步函数一样。可以通过`removeHandler`函数来移除这个同步函数并释放资源。
如果需要立即执行异步函数，可以使用`syncExec`函数。

**立即执行与创建句柄的区别在于立即执行的函数不会创建句柄，因此是一次性的，而创建句柄的函数可以多次执行。同时，立即执行函数在每次执行时都会创建一个新的沙盒环境，而创建句柄的函数则会在第一次创建沙盒环境后复用这个沙盒环境，从而提高性能。**

```javascript
import { createHandler, execHandler, removeHandler, syncExec } from 'eliminate-async';

// 创建一个异步函数
const asyncFunc = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('Hello, eliminate-async!');
    }, 1000);
  });
};

// 创建一个同步函数
let createResult = createHandler(asyncFunc);
let syncFunc
if (createResult.code == 0) { // 成功时返回code码为0
  syncFunc = createResult.result;
}

// 执行同步函数
let res = execHandler(syncFunc, arg1, arg2, ...); // 输出: Hello, eliminate-async!

// 移除同步函数
removeHandler(syncFunc);

// 立即执行异步函数的方式
console.log(syncExec(asyncFunc, arg1, arg2, ...)); // 输出: Hello, eliminate-async!
```

如果发现它存在的一些缺陷，请提Iusses!!!。