var express = require('express');

var router = express.Router();

var bodyParser = require('body-parser'); //get post data
//bodyParser zhongjianjian
router.use(bodyParser.urlencoded({extended:false}));

router.use(bodyParser.json());

router.get('/',function(req,res){
	res.send('index');
})

router.get('/user',function(req,res){
	res.send('index user');
})

router.get('/product',function(req,res){
	res.send('index product');
})
 

module.exports = router;