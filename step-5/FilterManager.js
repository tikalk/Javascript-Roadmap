function FiltersManager (config) {
	this.$el = $('<div/>');
	this.filters = config.filters;
	this.createFilters(config.filters);
}
FiltersManager.prototype = {
	createFilters: function (filters) {
		this.filters = filters.map(function(filter){
			return new Filter(filter);
		});
	},
	render: function () {
		this.$el.append(filters.map(function(filter){
			return filter.$el;
		}));
	}
};