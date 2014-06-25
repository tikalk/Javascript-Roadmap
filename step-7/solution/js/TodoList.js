'use strict';
var $ = require('jquery');
var TodoItem = require('./TodoItem');

var TodoList = function(url) {
    this.url = url;
    this.items = [];
};

TodoList.prototype = {
    add: function(description) {
        this.items.push(new TodoItem(description));
    },

    remove: function(id) {
        var removedItem;
        for (var i = 0; i < this.items.length; i++) {
            if (this.items[i].id === id)
                removedItem = this.items.splice(i, 1);
        }
        return removedItem;
    },

    archive: function(item) {
        for (var i = 0; i < this.items.length; i++) {
            if (this.items[i].id === item.id) {
                this.items[i].isArchived = true;
                return true;
            }
        }
        return false;
    },

    isItemArchived: function(item) {
        return item.isArchived;
    },

    getArchived: function() {
        return this.items.filter(this.isItemArchived);
    },

    addItems: function(items) {
        items.forEach(function(item){
            this.add(item.description);
        }, this);
    },

    fetch: function() {
        var onError = function(ev){
            throw new Error('There was an error in retreiving the content.');
        };

        if (!this.url) {
            onError();
        }

        return $.ajax({
            url: this.url
        }).then(this.addItems.bind(this), onError);
    },

    filterBy: function (filter) {
        if (filter.value === 'all') {
            return this.items;
        }

        return this.items.filter(function(item){
            return item[filter.prop] === filter.value;
        });
    }
};

module.exports = TodoList;