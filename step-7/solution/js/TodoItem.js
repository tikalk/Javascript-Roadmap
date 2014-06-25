'use strict';
var utils = require('../common/utils');

var TodoItem = function (description){
    this.id = utils.createGuid();
    this.description = description;
    this.isDone = false;
    this.created = new Date();
};

TodoItem.prototype.done = function() {
    this.isDone = true;
};

TodoItem.prototype.setUndone = function() {
    this.isDone = false;
};

module.exports = TodoItem;