function createPolyline(msg) {
	const canvas = document.querySelector('canvas');
	const ctx = canvas.getContext('2d');
	canvas.width = 700;
	canvas.height = 400;

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
	var scaleHeight = new Array();
	for (let i = 0; i < mSale.length; i++) {
		scaleHeight[i] = mSale[i] * scale;
		console.log(scaleHeight[i]);
	}

	ctx.beginPath();
	ctx.moveTo(50, 50);
	ctx.lineTo(50, 50 + axleY);
	ctx.lineTo(50 + axleX, 50 + axleY);
	ctx.stroke();

	ctx.beginPath();
	ctx.moveTo(45, 58);
	ctx.lineTo(50, 50);
	ctx.lineTo(55, 58);
	ctx.stroke();

	ctx.beginPath();
	ctx.moveTo(42 + axleX, 45 + axleY);
	ctx.lineTo(50 + axleX, 50 + axleY);
	ctx.lineTo(42 + axleX, 55 + axleY);
	ctx.stroke();

	const pi = Math.PI;
	var spacing = axleX / 12 * 95/100;
	for (let i = 0; i < mSale.length; i++) {
		ctx.beginPath();
		ctx.arc(spacing * (i + 0.7) + 50, axleY - scaleHeight[i] + 50, 2.5, 0, 2 * pi);
		ctx.fill();
		if (i === mSale.length - 1) {
			continue;
		}
		ctx.beginPath();
		ctx.moveTo(spacing * (i + 0.7) + 50, axleY - scaleHeight[i] + 50);
		ctx.lineTo(spacing * (i + 1 + 0.7) + 50, axleY - scaleHeight[i+1] + 50)
		ctx.stroke();
	}


	

	ctx.beginPath();
	// ctx.
	ctx.stroke();
}

// let sourceData = [{
//     product: "手机",
//     region: "华东",
//     sale: [120, 100, 140, 160, 180, 185, 190, 210, 230, 245, 255, 270]
// }, {
//     product: "手机",
//     region: "华北",
//     sale: [80, 70, 90, 110, 130, 145, 150, 160, 170, 185, 190, 200]
// }, {
//     product: "手机",
//     region: "华南",
//     sale: [220, 200, 240, 250, 260, 270, 280, 295, 310, 335, 355, 380]
// }, {
//     product: "笔记本",
//     region: "华东",
//     sale: [50, 60, 80, 110, 30, 20, 70, 30, 420, 30, 20, 20]
// }, {
//     product: "笔记本",
//     region: "华北",
//     sale: [30, 35, 50, 70, 20, 15, 30, 50, 710, 130, 20, 20]
// }, {
//     product: "笔记本",
//     region: "华南",
//     sale: [80, 120, 130, 140, 70, 75, 120, 90, 550, 120, 110, 100]
// }, {
//     product: "智能音箱",
//     region: "华东",
//     sale: [10, 30, 4, 5, 6, 5, 4, 5, 6, 5, 5, 25]
// }, {
//     product: "智能音箱",
//     region: "华北",
//     sale: [15, 50, 15, 15, 12, 11, 11, 12, 12, 14, 12, 40]
// }, {
//     product: "智能音箱",
//     region: "华南",
//     sale: [10, 40, 10, 6, 5, 6, 8, 6, 6, 6, 7, 26]
// }];

createPolyline(sourceData[0]);