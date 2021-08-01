'use strict';

const { default: axios } = require("axios");


/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-services)
 * to customize this service
 */

module.exports = {
	async getTaskImage(task){
		const { question, code, annotation } = task;
		let response;
		try {
			response = await axios.post(process.env.TASK_RENDERER_URL + '/task',{
				question, 
				code,
				annotation,
			},{
				responseType: 'arraybuffer',
			});
		}
		catch(error) {
			throw new Error("Image renderer server error. " + error.message);
		}

		return response.data.toString("base64");
	},

	async createWallPost(body){
		let response;
		try {
			response = await axios.post(process.env.VK_BOT_URL + '/post', body);
		}
		catch(error) {
			throw new Error("VK bot server error. " + error.message);
		}
		if(!response.data || !response.data.post_id)
			throw new Error("VK bot server didn't return post_id.");

		return response.data.post_id;
	},
};
