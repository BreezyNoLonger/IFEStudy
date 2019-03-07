var myRestaurant = new Restaurant(100000, 1, []);
var cook1 = Cook.getInstance(1, '老王', 5000);
var waiter1 = Waiter.getInstance(1, '小李', 3000);
myRestaurant.hire(cook1);
myRestaurant.hire(waiter1);
console.log('-----------------');

var fan = new Dishes('米饭', 0.5, 1, 0.25);
var hongShaoRou = new Dishes('红烧肉', 8, 16, 6);
var fanQieChaoDan = new Dishes('番茄炒蛋', 4, 8, 3);
var laJiaoChaoQingJiao = new Dishes('辣椒炒青椒', 2, 4, 1.5);

var menu = new Menu();
menu.addDishes(fan);
menu.addDishes(hongShaoRou);
menu.addDishes(fanQieChaoDan);
menu.addDishes(laJiaoChaoQingJiao);

var customer1 = new Customer(1);
myRestaurant.seated(menu.menu, customer1, myRestaurant).
	then(customer1.order).then(waiter1.finishWork).
	then(shangCai);
	
function shangCai(bill){
	let time = 0;
	let total = 0;
	for (let i = 0; i < bill.length; i++){
		time += bill[i][2];
		total += bill[i][1];
		setTimeout(function(){
			Promise.resolve(bill[i]).then(cook1.finishWork).
			then(waiter1.finishWork).then(customer1.eat);
		}, 1000 * time);
	}
	setTimeout(function(){
		console.log("结账：" + total);
	}, 1000 * time);
}




// var customer1 = new Customer(1);
// myRestaurant.seated(menu, customer1, waiter1);
// var customer2 = new Customer(2);
// myRestaurant.seated(menu, customer2, waiter1);
// waiter1.cooking(cook1, customer1);
// var customer3 = new Customer(3);
// myRestaurant.seated(menu, customer3, waiter1);

// myRestaurant.checkOut(menu, customer1, waiter1);

// waiter1.cooking(cook1, customer2);
// myRestaurant.checkOut(menu, customer2, waiter1);

// waiter1.cooking(cook1, customer3);
// myRestaurant.checkOut(menu, customer3, waiter1);