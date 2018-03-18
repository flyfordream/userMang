var http = require("http");
var url = require("url");
var querystring = require('querystring');
var dbConnection = require("./db");
//数据库连接
var dbConn = new dbConnection();

function startServer(route){
    function onRequest(request, response){
        var pathName = url.parse(request.url).pathname;
        console.log("Request for "+pathName + "  receiveed");  

        //解析url参数
        var params = url.parse(request.url, true).query;
        console.log("name: "+params.name + " url: "+params.url);
       // route(request, response, pathName);
     
       console.log("db info: "+ dbConn.connect);
       //get current db records
       dbConn.getRecord();
       //handle user request
       handleReq(request, response);

       // response.writeHead(200, {"Content-Type":"text/plain"});
       // response.write("Hello,World");
      //  response.end();
    }
    http.createServer(onRequest).listen(8888);
    console.log("Server has started");

    function handleReq(req, res)
    {
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
    } else {  // 输出表单
        res.write(postHTML);
    }
    res.end();
  });
    }

}


exports.start = startServer;