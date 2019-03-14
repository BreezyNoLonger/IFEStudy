
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
    myTable.setAttribute('border', '0');
    // 对第一列中重复的行进行删除及统计重复数量，其中position用于存储对列的合并行数
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
        let dataTr = document.createElement('tr');
        if (i !== 0) {
            if (list[0][0] === '地区') {
                let j = i;
                let flag = 1;
                while (list[j].length !== list[0].length) {
                    j--;
                    flag = 0;
                }
                dataTr.setAttribute('region', list[j][0]);
                dataTr.setAttribute('product', list[i][flag]);
            } else if (list[0][0] === '商品') {
                let j = i;
                let flag = 1;
                while (list[j].length !== list[0].length) {
                    j--;
                    flag = 0;
                }
                dataTr.setAttribute('region', list[i][flag]);
                dataTr.setAttribute('product', list[j][0]);
            }
        }
        
        for (let j = 0; j < list[i].length; j++) {
            let dataTd = document.createElement('td');
            if (j === 0 && typeof position[i] == 'number') {
            	dataTd.setAttribute('rowspan', position[i]);
            }
            dataTd.innerHTML = list[i][j];
            dataTr.appendChild(dataTd);
        }
        setMouseOut(dataTr);
        myTable.appendChild(dataTr);
    }
    tableWrapper.appendChild(myTable);

    var bar1 = new bar(sourceData);
    bar1.mouseOut();
    var line1 = new line(sourceData);
    line1.mosueOut();

    setMouseOver(myTable);
    setMouseLeave(myTable);
    setTdClick(myTable);
}

function setMouseOver(targ) {
    targ.onmouseover = function(event) {
        var e = event || window.event;
        var tg = e.target;
        if (tg.tagName === 'TD' ) {
            if (Number(tg.innerHTML)) {
                let hinSpan = document.createElement('span');
                hinSpan.innerHTML = '编辑';
                tg.appendChild(hinSpan);
            }
            
            tg = tg.parentNode;
            let trs = document.getElementById('table-wrapper').getElementsByTagName('tr');

            for (let i = 0; i < sourceData.length; i++) {
                if (sourceData[i].product === tg.getAttribute('product')) {
                    if (sourceData[i].region === tg.getAttribute('region')) {
                        let position = 0;
                        for (let j = 1; j < trs.length; j++) {
                            if (tg == trs[j]) {
                                position = j - 1;
                            }
                        }
                        let bar1 = new bar(sourceData[i]);
                        bar1.mouseOver(position);
                        let line1 = new line(sourceData[i]);
                        line1.mosueOver(position);
                    }
                }
            }
        }
    }
}

function setMouseLeave(targ) {
    targ.onmouseleave = function() {
        var bar1 = new bar(sourceData);
        bar1.mouseOut();
        var line1 = new line(sourceData);
        line1.mosueOut();
    }

    
}

function setMouseOut(targ) {
    targ.onmouseout = function(event) {
        var e = event || window.event;
        var tg = e.target;
        if (tg.tagName === 'TD') {
            let s =  e.relatedTarget;
            let reg = tg.compareDocumentPosition(s);
            if (!(reg == 0 || reg == 20)) {
                if(tg.innerHTML.indexOf('span') !== -1) {
                    let tdCNs = tg.childNodes;
                    for (let i = 0; i < tdCNs.length; i++) {
                        if (tdCNs[i].tagName === 'SPAN') {
                            tg.removeChild(tdCNs[i]);
                        }
                    }
                }
            }
        }
        if (tg.tagName === 'SPAN') {
            tg.parentNode.removeChild(tg);
        }
    }
}

function setTdClick(targ) {
    targ.onclick = function(event) {
        var e = event || window.event;
        var tg = e.target;
        if (tg.tagName === 'TD' ) {
            let tr = tg.parentNode;
            tg.setAttribute('style', 'padding:0');
            if (tr.getAttribute('region')) {
                let trCNs = tr.childNodes;
                for (let i = 0; i < trCNs.length; i++) {
                    if (trCNs[i].getAttribute('have-text')) {

                    }
                }
                for (let i = 0; i < trCNs.length; i++) {
                    // 当tr的某个子元素与被点击元素相同时
                    if (trCNs[i] === tg) {
                        // 创建输入框，确定及取消按钮
                        let lastText = parseInt(tg.innerHTML);
                        let dataText = document.createElement('input');
                        dataText.setAttribute('type', 'text');
                        dataText.setAttribute('value', lastText);
                        // 失去焦点时
                        dataText.onblur = function() {
                            tg.innerHTML = lastText;
                            tg.removeAttribute('style');
                        }
                        // 按下按键时
                        dataText.onkeydown = function(event) {
                            var e = event || window.event || arguments.callee.caller.arguments[0];
                            var keyCode = e.keyCode;
                            if (keyCode === 13 || keyCode === 108) {
                                var nowText = tg.getElementsByTagName('input')[0].value;
                                tg.innerHTML = nowText;
                                tg.removeAttribute('style');
                            } else if (keyCode === 27){
                                tg.innerHTML = lastText;
                                tg.removeAttribute('style');
                            } else if ((keyCode >= 65 && keyCode <= 90) ||
                                (keyCode >= 106 && keyCode <= 111 && keyCode !== 108) ||
                                (keyCode >= 186 && keyCode <= 222)) {
                                alert('只能输入数字哦');
                            }
                        }

                        let rightBtn = document.createElement('button');
                        rightBtn.innerHTML = '确定';
                        rightBtn.onmousedown = function() {
                            var nowText = tg.getElementsByTagName('input')[0].value;
                            tg.innerHTML = nowText;
                            tg.removeAttribute('style');
                        }

                        let escBtn = document.createElement('button');
                        escBtn.innerHTML = '取消';
                        // 删除td所有的子元素
                        let tdCNs = tg.childNodes;
                        while(tdCNs.length > 0) {
                            tg.removeChild(tdCNs[0]);
                        }
                        // 在td内创建新的子元素并聚焦
                        tg.appendChild(dataText);
                        tg.appendChild(rightBtn);
                        tg.appendChild(escBtn);
                        dataText.focus();
                    }
                }
            }
        }
    }
}
