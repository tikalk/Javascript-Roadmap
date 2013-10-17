function TodoItem(description) {
	this.description = description;
	this.done = false;

}

TodoItem.prototype.done = function() {
	this.done = true;
}

TodoItem.prototype.setUndone = function() {
	this.done = false;
}

// Todo Items Factory
var TodoItemFactory = {
	create: function(description) {
		var todoItem = new TodoItem(description);
		return todoItem;
	}
}

// example usage
var myTodo = TodoItemFactory.create("buy milk");
console.log(myTodo.description);
console.log(myTodo.done);