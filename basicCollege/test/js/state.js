//解析state
function analysisState() {
	var str = decodeURIComponent(window.location.href.split('#')[1]);
	return str.split('-');
}
//渲染
function rendering() {
	var temp = analysisState();
	if (temp.length <= 1) {
		return false;
	}
	var region = new Array();
	var product = new Array();
	var i = 1;
	while(temp[i] !== 'product') {
		region.push(temp[i]);
		i++;
	}
	while(i < temp.length) {
		product.push(temp[i]);
		i++;
	}
	checked(region, product); 
}
//勾选选择框
function checked(region, product) {
	var regionBoxs = document.getElementById('region-radio-wrapper').getElementsByTagName('input');
	var productBoxs = document.getElementById('product-radio-wrapper').getElementsByTagName('input');
	var count = 0;
	for (let i = 0; i < regionBoxs.length; i++) {
		for (let j in region) {
			if (regionBoxs[i].getAttribute('checkbox-type') === 'child') {
				if (region[j] === regionBoxs[i].value) {
					regionBoxs[i].checked = true;
					count++;
					break;
				} else {
					regionBoxs[i].checked = false;
				}
			}
		}
	}
	if (count === regionBoxs.length - 1) {
		regionBoxs[0].checked = true;
	} else {
		regionBoxs[0].checked = false;
	}
	count = 0;
	for (let i = 0; i < productBoxs.length; i++) {
		for (let j in product) {
			if (productBoxs[i].getAttribute('checkbox-type') === 'child') {
				if (product[j] === productBoxs[i].value) {
					productBoxs[i].checked = true;
					count++;
					break;
				} else {
					productBoxs[i].checked = false;
				}
			}
		}
	}
	if (count === productBoxs.length - 1) {
		productBoxs[0].checked = true;
	} else {
		productBoxs[0].checked = false;
	}
}

function setHash() {
	var regionBoxs = document.getElementById('region-radio-wrapper').getElementsByTagName('input');
	var productBoxs = document.getElementById('product-radio-wrapper').getElementsByTagName('input');
	var tempState = 'region';
	for (let i = 0; i < regionBoxs.length; i++) {
		if (regionBoxs[i].getAttribute('checkbox-type') === 'child') {
			if (regionBoxs[i].checked === true) {
				tempState += '-' + regionBoxs[i].getAttribute('value');
			}
		}
	}
	tempState += '-product';
	for (let i = 0; i < productBoxs.length; i++) {
		if (productBoxs[i].getAttribute('checkbox-type') === 'child') {
			if (productBoxs[i].checked === true) {
				tempState += '-' + productBoxs[i].getAttribute('value');
			}
		}
	}
	var thisHref = decodeURIComponent(window.location.href.split('#')[0]);
	var lastState = decodeURIComponent(window.location.href.split('#')[1]);
	if (lastState !== tempState) {
		history.pushState({}, null, thisHref + '#' + tempState);
	}
	console.log('1')
}