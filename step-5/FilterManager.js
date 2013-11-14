function FiltersManager (config) {
	this.$el = $('<div/>');
	this.filters = config.filters;
	this.filterCallback = config.filter;
	this.createFilters(config.filters);
	this.render();
	this.$el.appendTo(config.target);
}
FiltersManager.prototype = {
	createFilters: function (filters) {
		this.filters = filters.map(this.createFilter, this);
	},
	createFilter: function (filter) {
		return new Filter(filter, {
			change: this.onFilterChange.bind(this)
		});
	}, 
	onFilterChange: function (ev, data) {
		this.filterCallback.call(this, data);
	}, 
	render: function () {
		this.$el.append(this.filters.map(function(filter){
			return filter.$el;
		}));
	},
	addFilter: function(filterType, config) {
		var filter = new filterType(config.data || '', {
			change: this.onFilterChange.bind(this),
			prop: config.prop
		});
		this.filters.push(filter);
		this.$el.append(filter.$el);
	}
};