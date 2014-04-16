TodoApp.Filter = function (data) {
	if (data) {
		this.parseData(data);
	}
	this._on = false;
}
TodoApp.Filter.prototype = {
	parseData: function (data) {
		this.label = data.label;
		this.prop = data.prop;
		this.value = data.value;
		if (data.check) {
			this.check = data.check;
		}
		
	},

	toggle: function() {
		this._on = !this._on;
	}
};