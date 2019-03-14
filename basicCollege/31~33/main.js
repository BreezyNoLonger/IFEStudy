function groupCheckbox(wrapperName, groupC) {
	this.wrapperName = wrapperName;
	this.groupC = groupC;
}

groupCheckbox.prototype.createCheckbox = function() {
	var selectAll = document.createElement('input');
	selectAll.type = 'checkbox';
	selectAll.value = 'all';
	selectAll.setAttribute('checkbox-type', 'all');

	var labelAll = document.createElement('label');
	labelAll.appendChild(selectAll);
	labelAll.setAttribute('checkbox-type', 'all');
	var textAll = document.createTextNode('全选');
	labelAll.appendChild(textAll);

	var oDiv = document.createElement('div');
	oDiv.appendChild(labelAll);
	
	for (let i = 0; i < this.groupC.length; i++) {
		var oCheckbox = document.createElement('input');
		oCheckbox.type = 'checkbox';
		oCheckbox.value = this.groupC[i];
		oCheckbox.setAttribute('checkbox-type', 'child');
		if (i == 0) {
			oCheckbox.setAttribute('checked', 'true')
		}

		var oLabel = document.createElement('label');
		oLabel.appendChild(oCheckbox);
		oLabel.setAttribute('checkbox-type', 'child');
		var text = document.createTextNode(this.groupC[i]);
		oLabel.appendChild(text);

		oDiv.appendChild(oLabel);
	}

	var thisWrapper = document.getElementById(this.wrapperName);
	thisWrapper.innerHTML = oDiv.innerHTML;

	thisWrapper.onclick = function(event) {
		var e = event || window.event;
		var tg = e.target;
		if (tg.tagName === 'INPUT' || 'LABEL') {
			var checkboxType = tg.getAttribute('checkbox-type');
			var allCheckbox = thisWrapper.getElementsByTagName('input');
			var count = 0;
			if (checkboxType === 'all') {
				for (let i = 0; i < allCheckbox.length; i++) {
					allCheckbox[i].checked = true;
				}
			} else {
				for (let i = 1; i < allCheckbox.length; i++) {
					if (allCheckbox[i].checked === true) {
						count++;
					}
				}
				if (count === 0) {
					return false;
				} else if (count === 3) {
					allCheckbox[0].checked = true;
				} else {
					allCheckbox[0].checked = false;
				}
			}
			newTable();
		}
	}
}

var region = new groupCheckbox('region-radio-wrapper', ['华东', '华南', '华北']);
var product = new groupCheckbox('product-radio-wrapper', ['手机', '笔记本', '智能音箱']);
region.createCheckbox();
product.createCheckbox();

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
// 获取数据
function getData() {
	var list = new Array();
	var tableHeadList = ['商品', '地区',
        '1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];
    list.push(tableHeadList);
	var regionRadio = document.getElementById('region-radio-wrapper').getElementsByTagName('input');
	var productRadio = document.getElementById('product-radio-wrapper').getElementsByTagName('input');
	// 对两组中各有几个checkbox被选中进行计数
	var countRegion = 0;
	var countProduct = 0;
	for (let i = 0; i < sourceData.length; i++) {
		for (let j = 1; j < regionRadio.length; j++) {
			if (regionRadio[j].checked === true) {
				countRegion++;
				for (let k = 1; k < productRadio.length; k++) {
					if (productRadio[k].checked === true) {
						countProduct++;
						if (sourceData[i].region === regionRadio[j].value) {
							if (sourceData[i].product === productRadio[k].value) {
								let tempList = new Array();
								for (let l in sourceData[i]) {
           							if (l == 'sale') {
					                	for (let m = 0; m < sourceData[i][l].length; m++) {
					                		tempList.push(sourceData[i][l][m]);
        	    	    				}
						                continue;
						            } 
            						tempList.push(sourceData[i][l]);
		        				}
								list.push(tempList);
							}
                				
						}
					}
				}
			}
		}
	}
	countRegion /= sourceData.length;
	countProduct /= sourceData.length;
	if (countRegion === 1) {
		if (countProduct > 1) {
			for (let i = 0; i < list.length; i++) {
				let temp = list[i][0];
				list[i][0] = list[i][1];
				list[i][1] = temp;
			}
		}
	}
	return list;
}
//渲染新的表格
function newTable() {
	var list = getData();
	var tableWrapper = document.getElementById('table-wrapper');
	var myTable = document.createElement('table');
    tableWrapper.innerHTML = '';
    myTable.setAttribute('border', '1');
    // 对第一列中重复的行进行删除及统计重复数量
    var temp;
    var position = new Array();
    var count = 0;
    for (let i = 1; i < list.length; i++) {
    	if (temp !== list[i][0]) {
			temp = list[i][0];
			count = 0;
		} else {
			list[i].shift();
			count++;
		}
		position[i-count] = count + 1;
    }

    for (let i = 0; i < list.length; i++) {
        var dataTr = document.createElement('tr');
        for (let j = 0; j < list[i].length; j++) {
            let dataTd = document.createElement('td');
            if (j === 0 && typeof position[i] == 'number') {
            	dataTd.setAttribute('rowspan', position[i]);
            }
            dataTd.innerHTML = list[i][j];
            dataTr.appendChild(dataTd);
        }
        myTable.appendChild(dataTr);
    }
    tableWrapper.appendChild(myTable);
}
newTable();