var hashandsalt = require('password-hash-and-salt');

var mongoose = require('mongoose');
var Userstable = mongoose.model('users');

module.exports = (function() {
	return{
		adduser: function(req,res){

			hashandsalt(req.body.password).hash(function(error, hash){
				if (error){
					console.log("error making password");
				}
				if(/^[a-zA-Z0-9]*$/.test(req.body.username) != true){
					
					res.json("special");
				}
						
				else{
					
					var hashit = hash;
					var copy = req.body.username;
					var lowercase = copy.toLowerCase();
						
					var insert = new Userstable ({
						username: lowercase, 
						password: hashit, 
						admin: "False", 
						address:{
							street: "not set", 
							city: "not set", 
							state: "not set", 
							zip: "not set"
						},
						email:"Not set",
						phone:"Not set",
						hours:0
					});
					insert.save(function(err,result){
						
						if (err){
							console.log(err);
							//console.log(err);
							if (err.code === 11000){
							res.json("samename");
							}
						}
						else{
							res.json("Success Signing in");
						}
					})
						
				}

			})
			
			
			
		},

		login: function(req,res){
			Userstable.findOne({username:req.body.username}, function (err, result){
				
				if (err){
					console.log("Error pulling  name from db" );
				}
				else {

					if (result == null){

						res.json("cant find user");
						//console.log("cant find user");
					}
					else{
					 	hashandsalt(req.body.password).verifyAgainst(result.password, function(error, verified){

							if(verified == true){
								
								var cookie = {_id:result._id, username:result.username, admin:result.admin}
								res.json(cookie);
							}
							else{
								
								res.json("password wrong");
							}

						})
		
					}				
				}
			})
		},

		updateinfo: function (req,res){
			req.body.number = req.body.number.replace(/\D/g,'');
			req.params.id = req.params.id.replace(/['"]+/g, '');
			console.log(req.body);
			console.log(req.params.id);
			Userstable.update({_id: req.params.id},{$set: {email:req.body.email,address:[{street:req.body.street, city:req.body.city, state:req.body.state, zip:req.body.zip}], phone:req.body.number }}, function(error, result){


				if (error){
					console.log(error);
				}
				else{
					res.json();
				}

			})


		},

		getallusers: function(req,res){
			var format = [];
			var object = {};
			Userstable.find({admin:"False"}, function(error, result){
				if (error){
					console.log("error pulling users");
				}
				else{
					//formatting to not send password to client side
					for (users in result){
						
						object = {
							username:result[users].username,
							email:result[users].email,
							address:result[users].address,
							phone:result[users].phone,
							hours:result[users].hours

						};
						format.push(object);
					}
					res.json(format);
				}
			})
		},





		



	}//return bracket	
})();