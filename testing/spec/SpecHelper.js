beforeEach(function () {
  jasmine.addMatchers({
    toBeDone: function() {
      return {
        compare: function(actual, expected) {
          var item = actual;

          return {
            pass: item.isDone === expected && item.isDone
          }
        }
      }
    }
  });
});
