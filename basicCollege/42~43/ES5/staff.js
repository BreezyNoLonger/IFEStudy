function Staff(staffId, staffName, staffWage) {
	this.staffId = staffId;
	this.staffName = staffName;
	this.staffWage = staffWage;
	this._order;
}

Staff.prototype.finishWork = function() {
	console.log('本次工作已完成');
}

function Waiter(waiterId, waiterName, waiterWage) {
	Staff.call(this, waiterId, waiterName, waiterWage);
}

Waiter.prototype.finishWork = function(work) {
	if (work instanceof Array) {
		this._order = work;
	} else {
		for (let i in this._order) {
			console.log('上菜：' + this._order[i]['dishesName']);
		}
	}
}

function Cook(cookId, cookName, cookWage) {
	Staff.call(this, cookId, cookName, cookWage);
}

Cook.prototype.finishWork = function() {
	console.log('完成烹调');
}