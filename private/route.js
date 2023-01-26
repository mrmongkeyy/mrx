const views = require('./views');
const path = require('path');
const login = require('./login');
const cika = require('./engine/cika');
//const style = require('./pages/style');
const route = [
	{
		methode:'get',
		address:'/',
		callback(req,res){
			res.send(views.page({title:'MrX by bananastudio',bodyId:'home',bodyConfig:{msg:'from mrx'}}));
		}
	},
	{
		//sending styling file.
		methode:'get',
		address:'/style',
		callback(req,res){
			res.sendFile('/pages/style.css',{root:path.join(__dirname)},function(err){
				if(err)console.log(err);
			});
		}
	},
	{
		//sending styling file.
		methode:'get',
		address:'/script/module',
		callback(req,res){
			res.sendFile('/pages/module.js',{root:path.join(__dirname)},function(err){
				if(err)console.log(err);
			});
		}
	},
	{
		//sending styling file.
		methode:'get',
		address:'/script/googole',
		callback(req,res){
			res.sendFile('/pages/googole.js',{root:path.join(__dirname)},function(err){
				if(err)console.log(err);
			});
		}
	},
	{
		//sending styling file.
		methode:'get',
		address:'/script/app',
		callback(req,res){
			res.sendFile('/pages/app.js',{root:path.join(__dirname)},function(err){
				if(err)console.log(err);
			});
		}
	},
	{
		methode:'post',
		address:'/ask',
		callback(req,res){
			req.on('data',async (data)=>{
				const response = await cika.start({interface:'app',query:JSON.parse(data.toString()).query});
				res.send(response);
				//res.send('helloworld');
			});
		}
	},
	{
		methode:'get',
		address:'/icons',
		callback(req,res){
			res.sendFile(`/pages/media/icons/${req.query.nf}.png`,{root:path.join(__dirname)},function(err){
				if(err)console.log(err);
			});
		}
	},
	{
		methode:'get',
		address:'/script/template',
		callback(req,res){
			res.sendFile('/pages/template.js',{root:path.join(__dirname)},function(err){
				if(err)console.log(err);
			});
		}
	},
	{
		methode:'post',
		address:'/login',
		callback(req,res){
			req.on('data',async (data)=>{
				login(JSON.parse(data.toString()),res);
			})
		}
	}
];
module.exports=route;







