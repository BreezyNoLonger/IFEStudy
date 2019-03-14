class Menu{
	menu = [];
	constructor() {}

	addDishes(dishes) {
		let tempDishes = [dishes.dishesName, dishes.price, dishes.costTime];
		this.menu.push(tempDishes);
	}
}