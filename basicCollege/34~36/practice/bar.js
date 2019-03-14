function createHistogram(msg) {
	var svgWidth = 700;
	var svgHeight = 400;
	var axleX = 600;
	var axleY = 300;
	var axleColor = '#000';
	var rectColor = '#acf';

	var mSale = msg.sale;
	var max = 0;
	for (let i = 0; i < mSale.length; i++) {
		if (mSale[i] > max) {
			max = mSale[i];
		}
	}
	var scale = (2/3 * axleY) / max;
	var tempList = new Array();
	for (let i = 0; i < mSale.length; i++) {
		tempList[i] = mSale[i] * scale;
	}

	var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
	svg.setAttribute('width', svgWidth);
	svg.setAttribute('height', svgHeight);

	var polylineX = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
	var drawPolylineX = (axleX + 42) + ',' + (svgHeight - 55) + ' ' + 
						(axleX + 50) + ',' + (svgHeight - 50) + ' ' +
						(axleX + 42) + ',' + (svgHeight - 45);
	polylineX.setAttribute('points', drawPolylineX);
	polylineX.setAttribute('style', 'fill:#fff;' + 'stroke:' + axleColor + ';stroke-width:1');
	svg.appendChild(polylineX);
	
	var lineX = document.createElementNS('http://www.w3.org/2000/svg', 'line');
	lineX.setAttribute('x1', '50');
	lineX.setAttribute('y1', axleY + 50);
	lineX.setAttribute('x2', axleX + 50);
	lineX.setAttribute('y2', axleY + 50);
	lineX.setAttribute('style', 'stroke:' + axleColor + ';stroke-width:1');
	svg.appendChild(lineX);

	var polylineY = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
	var drawPolylineY = 55 + ',' + 58 + ' ' + 
						50 + ',' + 50 + ' ' +
						45 + ',' + 58;
	polylineY.setAttribute('points', drawPolylineY);
	polylineY.setAttribute('style', 'fill:#fff;' + 'stroke:' + axleColor + ';stroke-width:1');
	svg.appendChild(polylineY);

	var lineY = document.createElementNS('http://www.w3.org/2000/svg', 'line');
	lineY.setAttribute('x1', '50');
	lineY.setAttribute('y1', axleY + 50);
	lineY.setAttribute('x2', '50');
	lineY.setAttribute('y2', '50');
	lineY.setAttribute('style', 'stroke-width:1;stroke:' + axleColor);
	svg.appendChild(lineY);

	var g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
	g.setAttribute('transform', 'translate(50, 50)');
	var spacing = axleX / 12 * 95/100;
	for (let i = 0; i < mSale.length; i++) {
		let rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
		rect.setAttribute('x', spacing * (i + 0.5));
		rect.setAttribute('y', axleY - tempList[i])
		rect.setAttribute('width', 20);
		rect.setAttribute('height', tempList[i]);
		rect.setAttribute('style', 'stroke-width:1;fill:' + rectColor + ';stroke:' + axleColor);
		g.appendChild(rect);
	}
	svg.appendChild(g);

	var body = document.getElementsByTagName('body')[0];
	body.appendChild(svg);
}


let sourceData = [{
    product: "手机",
    region: "华东",
    sale: [120, 100, 140, 160, 180, 185, 190, 210, 230, 245, 255, 270]
}, {
    product: "手机",
    region: "华北",
    sale: [80, 70, 90, 110, 130, 145, 150, 160, 170, 185, 190, 200]
}, {
    product: "手机",
    region: "华南",
    sale: [220, 200, 240, 250, 260, 270, 280, 295, 310, 335, 355, 380]
}, {
    product: "笔记本",
    region: "华东",
    sale: [50, 60, 80, 110, 30, 20, 70, 30, 420, 30, 20, 20]
}, {
    product: "笔记本",
    region: "华北",
    sale: [30, 35, 50, 70, 20, 15, 30, 50, 710, 130, 20, 20]
}, {
    product: "笔记本",
    region: "华南",
    sale: [80, 120, 130, 140, 70, 75, 120, 90, 550, 120, 110, 100]
}, {
    product: "智能音箱",
    region: "华东",
    sale: [10, 30, 4, 5, 6, 5, 4, 5, 6, 5, 5, 25]
}, {
    product: "智能音箱",
    region: "华北",
    sale: [15, 50, 15, 15, 12, 11, 11, 12, 12, 14, 12, 40]
}, {
    product: "智能音箱",
    region: "华南",
    sale: [10, 40, 10, 6, 5, 6, 8, 6, 6, 6, 7, 26]
}];

createHistogram(sourceData[0]);