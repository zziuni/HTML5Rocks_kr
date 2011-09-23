function engShow(){
    var tt = document.getElementsByTagName("blockquote");
    for (var i=0; i<tt.length; i++){
        tt[i].style.display="";
    }
};

function engHidden(){
    var tt = document.getElementsByTagName("blockquote");
    for (var i=0; i<tt.length; i++){
        tt[i].style.display="none";
    }
};

var body = document.getElementsByTagName("body")[0];
var btnHidden = document.createElement("span");
btnHidden.innerText = "[ Hidden English ] ";
btnHidden.onclick = engHidden;
body.insertAdjacentElement('afterbegin', btnHidden);

var btnShow = document.createElement("span");
btnShow.innerText = "[ Show English ] ";
btnShow.onclick = engShow;
body.insertAdjacentElement('afterbegin', btnShow);




//result:javascript:function engShow(){var tt=document.getElementsByTagName("blockquote");for(var i=0;i<tt.length;i++){tt[i].style.display=""}};function engHidden(){var tt=document.getElementsByTagName("blockquote");for(var i=0;i<tt.length;i++){tt[i].style.display="none"}};var body=document.getElementsByTagName("body")[0];var btnHidden=document.createElement("span");btnHidden.innerText="[ Hidden English ] ";btnHidden.onclick=engHidden;body.insertAdjacentElement('afterbegin',btnHidden);var btnShow=document.createElement("span");btnShow.innerText="[ Show English ] ";btnShow.onclick=engShow;body.insertAdjacentElement('afterbegin',btnShow);
