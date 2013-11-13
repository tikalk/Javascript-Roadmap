function Filter (config) {
	this.$el = $('<button/>');
	this.displayLabel = config.label;
	this._on = false;
}
Filter.prototype = {
	attach: function () {
		this.$el.on('click', $.proxy(this.toggle, this));
	},

	toggle: function() {
		this._on = !this._on;
		this.$el.toggleClass('filter-on', this._on);
		this.trigger('change', this._on);
	},

	trigger: function(ev, data) {
		this.config.call(ev, data)
	},

	render: function () {
		this.$el.html(this.displayLabel);
	}
};