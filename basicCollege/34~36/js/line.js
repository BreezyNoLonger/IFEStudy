function line(msg) {
	this.msg = msg;
	// this.lineColor = lineColor;
	// this.positon = positon;
	this.canvas = document.createElement('canvas');
	this.ctx = this.canvas.getContext('2d');
	this.canvas.width = 0.5 * window.innerWidth;
	this.canvas.height = 0.5 * this.canvas.width;
	this.axleX = this.canvas.width - 100;
	this.axleY = this.canvas.height - 100;
	this.lineColor = ['#acf', '#18c', '#239', '#90EE90', '#C0FF3E', '#aaa', '#EE9A00', '#00BFFF', '#6eba3c'];
}

line.prototype.createAxle = function() {

	this.ctx.beginPath();
	// this.ctx.lineWidth = 1;
	// this.ctx.strokeStyle = this.axleColor;
	this.ctx.moveTo(50, 50);
	this.ctx.lineTo(50, 50 + this.axleY);
	this.ctx.lineTo(50 + this.axleX, 50 + this.axleY);
	this.ctx.stroke();

	this.ctx.beginPath();
	this.ctx.moveTo(45, 58);
	this.ctx.lineTo(50, 50);
	this.ctx.lineTo(55, 58);
	this.ctx.stroke();

	this.ctx.beginPath();
	this.ctx.moveTo(42 + this.axleX, 45 + this.axleY);
	this.ctx.lineTo(50 + this.axleX, 50 + this.axleY);
	this.ctx.lineTo(42 + this.axleX, 55 + this.axleY);
	this.ctx.stroke();

}
//展示所有的折线图
line.prototype.createLine = function() {
	var msg = this.msg;
	var trs = document.getElementById('table-wrapper').getElementsByTagName('tr');
	var listMsg = new Array();
	var max = 0;
	// console.log(msg)
	for (let i = 1; i < trs.length; i++) {
		for (let j = 0; j < msg.length; j++) {
			if (msg[j].product === trs[i].getAttribute('product')) {
            	if (msg[j].region === trs[i].getAttribute('region')) {
			        let mSale = msg[j].sale;
					for (let k = 0; k < mSale.length; k++) {
						if (mSale[k] > max) {
							max = mSale[k];
						}
					}
					listMsg[i-1] = mSale;
				}
			}
		}
	}

	var scale = (0.9 * this.axleY) / max;
	var listScaleHeight = new Array();
	for (let i = 0; i < listMsg.length; i++) {
		listScaleHeight[i] = new Array();
		for (let j = 0; j < listMsg[i].length; j++) {
			listScaleHeight[i][j] = listMsg[i][j] * scale;
		}
		
	}

	for (let i = 0; i < listMsg.length; i++) {
		this.updataData(listMsg[i], listScaleHeight[i], this.lineColor[i]);
	}
}

line.prototype.updataData = function(msgSale, scaleHeight, lineColor) {
	const pi = Math.PI;
	var spacing = this.axleX / 12 * 95/100;
	for (let i = 0; i < msgSale.length; i++) {
		this.ctx.beginPath();
		this.ctx.fillStyle = lineColor;
		this.ctx.arc(spacing * (i + 0.7) + 50, this.axleY - scaleHeight[i] + 50, 2.5, 0, 2 * pi);
		this.ctx.fill();
		if (i === msgSale.length - 1) {
			continue;
		}
		this.ctx.beginPath();
		this.ctx.strokeStyle = lineColor;
		this.ctx.moveTo(spacing * (i + 0.7) + 50, this.axleY - scaleHeight[i] + 50);
		this.ctx.lineTo(spacing * (i + 1 + 0.7) + 50, this.axleY - scaleHeight[i+1] + 50)
		this.ctx.stroke();
	}
}

line.prototype.scaleMax = function() {
	var msgSale = this.msg.sale;
	var max = 0;
	for (let i = 0; i < msgSale.length; i++) {
		if (msgSale[i] > max) {
			max = msgSale[i];
		}
	}
	var scale = (0.9 * this.axleY) / max;
	var scaleHeight = new Array();
	for (let i = 0; i < msgSale.length; i++) {
		scaleHeight[i] = msgSale[i] * scale;
	}
	return scaleHeight;
}

line.prototype.drawLine = function() {
	var lastCanvas = document.getElementsByTagName('canvas')[0];

	var body = document.getElementsByTagName('body')[0];
	if (lastCanvas) {
		body.removeChild(lastCanvas);
	}
	var table = document.getElementById('table-wrapper');
	body.insertBefore(this.canvas, table);
}

line.prototype.mosueOver = function(positon) {
	this.createAxle();
	var msgSale = this.msg.sale;
	var scaleHeight = this.scaleMax();
	this.updataData(msgSale, scaleHeight, this.lineColor[positon]);
	this.drawLine();
}

line.prototype.mosueOut = function() {
	this.createAxle();
	this.createLine();
	this.drawLine();
}
