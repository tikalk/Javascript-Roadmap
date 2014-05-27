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
	var defineAjaxSpy = function() {
		$.ajax = jasmine.createSpy().and.callFake(function(res){
			var d = $.Deferred();
		    d.resolve(items);
		    return d.promise();
		});
	};

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

	it("should have a url", function() {
		expect(list.url).toBeDefined();
		expect(list.url).toBe(url);
	});

	it("should fetch items and populate the items array", function(){
		defineAjaxSpy();

		list.fetch();

		expect(list.items.length).toBe(items.length);
	});

	it("should add a new item", function(){
		var first = items[0];
		spyOn(list, 'add');
		list.add(first.description);
		expect(list.add).toHaveBeenCalledWith(first.description);
	});

	xit("should archive an item", function(){
		list.archive();
	});

	it("should call add 4 times", function(){
		var spyAdd = spyOn(list, 'add');
		items.forEach(function(item){
			list.add(item.description);
		});
		expect(spyAdd.calls.count()).toEqual(4);
	});

	it("should add the items with 'fetch' without ajax", function(){
		var addAll = function(){
			items.forEach(function(item){
				list.add(item.description);
			});
		};
		var spyAdd = spyOn(list, 'addItems').and.callFake(addAll);
		list.addItems();
		expect(list.items.length).toEqual(4);
	});

	describe("when a list doesn't have a url", function(){
		beforeEach(function() {
			list = new TodoApp.TodoList(url);
		});

		it("shouldn't have a url set as a property", function(){
			expect(list.url).toMatch('');
		});

		it("should throw an error when trying to fetch items", function(){
			defineAjaxSpy();
			expect(list.fetch).toThrow();
		});
	});

	describe("Async Specs", function(){
		var value = 0;
		var done;

		beforeEach(function(done){
			setTimeout(function(){
				items.forEach(function(item){
					list.add(item.description);
				});
				done();
			}, 1000);
		});

		it("should wait 1 second before adding 4 items", function(){
			expect(list.items.length).toEqual(4);
		});
	});

	afterEach(function(){
		list.items.length = 0;
	});

});