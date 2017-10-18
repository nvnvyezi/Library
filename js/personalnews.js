var $ = function(id){
    return document.getElementById(id);
};
var widthheight = (function(){
    var page3 = $('page3');
    widescreen = document.documentElement.clientWidth;
    heightscreen = document.documentElement.clientHeight;
    page3.style.width = widescreen +'px';
    page3.style.height = heightscreen + 'px';
})();
var ReadCookie = function(cookieName) {
    var theCookie = "" + document.cookie;
    var ind = theCookie.indexOf(cookieName);
    if(ind==-1 || cookieName=="") return "";
    var ind1 = theCookie.indexOf(';',ind);
    if(ind1==-1) ind1 = theCookie.length;
    /*读取Cookie值*/
    return unescape(theCookie.substring(ind+cookieName.length+1,ind1));
};
var Login2= function(){
    var str = ReadCookie('KEY');
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://api.xiyoumobile.com/xiyoulibv2/user/info?callback=Message';
    script.src = addUrl(script.src,'session',str);
    document.body.insertBefore(script,document.body.firstChild);
    function addUrl(url,name,str1){
        url += url.indexOf('?')==-1?'?':'&';
        url += name + '=' + str1;
        return url;
    }
};
var Message = function(str){
    if(str.Result){
        Handle(str);
    }
};
var Handle = function(str){
    var idd = $('idd');
    idd.innerText = str.Detail.Department + str.Detail.Name;
};
window.onload=function(){
    Login2();
    Loginhistory();
    LoginNow();
    LoginFavorite();
};
var LoginFavorite= function(){
    var str = ReadCookie('KEY');
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://api.xiyoumobile.com/xiyoulibv2/user/favorite?callback=Message4';
    script.src = addUrl(script.src,'session',str);
    document.body.insertBefore(script,document.body.firstChild);
    function addUrl(url,name,str1){
        url += url.indexOf('?')==-1?'?':'&';
        url += name + '=' + str1;
        return url;
    }
};
var Message4 = function(str){
    if(str.Detail == 'NO_RECORD')
    {
        var idd = $('Favorite');
        var ul = document.createElement('ul');
        idd.appendChild(ul);
        var li = document.createElement('li');
        li.innerText = '您没有收藏';
        ul.appendChild(li);
    }else {
        var myobj=eval(str.Detail);  
        culll(myobj,'Favorite');
    }
};
var culll = function(str,id){
    var idd = $(id),buttonclick = document.getElementsByClassName('button1');
    var ul = document.createElement('ul');
    idd.appendChild(ul);
    for(var i=0;i<str.length;i++){
        var li = document.createElement('li');
        li.innerText = '书名：《'+str[i].Title+"》 ";
        ul.appendChild(li);
        var button = document.createElement('button');
        button.innerText = '取消收藏';
        button.className="button1";
        li.appendChild(button);
    }
    for (var i = 0; i < buttonclick.length; i++) {
        buttonclick[i].onclick = function(e){
            return function(){
                Delfav(str[e].ID);
            };
        }(i);
    }
};
var Delfav = function(id){                  //删除图书收藏
    var username = ReadCookie("USERNAME");
    var session = ReadCookie("KEY");
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://api.xiyoumobile.com/xiyoulibv2/user/delFav?callback=FnDelfav';
    script.src = addUrl(script.src,'session',session);
    script.src = addUrl(script.src,'id',id);
    script.src = addUrl(script.src,'username',username);
    document.body.insertBefore(script,document.body.firstChild);
    function addUrl(url,name,str1){
        url += url.indexOf('?')==-1?'?':'&';
        url += name + '=' + str1;
        return url;
    }
};
var FnDelfav = function(arr){              //删除回调
    if(arr.Detail == "DELETED_SUCCEED"){
        alert("删除成功");
        location.reload();
    }
    if(arr.Detail == "DELETED_FAILED"){
        alert("删除失败");
    }
    if(arr.Detail == "USER_NOT_LOGIN"){
        alert("用户未登录");
    }
};
var LoginNow= function(){
    var str = ReadCookie('KEY');
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://api.xiyoumobile.com/xiyoulibv2/user/rent?callback=Message3';
    script.src = addUrl(script.src,'session',str);
    document.body.insertBefore(script,document.body.firstChild);
    function addUrl(url,name,str1){
        url += url.indexOf('?')==-1?'?':'&';
        url += name + '=' + str1;
        return url;
    }
};
var Message3 = function(str){
    if(str.Detail == 'NO_RECORD')
    {
        var idd = $('Now');
        var ul = document.createElement('ul');
        idd.appendChild(ul);
        var li = document.createElement('li');
        li.innerText = '您当前没有借阅书';
        ul.appendChild(li);
    }else {
        console.log(str)
        var myobj=eval(str.Detail);  
        cull(myobj,'Now');
    }
};
var cull = function(str,id){
    var idd = $(id),buttonclick = document.getElementsByClassName('button');
    var ul = document.createElement('ul');
    idd.appendChild(ul);
    for(var i=0;i<str.length;i++){
        var li = document.createElement('li');
        li.innerText = '书名：《'+str[i].Title+"》 "+"到期时间："+str[i].Date;
        ul.appendChild(li);
        var button = document.createElement('button');
        button.innerText = '续借';
        button.className="button";
        li.appendChild(button);
    }
    for (var i = 0; i < buttonclick.length; i++) {
        buttonclick[i].onclick = function(e){
            return function(){
                Renew(str[e].Barcode,str[e].Department_id,str[e].Library_id);
            };
        }(i);
    }
};
var Renew = function(barcode,department_id,library_id){
    var str = ReadCookie('KEY');
    var script = document.createElement('script');
    script.type = "text/javascript";
    script.src="https://api.xiyoumobile.com/xiyoulibv2/user/renew?callback=Fnrenew";
    script.src = addUrl(script.src,'session',str);
    script.src = addUrl(script.src,'barcode',barcode);
    script.src = addUrl(script.src,'department_id',department_id);
    script.src = addUrl(script.src,'library_id',library_id);
    document.body.insertBefore(script,document.body.firstChild);
    function addUrl(url,name,str1){
        url += url.indexOf('?')==-1?'?':'&';
        url += name + '=' + str1;
        return url;
    }   
};
var Fnrenew = function(str){
    if(str.Result){
        alert("续借成功");
        location.reload();
    }else {
        alert("已经续借过了");
    }
};
var Loginhistory= function(){
    var str = ReadCookie('KEY');
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://api.xiyoumobile.com/xiyoulibv2/user/history?callback=Message2';
    script.src = addUrl(script.src,'session',str);
    document.body.insertBefore(script,document.body.firstChild);
    function addUrl(url,name,str1){
        url += url.indexOf('?')==-1?'?':'&';
        url += name + '=' + str1;
        return url;
    }
};
var Message2 = function(str){
    if(str.Detail == 'NO_RECORD')
    {
        var idd = $('History');
        var ul = document.createElement('ul');
        idd.appendChild(ul);
        var li = document.createElement('li');
        li.innerText = '您没有借阅历史';
        ul.appendChild(li);
    }else {
        var myobj=eval(str.Detail); 
        cul(myobj,'History');
    }
};
var cul = function(str,id){
    var idd = $(id);
    var ul = document.createElement('ul');
    idd.appendChild(ul);
    for(var i=0;i<str.length;i++){
        var li = document.createElement('li');
        li.innerText = '书名：《'+str[i].Title+"》 "+"借书日期："+str[i].Date;
        ul.appendChild(li);
    }
};
// window.onload = function(){
//     widthheight();
// };
window.onresize = function(){
    var page2 = $('page3');
    widescreen = document.documentElement.clientWidth;
    heightscreen = document.documentElement.clientHeight;
    page3.style.width = widescreen +'px';
    page3.style.height = heightscreen + 'px';
};