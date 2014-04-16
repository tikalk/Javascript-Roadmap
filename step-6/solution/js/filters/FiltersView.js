TodoApp.FiltersView = function (filters, id) {
	this.$el = $(id);
	this.filters = filters;
	this.render();
}
TodoApp.FiltersView.prototype = {

	render: function () {
		this.views = {};
		this.filters.forEach(function(filter, i){
			this.views[i] = new TodoApp.FilterView(filter);
			this.$el.append(this.views[i].$el);
		}, this);
	},

	on: function (ev, fn) {
		return this.$el.on(ev, fn);
	}
};