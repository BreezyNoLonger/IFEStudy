class Customer{
	constructor() {}

	order(menu) {
		return new Promise(function(resolve, reject){
			let bill = [];
			for (let i = 0; i < Math.floor((Math.random() * menu.length)) + 1; i++) {
				bill.push(menu[Math.floor((Math.random() * menu.length))]);
				
			};
			
			setTimeout(function(){
				console.log("我点好菜了");
				resolve(bill);
			}, 3000);
		});
	}

	eat(dish) {
		console.log('我正在吃' + dish);
	}
}