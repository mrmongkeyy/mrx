

const mrx = {
	settings:{
		timeInterval:100,
		displayMode:'alpha',//between words and alpha.
		aboutMSG:'MRX is a great app, actually far better than Brainly. Because MRX has good thinking abilities, I used an AI API in building it. You can do a lot of things, beginning from asking questions, chatting, consulting, and asking it to do other things. I have made good progress, and will keep improving- wait and see the results!',
		initMSG:'Helloworld!, this is MRX.',
	},
	init(){
		this.eventButton();
		this.processOutput(this.settings.initMSG);
	},
	ask(query){
		help.get(document,'#text').innerHTML = '<span>PleaseWait...</span>';
		req.post({url:'/ask',data:JSON.stringify({query}),onload(res){
			help.get(document,'#theinput').value = '';
			mrx.processOutput(res.target.responseText);
		}});
	},
	processOutput(value){
		if(this.processingOutput)return
		else this.processingOutput = true;
		help.get(document,'#text').innerHTML = '';
		this.listResponse = this.getOutputMode(value);
		let index = -1;
		this.intervalProcess = setInterval(function(){
			index++;
			if(index===mrx.listResponse.length){
				mrx.processingOutput = false;clearInterval(mrx.intervalProcess);return;
			}
			const span = help.makeElement('span');
			span.innerText = `${mrx.listResponse[index]}${(mrx.settings.displayMode=='words')?' ':''}`;
			help.get(document,'#text').appendChild(span);
			span.scrollIntoView();
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
	templ:{
		moreMenus(){
			return `
				<div>More<div>
			`;
		}
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
			},
			morebutton(){
				window.open(mrx.donationLink,'_blank');
			}
		};
		help.getall(document,'.button').forEach((y)=>{
			y.onclick = function(){
				x[this.children[0].id]();
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
			bound.appendChild(logindiv)
			help.get(document,'main').appendChild(bound);
			this.runGoogle();
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
			bound.appendChild(logindiv)
			help.get(document,'main').appendChild(bound);
		},
		handleCredentialResponse(response) {
		  mrx.login.response(response.credential);
		},
		runGoogle() {
		  google.accounts.id.initialize({
		    client_id: "948004097320-0ekokmae4mhm3l9aeph34r6kj9i65h1t.apps.googleusercontent.com",
		    callback: this.handleCredentialResponse
		  });
		  google.accounts.id.renderButton(
		    document.getElementById("buttonDiv"),
		    { theme: "outline", size: "large" }
		  );
		  google.accounts.id.prompt();
		}
	}
}
mrx.init();
