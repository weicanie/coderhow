const fs = require('fs');

function registerRouters(app) {
	const files = fs.readdirSync(__dirname);

	for (const file of files) {
		if (!file.endsWith('.router.js')) continue;
		const router = require(`./${file}`);
		try {
			app.use(router.routes());
			app.use(router.allowedMethods());
		} catch (error) {
			console.log('error', file);
		}
	}
}

module.exports = registerRouters;
