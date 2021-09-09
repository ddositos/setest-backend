'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-services)
 * to customize this service
 */

function getTodayDate(){
	const today = new Date(Date.now());

	today.setHours(0);
	today.setMinutes(0);
	today.setSeconds(0);
	today.setMilliseconds(0);

	// Today 00:00:00.
	return today;
}

module.exports = {
	async todayPosted(){
		const today = getTodayDate();
		return await strapi.query("post").count({created_at_gt: today.toISOString()});
	}

};
