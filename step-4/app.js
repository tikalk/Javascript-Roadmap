// guid creator

function createGuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0,
            v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

// objects

function TodoItem(description) {
    this.id = createGuid();
    this.isArchived = false;
    this.description = description;
    this.done = false;

    // create dom element for this todo
    // attach it to 'this' so it will public so
    // it can be appended to any other element
    this.$el = $('<div/>');
    this.$el.attr({
        'id': this.id,
        'class': 'todo-item'
    });
    this.createInput();
    this.createDescription();
}

TodoItem.prototype.createDescription = function() {
    this.$desc = $('<p/>')
        .html(this.description)
        .appendTo(this.$el);
};

TodoItem.prototype.createInput = function() {
    this.$input = $('<input/>').attr('type', 'checkbox');
    // the function here binds 'this'
    // so it can be referenced as is within 'onItemCheck'
    this.$input
        .on('click', $.proxy(this.onItemCheck, this))
        .appendTo(this.$el);
}
TodoItem.prototype.onItemCheck = function(ev) {
    this.done = ev.target.checked;
    this.$el.toggleClass('done', this.done);
};

TodoItem.prototype.setDone = function() {
    this.done = true;
};

TodoItem.prototype.setUndone = function() {
    this.done = false;
};

// A TodoList module displays a list of todo items

function TodoList(items, config) {
    this.items = [];
    for (var i = 0; i < items.length; i++) {
        this.items.push(new TodoItem(items[i].description));
    }
    this.$el = $('<div/>');
    // configure add object
    this.createAdd(config.add);
    this.render();
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
TodoList.prototype.render = function() {
    for (var i = 0; i < this.items.length; i++) {
        this.renderItem(this.items[i]);
    };
}
TodoList.prototype.renderItem = function(item) {
    item.$el.appendTo(this.$el);
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