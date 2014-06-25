var $ = require('jquery');
var ItemView = require('./ItemView');

var ListView = function (model, id) {
	this.model = model;
	this.collection = this.model.items;
	this.views = {};
	this.$el = $(id);
	this.addActionsBar();
};

ListView.prototype = {
	addActionsBar: function(){
		this.$newTodo = this.$el.find('#new-todo');
		this.$el.find('#add-new').on('click', $.proxy(this.addNew, this));
		this.$el.find('#remove-todos').on('click', $.proxy(this.removeTodos, this));
	},

	addNew: function(ev){
		this.model.add(this.$newTodo.val());
		this.$newTodo.val('');
		this.renderItem(this.collection[this.collection.length - 1]);
	},

	removeTodos: function(ev){
		// since the collection can't remove an item
		// while in iteration, the id's of the checked
		// items are saved to be used later
		var removeItems = this.collection.map(function(item) {
			return item.isDone ? item.id : false;
		}, this);
		
		removeItems.forEach(function(id){
			if(id){
				this.views[id].remove();
				delete this.views[id];
				this.model.remove(id);
			}
		}, this);
	},

	render: function (items) {
		items = items || this.collection;
		// make sure to clean old views
		this.clear();
		// render all once again
		items.forEach(this.renderItem, this);
		return this.$el;
	},

	renderItem: function (itemModel) {
		this.views[itemModel.id] = new ItemView(itemModel);
		this.views[itemModel.id].$el.on('remove:todo', $.proxy(this.removeTodo, this));
		this.$el.append(this.views[itemModel.id].$el);
	},

	removeTodo: function(ev, data){
		this.model.remove(data.id);
	},

	clear: function() {
		for (var view in this.views){
			this.views[view].remove();
		}
		this.views = {};
	}
};

module.exports = ListView;