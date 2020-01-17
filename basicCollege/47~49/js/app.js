var myRestaurant = new Restaurant(100000, 1, []);
var cook1 = Cook.getInstance(1, '老王', 5000);
var waiter1 = Waiter.getInstance(1, '小李', 3000);
myRestaurant.hire(cook1);
myRestaurant.hire(waiter1);
console.log('-----------------');

var fan = new Dishes('米饭', 1, 2, 1);
var hongShaoRou = new Dishes('红烧肉', 8, 16, 8);
var fanQieChaoDan = new Dishes('番茄炒蛋', 4, 8, 4);
var laJiaoChaoQingJiao = new Dishes('辣椒炒青椒', 2, 4, 2);

var menu = new Menu();
menu.addDishes(fan);
menu.addDishes(hongShaoRou);
menu.addDishes(fanQieChaoDan);
menu.addDishes(laJiaoChaoQingJiao);

var btn = document.querySelector('button');
var leave = document.querySelectorAll('button')[1];
var customers = [];
var count = 0;

btn.onclick = function(){
	createCust();
	begin();
}
// 离开按钮
leave.onclick = function(){
	var waitList = document.querySelector('#waitList');
	if (waitList.childNodes.length > 0) {
		waitList.removeChild(waitList.childNodes[0]);
		count--;
	}
}
// 创建顾客视图
function createCust(){
	let customer = document.createElement('img');
	customer.setAttribute('src', 'images/cust.png');
	let div = document.createElement('div');
	div.setAttribute('style', 'background:' + setBGColor());
	div.appendChild(customer);

	var span = document.createElement('span');
	span.innerHTML = getName();
	div.appendChild(span);

	let waitList = document.querySelector('#waitList');
	waitList.appendChild(div);
	count++;
	customer = null;
}

function begin() {
	let waitList = document.querySelector('#waitList');
	if (myRestaurant.seat === 0 && waitList.childNodes.length > 0) {
		let waiter = document.querySelector('#waiter');
		let cooker = document.querySelector('#cooker');
		let cust = document.querySelector('#cust');
		let tempNode = waitList.childNodes[0];

		cust.querySelector('img').
			setAttribute('src', tempNode.querySelector('img').getAttribute('src'));
		cust.querySelector('span').
			innerHTML = tempNode.querySelector('span').innerHTML;
		cust.style.backgroundColor = tempNode.style.backgroundColor;
		waitList.removeChild(tempNode);
		tempNode = null;
		// 顾客移动到桌前
		cust.style.left = '260px';
		cust.style.bottom = '50px';
		// 服务员移动到桌前
		waiter.style.top = '200px';
		waiter.style.left = '-200px';

		let customer = new Customer();
		myRestaurant.seated(menu.menu).
			then(customer.order).then(waiter1.finishWork).
			then(shangCai).then(function(total){
				waiter.style = '';
				cust.style.left = '350px';
				cust.style.bottom = '150px';
				myRestaurant.checkOut(total);
				let money = document.querySelector('#money');
				money.innerHTML = myRestaurant.cash;
				setTimeout(function() {
					cust.style = '';
					cust.querySelector('img').setAttribute('src', '');
					cust.querySelector('span').innerHTML = '';
					myRestaurant.seat = 0;
					begin();
				}, 500);
			});
		function shangCai(bill){
			let time = 0;
			let total = 0;
			// console.log(customer);
			for (let i = 0; i < bill.length; i++){
				total += bill[i][1];
				time += bill[i][2];
				setTimeout(function(){
					Promise.resolve(bill[i]).then(cook1.finishWork).
					then(waiter1.finishWork).then(function(dish) {
						let status = document.querySelector('#status');
						let len = status.childNodes.length;
						let temp = status.querySelector('span');
						let tempTime = (temp) ?
							(Number(temp.innerHTML) - 1)/3 : 1;
							custStatus(dish, len + tempTime);
							customer.eat(dish, len + tempTime);
						
						// }, dishNum * 2000);
				})}, 1000 * time + 500);
			}
			setTimeout(cookerStatus, 500, bill);
			return new Promise(function(resolve){
				setTimeout(function(){
					resolve(total);
				// 炒菜时间 + 最后一个菜的吃饭时间 + 程序运行造成的延时缓冲
				}, 1000 * (time + 3 + 2));
			});
			// setTimeout(function(){

			// });
		}
	}
}
// 厨师状态
function cookerStatus(thisbill){
	let bill = [];
	for (let i in thisbill) {
		bill[i] = [];
		for (let j in thisbill[i]){
			bill[i].push(thisbill[i][j]);
		}
	}
	let ul = document.querySelector('#kitchen ul');
	ul.innerHTML = '';
	if (bill.length > 0) {
		for (let i = 0; i < bill.length; i++) {
			let li = document.createElement('li');
			li.innerHTML = (i === 0) ?
				(bill[i][0] + '的剩余烹调时间: ' + bill[i][2] + '秒') :
				(bill[i][0] + '等待烹调');
			// li.innerHTML = bill[i][0] + '的剩余烹调时间: ' + bill[i][2];
			ul.appendChild(li);
		}
		bill[0][2] -= 1;
		if (bill[0][2] <= 0) {
			bill.shift();
		}
		setTimeout(cookerStatus, 1000, bill);
	} else {
		ul.innerHTML = '<li>空闲</li>';
	}
}
function custStatus(dish, dishNum) {
	let time = 3 * dishNum;
	let name = dish[0];
	let status = document.querySelector('#status');
	let p = document.createElement('p');
	p.innerHTML = '我正在吃' + name + ',还剩<span>' + time + '</span>秒';
	status.appendChild(p);
	let t = setInterval(function() {
		// let p = document.createElement('p');
		// p.innerHTML = ;
		time--;
		p.innerHTML = '我正在吃' + name + ',还剩' + time + '秒';
		
		if (time === 0) {
			status.removeChild(p);
			clearInterval(t);
		}
	}, 1000);
}

// 自动设置名字并返回
function getName(){
	var firstName = ['老', '小'];
	var lastNames = ['赵', '钱', '孙', '李', '杨', '王', '张', '罗', '吴', '冯', '江', '夏'];
	return firstName[Math.floor(Math.random() * firstName.length)] + 
		lastNames[Math.floor(Math.random() * lastNames.length)];
}
// 设置随机背景色
function setBGColor(){
	function randomColor(){
		return Math.floor(Math.random() * 255);
	}
	return 'rgb(' + randomColor() + ',' + randomColor() + ',' + randomColor() + ')';
}
