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
			setHash();
			newTable();
		}
	}
}