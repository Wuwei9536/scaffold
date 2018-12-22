const fs = require('fs-extra');
const readline = require('readline');
const path = require('path');
const config = require('../config/copy.config.js');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
const question = str => rl.question('[ 请输入名称 ]:\n', (ans) => {
  const res = ans.trim();
  const from = path.resolve(__dirname, config[str].from);
  const to = path.resolve(__dirname, config[str].to + res);
  if (res) {
    fs.exists(to, (exist) => {
      if (exist) {
        console.log('[ 目录已存在，请重新提交 ]');
        question();
      } else {
        fs.copy(from, to)
        .then(() => {
          console.log('[ 目录复制成功！]');
          rl.close();
        })
        .catch((err) => {
          console.log('[ 复制异常 ]');
          console.error(err);
          rl.close();
        });
      }
    });
  } else {
    console.log('请重新提交\n');
    question();
  }
});
const project = JSON.parse(process.env.npm_config_argv).remain[0];
question(project);
