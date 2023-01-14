const {Configuration,OpenAIApi} = require('openai');
const mrx = {
	async start(config){
		return this.ask(config.query);
	},
	async ask(msg){
		this.configuration = new Configuration({
			apiKey:process.env.OPENAI_API_KEY||'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',
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


