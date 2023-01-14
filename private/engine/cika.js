const {Configuration,OpenAIApi} = require('openai');
const readline = require('readline');
readline.cursorTo(process.stdout,0,0);
readline.clearScreenDown(process.stdout);
const mrx = {
	async start(config){
		this.interface = config.interface;
		if(this.interface==='console'){
			if(!this.readlineI){
				this.readlineI = readline.createInterface(
					{input:process.stdin,output:process.stdout}
				);
			}
			this.readlineI.question('you>>  ',async (data)=>{
				if(data==='.stop')this.readlineI.close();
				else{
					readline.cursorTo(process.stdout,0,0)
					readline.clearScreenDown(process.stdout);
					await mrx.ask(data);
				}
			});
		}else if(this.interface==='app'){
			return this.ask(config.query);
		}
	},
	async ask(msg){
		this.configuration = new Configuration({
			apiKey:process.env.OPENAI_API_KEY
		});
		this.openAi = new OpenAIApi(this.configuration);
		this.response = await this.openAi.createCompletion({
			model: "text-davinci-003",
			prompt: msg,
			temperature: 1,
			max_tokens: 512,
			top_p: 1,
			frequency_penalty: 0.0,
			presence_penalty: 0.0,
		});
		if(this.interface==='app')return this.response.data.choices[0].text.replace('\n\n','');
		console.log(`mrx>> ${this.response.data.choices[0].text.slice(2,this.response.data.choices[0].text.length)}`);
		//console.log(`mrx>> ${JSON.stringify(this.response.data.choices[0])}`);
		this.start({interface:this.interface})
	}
}
module.exports = mrx;


