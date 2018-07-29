const express = require('express');
const app = express();
app.use(express.static(__dirname + '/public'));
app.set('port',(process.env.PORT || 5000))
var Database=require('nedb')
app.set('view engine','ejs')
var db=new Database({filename:'store.db',autoload:true});

app.get('/',function(req,res){
	res.sendFile(__dirname+'/public/1.html')
})
app.get('/login',function(req,res){
	res.sendFile(__dirname+'/public/login.html')
})
app.get('/form',function(req,res){
	//res.send('successfull'+req.query.email+'successfull'+req.query.password)
	var a={
		'Username':req.query.username,
		'Password':req.query.password,
		'Email':req.query.email,
		'Name':req.query.name
	}
	db.insert(a,function(err,newDoc){
		res.sendFile(__dirname+'/public/login.html')
	})
	
})
app.get('/submit',function(req,res){
	db.find({'Email':req.query.email,'Password':req.query.password},function(err,result){
		if(result.length>0){
			db.find({}, function (err, result1) {
     			var a=[{
    				'Email':req.query.email,
    				'Username':req.query.username,
    				'Name':req.query.name,
    				'Password':req.query.password
  				}]
       			db.find({},function(err,result){
     				res.render('home',{result:result});
   				})
       		})
		}
		else{
			res.send('Username & Password wrong please try again')
		}
	})
})
app.get('/profile',function(req,res){
	var a=[{
		'Email':req.params.email,
    	'Username':req.params.username,
    	'Name':req.params.name,
    	'Password':req.params.password
	}]
	res.render('1',{a})
})
app.listen(app.get('port'), function () {
})