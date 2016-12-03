'use strict';

var chalk = require('chalk');
var minimist = require('minimist');
var path = require('path');
var updateNotifier = require('update-notifier');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
	initializing: function() {
		var pkg = require('../../package.json');

		this.pkg = pkg;

		var notifier = updateNotifier({
			pkg: pkg,
			updateCheckInterval: 1000 * 60 * 60 * 12
		});

		notifier.notify();
	},

	prompting: function() {
		// Have Yeoman greet the user.
		this.log(yosay(this._yosay));

		this._prompt();
	},

	configuring: function() {
		//
	},

	writing: {
		app: function() {
			this.template('_package.json', 'package.json', this);

			this.fs.copy(this.templatePath('gitignore'), this.destinationPath('.gitignore'));

			this.template('gulpfile.js', 'gulpfile.js', this);
		},

		projectfiles: function() {

		}
	},

	install: function() {
		var skipInstall = this.options['skip-install'];

		if (!skipInstall) {
			this.installDependencies({
				bower: false
			});
		}
	},

	_prompt: function() {

	},

	_yosay: 'Welcome to the splendid ' + chalk.red('Metal SSG') + ' generator!'
});