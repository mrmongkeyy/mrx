const home = require('./pages/home');
const loginSystem = require('./pages/loginsystem');
const views = {
	home,
	loginSystem,
	page(config){
		return `
			<html>
				<head>
					<title>${config.title}</title>
					<meta name=viewport content=width=device-width,initial-scale=1>
					<link rel=stylesheet href=/style>
					<script src="https://accounts.google.com/gsi/client" async defer></script>
					<link rel="icon" href="/icons?nf=brain" type="image/icon type">
				</head>
				<body><main>${this[config.bodyId](config.bodyConfig)}</main></body>
				<script src=/script/module></script>
				<script src=/script/template></script>
				<script src=/script/googole></script>
				<script src=/script/app></script>
			</html>
		`;
	}
}
module.exports=views;
