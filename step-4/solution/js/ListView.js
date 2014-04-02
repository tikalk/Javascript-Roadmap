TodoApp.ListView = function (model) {
	this.model = model;
	this.collection = this.model.items;
	this.$el = $('<div/>');
};

TodoApp.ListView.prototype = {
	render: function () {
		// make sure this.el is empty
		this.$el.innerHTML = '';
		// render all once again
		this.collection.forEach(this.renderItem, this);
		return this.$el;
	},

	renderItem: function (itemModel) {
		var view = new TodoApp.ItemView(itemModel);
		this.$el.append(view.$el);
	}
};