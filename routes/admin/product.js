var express = require('express');

var router = express.Router();

var multiparty = require('multiparty'); // get form data,upload image

// mysql 
var db = require('../../db/mysql.js'); 



router.get('/',function(req,res){
	var arr =[];
	//connect mysql
	var sql = 'SELECT * FROM product';  
     db.query(sql,function(err, rows){  
        if (err) {  
            console.log(err); 
            console.log("can not connect to mysql "); 
            return;  
        }  
         console.log(rows);
         /* for(var i=0;i<rows.length;i++){
         	arr[i]=rows[i];
         	console.log(arr[i].icon);
         } */
		res.render('product',{
			list:rows
		
		});
         
    });  
})
 
//show add page
router.get('/productadd',function(rec,res){
    res.render('productadd');
});


//show add page
router.post('/doProductAdd',function(req,res){
     
     var form = new multiparty.Form();
     form.uploadDir='upload'
     form.parse(req,function(err,fields,files){
        console.log(fields);
        var pname = fields.pname[0];
        var price = fields.price[0];
        var eprice = fields.eprice[0];
        var icon = files.icon[0].path;

        console.log(icon);
        var sql = 'INSERT INTO product(pname,price,eprice,icon) value(?,?,?,?)';  
        db.query(sql, [pname,price,eprice,icon],function(err,rows, fields){  
            if (err) {  
                console.log(err); 
                console.log("can not connect to mysql "); 
                return;  
            } else{
                res.redirect('/admin/product');
            }     
        }); 


     });
})



router.get('/productedit',function(req,res){
    var id = req.query.id;
     var sql = 'select * from product where id = ?';  
        db.query(sql, [id],function(err,rows, fields){  
            if (err) {  
                console.log(err); 
                console.log("can not connect to mysql "); 
                return;  
            } else{
                 
                console.log("list :====----------------------" );
                var list = rows;
                console.log(rows[0]);
                console.log("end :====----------------------" );
                res.render('productedit',{
                    list:rows[0]
                });
            }     
        }); 
 
});

router.get('/productdelet',function(req,res){
     var id = req.query.id;
     var sql = 'delete from product where id = ?';  
        db.query(sql, [id],function(err,rows, fields){  
            if (err) {  
                console.log(err); 
                console.log("can not connect to mysql "); 
                return;  
            } else{
                res.redirect('/admin/product');
            }     
        }); 
});



module.exports = router;