function bar(msg) {
	this.msg = msg;
	this.svgWidth = window.innerWidth;
	this.svgHeight = 0.5 * window.innerWidth;
	this.axleX = this.svgWidth - 100;
	this.axleY = this.svgHeight - 50;
	this.axleColor = '#000';
	this.svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
	this.rectColor = ['#18c', '#acf', '#239', '#90EE90', '#C0FF3E', '#aaa', '#EE9A00', '#00BFFF', '#6eba3c'];
}

bar.prototype.createAxle = function () {

	this.svg.setAttribute('width', this.svgWidth);
	this.svg.setAttribute('height', this.svgHeight);

	var polylineX = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
	var drawPolylineX = (this.axleX + 42) + ',' + (this.svgHeight - 30) + ' ' +
		(this.axleX + 50) + ',' + (this.svgHeight - 25) + ' ' +
		(this.axleX + 42) + ',' + (this.svgHeight - 20);
	polylineX.setAttribute('points', drawPolylineX);
	polylineX.setAttribute('style', 'fill:#fff;' + 'stroke:' + this.axleColor + ';stroke-width:1');
	this.svg.appendChild(polylineX);

	var lineX = document.createElementNS('http://www.w3.org/2000/svg', 'line');
	lineX.setAttribute('x1', '50');
	lineX.setAttribute('y1', this.axleY + 25);
	lineX.setAttribute('x2', this.axleX + 50);
	lineX.setAttribute('y2', this.axleY + 25);
	lineX.setAttribute('style', 'stroke:' + this.axleColor + ';stroke-width:1');
	this.svg.appendChild(lineX);

	var polylineY = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
	var drawPolylineY = 55 + ',' + 33 + ' ' +
		50 + ',' + 25 + ' ' +
		45 + ',' + 33;
	polylineY.setAttribute('points', drawPolylineY);
	polylineY.setAttribute('style', 'fill:#fff;' + 'stroke:' + this.axleColor + ';stroke-width:1');
	this.svg.appendChild(polylineY);

	var lineY = document.createElementNS('http://www.w3.org/2000/svg', 'line');
	lineY.setAttribute('x1', '50');
	lineY.setAttribute('y1', this.axleY + 25);
	lineY.setAttribute('x2', '50');
	lineY.setAttribute('y2', '25');
	lineY.setAttribute('style', 'stroke-width:1;stroke:' + this.axleColor);
	this.svg.appendChild(lineY);


}

bar.prototype.updataData = function (position) {
	var mSale = this.msg.sale;
	var max = 0;
	for (let i = 0; i < mSale.length; i++) {
		if (mSale[i] > max) {
			max = mSale[i];
		}
	}
	var scale = (0.9 * this.axleY) / max;
	var tempList = new Array();
	for (let i = 0; i < mSale.length; i++) {
		tempList[i] = mSale[i] * scale;
	}

	let g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
	g.setAttribute('transform', 'translate(50, 50)');
	// 单个柱子的空间 
	let spacing = this.axleX / tempList.length;

	let width = spacing / 2 > 20 ? 20 : spacing / 2;
	let leftSpace = (spacing - width) / 2;
	for (let i = 0; i < tempList.length; i++) {
		let rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
		rect.setAttribute('x', spacing * i + leftSpace);
		rect.setAttribute('y', this.axleY - tempList[i] - 26)
		rect.setAttribute('width', width);
		rect.setAttribute('height', tempList[i]);
		rect.setAttribute('style', 'fill:' + this.rectColor[position]);
		g.appendChild(rect);
	}
	return g;
}
//展示所有的柱状图
bar.prototype.createBar = function () {
	var msg = this.msg;
	var trs = document.getElementById('table-wrapper').getElementsByTagName('tr');
	var listMsg = new Array();
	var max = 0;

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
					listMsg[i - 1] = mSale;
				}
			}
		}
	}
	var scale = (0.9 * this.axleY) / max;
	var tempList = new Array();
	for (let i = 0; i < listMsg.length; i++) {
		tempList[i] = new Array();
		for (let j = 0; j < listMsg[i].length; j++) {
			tempList[i][j] = listMsg[i][j] * scale;
		}
	}
	var gs = new Array();
	for (let i = 0; i < tempList.length; i++) {
		let g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
		g.setAttribute('transform', 'translate(50, 50)');
		// 一个区块的大小
		let spacing = this.axleX / tempList[i].length;
		// 每个区块中每个柱子的宽度
		let leftSpace = (spacing - 20 * tempList.length) / 2 > 5 ? (spacing - 20 * tempList.length) / 2 : 5;
		let width = (spacing - 20 * tempList.length) / 2 > 5 ? 20 : ((spacing - 10) / tempList.length);

		for (let j = 0; j < tempList[i].length; j++) {
			let rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
			rect.setAttribute('x', spacing * j + width * i + leftSpace);
			rect.setAttribute('y', this.axleY - tempList[i][j] - 26);
			rect.setAttribute('width', width);
			rect.setAttribute('height', tempList[i][j]);
			rect.setAttribute('style', 'fill:' + this.rectColor[i]);
			g.appendChild(rect);
		}
		gs[i] = g;
	}

	return gs;
}

bar.prototype.updataBar = function () {
	var lastSvg = document.getElementsByTagName('svg')[0];

	var body = document.getElementsByTagName('body')[0];
	if (lastSvg) {
		body.removeChild(lastSvg);
	}
	var table = document.getElementById('table-wrapper');
	body.insertBefore(this.svg, table);
}

bar.prototype.mouseOver = function (position) {
	this.createAxle();
	this.svg.appendChild(this.updataData(position));
	this.updataBar();
}

bar.prototype.mouseOut = function () {
	this.createAxle();
	var gs = this.createBar()
	for (let i = 0; i < gs.length; i++) {
		this.svg.appendChild(gs[i]);
	}
	this.updataBar();
}