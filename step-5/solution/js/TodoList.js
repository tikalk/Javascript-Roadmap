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