/*
 * @Description: util calss 
 * @Author: hcj
 * @Date: 2019-07-28 10:12:45
 * @LastEditTime: 2019-07-28 13:29:24
 * @LastEditors: Please set LastEditors
 */

const genFunctions = [];
let params = [];

class Utils {
    pushGenFunction(fn) {
        if (!fn || typeof fn !== "function") {
            throw "your function is not correct!"
        }
        genFunctions.push(fn);
    }

    thunkify(fn) {
        let {params} = this;
        return function (next) {
            fn(next, params);
        }
    }

    *gen(that) {
        let fn;
        for(let i =0;i<genFunctions.length;i++){
            fn = genFunctions[i];
            if (!fn || (typeof fn) !== "function") {
                return true;
            }
            yield that.thunkify(fn);
        }
    }

    run(params) {
        let {gen} = this;
        this.params = params;
        return new Promise((resolve, reject) => {
            let genInstance = gen(this);
            function next(mark) {
                if (!mark) {
                    resolve(false);
                    return;
                }
                let res = genInstance.next();
                if (!res || res.done) {
                    resolve(true);
                    return;
                }
                else {
                    res.value(next);
                }
            }
            next(true);
        });
    }
}

module.exports = new Utils();

// function pushGenFunction(fn) {
//     if (!fn || typeof fn !== "function") {
//         throw "your function is not correct!"
//     }
//     genFunctions.push(fn);
// }

// function thunkify(fn) {
//     return function (next) {
//         fn(next,params);
//     }
// }

// function* gen() {
//     genFunctions.forEach(fn => {
//         if (!fn || (typeof fn) !== "function") {
//             return true;
//         }
//         yield thunkify(fn);
//     });
// }

// function run(params) {
//     this.params = params;
//     return new Promise((resolve, reject) => {
//         let genInstance = gen();
//         function next(mark) {
//             if (!mark) {
//                 resolve(false);
//                 return;
//             }
//             let res = genInstance.next();
//             if (!res || res.done) {
//                 resolve(true);
//                 return;
//             }
//             else {
//                 res.value(next);
//             }
//         }
//         next(false);

//     });
// }

