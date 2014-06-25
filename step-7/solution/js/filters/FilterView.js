var $ = require('jquery');
var Filter = require('./Filter');

var FilterView = function (model) {
	this.model = new Filter(model);
	this.createEl();
	this.attach();
};

FilterView.prototype = {
	createEl: function(){
		this.$el = $('<button/>');
		this.$el.html(this.model.label);
	},

	attach: function () {
		this.$el.on('click', this.toggle.bind(this));
	},

	toggle: function () {
		this.model.toggle();
		this.$el.trigger('change', this.model);
	},

	on: function (ev, fn) {
		return this.$el.on(ev, fn);
	}
};

module.exports = FilterView;