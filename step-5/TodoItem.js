function TodoItem(description) {
    this.id = createGuid();
    this.isArchived = false;
    this.description = description;
    this.done = false;

    // create dom element for this todo
    // attach it to 'this' so it will public so
    // it can be appended to any other element
    this.$el = $('<div/>');
    this.$el.attr({
        'id': this.id,
        'class': 'todo-item'
    });
    this.createInput();
    this.createDescription();
}

TodoItem.prototype.createDescription = function() {
    this.$desc = $('<p/>')
        .html(this.description)
        .appendTo(this.$el);
};

TodoItem.prototype.createInput = function() {
    this.$input = $('<input/>').attr('type', 'checkbox');
    // the function here binds 'this'
    // so it can be referenced as is within 'onItemCheck'
    this.$input
        .on('click', $.proxy(this.onItemCheck, this))
        .appendTo(this.$el);
}
TodoItem.prototype.onItemCheck = function(ev) {
    this.done = ev.target.checked;
    this.$el.toggleClass('done', this.done);
};

TodoItem.prototype.setDone = function() {
    this.done = true;
};

TodoItem.prototype.setUndone = function() {
    this.done = false;
};