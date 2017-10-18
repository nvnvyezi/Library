var $ = function(id){
	return document.getElementById(id);
};
var ReadCookie = function(cookieName) {				//读取cookie
    var theCookie = "" + document.cookie;
    var ind = theCookie.indexOf(cookieName);
    if(ind==-1 || cookieName=="") return "";
    var ind1 = theCookie.indexOf(';',ind);
    if(ind1==-1) ind1 = theCookie.length;
    /*读取Cookie值*/
    return unescape(theCookie.substring(ind+cookieName.length+1,ind1)); 		
};
var widthheight = function(){		//设置网页宽高
    var page4 = $('page4'),buttonleft=$('buttonleft'),buttonright=$('buttonright');
    widescreen = document.documentElement.clientWidth;
    heightscreen = document.documentElement.clientHeight;
    page4.style.width = widescreen +'px';
    page4.style.height = heightscreen + 'px'; 
};
var Rank = function(arr){     //	添加图书收藏
	var script = document.createElement('script');
	script.type = 'text/javascript';
	script.src = 'https://api.xiyoumobile.com/xiyoulibv2/book/rank?callback=Fnrank&size=20&type=2';
	document.body.insertBefore(script,document.body.firstChild);
};
var Fnrank =function(arr){
	var arr1 = eval(arr.Detail);
	cul(arr1);
};
var cul = function(arr){
	var Now = $('Now');
	var ul = cdiv('ul');
	Now.appendChild(ul);
	for (var i = 0; i < arr.length; i++) {
		var li = cdiv('li');
        ul.appendChild(li);
        var span = cdiv('span');
        span.className = arr[i].ID;
        span.innerText = "排行："+arr[i].Rank+' 书名：《'+arr[i].Title+"》 " +"次数："+arr[i].BorNum;
        li.appendChild(span);
	}
	Detailed();
};
var Detailed = function(){				//详细信息的处理
	var arrspan = $("Now").getElementsByTagName('span');
	for (var i = 0; i < arrspan.length; i++) {
		arrspan[i].onclick = function(e){
			return function(){
				Pagefourrequest(arrspan[e].className);
			};
		}(i);
	}
};
var Pagefourrequest = function(str){
	var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://api.xiyoumobile.com/xiyoulibv2/book/detail/id';
	script.src = addUrl(script.src,str,"callback","FnDetailed");
	function addUrl(url,str1,name1,str2){
        url += url.indexOf('?')==-1?'/':'&';
        url += '/' + str1;
        url += url.indexOf('?')==-1?'?':'&';
        url += name1 + '=' + str2;
        return url;
   }
   document.body.insertBefore(script,document.body.firstChild);
};
var FnDetailed = function(str){						//详细信息回掉
	var idd=$('Now');
	idd.removeChild(idd.children[1]);
	var img = cdiv('img');
	if(str.Detail.DoubanInfo){
		img.src= str.Detail.DoubanInfo.Images.medium;
	}else {
		img.src= "./i/no.jpg";
	}
	idd.appendChild(img);
	cp("书名：",str.Detail.Title);
	cp("作者：",str.Detail.Author);
	if(str.Detail.DoubanInfo){
		cp("图书简介：",str.Detail.DoubanInfo.Summary);
		cp("作者简介：",str.Detail.DoubanInfo.Author_Info);
		cp("页数：",str.Detail.DoubanInfo.Pages);
		cp("装订类型：",str.Detail.DoubanInfo.Binding);
		cp("出版日期：",str.Detail.DoubanInfo.PubDate);
	}
	cp("出版信息：",str.Detail.Pub);
	cp("藏书数量：",str.Detail.Total);
	cp("可借数量：",str.Detail.Avaliable);
	cp("收藏次数：",str.Detail.FavTimes);
	var button = cdiv('button');
	button.innerText = "收藏图书";
	button.id="buttonaddfav";
	idd.appendChild(button);
	var button1 = cdiv('button');
	button1.innerText = "返回上一页";
	button1.id="buttonexit";
	idd.appendChild(button1);
 	var buttonaddfav= $('buttonaddfav'),buttonexit=$("buttonexit");
 	buttonexit.onclick = function(){
 		location.href = "Retrievalranking.html";
 	};
 	buttonaddfav.onclick = function(){
 		Addfav(str.Detail.ID);
 	};
};
var cp = function(Tilte,arr){				//创建图书详细信息
	var idd=$('Now');
	var p = cdiv('p');
	p.innerText = Tilte + arr;
	idd.appendChild(p);
};
var Addfav = function(arr){     //	添加图书收藏
	var session = ReadCookie("KEY");
	var script = document.createElement('script');
	script.type = 'text/javascript';
	script.src = 'https://api.xiyoumobile.com/xiyoulibv2/user/addFav?callback=FnAddfav';
	script.src = addUrl(script.src,'session',session,"id",arr);
	document.body.insertBefore(script,document.body.firstChild);
	function addUrl(url,name,str1,name1,str2){
		url += url.indexOf('?')==-1?'?':'&';
		url += name + '=' + str1;
		url += url.indexOf('?')==-1?'?':'&';
		url += name1 + '=' + str2;
		return url;
 	} 
};
var FnAddfav = function(arr){
	if(arr.Detail == "ADDED_SUCCEED"){
		alert("收藏成功");
	}
	if(arr.Detail == "ALREADY_IN_FAVORITE"){
		alert("已经收藏过了");
	}
	if(arr.Detail == "ADDED_FAILED"){
		alert("收藏失败");
	}
	if(arr.Detail == "USER_NOT_LOGIN"){
		alert("用户未登录");
	}
};
var cdiv = function(id){
	return document.createElement(id);
};
window.onload = function(){
    widthheight();
    Rank();
};
window.onresize = function(){    //网页宽变化
    widthheight();
};