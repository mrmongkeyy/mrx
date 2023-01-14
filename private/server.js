const express = require('express');
const routes = require('./route');
module.exports = function(){
	const app = express();
	routes.forEach((route)=>{
		app[route.methode](route.address,route.callback);
	})
	app.listen(process.env.PORT||8080,()=>console.log('listening on port 3000'));
	return app;
}
