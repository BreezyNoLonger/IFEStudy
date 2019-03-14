const regionSelect = document.querySelector('#region-select');
const tableWrapper = document.querySelector('#table-wrapper');
const productSelect = document.querySelector('#product-select');

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

regionSelect.onchange = function() {
	newTable();
}
productSelect.onchange = function(){
    newTable();
}
//根据select选项获取数据
function getData() {
	var list = new Array();
	for (let i = 0; i < sourceData.length; i++) {
		if (sourceData[i].region === regionSelect.value) {
            if (sourceData[i].product === productSelect.value) {
                list.push(sourceData[i]);
            }
		}
	}
	return list;
}
//渲染新的表格
function newTable() {
	var list = getData();
    var tableHeadList = ['商品', '地区',
        '1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
	var myTable = document.createElement('table');
    var tableHeadTr = document.createElement('tr');
    tableWrapper.innerHTML = '';
    for (let i = 0; i < tableHeadList.length; i++) {
        var tableHeadTd = document.createElement('td');
        tableHeadTd.innerHTML = tableHeadList[i];
        tableHeadTr.appendChild(tableHeadTd);
    }
    myTable.appendChild(tableHeadTr);

    for (let i = 0; i < list.length; i++) {
        var dataTr = document.createElement('tr');
        for (let j in list[i]) {
            let dataTd = document.createElement('td');
            if (j == 'sale') {
                for (let k = 0; k < list[i][j].length; k++) {
                    let dataTd = document.createElement('td');
                    dataTd.innerHTML = list[i][j][k];
                    dataTr.appendChild(dataTd);
                }
                continue;
            } 
            dataTd.innerHTML = list[i][j];
            dataTr.appendChild(dataTd);
            console.log(dataTr)
        }
        myTable.appendChild(dataTr);
    }
    tableWrapper.appendChild(myTable);
}