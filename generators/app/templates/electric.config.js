'use strict';

var marble = require('marble');

module.exports = {
	metalComponents: ['electric-marble-components', 'electric-code-tabs'],
	sassOptions: {
		includePaths: ['node_modules', marble.src]
	},
	vendorSrc: ['node_modules/marble/build/fonts/**']
};
