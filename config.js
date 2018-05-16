/**
 * Created by Administrator on 2017/9/23.
 */

var path = require('path');

var config = {
    la:'ddd',
    lb:'dd',

    // 添加到 html head 中的信息
    site_headers: [
        '<meta name="author" content="EDP@TAOBAO" />'
    ],

    author:'好想吃肉',
    // mongodb 配置
    db: 'mongodb://172.18.223.34:20006/myblog',

    session_secret: 'hehehaha', // 务必修改
    auth_cookie_name: 'gnep',
    auth_cookie_val:'peng',

    // 程序运行的端口
    port: 4000,
    upload: {
        path: '/home/static/upload',
        url: '/upload/'
    },
    file_limit: '10MB',
    // 话题列表显示的话题数量
    list_topic_count: 15,
    site_static_host: '', // 静态文件存储域名
    
    tabs: [

    ],

    create_reply_per_day: 1000, // 每个用户一天可以发的评论数
    visit_per_day: 1000, // 每个 ip 每天能访问的次数
};

module.exports = config;
