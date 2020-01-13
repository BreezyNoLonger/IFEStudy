class Staff{
	_order = [];
	instance;
	constructor(staffId, staffName, staffWage) {
		this.id = staffId;
		this.name = staffName;
		this.wage = staffWage;
	}
}

class Waiter extends Staff {
	constructor(waiterId, waiterName, waiterWage) {
		// 调用父类的constructor
		super(waiterId, waiterName, waiterWage);

	}

	finishWork(work, customer) {
		if (work instanceof Array) {
			this._order = work;
		} else {
			console.log('上菜：' + this._order[0]);
			customer.eat();
		}
	}

	cooking(cook, customer){
		if (this._order instanceof Array) {
			cook.finishWork(this._order[0], customer, this);
		}
	}

	order(menu, customer) {
		menu.order(customer, this);
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
	}

	finishWork(dishes, customer, waiter) {
		console.log(dishes + '完成烹调');
		waiter.finishWork(null, customer);
	}

	static getInstance(cookId, cookName, cookWage) {
		if (!this.instance) {
			this.instance = new Cook(cookId, cookName, cookWage);
		}
		return this.instance;
	}
}
