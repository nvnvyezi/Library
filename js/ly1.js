function $(id){
	return document.getElementById(id);
}
var pageone = (function(){
	var page1 = $('page1'),go = $('go'),button =$('button');
	var temp = true;
	function encapsulation(){
		widescreen = document.documentElement.clientWidth;
		heightscreen = document.documentElement.clientHeight;
	}
	encapsulation();
	button.onclick = function(){
		setTimeout(function(){
			// go.style.display = 'none';
			// move();
			self.location.href='ly.html';
		},500);
	};
	setTimeout(function(){
		go.style.display = 'block';
	},125);
	// function move(){
	// 	var movewidth = widescreen/100;
	// 	movewidth = Math.round(movewidth);
	// 	var moveleft = nvnv.offsetLeft;
	// 	encapsulation();
	// 	var movex = -movewidth;
	// 	var timer = setInterval(function(){
	// 		if(Math.abs(moveleft) <= (widescreen-40)){
	// 			moveleft = nvnv.offsetLeft;
	// 			nvnv.style.marginLeft = movex + 'px';
	// 			movex += -movewidth;
	// 			movex = Math.round(movex);
	// 		}else{
	// 			clearInterval(timer);
	// 			temp = false;
	// 			yezi.style.overflow = 'visible';
	// 			nvnv.style.marginLeft = (movex+16.2) + 'px';
	// 			// page1.style.display = 'none';
	// 			// page2.style.display = 'block';
	// 		}
	// 	},30);
	// }
})();
var widthheight = (function(){
	var page1 = $('page1');
	widescreen = document.documentElement.clientWidth;
	heightscreen = document.documentElement.clientHeight;
	page1.style.width = widescreen +'px';
	page1.style.height = heightscreen + 'px';
})();
if(event.clientX<=0 && event.clientY<0) {

alert("关闭");

}

else

{

alert("刷新或离开");

}