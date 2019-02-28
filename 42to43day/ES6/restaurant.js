class Restaurant{
	constructor(cash, seats, staffList) {
		this.cash = cash;
		this.seats = seats;
		this.staffList = staffList;
		this._count = 0;
		this._lineNum = 0;
		this._seat = new Array();
	}

	hire(staff) {
		this.staffList.push(staff);
		console.log('招聘完成');
	}
	
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
	seated(i) {
		if (this._count < this.seats) {
			this._count++;
			console.log('您的座位号为' + i);
			this._seat[i] = '有人';
		} else {
			console.log('本店已满课，请排队等候，您前面有' + this._lineNum + '个顾客正在等候');
			this._lineNum++;
		}
	}
	// 顾客结账离开
	checkOut(i) {
		if (this._count > 0) {
			this._count--;
			console.log(i + '号座已结账离开')
			this._seat[i] = '';
		}
		if (this._count < this.seats && this._lineNum > 0) {
			this.seated(i);
			this._lineNum--;
		}
	}
}