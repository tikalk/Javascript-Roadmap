// A TodoList module displays a list of todo items
function TodoList(items, config) {
    this.items = [];
    this.$el = $('<div/>');
    // configure add object
    this.addItems(items);
    this.createAdd(config.add);
    this.render();
    if (config.target) {
        this.$el.appendTo(config.target);
    }
}
TodoList.prototype.createAdd = function(selector) {
    this.$add = $(selector);
    this.$addInput = this.$add.find('input');
    this.$add.on('submit', $.proxy(this.handleAdd, this));
};
TodoList.prototype.handleAdd = function(ev){
    // need to prevent deafult action of submition of the form
    // so the page won't refresh
    ev.preventDefault();
    var newTodo = this.$addInput.val();
    if (newTodo) {
        this.add({ description: newTodo });
        this.renderItem(this.items[this.items.length - 1]);
        // clear the new todo from the input
        this.$addInput.val("");
    }
}
TodoList.prototype.render = function(filter) {
    // first - remove all items
    this.items.forEach(function(item){
        item.hide();
    });
    // second - render the relevant items
    for (var i = 0; i < this.items.length; i++) {
        // filter if present
        if (filter && filter.prop !== false) {
            if (filter.compareFn && filter.compareFn(this.items[i])) {
                this.renderItem(this.items[i]);
            }
            else if (this.items[i][filter.prop] === filter.val) {
                this.renderItem(this.items[i]);
            }
        } else {
            this.renderItem(this.items[i]);
        }
    };
}
TodoList.prototype.renderItem = function(item) {
    item.$el.appendTo(this.$el);
    item.show();
}
TodoList.prototype.addItems = function(items) {
    for (var i = 0; i < items.length; i++) {
        this.add(items[i], i);
    }
}
TodoList.prototype.add = function(item, i) {
    var index = i;
    if (!index) {
        index = this.items.length;
    }
    this.items.splice(index, 0, new TodoItem(item.description));
};

TodoList.prototype.remove = function(id) {
    var removedItem;
    for (var i = 0; i < this.items.length; i++) {
        if (this.items[i].id === id)
            removedItem = this.items.splice(i, 1);
    }
    return removedItem;
};

TodoList.prototype.archive = function(item) {
    for (var i = 0; i < this.items.length; i++) {
        if (this.items[i].id === item.id) {
            this.items[i].isArchived = true;
            return true;
        }
    }
    return false;
};

TodoList.prototype.isItemArchived = function(item) {
    return item.isArchived;
};

TodoList.prototype.getArchived = function() {
    return this.items.filter(this.isItemArchived);
}