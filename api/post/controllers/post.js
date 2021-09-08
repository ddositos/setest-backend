'use strict';

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
		
	}
};
