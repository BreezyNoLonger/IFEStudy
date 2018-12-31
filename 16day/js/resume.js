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
