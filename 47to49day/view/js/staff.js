class Staff{
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
		let waiter = document.querySelector('#waiter');
		return new Promise(function(resolve, reject){
			if (work[0] instanceof Array) {
				console.log("点菜数量：" + work.length);
				waiter.style.top = '250px';
				waiter.style.left = '-550px';
				resolve(work);
			} else {
				waiter.style.top = '200px';
				waiter.style.left = '-200px';
				setTimeout(function(){
					console.log('上菜：' + work[0]);
					resolve(work);
				}, 500);
				
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
		let waiter = document.querySelector('#waiter');
		waiter.style.top = '250px';
		waiter.style.left = '-550px';
		return new Promise(function(resolve, reject){
			console.log(dish[0] + '完成烹调');
			setTimeout(function() {
				resolve(dish);
			}, 500);
			
		});
	}

	static getInstance(cookId, cookName, cookWage) {
		if (!this.instance) {
			this.instance = new Cook(cookId, cookName, cookWage);
		}
		return this.instance;
	}
}
