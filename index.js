const { createHandler, execHandler, removeHandler, syncExec } = require('./lib/index');

function verifyFnType(fn){
    if(typeof fn !== 'function' && typeof fn.toString() !== 'string'){
        throw new Error('fn must be a function or a string');
    }else{
        return fn.toString();
    }
}

module.exports.createHandler = function (fn, ...args){
    return createHandler(verifyFnType(fn), JSON.stringify(args));
};

module.exports.execHandler = function (handler, ...args){
    if(typeof handler !== 'string'){
        throw new Error('The handler parameter is invalid');
    }
    return execHandler(handler, JSON.stringify(args));
}

module.exports.removeHandler = function (handler){
    if(typeof handler !== 'string'){
        throw new Error('The handler parameter is invalid');
    }
    return removeHandler(handler);
}

module.exports.syncExec = function (fn, ...args){
    return syncExec(verifyFnType(fn), JSON.stringify(args));
}