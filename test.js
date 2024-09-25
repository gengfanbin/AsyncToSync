const { createHandler, execHandler, removeHandler, syncExec } = require('./index');

function sleepFn(p1, p2) {
    console.log("args::", p1, p2)
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("sleepFn end of execution" + p1 + p2)
        }, 5000)
    })
}

const createResult = createHandler(sleepFn)

if (createResult.code == 0) {
    let handler = createResult.result
    let res1 = execHandler(handler, "arg11", "arg12")
    let res2 = execHandler(handler, "arg21", "arg22")
    let res3 = execHandler(handler, "arg31", "arg32")
    console.log(res1)
    console.log(res2)
    console.log(res3)
    removeHandler(handler)
}

let res4 = syncExec(sleepFn, 258, 111)
console.log(res4)