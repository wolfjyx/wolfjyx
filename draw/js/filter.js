  /**
   * 获取mimeType
   * @param  {String} type the old mime-type
   * @return the new mime-type
   */
  var _fixType = function(type) {
      type = type.toLowerCase().replace(/jpg/i, 'jpeg');
      var r = type.match(/png|jpeg|bmp|gif/)[0];
      return 'image/' + r;
  };

  /**
   * 在本地进行文件保存
   * @param  {String} data     要保存到本地的图片数据
   * @param  {String} filename 文件名
   */
  // var saveFile = function(data, filename){
  //     var save_link = document.createElementNS('http://www.w3.org/1999/xhtml', 'a');
  //     save_link.href = data;
  //     save_link.download = filename;
     
  //     var event = document.createEvent('MouseEvents');
  //     event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
  //     save_link.dispatchEvent(event);
  // };
     

 /* document.getElementById("download").onclick=function()
  {
    //图片导出为 png 格式
      var type = 'png';
      var imgData = canvas.toDataURL(type);
      // 加工image data，替换mime type
      imgData = imgData.replace(_fixType(type),'image/octet-stream');  
      // 下载后的问题名
      var filename = 'bloglaotou_' + (new Date()).getTime() + '.' + type;
      // download
      saveFile(imgData,filename);
         

  }
  */
//  1.灰度效果
//计算公式 .299 * r + .587 * g + .114 * b;
// calculate gray scale value
function gray(canvasData)
{
 for ( var x = 0; x < canvasData.width; x++) {
     for ( var y = 0; y < canvasData.height; y++) {
       // Index of the pixel in the array
       var idx = (x + y * canvasData.width) * 4;
       var r = canvasData.data[idx + 0];
       var g = canvasData.data[idx + 1];
       var b = canvasData.data[idx + 2];
       var gray = .299 * r + .587 * g + .114 * b;            
        // assign gray scale value
        canvasData.data[idx + 0] = gray; // Red channel
        canvasData.data[idx + 1] = gray; // Green channel
        canvasData.data[idx + 2] = gray; // Blue channel
        canvasData.data[idx + 3] = 255; // Alpha channel
      if( x > (imgX-1) || y > (imgY-1)) 
           {
             canvasData.data[idx + 0] = 255;
             canvasData.data[idx + 1] = 255;
             canvasData.data[idx + 2] = 255;
           }
           
     }
 }
 return canvasData;
}
     
//2.怀旧效果   
function old(canvasData)
{
for ( var x = 0; x < canvasData.width; x++) {
 for ( var y = 0; y < canvasData.height; y++) {

   // Index of the pixel in the array
   var idx = (x + y * canvasData.width) * 4;
   var r = canvasData.data[idx + 0];
   var g = canvasData.data[idx + 1];
   var b = canvasData.data[idx + 2];

   var dr=.393*r+.769*g+.189*b;
   var dg=.349*r+.686*g+.168*b;
   var db=.272*r+.534*g+.131*b;
   var scale=Math.random()*0.5 + 0.5;
   var fr=scale*dr+(1-scale)*r;
   scale=Math.random()*0.5 + 0.5;
   var fg=scale*dg+(1-scale)*g;
   scale=Math.random()*0.5 + 0.5;
   var fb=scale*db+(1-scale)*b;
   canvasData.data[idx + 0] = fr; // Red channel
   canvasData.data[idx + 1] = fg; // Green channel
   canvasData.data[idx + 2] = fb; // Blue channel
   canvasData.data[idx + 3] = 255; // Alpha channel 
   // add black border
   if( x > (imgX-1) || y > (imgY-1))  
           {
             canvasData.data[idx + 0] = 255;
             canvasData.data[idx + 1] = 255;
             canvasData.data[idx + 2] = 255;
           }
           
 }
}
return canvasData;
}


//3 底片效
//算法原理：将当前像素点的RGB值分别与255之差后的值作为当前点的RGB值，即
//R = 255 – R；G = 255 – G；B = 255 – B；
function negatives(canvasData)
{
for ( var x = 0; x < canvasData.width; x++) {
 for ( var y = 0; y < canvasData.height; y++) {

   // Index of the pixel in the array
   var idx = (x + y * canvasData.width) * 4;
   var r = canvasData.data[idx + 0];
   var g = canvasData.data[idx + 1];
   var b = canvasData.data[idx + 2];
   var fr=255-r;
   var fg=255-g;
   var fb=255-b;
   canvasData.data[idx + 0] = fr; // Red channel
   canvasData.data[idx + 1] = fg; // Green channel
   canvasData.data[idx + 2] = fb; // Blue channel
   canvasData.data[idx + 3] = 255; // Alpha channel 
   // add black border
   if( x > (imgX) || y > (imgY-1)) 
           {
             canvasData.data[idx + 0] = 255;
             canvasData.data[idx + 1] = 255;
             canvasData.data[idx + 2] = 255;
           }
           
 }
}
return canvasData;
}
   
