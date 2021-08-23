'use strict';

const { sanitizeEntity } = require('strapi-utils');

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {

	async post(ctx){
		const { id } = ctx.params;
		const taskEntity = await strapi.services.task.findOne({ id });
		if(taskEntity === null)
			return null;
		const task = sanitizeEntity(taskEntity, { model: strapi.models.task});
		let postId;
		try {
			const imageDataUrl = await strapi.services.task.getTaskImage(task);
			const body = { imageDataUrl };
			postId = await strapi.services.task.createWallPost(body);
		}
		catch(error) {
			ctx.throw(502, error.message);
		}

		await strapi.services.post.create({
			post_id: postId,
			task: task.id
		});
		
		return {
			post_id: postId,
		};
	}

};
