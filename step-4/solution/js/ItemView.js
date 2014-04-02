TodoApp.ItemView = function (model) {
	this.model = model;
	this.createElement();
	this.attachEvents();
};
TodoApp.ItemView.prototype = {
	createElement: function(){
		this.$el = this.make('div', {
			id: this.model.id,
			class: 'todo-item'
		});
		// create the input element
		this.$input = this.make('input', {
			type: 'checkbox'
		});
		this.$el.append(this.$input);
		// create the description element
		this.$el.append(this.make('p', {}, this.model.description));
	},

	make: function(tag, attrs, html){
		// create dom element for this todo
	    var $el = $('<' + tag + '/>');
	    $el.attr(attrs);
	    if (html) {
	    	$el.html(html);
	    }
	    return $el;
	},

	attachEvents: function(){
	    // the onItemCheck event handler is invoked
	    // in the context of the "this"
	    this.$input.on('click', $.proxy(this.onItemCheck, this));
	},

	onItemCheck: function(ev) {
	    this.model.isDone = ev.target.checked;
	    if (this.model.isDone) {
	        this.$el.addClass('done');
	    } else {
	        this.$el.removeClass('done');
	    }
	}
};