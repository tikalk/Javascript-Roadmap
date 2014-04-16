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
    },
    
    // guid creator
    createGuid: function() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0,
                v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
};
