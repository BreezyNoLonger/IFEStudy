class Staff{
	constructor(staffId, staffName, staffWage) {
		this.staffId = staffId;
		this.staffName = staffName;
		this.staffWage = staffWage;
		this._order;
	}

	finishWork() {
		console.log('本次工作已完成');
	}
}

class Waiter extends Staff {
	constructor(waiterId, waiterName, waiterWage) {
		// 调用父类的constructor
		super(waiterId, waiterName, waiterWage);
	}

	finishWork(work) {
		if (work instanceof Array) {
			this._order = work;
		} else {
			for (let i in this._order) {
				console.log('上菜：' + this._order[i]['dishesName']);
			}
		}
	}
}

class Cook extends Staff{
	constructor(cookId, cookName, cookWage) {
		super(cookId, cookName, cookWage);
	}

	finishWork() {
		console.log('完成烹调');
	}
}
