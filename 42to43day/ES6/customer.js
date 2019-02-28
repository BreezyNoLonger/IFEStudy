class Customer{
	constructor() {}

	order(bill) {
		for (let i in bill) {
			console.log('点菜：' + bill[i]['dishesName']);
		}
		return bill;
	}

	eat() {
		console.log('我正在吃饭。');
	}
}