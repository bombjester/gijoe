var sending = require("./../controllers/controller.js");

module.exports = function(app){
	app.post('/adduser', function(req,res){
		sending.adduser(req,res);
	})
	app.post('/login', function(req,res){
		sending.login(req,res);
	})
	app.post('/updateinfo/:id', function(req,res){
		sending.updateinfo(req,res);
	})
	app.get('/getallusers', function(req,res){
		sending.getallusers(req,res);
	})
	
	
}