const inquirer = require("inquirer");
const utils = require('./utils.js');

/************************************************
 * this is a demo for git check
 * if next(false) git command will not be excuted
 * else it will run as usual
 ************************************************/
/**
utils.pushGenFunction(function(next,params){
    // console.log("config:params:",params);
    if (!params ||params.length==0) {
        // console.log("git has no parameters!");
        next(true);
        return;
    }

    if (params[0].toLowerCase() === "merge" && params[1] === "linetest") {
        let promptList = [
            {
                type: "rawlist",
                message: "\x1B[33mlinetest分支是测试分支，你确定要将它合并到当前分支中吗？\x1b[0m",
                name: "watch",
                prefix: "你正在执行一项危险操作：",
                choices: [
                    "Yes",
                    "No"
                ]
            }
        ];

        inquirer.prompt(promptList).then((res) => {
            if (res.watch === "Yes") {
                next(true);
            }
        });
    }
    else{
        next(true);
    }
});
 */
