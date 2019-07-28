#!/usr/bin/env node
require('./config.js');
var child_process = require('child_process');
const utils = require('./utils.js');
const iconv = require('iconv-lite');
const path = require('path');
let args = process.argv;
let params = args.splice(2);

function runGitCommand(params){
    utils.run(params).then((res)=>{
        console.log("res:",res);
        if(!res){
            return;
        }
        var spawnObj = child_process.spawn('git', params, {encoding: 'utf-8'});
        spawnObj.stdout.on('data', function(chunk) {
            console.log(iconv.decode(chunk,"utf-8"));
        });
    
        spawnObj.stderr.on('data', (data) => {
          console.log(iconv.decode(data,"utf-8"));
        });
    })
   
}

if(params && params[0] == "config"){
    console.log(path.resolve(__dirname,"./config"));
    return ;
}

runGitCommand(params);