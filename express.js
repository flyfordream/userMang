/** 
 * Key-Point-1:Use Express to set up an server
 * Key-Point-2:Use router to support user manager
 * Date:2018-3-19
 * Author:duansl
*/
var express = require("express");
var dbConnection = require("./db");
var querystring = require('querystring');
var app = express();
var router = express.Router();
var userRouter = require("./router");
//init db connection
var dbConn = new dbConnection();


//just set an log 
router.use(function(req, res, next){
    console.log('%s %s %s', req.method, req.url, req.path);
    next();
});

//add filter path
router.use("/login", function(req, res, next){
    console.log("login in");
    next();
});

//index page
router.use("/index", function(req, res, next){
    var postHTML = 
    '<html><head><meta charset="utf-8"><title>菜鸟教程 Node.js 实例</title></head>' +
    '<body>' +
    '<form method="post">' +
    '网站名： <input name="name"><br>' +
    '网站 URL： <input name="url"><br>' +
    '<input type="submit">' +
    '</form>' +
    '</body></html>';
    var body = "";
        req.on('data', function (chunk) {
            body += chunk;
        });
        req.on('end', function () {
    // 解析参数
        body = querystring.parse(body);
    // 设置响应头部信息及编码
    res.writeHead(200, {'Content-Type': 'text/html; charset=utf8'});

    if(body.name && body.url) { // 输出提交的数据
        res.write("网站名：" + body.name);
        res.write("<br>");
        res.write("网站 URL：" + body.url);
        dbConn.addRecord(body.name, body.url);
    } 
    else 
    {  
        // 输出表单
        res.write(postHTML);
    }
        res.end();
    });
});

//show list page
router.use("/list", function(req, res, next){
    console.log("show list page");
    dbConn.getRecord();
    next();
});

//always run 
router.use(function(res, res, next){
    res.send("Hello World");
});

app.use('/index', router);
app.use('/user', userRouter);
app.listen(8889);