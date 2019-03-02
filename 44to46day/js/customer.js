class Customer{
	_bill = [];
	seatNum;
	constructor() {}

	order(bill, waiter) {
		this._bill = bill;
		console.log('点菜：' + bill[0]);
		waiter.finishWork(bill);
	}

	eat() {
		console.log('我正在吃' + this._bill[0]);
	}
}