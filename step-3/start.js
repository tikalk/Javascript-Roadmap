var TodoApp = {};
TodoApp.todos = [{
	description: 'buy milk'
}, {
	description: 'pick the kids from school'
}, {
	description: 'clean the car'
}, {
	description: 'have fun'
}];

TodoApp.list = new TodoList(TodoApp.todos);
document.getElementById('todo-list').appendChild(TodoApp.list.el);