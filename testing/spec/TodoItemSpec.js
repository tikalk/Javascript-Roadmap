describe("TodoItem - ", function() {
	var item;
	var desc = "buy 3% milk";

	beforeEach(function() {
		item = new TodoApp.TodoItem(desc);
	});

	it("should have an id", function() {
		expect(item.id).toBeDefined();

		//demonstrates use of custom matcher
		// expect(player).toBePlaying(song);
	});

	it("should have a created date", function() {
		expect(item.created).toBeDefined();
		expect(item.created).not.toBe(null);
	});

	it("should have a description property", function() {
		expect(item.description).toEqual(desc);
		expect(item.description).toBe(desc);
	});

	describe("when an item's done status has been changed, ", function() {

		beforeEach(function() {
			item.done();
		});

		it("should set to true when it's done", function() {
			expect(item.isDone).toBeTruthy();
			expect(item).toBeDone(true);
		});

		it("should be false when set back to undone", function() {
			item.setUndone();
			expect(item.isDone).toBeFalsy();
		});
	});

	// demonstrates use of spies to intercept and test method calls
	it("tells the current item if the item has been set to done", function() {
		spyOn(item, 'done');
		item.done();
		expect(item.done).toHaveBeenCalled();
	});
	  // demonstrates use of expected exceptions
	  // describe("#done again", function() {
	  // 	it("should throw an exception if item is already done", function() {
	  // 		item.done();

	  // 		expect(function() {
	  // 			item.done();
	  // 		}).toThrowError("item is already done");
	  // 	});
	  // });
});
