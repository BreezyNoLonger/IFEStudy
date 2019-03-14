class Restaurant{
	constructor(cash, seats, staffList) {
		this.cash = cash;
		this.seats = seats;
		this.staffList = staffList;
		this.seat = 0;
	}
	// 招聘员工
	hire(staff) {
		this.staffList.push(staff);
		console.log('招聘完成');
	}
	// 解雇员工
	fire(staff) {
		for (let i = 0; i < this.staffList.length; i++) {
			if (this.staffList[i] === staff) {
				this.staffList.splice(i, 1);
				console.log('解聘完成');
				break;
			}
		}
	}
	// 顾客入座
	seated(menu, restaurant) {
		this.seat = 1;
		return new Promise(function(resolve, reject){
			console.log('欢迎光临');
			resolve(menu);
		});
		
	}
	// 顾客结账离开
	checkOut(total) {
		console.log("结账：" + total);
		this.cash += total;
	}
}
