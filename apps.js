var express = require('express');

var app = new express();
var md5=require('md5-node');
/*var bodyParser = require('body-parser'); //get post data
//bodyParser zhongjianjian
app.use(bodyParser.urlencoded({extended:false}));

app.use(bodyParser.json());*/

var multiparty = require('multiparty'); // get form data,upload image

// mysql 
var db = require('./db/mysql.js');  

//save userinfor
var session = require('express-session');
 
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { 
  		maxAge:1000*60*30
   },
   rolling :true
}));

 

//ejs
app.set('view engine','ejs');


//public 
app.use(express.static('public'));


app.use('/upload',express.static('upload'));




//
/*app.use(function(req,res,next){
 
	if(req.url=='/login' || req.url=='/doLogin'){
		next();
	}else{
		//console.log(session.userinfo);
 
		if(req.session.userinfo&&req.session.userinfo.username!=''){
			
			app.locals['userinfo']=req.session.userinfo;
			next();
		}else{
			res.redirect('/login');
		}
	}
 
}); */





app.get('/',function(rec,res){
	res.send('index');
});



//login: get form data
app.get('/login',function(rec,res){
	//res.send('login');
	res.render('login');
	//console.log(req.body);

});

app.post('/doLogin',function(req,res){
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
        	req.session.userinfo = rows[0].username;
			res.redirect('/product');
        }else{
        	console.log('error : '); 
        	res.send("<script>alert('error');location.href='/login'</script>");
        }
         
    });  

});


app.get('/product',function(req,res){
 
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

});

//show add page
app.get('/productadd',function(rec,res){
	res.render('productadd');
});


//show add page
app.post('/doProductAdd',function(req,res){
	 
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
	        	res.redirect('/product');
	        }     
    	}); 


	 });
});


app.get('/productedit',function(req,res){
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

app.get('/productdelet',function(req,res){
	 var id = req.query.id;
	 var sql = 'delete from product where id = ?';  
	    db.query(sql, [id],function(err,rows, fields){  
	        if (err) {  
	            console.log(err); 
	            console.log("can not connect to mysql "); 
	            return;  
	        } else{
	        	res.redirect('/product');
	        }     
    	}); 
});

app.get('/logout',function(req,res){
	req.session.destroy(function(err){
		if(err){
			console.log(err);
		}else{
			res.redirect('/login');
		}
	});
});

app.listen(3003,'127.0.0.1');