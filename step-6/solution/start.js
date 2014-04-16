// your challenge - create the next steps to 
// initiate the app
var filters = [
	{ label: 'done', prop: 'isDone', value: true },
	{ label: 'not done', prop: 'isDone', value: false },
	{ label: 'all', prop: 'isDone', value: 'all' }
];

TodoApp.model = new TodoApp.TodoList('mocks/data.json');
TodoApp.view = new TodoApp.ListView(TodoApp.model, '#todo-list');
TodoApp.filtersView = new TodoApp.FiltersView(filters, '#filters');
TodoApp.filtersView.on('change', function(ev, filter){
	TodoApp.view.render(TodoApp.model.filterBy(filter));
});
TodoApp.model.fetch().then(function(){
	TodoApp.view.render();
});