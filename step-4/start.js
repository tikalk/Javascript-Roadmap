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

TodoApp.list = new TodoList(TodoApp.todos, { add: '#add-todo' });
$('#todo-list').append(TodoApp.list.$el);