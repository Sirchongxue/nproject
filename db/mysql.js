    var db    = {};  
    var mysql = require('mysql');  
    var pool  = mysql.createPool({  
      connectionLimit : 10,  
      host            : 'localhost',  
      user            : 'root',  
      password        : '123456',  
      database        : 'nproject'  
    });  
      
    db.query = function(sql, values,callback){  
      
        if (!sql) {  
            callback();  
            return;  
        }  
        pool.query(sql,values, function(err, rows, fields) {  
          if (err) {  
            console.log(err);  
            callback(err, null);  
            return;  
          };  
      
          callback(null, rows, fields);  
        });  
    }  

    db.insert = function(sql, values,callback){


      
    }


    module.exports = db;  