var TodoApp = {};

$(function(){
	$.ajax({
		url: 'data.json',
		success: function(items) {
			TodoApp.list = new TodoList(items, { 
				add: '#add-todo',
				target: '#todo-list'
			});
			TodoApp.filters = new FiltersManager([
				{
					displayLabel: 'done'
				},
				{
					displayLabel: 'not-done'
				},
				{
					displayLabel: 'all'
				}
			]);
		}
	});
})