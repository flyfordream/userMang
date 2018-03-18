var mysql      = require('mysql');

function dbConnection(){
    var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : '009',
        database : 'nodedev'
        });
    //created connection
   // this.connect=function(){ 
       
    //}
   
    //add record to db
    this.addRecord=function(name, url){
        var sql = "insert into website( name, url) values ( ?, ?)";
        var addParam = [name, url];

        connection.query(sql, addParam, function (error, results, fields){
            if(error){
                console.log("insert error:" + error.message);
                return ;
            }
            console.log("-----------insert--------------");
            console.log("Insert ID: "+ results);
            console.log("-----------end------------------");
        });

    }

    //get records
    this.getRecord= function(){
        var sql = "select * from website";
        //connection.connect();
        connection.query(sql, function (error, results, fields){
            if(error){
                console.log("select error:" + error.message);
                return ;
            }
            console.log("-----------select--------------");
            console.log(results);
            console.log("-----------end------------------");
        });
    }
}


module.exports = dbConnection;