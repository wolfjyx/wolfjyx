function GetPageScroll() 
{ 
    var x, y;
    var isTop = false;
     if(window.pageYOffset) 
    {    // all except IE    
        y = window.pageYOffset;    
    } else if(document.documentElement && document.documentElement.scrollTop) 
    {    // IE 6 Strict    
        y = document.documentElement.scrollTop;          
    } else if(document.body) {    // all other IE    
        y = document.body.scrollTop;            
    } 
    if(y>0){
        isTop = true;
    }
    return isTop;
}


function showShadow(){
    var nav = document.getElementById("nav");
   if(GetPageScroll()){
      nav.className = "nav_shadow";
   }else{
    nav.className = "";
   }
   
}

setInterval("showShadow()",100);

//Card rotate


var y,ny=0,rotYINT;

function rotateYDIV()
{
y=document.querySelectorAll(".card");
clearInterval(rotYINT);
rotYINT=setInterval("startYRotate()",10);
}

function startYRotate()
{
ny=ny+6;
for (var i = 0; i < y.length; i++) {
y[i].style.transform="rotateY(" + ny + "deg)";
y[i].style.webkitTransform="rotateY(" + ny + "deg)";
y[i].style.OTransform="rotateY(" + ny + "deg)";
y[i].style.MozTransform="rotateY(" + ny + "deg)";
}
if (ny>=360)
  {
  clearInterval(rotYINT);
  ny=0; 
}
}

window.onload = function(){
   y=document.querySelectorAll(".card");
  for (var i = 0; i < y.length; i++) {
    y[i].onmouseover = function(){
  rotateYDIV();
}
  }

var x = document.querySelectorAll(".icon");
for(var i =0;i<x.length;i++){
  x[i].onmouseover = function(){
    rotateDIV();
  }
  x[i].onmouseout = function(){
    clearInterval(rotINT);
  }
}
  var img1 = document.getElementById("img01");
  var div1 = document.getElementById("pic01");
  img1.onmouseover = function(){
   div1.style.display = "block";
  }
   img1.onmouseout = function(){
    setTimeout(function(){
       div1.style.display = "none";
     },500);
  
  }
  var img2 = document.getElementById("img02");
    var div2 = document.getElementById("pic02");
  img2.onmouseover = function(){
    div2.style.display = "block";
  }
  img2.onmouseout = function(){
    setTimeout(function(){
       div2.style.display = "none";
     },500);
  
  }
  var img3 = document.getElementById("img03");
    var div3 = document.getElementById("pic03");
  img3.onmouseover = function(){
    div3.style.display = "block";
  }
 img3.onmouseout = function(){
    setTimeout(function(){
       div3.style.display = "none";
     },500);
  
  }
}
//img




//cube
var x,nx=0,rotINT;

function rotateDIV()
{
x=document.querySelectorAll(".icon");
clearInterval(rotINT);
rotINT=setInterval("startRotate()",20);
}

function startRotate()
{
nx=nx+6;
for (var i = 0; i < x.length; i++) {
x[i].style.transform="rotate(" + nx + "deg)";
x[i].style.webkitTransform="rotate(" + nx + "deg)";
x[i].style.OTransform="rotate(" + nx + "deg)";
x[i].style.MozTransform="rotate(" + nx + "deg)";
}

}