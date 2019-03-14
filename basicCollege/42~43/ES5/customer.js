function Customer() {

}

Customer.prototype.order = function(bill) {
	for (let i in bill) {
		console.log('点菜：' + bill[i]['dishesName']);
	}
	return bill;
}

Customer.prototype.eat = function() {
	console.log('我正在吃饭。');
}