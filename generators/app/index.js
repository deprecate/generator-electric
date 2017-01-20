'use strict';

var _ = require('lodash');
var chalk = require('chalk');
var updateNotifier = require('update-notifier');
var yeoman = require('yeoman-generator');

module.exports = yeoman.Base.extend({
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
		this._prompt();
	},

	configuring: function() {
		this.destinationRoot(this.projectId);
	},

	writing: {
		app: function() {
			this.template('package.json', 'package.json', this);
			this.template('gulpfile.js', 'gulpfile.js', this);
			this.fs.copy(this.templatePath('gitignore'), this.destinationPath('.gitignore'));
		},

		projectfiles: function() {
			this.fs.copy(this.templatePath('src'), this.destinationPath('src'));

			this.template('src/site.json', 'src/site.json', this);
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

	_afterPrompt: function(done, props) {
		_.assign(this, props);

		this.gitName = this.user.git.name();

		done();
	},

	_getPrompts: function() {
		var prompts = [
			{
				default: 'My Site',
				message: 'What would you like to call your project?',
				name: 'projectName',
				type: 'input'
			},
			{
				default: function(answers) {
					return _.kebabCase(_.deburr(answers.projectName || ''));
				},
				message: 'Would you like to use this as the project id? (determines folder name)',
				name: 'projectId',
				type: 'input'
			}
		];

		return prompts;
	},

	_prompt: function() {
		var done = this.async();

		this.prompt(this._getPrompts())
			.then(this._afterPrompt.bind(this, done));
	}
});
