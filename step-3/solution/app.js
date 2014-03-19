var TodoApp = {
    list: function (items) {
        items.forEach(function(item){
            console.log('item:', item);
        });
    },

    filters: function (filters) {
        filters.forEach(function(filter){
            console.log('filter:', filter);
        });
    },
    
    // guid creator
    createGuid: function() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0,
                v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
};

// objects
TodoApp.TodoItem = function (description){
    this.id = TodoApp.createGuid();
    this.description = description;
    this.isDone = false;
    this.created = new Date();
}

TodoApp.TodoItem.prototype.done = function() {
    this.isDone = true;
}

TodoApp.TodoItem.prototype.setUndone = function() {
    this.isDone = false;
}

TodoApp.TodoList = function(items) {
    this.items = [];
    for (var i = 0; i < items.length; i++) {
        this.add(items[i].description);
    }
}

TodoApp.TodoList.prototype.add = function(description) {
    this.items.push(new TodoApp.TodoItem(description));
};

TodoApp.TodoList.prototype.remove = function(id) {
    var removedItem;
    for (var i = 0; i < this.items.length; i++) {
        if (this.items[i].id === id)
            removedItem = this.items.splice(i, 1);
    }
    return removedItem;
};

TodoApp.TodoList.prototype.archive = function(item) {
    for (var i = 0; i < this.items.length; i++) {
        if (this.items[i].id === item.id) {
            this.items[i].isArchived = true;
            return true;
        }
    }
    return false;
};

TodoApp.TodoList.prototype.isItemArchived = function(item) {
    return item.isArchived;
};

TodoApp.TodoList.prototype.getArchived = function() {
    return this.items.filter(this.isItemArchived);
}
// Todo Item View
TodoApp.ItemView = function (model) {
	this.model = model;
	this.createElement();
	this.attachEvents();
};
TodoApp.ItemView.prototype = {
	createElement: function(){
		this.el = this.make('div', {
			id: this.model.id,
			class: 'todo-item'
		});
		// create the input element
		this.input = this.make('input', {
			type: 'checkbox'
		}, this.model.description);
		this.el.appendChild(this.input);
		// create the description element
		this.el.appendChild(this.make('p', {}, this.model.description));
	},

	make: function(tag, attrs, html){
		// create dom element for this todo
	    // attach it to 'this' so it will public so
	    // it can be appended to any other element
	    var domAttrs = Object.keys(attrs);
	    var el = document.createElement(tag);
	    domAttrs.forEach(function(attr){
	    	el.setAttribute(attr, attrs[attr]);
	    }, this);
	    if (html) {
	    	el.innerHTML = html;
	    }
	    return el;
	},

	attachEvents: function(){
		var todo = this;
		// the function here creates a closure to the todo
	    // variable which is a reference to "this" context
	    // later, the onItemCheck event handler is invoked
	    // in the context of the "this"
	    this.input.addEventListener('click', function(ev) {
	        todo.onItemCheck.call(todo, ev);
	    });
	},

	onItemCheck: function(ev) {
	    this.model.isDone = ev.target.checked;
	    if (this.model.isDone) {
	        this.el.classList.add('done');
	    } else {
	        this.el.classList.remove('done');
	    }
	}
};

// Todo List View
TodoApp.ListView = function (model) {
	this.model = model;
	this.collection = this.model.items;
	this.el = document.createElement('div');
};

TodoApp.ListView.prototype = {
	render: function () {
		// make sure this.el is empty
		this.el.innerHTML = '';
		// render all once again
		this.collection.forEach(this.renderItem, this);
		return this.el;
	},

	renderItem: function (itemModel) {
		var view = new TodoApp.ItemView(itemModel);
		this.el.appendChild(view.el);
	}
};