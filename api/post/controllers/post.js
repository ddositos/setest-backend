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
		
		// TODO: check case if task was deleted after the post was created.
		// TODO: ( post.task === undefined|null )

		return {
			answer: post.task.answer,
		};
		
	}
};
