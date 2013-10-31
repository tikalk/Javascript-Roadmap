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
    this.el = document.createElement('div');
    this.el.setAttribute('id', this.id);
    this.el.setAttribute('class', 'todo-item');
    this.createInput();
    this.createDescription();
}

TodoItem.prototype.createDescription = function() {
    this.desc = document.createElement('p');
    this.desc.innerHTML = this.description;
    this.el.appendChild(this.desc);
};

TodoItem.prototype.createInput = function() {
    var todo = this;
    this.input = document.createElement('input');
    this.input.setAttribute('type', 'checkbox');
    // the function here creates a closure to the todo
    // variable which is a reference to "this" context
    // later, the onItemCheck event handler is invoked
    // in the context of the "this"
    this.input.addEventListener('click', function(ev) {
        todo.onItemCheck.call(todo, ev);
    });
    this.el.appendChild(this.input);
}
TodoItem.prototype.onItemCheck = function(ev) {
    this.done = ev.target.checked;
    if (this.done) {
        this.el.classList.add('done');
    } else {
        this.el.classList.remove('done');
    }
};

TodoItem.prototype.setDone = function() {
    this.done = true;
};

TodoItem.prototype.setUndone = function() {
    this.done = false;
};

// A TodoList module displays a list of todo items

function TodoList(items) {
    this.items = [];
    for (var i = 0; i < items.length; i++) {
        this.items.push(new TodoItem(items[i].description));
    }
    this.el = document.createElement('div');
    this.render();
}

TodoList.prototype.render = function() {
    for (var i = 0; i < this.items.length; i++) {
        this.el.appendChild(this.items[i].el);
    };
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
    return this.items.filter(this.isItemArchived);
}