function Filter (data, config) {
	this.$el = $('<button/>');
	this.displayLabel = data.label;
	this.prop = data.prop;
	this.val = data.val;
	this._on = false;
	this.changeFn = config.change;
	this.attach();
	this.render();
}
Filter.prototype = {
	attach: function () {
		this.$el.on('click', $.proxy(this.toggle, this));
	},

	toggle: function() {
		this._on = !this._on;
		this.$el.toggleClass('filter-on', this._on);
		this.trigger('change', {
			prop: this.prop,
			val: this.val
		});
	},

	trigger: function(ev, data) {
		this.changeFn.call(null, ev, data)
	},

	render: function () {
		this.$el.html(this.displayLabel);
	}
};