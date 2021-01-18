var mongoose = require('mongoose');

// require file-system so that we can load, read, require all of the model files
var fs = require('fs');
// connect to the database
mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://admin:password@ds141175.mlab.com:41175/gijoe');
mongoose.connect('mongodb://admin:password@gijoe-shard-00-00.po6jx.mongodb.net:27017,gijoe-shard-00-01.po6jx.mongodb.net:27017,gijoe-shard-00-02.po6jx.mongodb.net:27017/gijoe?ssl=true&replicaSet=atlas-ri5at9-shard-0&authSource=admin&retryWrites=true&w=majority');
// specify the path to all of the models
var models_path = __dirname + '/../models'
// read all of the files in the models_path and for each one check if it is a javascript file before requiring it
fs.readdirSync(models_path).forEach(function(file) {
  if(file.indexOf('.js') > 0) {
    require(models_path + '/' + file);
  }
})