//4 黑白效果
//求RGB平均值Avg ＝ (R + G + B) / 3，如果Avg >= 100，则新的颜色值为R＝G＝B＝255；
//如果Avg < 100，则新的颜色值为R＝G＝B＝0；255就是白色，0就是黑色；
//至于为什么用100作比较，这是一个经验值吧，设置为128也可以，可以根据效果来调整。
function black(canvasData)
{
for ( var x = 0; x < canvasData.width; x++) {
 for ( var y = 0; y < canvasData.height; y++) {

   // Index of the pixel in the array
   var idx = (x + y * canvasData.width) * 4;
   var r = canvasData.data[idx + 0];
   var g = canvasData.data[idx + 1];
   var b = canvasData.data[idx + 2];
   if((r+g+b)>=300)
   {
    fr=fg=fb=255;
   }
   else
   {
    fr=fg=fb=0;
   }
   canvasData.data[idx + 0] = fr; // Red channel
   canvasData.data[idx + 1] = fg; // Green channel
   canvasData.data[idx + 2] = fb; // Blue channel
   canvasData.data[idx + 3] = 255; // Alpha channel
   // add black border
  if( x > (imgX-1) || y > (imgY-1)) 
           {
             canvasData.data[idx + 0] = 255;
             canvasData.data[idx + 1] = 255;
             canvasData.data[idx + 2] = 255;
           }
           
 }
}
return canvasData;
}

  
//6.连环画效果
//连环画的效果与图像灰度化后的效果相似,它们都是灰度图,但连环画增大了图像的对比度,使整体明暗效果更强.
//算法:
//R = |g – b + g + r| * r / 256
//G = |b – g + b + r| * r / 256;
//B = |b – g + b + r| * g / 256;
function comic(canvasData)
{
for ( var x = 0; x < canvasData.width; x++) {
 for ( var y = 0; y < canvasData.height; y++) {

   // Index of the pixel in the array
   var idx = (x + y * canvasData.width) * 4;
   var r = canvasData.data[idx + 0];
   var g = canvasData.data[idx + 1];
   var b = canvasData.data[idx + 2];

    var fr=Math.abs((g-r+g+b))*r/256;
    var fg=Math.abs((b-r+g+b))*r/256;
    var fb=Math.abs((b-r+g+b))*g/256; 
    //var fr=(g-r+g+b)*r/256;
    //var fg=(b-r+g+b)*r/256;
    //var fb=(b-r+g+b)*g/256;  
   canvasData.data[idx + 0] = fr; // Red channel
   canvasData.data[idx + 1] = fg; // Green channel
   canvasData.data[idx + 2] = fb; // Blue channel
   canvasData.data[idx + 3] = 255; // Alpha channel
            // add black border
 if( x > (imgX-1) || y > (imgY-1)) 
           {
             canvasData.data[idx + 0] = 255;
             canvasData.data[idx + 1] = 255;
             canvasData.data[idx + 2] = 255;
           }
           

 }
}
return canvasData;
}
 
//7 扩散（毛玻璃）
//原理：用当前点四周一定范围内任意一点的颜色来替代当前点颜色，最常用的是随机的采用相邻点进行替代。
function spread(canvasData)
 {
     for ( var x = 0; x < canvasData.width; x++) {
         for ( var y = 0; y < canvasData.height; y++) {
           
           // Index of the pixel in the array
           var idx = (x + y * canvasData.width) * 4;
           var r = canvasData.data[idx + 0];
           var g = canvasData.data[idx + 1];
           var b = canvasData.data[idx + 2];

           var rand=Math.floor(Math.random()*10)%3;
           var idx2 = (x+rand + (y+rand) * canvasData.width) * 4;
           var r2 = canvasData.data[idx2 + 0];
           var g2 = canvasData.data[idx2 + 1];
           var b2 = canvasData.data[idx2 + 2];
           var fr=r2;
           var fg=g2;
           var fb=b2;
           canvasData.data[idx + 0] = fr; // Red channel
           canvasData.data[idx + 1] = fg; // Green channel
           canvasData.data[idx + 2] = fb; // Blue channel
           canvasData.data[idx + 3] = 255; // Alpha channel  
           // add black border
           if( x > (imgX-1) || y > (imgY-1)) 
           {
             canvasData.data[idx + 0] = 255;
             canvasData.data[idx + 1] = 255;
             canvasData.data[idx + 2] = 255;
           }
           
   
         }
     }
     return canvasData;

 } 

    /**
    原图
     */
  function origin(canvasData) {
      
        return canvasData;
    }

