
//define the object.
const mrx = {
	settings:{
		timeInterval:50,//[50,1000].
		displayMode:'alpha',//between words and alpha.
		aboutMSG:'MRX is a great app, actually far better than Brainly. Because MRX has good thinking abilities, I used an AI API in building it. You can do a lot of things, beginning from asking questions, chatting, consulting, and asking it to do other things. I have made good progress, and will keep improving- wait and see the results!',
		initMSG:'Helloworld!, this is MRX. Currently in development!',
	},
	init(){
		this.eventButton();
		this.popups.show({el:'main',innerHTML:template.initPops(),callback(){
				help.get(this,'#donate span').onclick = function(){
					window.open(mrx.donationLink,'_blank');
				}
				help.get(this,'#close span').onclick = function(){
					help.get(document,'.bound').remove();
				}
				mrx.processOutput(mrx.settings.initMSG);
			}
		});
	},
	ask(query){
		if(this.processingOutput)this.reqskip=true;
		help.get(document,'#text').innerHTML = '<span>PleaseWait...</span>';
		req.post({url:'/ask',data:JSON.stringify({query}),onload(res){
			help.get(document,'#theinput').value = '';
			mrx.processOutput(res.target.responseText);
		}});
	},
	reqreload:false,
	reqpaused:false,
	reqskip:false,
	processOutput(value){
		if(this.processingOutput)return
		else this.processingOutput = true;
		help.get(document,'#text').innerHTML = '';
		this.listResponse = this.getOutputMode(value);
		let index = 0;
		help.get(document,'#playbutton').src = '/icons?nf=pause';
		this.intervalProcess = setInterval(function(){
			if(mrx.reqpaused)return
			if(index===mrx.listResponse.length || mrx.reqreload){
				mrx.processingOutput = false;
				clearInterval(mrx.intervalProcess);
				if(mrx.reqreload){
					mrx.reqreload = false;
					mrx.processOutput(mrx.settings.initMSG);
				}
				help.get(document,'#playbutton').src = '/icons?nf=play';
				return;
			}
			let len = 1;
			if(mrx.reqskip){
					len = mrx.listResponse.length-index;
			}
			for(let i=0;i<len;i++){
				const span = help.makeElement('span');
				span.innerText = `${mrx.listResponse[index]}${(mrx.settings.displayMode=='words')?' ':''}`;
				help.get(document,'#text').appendChild(span);
				span.scrollIntoView();
				index++;
				if(i==len-1)mrx.reqskip = false;
			}
		},mrx.settings.timeInterval)//in ms.
	},
	forceOffline(){
		this.processOutput('Opps, please check back you internet connection!');
		return;
	},
	getOutputMode(value){
		if(this.settings.displayMode==='alpha')return value.split('');
		return value.split(' ');
	},
	showPopMenus(){
		const bound = help.makeElement('div');
		bound.className = 'bound';
		const pops = help.makeElement('div');
		pops.id = 'popsMenu';
		pops.innerHTML = mrx.templ.moreMenus();
		bound.appendChild(pops);
		help.get(document,'main').appendChild(bound);
	},
	eventButton(){
		const x = {
			userbutton(){
				if(!mrx.login.info)mrx.login.ask();
				else mrx.login.show();
			},
			keysbutton(){
				if(!mrx.login.info)mrx.login.ask();
				else mrx.login.showKeysLeft();
			},
			infobutton(){
				mrx.processOutput(mrx.settings.aboutMSG);
			},
			companyIcons(){
				console.log('icons');
			},
			buttonsubmit(){
				if(!navigator.onLine)mrx.forceOffline();
				else mrx.ask(help.get(document,'#theinput').value);
			},
			copybutton(){
				navigator.clipboard.writeText(help.get(document,'#text').innerText);
				mrx.popups.show({el:'main',innerHTML:'Teks disalin!<br><small>Klik untuk menutup</small>',callback(){
					//this.onclick = this.parentNode.remove;
					this.onclick = ()=>{
						this.parentNode.remove();
					}
				}});
			},
			//ontest.
			reloadbutton(){
				if(mrx.processingOutput)mrx.reqreload = true;
			},
			skipbutton(){
				if(mrx.processingOutput)mrx.reqskip = true;
			},
			playbutton(el){
				if(mrx.processingOutput){
					el.src = `/icons?nf=${(mrx.reqpaused)?'pause':'play'}`;
					mrx.reqpaused = !mrx.reqpaused;
				}
			},
			morebutton(){
				mrx.popups.show({el:'main',innerHTML:template.moreoptions(mrx.settings),
				callback(){
					help.get(this,'#savebutton').onclick=()=>{
						mrx.settings.timeInterval = help.get(this,'#timeintervalvalue').value;
						mrx.settings.displayMode = help.get(this,'#displaymodevalue').value;
						help.get(this,'#closebutton').click();
					}
					help.get(this,'#closebutton').onclick=()=>{
						this.parentNode.remove();
					}
				}
				});
			}
		};
		help.getall(document,'.button').forEach((y)=>{
			y.onclick = function(){
				x[this.children[0].id]();
			}
		});
		help.getall(document,'#copybuttonspan img').forEach((y)=>{
			y.onclick = function(){
				if(x[this.id])x[this.id](this);
				else mrx.popups.show({el:'main',innerHTML:`<bold>Comming soon!</bold>`});
			}
		});
	},
	login:{
		response(jwt){	
			help.net.reQ.post({url:'/login',data:JSON.stringify({jwt}),onload(res){
				mrx.login.info = JSON.parse(res.target.responseText);
				help.get(document,'#bound-loginMode').remove();
			}});
		},
		ask(){
			const bound = help.makeBound('div');
			bound.id = 'bound-loginMode';
			const logindiv = help.makeElement('div');
			logindiv.id = 'logincard';
			logindiv.innerHTML = template.login();
			bound.appendChild(logindiv);
			logindiv.find('div#close').onclick = ()=>{bound.remove()}
			help.get(document,'main').appendChild(bound);
			if(navigator.onLine)this.runGoogle();
		},
		show(){
			const bound = help.makeBound('div');
			bound.id = 'bound-loginMode';
			const logindiv = help.makeElement('div');
			logindiv.id = 'logincard';
			logindiv.innerHTML = template.showLogin(this.info);
			bound.appendChild(logindiv)
			help.get(document,'main').appendChild(bound);
		},
		showKeysLeft(){
			const bound = help.makeBound('div');
			bound.id = 'bound-loginMode';
			const logindiv = help.makeElement('div');
			logindiv.id = 'logincard';
			logindiv.innerHTML = template.showKeys(this.info);
			bound.appendChild(logindiv);
			help.get(document,'main').appendChild(bound);
		},
		handleCredentialResponse(response) {
		  mrx.login.response(response.credential);
		},
		runGoogle() {
		  google.accounts.id.initialize({
		    client_id: googole.getClientId(),
		    callback: this.handleCredentialResponse
		  });
		  google.accounts.id.renderButton(
		    document.getElementById("buttonDiv"),
		    { theme: "outline", size: "large" }
		  );
		  google.accounts.id.prompt();
		}
	},
	donationLink:'https://saweria.co/mrmongkeyy',
	popups:{
		show(config){
			const bound = help.makeBound('div');
			const div = help.makeElement('div');
			div.id = 'POPup';
			div.innerHTML = config.innerHTML;
			if(config.callback){
				div.callback = config.callback;
				div.callback();
			}
			bound.appendChild(div);
			help.get(document,config.el).appendChild(bound);
		}
	}
}
mrx.init();
