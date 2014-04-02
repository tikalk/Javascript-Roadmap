var TodoApp = {};

$(function(){
	$.ajax({
		url: 'data.json',
		success: function(items) {
			TodoApp.list = new TodoList(items, { 
				add: '#add-todo',
				target: '#todo-list'
			});
			TodoApp.filters = new FiltersManager({
				target: '#filters',
				filters: [
					{
						label: 'done',
						prop: 'done',
						val: true
					},
					{
						label: 'not-done',
						prop: 'done',
						val: false
					},
					{
						label: 'all',
						prop: false,
						val: false
					}
				],
				filter: function(filter) {
					TodoApp.list.render(filter);
				}
			});
			TodoApp.filters.addFilter(SearchFilter, {
				prop: 'description'
			})
		}
	});
})