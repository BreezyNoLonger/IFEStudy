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
			// setTimeout(function(){
				console.log(dish[0] + '完成烹调');
				resolve(dish[0]);
			// }, 1000 * time);
			// let time = 0;
			// for (let i = 0; i < bill.length; i++){
			// 	time += bill[i][2];
			// 	setTimeout(function(){
			// 		console.log(bill[i][0] + '完成烹调');
			// 		resolve(bill[i][0]);
			// 	}, 1000 * time);
			// }
		});
	}

	static getInstance(cookId, cookName, cookWage) {
		if (!this.instance) {
			this.instance = new Cook(cookId, cookName, cookWage);
		}
		return this.instance;
	}
}
