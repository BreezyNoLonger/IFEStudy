class Staff{
	_order = [];
	constructor(staffId, staffName, staffWage) {
		this.staffId = staffId;
		this.staffName = staffName;
		this.staffWage = staffWage;
	}
}

class Waiter extends Staff {
	constructor(waiterId, waiterName, waiterWage) {
		// 调用父类的constructor
		super(waiterId, waiterName, waiterWage);
		this.instance;
	}

	finishWork(work) {
		return new Promise(function(resolve, reject){
			if (work instanceof Array) {
				console.log("点菜数量："+work.length);
				resolve(work);
			} else {
				console.log('上菜：' + work);
				resolve(work);
			}
		});
	}

	static getInstance(waiterId, waiterName, waiterWage) {
		if (!this.instance) {
			this.instance = new Waiter(waiterId, waiterName, waiterWage);
		}
		return this.instance;
	}
}

class Cook extends Staff{
	constructor(cookId, cookName, cookWage) {
		super(cookId, cookName, cookWage);
		this.instance;
	}

	finishWork(dish) {
		return new Promise(function(resolve, reject){
			console.log(dish[0] + '完成烹调');
			resolve(dish[0]);
		});
	}

	static getInstance(cookId, cookName, cookWage) {
		if (!this.instance) {
			this.instance = new Cook(cookId, cookName, cookWage);
		}
		return this.instance;
	}
}
