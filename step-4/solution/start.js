TodoApp.todos = [{
	description: 'buy milk'
}, {
	description: 'pick the kids from school'
}, {
	description: 'clean the car'
}, {
	description: 'have fun'
}];

// your challenge - create the next steps to 
// initiate the app
TodoApp.model = new TodoApp.TodoList(TodoApp.todos);
TodoApp.view = new TodoApp.ListView(TodoApp.model);
$('body').append(TodoApp.view.render());

// console.log(TodoApp.model.items.length === 4);
// console.log(TodoApp.model.remove(TodoApp.model.items[2].id));
// console.log(TodoApp.model.archive(TodoApp.model.items[0]));