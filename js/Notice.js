var $ = function(id){
	return document.getElementById(id);
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
	script.src = 'https://api.xiyoumobile.com/xiyoulibv2/news/getList/announce/1?callback=Fnrank';
	document.body.insertBefore(script,document.body.firstChild);
};
var Fnrank =function(arr){
	var arr1 = eval(arr.Detail.Data);
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
        span.innerText = "标题："+arr[i].Title+' 日期：《'+arr[i].Date+"》 ";
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
    script.src = 'https://api.xiyoumobile.com/xiyoulibv2/news/getDetail/announce/html';
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
	idd.innerHTML ="<h2>"+ str.Detail.Title +"</h2>"+str.Detail.Passage;
	var button1 = cdiv('button');
	button1.innerText = "返回上一页";
	button1.id="buttonexit";
	idd.appendChild(button1);
 	var buttonexit=$("buttonexit");
 	buttonexit.onclick = function(){
 		location.href = "Notice.html";
 	};
 	photosrc();
};
var photosrc = function(){           //图片路径错误处理
	var psrc = document.getElementsByTagName('img');
	for (var i = 1; i < psrc.length; i++) {
		if(psrc[i].src.indexOf("http://localhost") != -1){
			var src1 = "http://www.lib.xiyou.edu.cn";
			for (var j = 16; j < psrc[i].src.length; j++) {

				src1 = src1+psrc[i].src[j];
			}
			psrc[i].src = src1;
		}
		else {
			continue;
		}
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