const {Configuration,OpenAIApi} = require('openai');
const mrx = {
	async start(config){
		return this.ask(config.query);
	},
	async ask(msg){
		this.configuration = new Configuration({
			apiKey:process.env.mrxcikapikey//||require('./apikey').get(),
		});
		this.openAi = new OpenAIApi(this.configuration);
		this.response = await this.openAi.createCompletion({
			model: "text-davinci-003",
			prompt: msg,
			temperature: 1,
			max_tokens: 1024,
			top_p: 1,
			frequency_penalty: 0.0,
			presence_penalty: 0.0,
		});
		return this.response.data.choices[0].text.replace('\n\n','');
	}
}
module.exports = mrx;