var imgIsLoaded=false,//图片是否加载完成;
    imgX=200,
    imgY=200,
    imgScale=1;
var piccanvas = document.getElementById("picCanvas");
var piccontext = piccanvas.getContext("2d");
var fileBtn = document.getElementById("up-button");
var img = new Image();
var img2 = new Image();
var img3 = new Image();

 fileBtn.onchange = getImg;
function init() {
    piccontext.clearRect(0,0,piccanvas.width,piccanvas.height);
    context.clearRect(0,0,canvas.width,canvas.height);  
    re();
     piccanvas.width = imgX;
     piccanvas.height = imgY;
    piccontext.drawImage(img, 0, 0,imgX,imgY);
    // var f=""; 
    // var filter = document.getElementsByName("filter"); 
    // for(i=0;i<filter.length;i++) 
    // { 
    //     if(filter[i].checked)
    //     {
    //         f=filter[i].id; 
    //     }
           
    // }
    // switch(f){
    //    case "gray":setGray();break;
    //    case "spread":setSpread();break;
    //    case "comic":setComic();break;
    //    case "old":setOld();break;
    //    case "negatives":setNegatives();break;
    //    case "black":setBlack();break;
    //    case "cameo":setCameo();break;
    //   case "origin":setOrigin();break;      
    // }
  }
  img.onload = init; 
function getImg(file) {
   imgIsLoaded = true;
    var reader = new FileReader();
    reader.readAsDataURL(fileBtn.files[0]);
    reader.onload = function () {
        img.src = reader.result;
        img2.src = reader.result;
        img3.src = reader.result;
       
      

      
  }
}

function re(){
   imgScale =((canvasWidth/img.width)<(canvasHeight/img.height))?(canvasWidth/img.width):(canvasHeight/img.height);
          imgX = img.width*imgScale;
          imgY = img.height*imgScale;
           $('#divHead').css({
          "width":imgX+"px",
          "height" :"30px"
         });

}
 window.onload = function() { 
 if(imgIsLoaded==false){
   var imm = document.getElementById("imm");
  img.src = imm.src; 
  img2.src = imm.src;
  img3.src = imm.src; 
  re();
  piccanvas.width = imgX;
     piccanvas.height = imgY;
     console.log("hhh");
 }
  console.log("f"); 
  
    
    var piccontext = piccanvas.getContext("2d");
     // textcontext.clearRect(0,0,textcanvas.width,textcanvas.height);
     piccontext.clearRect(0,0,piccanvas.width,piccanvas.height);
     context.clearRect(0,0,canvas.width,canvas.height);
     piccontext.drawImage(img, 0, 0,imgX,imgY);
    var canvasData = piccontext.getImageData(0, 0, piccanvas.width, piccanvas.height);  

   //canvasData=gray(canvasData); 
//   canvasData=spread(canvasData);
//   canvasData=old(canvasData);
//   canvasData=frozen(canvasData);
//   canvasData=casting(canvasData);
//   canvasData=cameo(canvasData);
//   canvasData=comic(canvasData);
//   canvasData=black(canvasData);
//   canvasData=negatives(canvasData);
      canvasData = origin(canvasData);

    piccontext.putImageData(canvasData, 0, 0); // at coords 0,0
    //    piccanvas.onmousedown = function(ev){  
    //     var ev = ev || window.event;  
    //     context.moveTo(ev.clientX-piccanvas.offsetLeft,ev.clientY-piccanvas.offsetTop);  
    //     document.onmousemove = function(ev){  
    //         var ev = ev || window.event;  
    //         context.lineTo(ev.clientX-piccanvas.offsetLeft,ev.clientY-piccanvas.offsetTop);  
    //         context.stroke();  
    //     };  
    //     document.onmouseup = function(){  
    //         document.onmousemove = null;  
    //         document.onmouseup = null;  
    //     };  
    // };
     
  };
  

       $('#spread').click(setSpread);
      //document.getElementById('spread').onclick=setSpread;
  function setSpread()
  {    
        var piccontext = piccanvas.getContext("2d");
        piccontext.clearRect(0,0,piccanvas.width,piccanvas.height);
        piccontext.drawImage(img, 0 , 0,imgX,imgY);
        var canvasData = piccontext.getImageData( 0, 0, piccanvas.width, piccanvas.height);  
        canvasData=spread(canvasData);
        piccontext.putImageData(canvasData, 0, 0);
  }   
            
  
  $('#gray').click(setGray);
  function setGray()
  {
         
        var piccontext = piccanvas.getContext("2d");

        piccontext.drawImage(img, 0 , 0,imgX,imgY);
   

        var canvasData = piccontext.getImageData(0, 0, piccanvas.width, piccanvas.height);  
        canvasData=gray(canvasData); 
        piccontext.putImageData(canvasData, 0, 0); // at coords 0,0
  }
  $('#old').click(setOld);
  function setOld()
  {
        
        var piccontext = piccanvas.getContext("2d");
        piccontext.drawImage(img, 0 , 0,imgX,imgY);

        var canvasData = piccontext.getImageData(0, 0, piccanvas.width, piccanvas.height);  
         canvasData=old(canvasData);
        piccontext.putImageData(canvasData, 0, 0); 
  }
 $('#comic').click(setComic);
  function setComic()
  {
        
        var piccontext = piccanvas.getContext("2d");
        piccontext.drawImage(img, 0 , 0,imgX,imgY);
        var canvasData = piccontext.getImageData(0, 0, piccanvas.width, piccanvas.height);  
       canvasData=comic(canvasData);
        piccontext.putImageData(canvasData, 0, 0); 
  }
  $('#black').click(setBlack);
  function setBlack()
  {
        
        var piccontext = piccanvas.getContext("2d");
        piccontext.drawImage(img, 0 , 0,imgX,imgY);
        var canvasData = piccontext.getImageData(0, 0, piccanvas.width, piccanvas.height);  
        canvasData=black(canvasData);
        piccontext.putImageData(canvasData, 0, 0); // at coords 0,0
  }
