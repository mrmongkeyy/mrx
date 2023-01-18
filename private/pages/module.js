//make some functions, here. to help us in the future.

const help = {
	get(doc,p){
		const el = doc.querySelector(p);
		this.inject(el);
		return el;
	},
	getall(doc,p){
		const els = doc.querySelectorAll(p);
		els.forEach((el)=>{
			this.inject(el);
		})
		return els;
	},
	makeBound(p){
		const el = this.makeElement(p);
		el.className = 'bound';
		//el.onclick = el.remove;
		return el;
	},
	makeElement(p){
		const el = document.createElement(p);
		this.inject(el);
		return el;
	},
	inject(el){
		if(!el)return
		if(this.isInjected(el))return
		const dfunctions = {
			find(p){
				return help.get(this,p);
			},
			findall(p){
				return help.getall(this,p);
			},
			getValue(){
				const value = this.value;
				this.value = '';
				return value;
			},delete(){
				console.log(this);
				this.remove();
			},
			injected:true
		}
		for(let i in dfunctions)el[i]=dfunctions[i];
	},
	isInjected(el){
		return el.injected === true;
	},
	isIn(src,value,p){
		const x = {
			array(){
				return this.arrString();
			},
			string(){
				return this.arrString();
			},
			object(){
				return p in src;
			},
			arrString(){
				for(let j of src){
					if(j===value)return true;
				}
				return false;
			}
		}
		return x[p]();
	},
	remove:{
		array(config){
			const x = [];
			config.src.forEach((data)=>{
				if(data!==config.value)x.push(data);
			})
			return x;
		}
	},
	guID(config){
		config = config||{len:8,sid:'1234567890'};
		let id = '';
		for(let i=0;i<config.len;i++){
			id += config.sid[Math.floor(Math.random()*config.sid.length)];
		}
		return id;
	},
	storage(config,set){
		if(set){
			localStorage[config.dbName] = config.value;
			return true;
		}
		return JSON.parse(localStorage[config.dbName]);
	},
	net:{
		reQ:{
			post(config){
				config.methode = 'post';
				this.init(config);
			},
			get(config){
				config.methode = 'get';
				this.init(config);
			},
			init(config){
				this.x = new XMLHttpRequest();
				this.x.open(config.methode,config.url);
				this.x.setRequestHeader('Content-Type','application/json');
				this.x.onload = config.onload;
				this.x.send(config.data);
			}
		}
	}
}
const req = help.net.reQ;




