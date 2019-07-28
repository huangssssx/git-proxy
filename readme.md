## 1. 前言：
这是一个git的代理程序，制作的初衷是为了能够在执行git命令之前能够在本地对其中的一些逻辑做出判断，从而能够阻止一些危险操作、或者自定义一些指令用于做一些额外操作，比如：在提交时候对message做一些处理，加入时间、作者、影响分支等等。

## 2. 如何使用：
- 安装：npm install git-proxy -g
- 使用gp执行命令，比如：```gp merge linetest```
- 在命令行中输入```gp config```可以获取本地config文件，按照例子写插件即可：
```js
    /***********************************************************
     * next 方法是一个流控制器，类似于promise中的resolve和reject
     * - next(true) 表示本插件已结束可以继续执行下一个插件
     * - next(false) 表示本流程执行完毕，流程将在此中断
     * - params 这里包含了 git 命令的参数，如果你输入的命令是 gpr merge linetest 
     * 那么params就是[merge,linetest]
     * ********************************/
    utils.pushGenFunction(function(next,params){
        console.log("do something");
        if(params[0]==="merge" && params==="linetest"){
            console.log("you should not merge linetest to local branch!");
            next(false)
        }
        else{
            next(true)
        }
    });

```

## 3. 结语
目前功能处于测试状态，还需要更多的使用，如果大家有什么建议请发邮件：huangssssx@qq.com