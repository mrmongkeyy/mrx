module.exports = function(config){
	return `
		<div id=card>
			<div id=donatebutton class=button><span id=morebutton>DONATE</span></div>
			<div id=head>
				<div id=leftside>
					<span id=companyIcons class=button>
						<img src=/icons/banana id=companyIcons>
					</span>
					<span id=companyName>BananaStudio</span>
				</div>
				<div id=rightside>
					<div>
						<span class=button>
							<img src=/icons/user id=userbutton>
						</span>
						<span class=button>
							<img src=/icons/keys id=keysbutton>
						</span>	
						<span class=button>
							<img src=/icons/info id=infobutton>
						</span>
						<span class=button>
							<img src=/icons/more id=morebutton>
						</span>
					</div>
				</div>
			</div>
			<div id=body>
				<div id=output>
					<div>
						<div style=font-weight:bold; id=chattitle>-MRX<span id=copybutton class=button>
							<img src=/icons/copy id=copybutton>
						</span></div>
						<div id=text>
						</div>
					</div>	
				</div>
				<div id=input>
					<div style=font-weight:bold;text-align:center;>-YOU</div>
					<div id=inputC>
						<input placeholder="Type here..." id=theinput>
					</div>
					<div id=sendC>
						<span id=submitIcons class=button>
							<img src=/submitIcons id=buttonsubmit>
						</span>
					</div>
				</div>
			</div>
		</div>
	`;
}


