class Menu{
	menu = [];
	constructor() {}

	addDishes(dishes) {
		let tempDishes = [dishes.dishesName, dishes.price];
		this.menu.push(tempDishes);

	}
	order(customer, waiter) {
		if (this.menu.length === 0) {
			console.log("当前菜单没有菜品");
			return;
		}
		customer.order(this.menu[Math.floor((Math.random() * this.menu.length))], waiter);
	}
}