const fs = require('fs');
module.exports = async function(jwt,res){
	//return 'hello';
	const datafrom = JSON.parse(Buffer.from(jwt.jwt.split('.')[1], 'base64').toString());
	//console.log(datafrom);
	const path = `././base/users/${datafrom.given_name+datafrom.email}.mrx`;
	const openFile = async function(){
		fs.readFile(path,(err,data)=>{
			if(err && err.code==='ENOENT'){
				fs.writeFile(path,JSON.stringify({queryL:10}),(err,data)=>{
					if(err)throw err;
					openFile();
				})
			}else{
				res.send(JSON.stringify({profilesrc:datafrom.picture,userName:datafrom.given_name+datafrom.email,queryL:JSON.parse(data).queryL}));
			}
		})
	}
	openFile();
}
