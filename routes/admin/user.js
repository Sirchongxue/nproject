var express = require('express');

var router = express.Router();


router.get('/',function(req,res){
	res.send('user page ')
})

router.post('/add',function(req,res){
	
})



module.exports = router;