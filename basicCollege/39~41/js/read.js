function readData() {
	if (localStorage.product) {
		let tempProduct = localStorage.product.split(',');
		let tempRegion = localStorage.region.split(',');
		let tempArr = localStorage.sale.split(',');
		let tempSale = new Array();
		for (let i = 0; i < tempProduct.length; i++) {
			tempSale[i] = new Array();
			for (let j = 0; j < 12; j++) {
				tempSale[i][j] = Number(tempArr[j]);
			}
			for (let j = 0; j < 12; j++) {
				tempArr.shift();
			}
		}
		if (tempSale.length === jsData.length) {
			for (let i = 0; i < jsData.length; i++) {
				sourceData[i] = new Object();
				sourceData[i].product = tempProduct[i];
				sourceData[i].region = tempRegion[i];
				sourceData[i].sale = tempSale[i];
			}
		} else {
			sourceData = jsData;
		}
	} else {
		sourceData = jsData;
	}
	
}
