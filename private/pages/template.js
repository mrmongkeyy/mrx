const template = {
	initPops(){
		return `
			<div id=msg>JANGAN LUPA DONASI!<br>BANTU PROJECT INI TETAP HIDUP!<br><small>MrMongkeyy from BananaStudio.</small></div>
			<div id=buttons>
				<div id=donate>
					<span>DONATE</span>
				</div>
				<div id=close>
					<span>CLOSE</span>
				</div>
			</div>
		`	
	},
	login(){
		return `
      <div style=font-weight:bold;margin-bottom:15px;>MRX Login Mode</div>
    	<div id=buttons style=text-align:center;margin-top:10px;>
		<div id=googlebutton></div>
    		<div id=close><span style=background:yellow;color:black;padding:5px;border-radius:10px;cursor:pointer;>close</span></div>
    	</div>
		`;
	},
	showLogin(config){
		return `
			<div id=showprofile>
			<div id=ppc>
				<span>
					<img src=${config.profilesrc}>
				</span>
			</div>
			<div>${config.userName}</div>
			<div>
				<div id=lgtbutton>LogOut</div>
			</div>
		`;
	},
	showKeys(config){
		return `<div>You have ${config.queryL} queries left.</div>`;
	},
	moreoptions(config){
		return `
			<div>OPTIONS</div>
			<div id=bodyoptions>
				<div>
					<div>DisplayMode:</div>
					<div>
						<input placeholder=alpha/words value=${config.displayMode} id=displaymodevalue>
					</div>
				</div>
				<div>
					<div>Display Interval:</div>
					<div>
						<input type=number max=1000 min=50 step=10 value=${config.timeInterval} id=timeintervalvalue>
					</div>
				</div>
			</div>
			<div id=buttons>
				<div>
					<span id=savebutton>save</span>
				</div>
				<div>
					<span id=closebutton>close</span>
				</div>
			</div>
		`;
	}
}
