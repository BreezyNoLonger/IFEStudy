class Customer{
	constructor() {}

	order(thisMenu) {
		return new Promise(function(resolve, reject){
			let menu = [];
			for (let i in thisMenu) {
				menu.push(thisMenu[i]);
			}
			let bill = [];
			for (let i = 0; i < Math.floor((Math.random() * menu.length)) + 1; i++) {
				let random = Math.floor((Math.random() * menu.length));
				bill.push(menu[random]);
				menu.splice(random, 1);
			};
			setTimeout(function(){
				console.log("我点好菜了");
				resolve(bill);
			}, 3000);
		});
	}

	eat(dish, dishNum) {
		console.log('我正在吃' + dish[0]);
		setTimeout(function(){
			console.log("我把" + dish[0] + "吃完了");
		}, 3000 * dishNum);
	}
}