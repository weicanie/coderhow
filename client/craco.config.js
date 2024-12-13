const path = require('path');
const CracoLessPlugin = require('craco-less');
const resolve = pathname => path.resolve(__dirname, pathname);

module.exports = {
	plugins: [
		{
			plugin: CracoLessPlugin
		}
	],
	webpack: {
		alias: {
			'@': resolve('src'),
			components: resolve('src/components'),
			services: resolve('src/services'),
			utils: resolve('src/utils'),
			assets: resolve('src/assets'),
			views: resolve('views')
		}
	}
};
