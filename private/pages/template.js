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
	}
}
