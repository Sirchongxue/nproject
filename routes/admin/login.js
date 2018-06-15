var express = require('express');

var router = express.Router();

var md5=require('md5-node');

var bodyParser = require('body-parser'); //get post data
//bodyParser zhongjianjian
router.use(bodyParser.urlencoded({extended:false}));
router.use(bodyParser.json()); 
//var multiparty = require('multiparty'); // get form data,upload image
// mysql 
var db = require('../../db/mysql.js'); 



router.get('/',function(req,res){
	res.render('login')
})
 
router.post('/doLogin',function(req,res){
	// get user data 
	console.log(req.body); 
	var username = req.body.username;
	var password = md5(req.body.password);
	 
	// connect database mysql
 	var sql = 'SELECT * FROM user WHERE username = ? and password=?';  
    db.query(sql, [username,password],function(err, rows, fields){  
        if (err) {  
            console.log(err);  
            return;  
        }  
        if(rows.length>0){

        	console.log(rows[0].username);
        	req.session.userinfo = rows[0];
			res.redirect('/admin/product');
        }else{
        	console.log('error : no data'); 
        	res.send("<script>alert('error');location.href='/admin/login/login'</script>");
        }
         
    });  
});


 
router.get('/logout',function(req,res){
 
    req.session.destroy(function(err){
        if(err){
            console.log(err);
        }else{
            res.redirect('/admin/login');
        }
    });
});


module.exports = router;