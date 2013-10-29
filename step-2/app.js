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
    this.id = createGuid()
    this.isArchived = false
    this.description = description;
    this.done = false;
}

TodoItem.prototype.setDone = function() {
    this.done = true;
};

TodoItem.prototype.setUndone = function() {
    this.done = false;
};

function TodoList(items) {
    this.items = [];
    for (var i = 0; i < items.length; i++) {
        this.items.push(new TodoItem(items[i].description));
    }
}


TodoList.prototype.add = function(item, i) {
    this.items.splice(i, 0, new TodoItem(item.description));
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
    return this.items.filter(this.isItemArchived;
}