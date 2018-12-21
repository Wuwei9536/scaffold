const GetBranch = require('git-branch');

const result = {
    /* 发布分支： 默认为当前分支 */
    branch: GetBranch.sync(),
    /* 项目名称 */
    project: 'saas-wolfram-marketh5',
    /* 发布TOKEN： 进入项目配置 => 构建触发器 => 选中触发远程构建 => 身份验证令牌输入："token" */
    token: '1',
    /* 当前jenkins地址,不加http://前缀 */
    url: 'jenkins.dev.hsmob.com'
};

module.exports = result;
