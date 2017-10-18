var $ = function(id){
    return document.getElementById(id);
};
// var num = true;
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
var moveup = function(){			 //设置上下页按钮高度
	var buttonleft=$('buttonleft'),buttonright=$('buttonright'),up=window.pageYOffset;
	buttonleft.style.position = 'absolute';
    buttonleft.style.top = (heightscreen/2+up)+"px";
    buttonright.style.position = 'absolute';
    buttonright.style.top = (heightscreen/2+up)+"px";
    buttonright.style.left = widescreen-50 +"px";  
};
window.onmousewheel=document.onmousewheel=moveup;
var Searchbook= function(arr){    		//处理及判断输入的字符
	if(arr == " "){
		alert("搜索不能为空");
	}else{
		var pattern = new RegExp("[%`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）&mdash;—|{}【】‘；：”“'。，、？]") 
		var rs = ""; 
		for (var i = 0; i < arr.length; i++) { 
			rs = rs+arr.substr(i, 1).replace(pattern, ''); 
		} 
		// arr = encodeURI(arr);
		arr=rs;
		Pagefourrequest(arr);
	}        
};
var Detailed = function(){				//详细信息的处理
	var arrspan = $("Now").getElementsByTagName('span');
	for (var i = 0; i < arrspan.length; i++) {
		arrspan[i].onclick = function(e){
			return function(){
				Pagefourrequest("",arrspan[e].className);
			};
		}(i);
	}
};
var FnDetailed = function(str){						//详细信息回掉
	var buttonright=$('buttonright'),buttonleft=$('buttonleft');
    buttonright.style.display = 'none';
    buttonleft.style.display = 'none';
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
 		location.href = "collection.html";
 	};
 	buttonaddfav.onclick = function(){
 		Addfav(str.Detail.ID);
 	};
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
var cp = function(Tilte,arr){				//创建图书详细信息
	var idd=$('Now');
	var p = cdiv('p');
	p.innerText = Tilte + arr;
	idd.appendChild(p);
};
var Pagefourrequest = function(arr,str){          //请求数据
	var script = document.createElement('script');
    script.type = 'text/javascript';
    if(arguments[0]){
    	script.src = 'https://api.xiyoumobile.com/xiyoulibv2/book/search?callback=Message2&matchMethod=mh&wordType=1&images=0&size=400';
	    script.src = addUrl(script.src,'keyword',arr);
	    function addUrl(url,name,str1){
	        url += url.indexOf('?')==-1?'?':'&';
	        url += name + '=' + str1;
	        return url;
	    }
	}
	if(arguments[1]){
		script.src = 'http://api.xiyoumobile.com/xiyoulibv2/book/detail/id';
		script.src = addUrl(script.src,str,"callback","FnDetailed");
	    function addUrl(url,str1,name1,str2){
	        url += url.indexOf('?')==-1?'/':'&';
	        url += '/' + str1;
	        url += url.indexOf('?')==-1?'?':'&';
	        url += name1 + '=' + str2;
	        return url;
	    }
	}
    document.body.insertBefore(script,document.body.firstChild);
};
var Message2 = function(str){       //请求数据回掉函数
	// if(num ){
	// 	num=false;
	// 	var Input1=$('Input1');
	// 	var Pages = str.Detail.Pages;
	// 	Pagefourrequest(Input1.value,Pages);
	// }else{
	    if(!str.Result||str.Detail=="NO_RECORD")
	    {
	        alert("搜索有错误");
	    }else {
	        var myobj=eval(str.Detail.BookData); 
	        culjudge(myobj);
	    }
	// }
};
var culjudge = function(str){ 			//处理上下页翻页
    var length = str.length,buttonleft=$('buttonleft'),buttonright=$('buttonright'),i=0,numend=20;
    if(numend>length){
    	numend=length;
    }
    cul(str,i,numend);
    buttonright.onclick = function(){
    	numend+=20;
    	if(numend>length){
    		alert("没有更多了");
    		numend-=20;
    		return;
    	}else {
    		i+=20;
    		cul(str,i,numend);
    	}
    };
    buttonleft.onclick = function(){
    	numend-=20;
    	if(numend<20){
    		numend+=20;
    		alert("已经是第一页了");
    		return;
    	}else {
    		i-=20;
    		cul(str,i,numend);
    	}
    };
    moveup();
    buttonright.style.display = 'block';
    buttonleft.style.display = 'block';
};
var cul =function(str,i,numend){
    var idd = $('Now');
    if(idd.children[1]){
		idd.removeChild(idd.children[1]);
	}
    var ul = cdiv('ul');
    idd.appendChild(ul);
    for( i;i<numend;i++){
        var li = cdiv('li');
        ul.appendChild(li);
        var span = cdiv('span');
        span.className = str[i].ID;
        span.innerText = '书名：《'+str[i].Title+"》 ";
        li.appendChild(span);
    }
    Detailed();
};
var cdiv = function(id){
	return document.createElement(id);
};
window.onload = function(){
    var buttonright=$('buttonright'),Input2 = $('Input2'),Input1=$('Input1'),buttonleft=$('buttonleft');
    buttonright.style.display = 'none';
    buttonleft.style.display = 'none';
    widthheight();
    Searchbook(Input1.value);
    Input2.onclick = function(){
    	// num = true;
    	Searchbook(Input1.value);
    };
};
window.onresize = function(){    //网页宽变化
    widthheight();
    moveup();
};