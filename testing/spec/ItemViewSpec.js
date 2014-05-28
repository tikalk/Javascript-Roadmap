describe("ItemView - ", function() {
	var model, view;
	var desc = "buy 3% milk";

	beforeEach(function() {
		model = new TodoApp.TodoItem(desc);
		view = new TodoApp.ItemView(model);
	});

	it("should render a todo item element", function() {
		expect(view.$el).toHaveClass('todo-item');
	});

	it("should have a 'Remove' button", function() {
		expect(view.$removeBtn).toHaveText('Remove');
	});

	it("should mark the item as done when clicked on the input", function(){
		view.$input.click();
		expect(model.isDone).toBeTruthy();
		expect(view.$el).toHaveClass('done');
	});

	it("should have 'click' to check the item", function(){
		var spyEvent = spyOnEvent(view.$input, 'click');
		view.$input.click();
		expect('click').toHaveBeenTriggeredOn(view.$input);
	});

	it("should have a 'remove' button with 'click' handler", function(){
		expect(view.$removeBtn).toHandle('click');
	});
});
