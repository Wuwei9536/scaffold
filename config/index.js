const proxy = require('./proxy.config');
const copy = require('./copy.config');
const jenkins = require('./jenkins.config');
const alias = require('./alias.config');

const config = {
    copy, // 复制模版
    jenkins,
    proxy, // 代理
    alias
};

module.exports = config;
