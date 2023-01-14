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
			res.send(views.page({title:'mrx--home',bodyId:'home',bodyConfig:{msg:'from mrx'}}));
		}
	},
	{
		methode:'get',
		address:'/logins',
		callback(req,res){
			res.send(views.page({title:'mrx--login',bodyId:'loginSystem'}));
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
		address:'/icons/more',
		callback(req,res){
			res.sendFile('/pages/media/icons/setting.png',{root:path.join(__dirname)},function(err){
				if(err)console.log(err);
			});
		}
	},
	{
		methode:'get',
		address:'/icons/keys',
		callback(req,res){
			res.sendFile('/pages/media/icons/key.png',{root:path.join(__dirname)},function(err){
				if(err)console.log(err);
			});
		}
	},
	{
		methode:'get',
		address:'/icons/user',
		callback(req,res){
			res.sendFile('/pages/media/icons/user.png',{root:path.join(__dirname)},function(err){
				if(err)console.log(err);
			});
		}
	},
	{
		methode:'get',
		address:'/icons/info',
		callback(req,res){
			res.sendFile('/pages/media/icons/info.png',{root:path.join(__dirname)},function(err){
				if(err)console.log(err);
			});
		}
	},
	{
		methode:'get',
		address:'/icons/banana',
		callback(req,res){
			res.sendFile('/pages/media/icons/banana.png',{root:path.join(__dirname)},function(err){
				if(err)console.log(err);
			});
		}
	},
	{
		methode:'get',
		address:'/submitIcons',
		callback(req,res){
			res.sendFile('/pages/media/icons/send.png',{root:path.join(__dirname)},function(err){
				if(err)console.log(err);
			});
		}
	},
	{
		methode:'get',
		address:'/icons/copy',
		callback(req,res){
			res.sendFile('/pages/media/icons/copy.png',{root:path.join(__dirname)},function(err){
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







