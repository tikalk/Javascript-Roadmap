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