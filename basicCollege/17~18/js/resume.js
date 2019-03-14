var btn = document.getElementById("btn");
var hide = document.getElementById("hide");
var none = document.getElementById("none");

get.onmouseover = function(){
	hide.style.left = "0";
}
hide.onmouseout = function(event){
	var e = event || window.event;
	var s =  e.relatedTarget;
    var reg = this.compareDocumentPosition(s);
	if (!(reg ==0 || reg == 20) ) {
		hide.style.left = "-200px";
		none.innerHTML = "";
	}
}

btn.onmousedown = function(){
	btn.className = "on";
	none.innerHTML = "铛铛里铛铛,这就是一个什么都没有的小彩蛋";
}
btn.onmouseup = function(){
	btn.className = "";
}

window.onload = function(){
	var myDate = new Date();
	var myHours = myDate.getHours();
	if (myHours > 5 && myHours < 9) {
		alert("早上好呀");
	} else if (myHours > 8 && myHours < 12) {
		alert("上午好哟");
	} else if (myHours > 11 && myHours < 14) {
		alert("午安呀");
	} else if (myHours > 13 && myHours < 17) {
		alert("下午好哟");
	} else if (myHours > 16 && myHours < 23) {
		alert("晚上好呀");
	} else if ((myHours > 22 && myHours < 25) || (myHours >= 0 && myHours < 6)) {
		alert("深夜啦");
	}
}