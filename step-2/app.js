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
}

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

// Testing the TodoList 
TodoApp.model = new TodoApp.TodoList([
    { description: "buy milk" },
    { description: "pick the kids" },
    { description: "play the guitar" },
    { description: "watch revolution" }
]);
console.log(TodoApp.model.items.length === 4);
console.log(TodoApp.model.remove(TodoApp.model.items[2].id));
console.log(TodoApp.model.archive(TodoApp.model.items[0]));
