var TodoList = require('./js/TodoList');
var ListView = require('./js/ListView');
var FiltersView = require('./js/filters/FiltersView');

var TodoApp = {
    list: function (items) {
        items.forEach(function(item){
            console.log('item:', item);
        });
    },

    filters: function (filters) {
        filters.forEach(function(filter){
            console.log('filter:', filter);
        });
    }
};

// your challenge - create the next steps to 
// initiate the app
var filters = [
    { label: 'done', prop: 'isDone', value: true },
    { label: 'not done', prop: 'isDone', value: false },
    { label: 'all', prop: 'isDone', value: 'all' }
];

TodoApp.model = new TodoList('mocks/data.json');
TodoApp.view = new ListView(TodoApp.model, '#todo-list');
TodoApp.filtersView = new FiltersView(filters, '#filters');
TodoApp.filtersView.on('change', function(ev, filter){
    TodoApp.view.render(TodoApp.model.filterBy(filter));
});
TodoApp.model.fetch().then(function(){
    TodoApp.view.render();
});
