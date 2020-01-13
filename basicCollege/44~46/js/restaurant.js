class Restaurant{
	constructor(cash, seats, staffList) {
		this.cash = cash;
		this.seats = seats;
		this.staffList = staffList;
		this._count = 0;
		this._lineNum = new Array();
		this._seat = new Array();
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
	seated(menu, customer, waiter) {
		if (this._count < this.seats) {
			this._count++;
			for (let i = 0; i < this.seats; i++) {
				if (this._seat[i] !== '有人') {
					console.log('您的座位号为' + (i+1));
					customer.seatNum = i + 1;

					this._seat[i] = '有人';
					break;
				}
			}
			waiter.order(menu, customer);
		} else {
			console.log('本店已满课，请排队等候，您前面有' + this._lineNum.length + '个顾客正在等候');
			this._lineNum.push(customer);
		}
	}
	// 顾客结账离开
	checkOut(menu, customer, waiter) {
		if (this._count > 0) {
			this._count--;
			console.log(customer.seatNum + '号座已结账离开');
			this._seat[customer.seatNum - 1] = '';
			// 释放该顾客内存
			for (let key in customer) {
				delete customer[key];
			}
			console.log('-------------')
		}
		if (this._count < this.seats && this._lineNum.length > 0) {
			this.seated(menu, this._lineNum[0], waiter);
			this._lineNum.shift();
		}
	}
}