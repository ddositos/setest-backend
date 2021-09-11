'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {

	async post(ctx){
		const { id: taskId } = ctx.params;
		const taskEntity = await strapi.services.task.findOne({ id: taskId });
		if(taskEntity === null)
			return null;

		let postEntity;
		try {
			postEntity = await strapi.services.task.createWallPost( taskId );
		}
		catch(error) {
			ctx.throw(502, error.message);
		}

		await strapi.services.post.create({
			post_id: postEntity.id,
			task: taskEntity.id
		});
		
		return {
			post_id: postEntity.id,
		};
	}

};
