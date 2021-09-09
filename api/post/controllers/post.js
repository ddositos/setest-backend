'use strict';

const { sanitizeEntity } = require('strapi-utils');

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
	async answer(ctx){
		
		const { id } = ctx.params;
		const post = await strapi.services.post.findOne({ post_id: id });
		if(post === null)
			return null;
		
		if(post.task === undefined || post.task === null)
			ctx.throw(410, "Task attached to post was deleted.");

		return {
			answer: post.task.answer,
		};
		
	},

	async createDaily(ctx){
		
		//if( await strapi.services.post.todayPosted() != 0)
			//ctx.throw(400, "Post was already created today.");
			
		const task = await strapi.query("task").findOne({ posted : false });
		
		if(task === null)
			ctx.throw(404, "No tasks available");

		let postIdObject;
		try {
			postIdObject = await strapi.services.task.createWallPost(task.id);
		}
		catch(err){
			ctx.throw(502, err.message);
		}

		return postIdObject;
	}
};
