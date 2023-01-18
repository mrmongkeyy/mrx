module.exports = function(config){
	return `
		<div id=card>
			<div id=head>
				<div id=leftside>
					<span id=companyIcons class=button>
						<img src=/icons?nf=banana id=companyIcons>
					</span>
					<span id=companyName>BananaStudio</span>
				</div>
				<div id=rightside>
					<div>
						<span class=button>
							<img src=/icons?nf=user id=userbutton>
						</span>
						<span class=button>
							<img src=/icons?nf=key id=keysbutton>
						</span>	
						<span class=button>
							<img src=/icons?nf=info id=infobutton>
						</span>
						<span class=button>
							<img src=/icons?nf=more id=morebutton>
						</span>
					</div>
				</div>
			</div>
			<div id=body>
				<div id=output>
					<div>
						<div style=font-weight:bold; id=chattitle>MRX
							<span id=copybuttonspan>
								<img src=/icons?nf=copy id=copybutton>
								<img src=/icons?nf=reload id=reloadbutton>
								<img src=/icons?nf=skip id=skipbutton>
								<img src=/icons?nf=play id=playbutton>
							</span>
						</div>
						<div id=text>
						</div>
					</div>	
				</div>
				<div id=input>
					<div style=font-weight:bold;text-align:center;>YOU</div>
					<div id=inputC>
						<input placeholder="Type here..." id=theinput>
					</div>
					<div id=sendC>
						<span id=submitIcons class=button>
							<img src=/icons?nf=send id=buttonsubmit>
						</span>
					</div>
				</div>
			</div>
		</div>
	`;
}


