var querystring = require("querystring");

var postHTML = 
  '<html><head><meta charset="utf-8"><title>Node.js 实例</title></head>' +
  '<body>' +
  '<form method="post">' +
  '网站名： <input name="name"><br>' +
  '网站 URL： <input name="url"><br>' +
  '<input type="submit">' +
  '</form>' +
  '</body></html>';

function loginRoute(req, res, pathname){
    //解析GET/POST请求
    var reqBody = "";
    req.on("data", function(chunk){
        console.log("reveive data: "+ chunk);
        reqBody += chunk;
    });
    //接收数据完毕
    req.on('end', function(){
        reqBody = querystring.parse(reqBody);
        //设置响应头部信息及编码
        res.writeHead(200, {"Content-Type": "text/html;charset=utf8"});
        //判断是否有数据
        if(reqBody.name && reqBody.url)
        {
            res.write("Name:"+ reqBody.name);
            res.write("Url:"+ reqBody.url);
        }
        else
        {
            res.write(postHTML);
        }
        //res.end();

    });

    console.log("Handle login request and route");
}


exports.loginRoute = loginRoute;