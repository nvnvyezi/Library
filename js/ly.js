function $(id){
	return document.getElementById(id);
}
// var pageone = (function(){
// 	var page1 = $('page1'),page2 = $('page2'),go = $('go'),button =$('button'),nvnv =$('nvnv'),yezi = $ ('yezi');
// 	var temp = true;
// 	function encapsulation(){
// 		widescreen = document.documentElement.clientWidth;
// 		heightscreen = document.documentElement.clientHeight;
// 	}
// 	encapsulation();
// 	button.onclick = function(){
// 		setTimeout(function(){
// 			go.style.display = 'none';
// 			move();
// 		},500);
// 	};
// 	setTimeout(function(){
// 		go.style.display = 'block';
// 	},125);
// 	function move(){
// 		var movewidth = widescreen/100;
// 		movewidth = Math.round(movewidth);
// 		var moveleft = nvnv.offsetLeft;
// 		encapsulation();
// 		var movex = -movewidth;
// 		var timer = setInterval(function(){
// 			if(Math.abs(moveleft) <= (widescreen-40)){
// 				moveleft = nvnv.offsetLeft;
// 				nvnv.style.marginLeft = movex + 'px';
// 				movex += -movewidth;
// 				movex = Math.round(movex);
// 			}else{
// 				clearInterval(timer);
// 				temp = false;
// 				yezi.style.overflow = 'visible';
// 				nvnv.style.marginLeft = (movex+16.2) + 'px';
// 				// page1.style.display = 'none';
// 				// page2.style.display = 'block';
// 			}
// 		},30);
// 	}          //控制ly1.html动画
// })();
var ReadCookie = function(cookieName) {				//读取cookie
    var theCookie = "" + document.cookie;
    var ind = theCookie.indexOf(cookieName);
    if(ind==-1 || cookieName=="") return "";
    var ind1 = theCookie.indexOf(';',ind);
    if(ind1==-1) ind1 = theCookie.length;
    /*读取Cookie值*/
    return unescape(theCookie.substring(ind+cookieName.length+1,ind1)); 		
};
var DelCookie=function(name){ 		//删除cookie
	var exp = new Date();
	exp.setTime(exp.getTime() - 10000);
	var cval=ReadCookie(name);
	if(cval!=null)
	document.cookie= name + "="+cval+";expires="+exp.toGMTString();
};
var JudgeLogin = false;     //判断保持登录的条件
var JUDGEPage = function(){               //保持登陆
	var JudgeLogin = ReadCookie('JUDGE');
	if(JudgeLogin){
		var Keyload = ReadCookie('KEY');
		Login2(Keyload);
	}
};
var pagetwo =(function(){ 			 //轮播图
	var index = 0;
	var photoArr = [               
	{
		"height":220,
		"top":40,
		"left":40,
		"opacity":0.4,
		"zIndex":3
	},
	{
		"height":260,
		"top":20,
		"left":120,
		"opacity":0.8,
		"zIndex":4
	},
	{
		"height":300,
		"top":0,
		"left":240,
		"opacity":1,
		"zIndex":5
	},
	{
		"height":260,
		"top":20,
		"left":360,
		"opacity":0.8,
		"zIndex":4
	},
	{
		"height":220,
		"top":40,
		"left":440,
		"opacity":0.4,
		"zIndex":3
	},
	];
	var temp = true;
	var left = $('left'),right = $('right'),main= $("Carousel"),ul = main.children[0],lis = ul.children;
	tianjia();
	left.onclick = function(){
		if(temp){
			temp = false;
			var apop = photoArr.pop();
			photoArr.unshift(apop);
			tianjia();
			index--;
			if(index == -1){
				index=4;
			}
			movelittle();
		}
	};
	right.onclick = function(){
		if(temp){
			temp = false;
			var atop = photoArr.shift();
			photoArr.push(atop);
			tianjia();
			index++;
			movelittle();
			if(index == 4){
				index = -1;
			}
		}
	};
	function move(){ 
		timer2 = setInterval(function(){
			if(temp){
				temp = false;
				var atop = photoArr.shift();
				photoArr.push(atop);
				tianjia();
				if(index == 4){
					index = -1;
				}
				index++;
				movelittle();
				if(index == 4){
					index = -1;
				}
			}
		},3000);
	}
	move();
	main.onmouseover = function(){
		clearInterval(timer2);
	};
	main.onmouseout = function(){
		move();
	};
	function tianjia() {
		for (var i = 0; i < lis.length; i++) {
			animate(lis[i],photoArr[i],function(){
				temp = true;
			});
		}
	}
	function animate(obj,json,fn){
		clearInterval(obj.timer);
		obj.timer = setInterval(function(){
			var flog = true;
			for(k in json){
				if(k==='zIndex'){
					obj.style[k]=json[k];
				}else if(k==='opacity'){
					var leader = getStyle(obj,k)*100;
					var targrt = json[k]*100;
					var step = (targrt - leader)/10;
					step = step > 0?Math.ceil(step):Math.floor((step));
					leader = leader + step;
					obj.style[k]=leader/100;
				}else {
					var leader = parseInt(getStyle(obj,k)) || 0;
					var targrt = json[k];
					var step = (targrt - leader)/10;
					step = step >0?Math.ceil(step):Math.floor(step);
					leader = leader + step;
					obj.style[k] = leader + "px";
				}
				if(leader !== targrt){
					flog = false;
				}
			}
			if(flog){
				clearInterval(obj.timer);
				if(fn){
					fn();
				}
			}
		},30);
	}
	function getStyle(obj,attr){
		if(window.getComputedStyle){
			return window.getComputedStyle(obj,null)[attr];
		}else {
			return obj.currentStyle[attr];
		}
	}
	var ul2 = document.getElementById('ul2');
	var li = ul2.children;
	function movelittle() {
		for(var i = 0;i<li.length;i++){
			if(i==index){
				li[i].className = 'en';
			}else {
				li[i].className = '';
			}
		}
	}
	for(var i=0;i<li.length;i++){
		li[i].onclick = function(e){
			return function(){
				var sum = e-index;
				if(sum>0){
					for (var j = 0; j < sum; j++) {
							var atop = photoArr.shift();
							photoArr.push(atop);
					}
				}
				if(sum<0){
					for (var j = 0; j < Math.abs(sum); j++) {
						var apop = photoArr.pop();
						photoArr.unshift(apop);
					}
				}
				if(temp){
					temp = false;
					tianjia();
				}
				index = e;
				movelittle();
			};
		}(i);
	}
})();
var login = (function(){       //登陆以及退出
	var nvnv=$('nvnv'),we = $('we'),we1 = $('we1'),we2= $('we2'),login1 = $('login1'),login2 = $('login'),page2 = $('page2');
	we.style.display = 'none';
	var judge = true;
	login2.onclick = function(){
		if(judge){
			var judgel = ReadCookie('JUDGE');
			if(judgel){
				we.style.display = 'none';
				page2.style.opacity = 1;
				DelCookie("JUDGE");
				DelCookie("USERNAME");
				DelCookie("KEY");
				location.reload();
			}else {
				we1.value ="用户名";
				we2.value = "密码";
				we.style.display = 'block';
				page2.style.opacity = 0.2;
				judge=false;
				return;
			}
		}
		if(!judge){
			we.style.display = 'none';
			page2.style.opacity = 1;
			judge =true;
		}
	};
	we.addEventListener('click', function(e){
		var target = e.target;
		switch (target.id) {
			case 'we1':kong(we1);break;
			case 'we2':kong(we2);break;
			case 'login1':Login1();break;
		}
	});
	 function kong(id){
	 	if(id.value == '用户名'|| id.value == '密码'){
			id.value = "";
		}
	}
	function checkNumber(str){
		var reg = /^[0-9]+.?[0-9]*$/;
		if(reg.test(str) && str.length ==8){
			return true;
		}
		return false;
	}
	function checkpassword(str){
		var patrn=/^(\w){6,20}$/;  
		if(patrn.exec(str)){
			return true;
		}
		return false;
	}
	function Login1(){
		var str1,str2;
		str1 = we1.value;
		str2 = we2.value;
		if(checkNumber(str1)&&checkpassword(str2)){
		    var script = document.createElement('script');
		    script.type = 'text/javascript';
		    script.src = 'https://api.xiyoumobile.com/xiyoulibv2/user/login?callback=today';
		    script.src = addUrl(script.src,'password',str2,'username',str1);
		    document.body.insertBefore(script,document.body.firstChild);
		    function addUrl(url,word,str2,name,str1){
		        url += url.indexOf('?')==-1?'?':'&';
		        url += name + '=' + str1;
		        url += url.indexOf('?')==-1?'?':'&';
		        url += word + '=' + str2;
		        return url;
	        }
	    }else {
	    	alert("密码或用户名错误");
	    }
	}
})();
var Login2=	function(str){		//获取个人信息
	var script = document.createElement('script');
	script.type = 'text/javascript';
	script.src = 'https://api.xiyoumobile.com/xiyoulibv2/user/info?callback=exitlogin';
	script.src = addUrl(script.src,'session',str);
	document.body.insertBefore(script,document.body.firstChild);
	function addUrl(url,name,str1){
		url += url.indexOf('?')==-1?'?':'&';
		url += name + '=' + str1;
		return url;
 	}    
};
var exitlogin = function(str){   //退出登陆界面以及处理个人信息
	var we=$('we'),page2 =$('page2'),login = $('login'),userName=$('Name');
	we.style.display = 'none';
	page2.style.opacity = 1;
	login.innerHTML='退出';
	userName.innerText = str.Detail.Department+" "+str.Detail.Name+" "+str.Detail.ID;
};
var today=function(str){     //登陆处理函数
	var RESULT = str.Result;
	var secretkey = str.Detail;
	if(!RESULT){
		alert("密码或用户名错误");
	}
	else{
		JudgeLogin = true;
		Login2(secretkey);
		transmit(secretkey);
	}
};
var transmit = function(SecretKey){     //cookie存储
	var Key = SecretKey;
	var Judge = JudgeLogin,we1 = $("we1");
	var username = we1.value;
	function SetCookie(cookieName,cookieValue,nDays) {
	    /*当前日期*/
	    var today = new Date();
	    /*Cookie过期时间*/
	    var expire = new Date();
	    /*如果未设置nDays参数或者nDays为0，取默认值1*/
	    if(nDays == null || nDays == 0) nDays = 1;
	    /*计算Cookie过期时间*/
	    expire.setTime(today.getTime() + 3600000 * 24 * nDays);
	    /*设置Cookie值*/
	    document.cookie = cookieName + "=" + escape(cookieValue)
	        + ";expires=" + expire.toGMTString();
	}
	function login() {
	    SetCookie("KEY",Key,1);
	    SetCookie("JUDGE",Judge,1);
	    SetCookie("USERNAME",username,1);
	}
	login();
};
var widthheight = function(){			 //设置页面宽高
	var nvnv = $('nvnv'),page2 = $('page2'),yezi = $('yezi');
	widescreen = document.documentElement.clientWidth;
	heightscreen = document.documentElement.clientHeight;
	// page1.style.width = widescreen +'px';
	// page1.style.height = heightscreen + 'px';
	yezi.style.width = widescreen +'px';
	yezi.style.height = heightscreen + 'px';
	nvnv.style.width = widescreen +'px';
	nvnv.style.height = heightscreen + 'px';      	
	page2.style.width = widescreen +'px';
	page2.style.height = heightscreen + 'px'; 
};
var Borrowed = (function(){
	var script = document.createElement('script');
	script.type = 'text/javascript';
	script.src = 'https://api.xiyoumobile.com/xiyoulibv2/book/rank?callback=Fnborrowed';
	script.src = addUrl(script.src,'size',20);
	document.body.insertBefore(script,document.body.firstChild);
	function addUrl(url,name,str1){
		url += url.indexOf('?')==-1?'?':'&';
		url += name + '=' + str1;
		return url;
 	}    
})();
var Fnborrowed = function(arr){     //处理借阅（图书推荐）
	var arr1 = eval(arr.Detail);
	cul(arr1);
};
var cul = function(arr){				//创建图书推荐
	var ul = cdiv('ul'),div = $("block3");
	div.appendChild(ul);
	for (var i = 0; i < arr.length; i++) {
		var li = cdiv("li");
		ul.appendChild(li);
		var span = cdiv("span");
		span.innerText = arr[i].Rank;
		li.appendChild(span);
		var a = cdiv("a");
		a.innerText = "《"+arr[i].Title+"》";
		span.appendChild(a);
	}
};
var cdiv = function(id){                //动态创建div
	return document.createElement(id);
};
window.onload = function(){
	widthheight();
	JUDGEPage();
};
window.onresize = function(){
	widthheight();
};