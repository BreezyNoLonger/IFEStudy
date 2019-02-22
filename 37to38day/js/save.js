function saveData(msg) {
	var data = msg;
	var saveBtn = document.getElementById('save-data');

	saveBtn.onclick = function() {
		var trs = document.getElementById('table-wrapper').getElementsByTagName('tr');
		var trLen = trs.length;
		var dataLen = data.length;
		localStorage.product = '';
		localStorage.region = '';
		localStorage.sale = '';
		for (let i = 0; i < dataLen; i++) {
			let tempObj = new Object();
			let count = 0;
			for (let j = 1; j < trLen; j++) {
				if (data[i].product === trs[j].getAttribute('product')) {
					if (data[i].region === trs[j].getAttribute('region')) {
						let tempArr = new Array();
						let temp = trs[j].childNodes.length === 14 ? 2 : 1;
						for (let k = temp; k < trs[j].childNodes.length; k++) {
							if (Number(trs[j].childNodes[k].innerHTML)) {
								tempArr[k - temp] = Number(trs[j].childNodes[k].innerHTML);
							} else {
								tempArr[k - temp] = Number(trs[j].childNodes[k].childNodes[0].value);
							}
							// tempArr[k - temp] = Number(trs[j].childNodes[k].innerHTML);
						}
						localStorage.product += data[i].product + ',';
						localStorage.region += data[i].region + ',';
						localStorage.sale += tempArr.join() + ',';
						count++;
						break;
					}
				}
			}
			if (count) {
				continue;
			}
			let tempArr = new Array();
			for (let j = 0; j < data[i].sale.length; j++) {
				tempArr[j] = data[i].sale[j];
			}
			localStorage.product += data[i].product + ',';
			localStorage.region += data[i].region + ',';
			localStorage.sale += tempArr.join() + ',';

		}
		localStorage.product = deleteLast(localStorage.product);
		localStorage.region = deleteLast(localStorage.region);
		localStorage.sale = deleteLast(localStorage.sale);
	}
}

function deleteLast(str) {
	if (str.lastIndexOf(',') === str.length - 1) {
		str = str.substr(0, str.length - 1);
	}
	return str;
}