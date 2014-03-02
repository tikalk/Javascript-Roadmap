// guid creator
function createGuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0,
            v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

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
    }
}

// objects
TodoApp.TodoItem = function (description){
    this.description = description;
    this.done = false;
    this.created = new Date();
}

TodoApp.TodoItem.prototype.done = function() {
    this.done = true;
}

TodoApp.TodoItem.prototype.setUndone = function() {
    this.done = false;
}

TodoApp.TodoList = function(items) {
    this.items = [];
    for (var i = 0; i < items.length; i++) {
        this.add(items[i].description, i);
    }
}

TodoApp.TodoList.prototype.add = function(item, i) {
    i = i || 0;
    this.items.push(new TodoItem(item.description));
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