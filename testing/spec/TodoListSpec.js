describe("TodoList - ", function() {
	var list;
	var url = 'mocks/items.json';
	var items = [{
	"description": "buy milk"
		}, {
			"description": "pick the kids from school"
		}, {
			"description": "clean the car"
		}, {
			"description": "have fun"
		}];

	beforeEach(function() {
		// jasmine.Ajax.install();
		list = new TodoApp.TodoList(url);
	});

	// afterEach(function() {
	// 	jasmine.Ajax.uninstall();
 //    });

	it("should have no items", function() {
		expect(list.items).toBeDefined();
		expect(list.items.length).toBe(0);
	});

	it("should fetch items and populate the items array", function(){
		$.ajax = jasmine.createSpy().and.callFake(function(res){
			var d = $.Deferred();
		    d.resolve(items);
		    return d.promise();
		});

		list.fetch();

		expect(list.items.length).toBe(items.length);
	});
});