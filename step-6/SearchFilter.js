function SearchFilter(data, config) {
	this.$el = $('<input/>');
	this.$el.attr({
		type: 'search',
		placeholder: 'find something...'
	});
	this.changeFn = config.change;
	this.prop = config.prop;
	this.val = '';
	this.attach();
}
// 'inherit' form Filter Obejct
SearchFilter.prototype = new Filter({}, {});
// fix the pointer to the constructor function
SearchFilter.prototype.constructor = SearchFilter;
// add/override functions
SearchFilter.prototype.attach = function () {
	this.$el.on('keyup', this.onSearch);
}
SearchFilter.prototype.compare = function(data) {
	return data[this.prop].indexOf(this.val) > -1;
}
SearchFilter.prototype.onSearch = function (ev) {
	this.val = ev.target.value;
	this.trigger('change', {
		prop: this.prop,
		val: ev.target.value,
		compareFn: this.compare.bind(this)
	})
}