$('#negatives').click(setNegatives);
  function setNegatives()
  {
        
        var piccontext = piccanvas.getContext("2d");
        piccontext.drawImage(img, 0 , 0,imgX,imgY);
        var canvasData = piccontext.getImageData(0, 0, piccanvas.width, piccanvas.height);  
        canvasData=negatives(canvasData);
        piccontext.putImageData(canvasData, 0, 0); // at coords 0,0
  }


$('#origin').click(setOrigin);
  function setOrigin()
  {
          
        var piccontext = piccanvas.getContext("2d");
        var canvasData = piccontext.getImageData(0, 0, piccanvas.width, piccanvas.height);  
        canvasData=origin(canvasData);
        piccontext.putImageData(canvasData,0, 0); 
          piccontext.drawImage(img, 0 , 0,imgX,imgY);// at coords 0,0

  }
 

  $("#sketch").click(setSketch);
  function setSketch(){   
    var piccontext = piccanvas.getContext("2d");  
    //img2.src =img.src;
    AlloyImage(img2).ps("sketch").replace(img2);    
    piccontext.clearRect(0,0,canvas.width,canvas.height);
      piccontext.drawImage(img2,0 ,0,imgX,imgY);
  }
$('#soften').click(setSoften);
  function setSoften(){ 
    var piccontext = piccanvas.getContext("2d");
     //img3.src =img.src;
    AlloyImage(img3).ps("soften").replace(img3);
     piccontext.clearRect(0,0,canvas.width,canvas.height);
     piccontext.drawImage(img3,0 ,0,imgX,imgY);  
  }

//移动
  var posX; 
var posY; 
fdiv = document.getElementById("picWrapper");

$('#divHead').mousedown(function(e) 
{ 
if(!e) e = window.event; //IE 
posX = e.clientX - parseInt(fdiv.style.left); 
posY = e.clientY - parseInt(fdiv.style.top); 
document.onmousemove = mousemove; 
}
); 
document.onmouseup = function() 
{ 
document.onmousemove = null; 
} 
function mousemove(ev) 
{ 
if(ev==null) ev = window.event;//IE 
fdiv.style.left = (ev.clientX - posX) + "px"; 
fdiv.style.top = (ev.clientY - posY) + "px"; 
}




 