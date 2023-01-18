const template = {
	login(){
		return `
      <div style=font-weight:bold;margin-bottom:15px;>MRX Login Mode</div>
    	<div id="buttonDiv"></div>
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
						<input type=number max=1000 min=0 step=100 value=${config.timeInterval} id=timeintervalvalue>
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
