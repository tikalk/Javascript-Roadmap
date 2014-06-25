var $ = require('jquery');

var ItemView = function (model) {
	this.model = model;
	this.createElement();
	this.attachEvents();
};
ItemView.prototype = {
	createElement: function(){
		this.$el = this.make('div', {
			id: this.model.id,
			class: 'todo-item ' + (this.model.isDone ? 'done' : '')
		});
		// create the input element
		this.$input = this.make('input', {
			type: 'checkbox',
			checked: this.model.isDone
		});
		this.$el.append(this.$input);
		// create the description element
		this.$description = this.make('p', {}, this.model.description);
		this.$removeBtn = this.make('button', {}, 'Remove');
		this.$el.append(this.$description.append(this.$removeBtn));
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
	    this.$removeBtn.on('click', $.proxy(this.onRemove, this));
	},

	detachEvents: function () {
		this.$input.off('click');
		this.$removeBtn.off('click');
		this.$el.off();
	},

	onItemCheck: function(ev) {
	    this.model.isDone = ev.target.checked;
	    if (this.model.isDone) {
	        this.$el.addClass('done');
	    } else {
	        this.$el.removeClass('done');
	    }
	},

	onRemove: function(ev){
		this.$el.trigger('remove:todo', { id: this.model.id });
		this.remove();	
	},

	remove: function(){
		this.detachEvents();
		this.$el.remove();
	}
};
module.exports = ItemView;