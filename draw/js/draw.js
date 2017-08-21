//画布
var canvas ;
var context ;
//蒙版
var canvas_bak;
var context_bak;
var textcontext;
var textcanvas;
var combinecanvas;
var combinecontext;


if(window.screen.width<1400){
var canvasWidth = 720;
var canvasHeight = 480;
}else{
	var canvasWidth = 1080;
var canvasHeight = 720;
}

var canvasTop;
var canvasLeft;

//画笔大小
var size = 1;
var color  = 'rgba(0,0,0,1)';
var textcolor1 = 'rgba(255,255,255,1)';
var textcolor2 = 'rgba(255,255,255,1)';

	

//画图形
var draw_graph = function(graphType,obj){	

			canvasTop = $(canvas).offset().top
			canvasLeft = $(canvas).offset().left;

	     //把蒙版放于画板上面
	     $("#canvas_bak").css("z-index",1);
	     //先画在蒙版上 再复制到画布上
	     if(graphType!="handwriting_circle" && graphType!="handwriting_star"){
	     chooseImg(obj);	
	    }
	
	var canDraw = false;	
	
	var startX;
	var startY;

	//鼠标按下获取 开始xy开始画图
	var mousedown = function(e){
		context.strokeStyle= color;
		context_bak.strokeStyle= color;
		context_bak.lineWidth = size;
		e=e||window.event;
		startX = e.clientX - canvasLeft;
		startY = e.clientY - canvasTop;
		context_bak.moveTo(startX ,startY );
		canDraw = true;			
		
		if(graphType == 'pencil'){
			context_bak.beginPath();
		}else if(graphType == 'circle'){
			context.beginPath();
			context.moveTo(startX ,startY );
			context.lineTo(startX  ,startY);
			context.stroke();	
			
		}else if(graphType == 'rubber'){							
			context.clearRect(startX - size * 10 ,  startY - size * 10 , size * 20 , size * 20);				
		}	
	};	

	//鼠标离开 把蒙版canvas的图片生成到canvas中
	var mouseup = function(e){
		e=e||window.event;
		canDraw = false;
		var image = new Image();
		if(graphType!='rubber'){	
			
			image.src = canvas_bak.toDataURL();
			image.onload = function(){
				context.drawImage(image , 0 ,0 , image.width , image.height , 0 ,0 , canvasWidth , canvasHeight);
				clearContext();
				saveImageToAry();
			}
			var x = e.clientX   - canvasLeft;
			var y = e.clientY  - canvasTop;	
			context.beginPath();
			context.moveTo(x ,y );
			context.lineTo(x +1 ,y+1);
			context.stroke();	
		}

	};

	//选择功能按钮 修改样式
	function chooseImg(obj){
		var imgAry  = $("#drawController .img");
		for(var i=0;i<imgAry.length;i++){
			$(imgAry[i]).removeClass('border_choose');
			$(imgAry[i]).addClass('border_nochoose');				
		}
		$(obj).removeClass("border_nochoose");
		$(obj).addClass("border_choose");
	}

	// 鼠标移动
	var  mousemove = function(e){
		e=e||window.event;
		var x = e.clientX   - canvasLeft;
		var y = e.clientY  - canvasTop;	
		//设置渐变色
		var canvasGra = context_bak.createLinearGradient(0,0,720,480);
				    canvasGra.addColorStop(0,"rgba(255,25,19,0.5)");
				    canvasGra.addColorStop(0.05,"rgba(0,190,255,0.5)");
				     canvasGra.addColorStop(0.1,"rgba(175,238,238,0.5)");
				    canvasGra.addColorStop(0.15,"rgba(255,246,136,0.5)");
				    canvasGra.addColorStop(0.2,"rgba(139,101,8,0.5)");
				    canvasGra.addColorStop(0.25,"rgba(64,244,208,0.5)")
				    canvasGra.addColorStop(0.3,"rgba(255,106,106,0.5)");
				    canvasGra.addColorStop(0.35,"rgba(222,184,135,0.5)");
				    canvasGra.addColorStop(0.4,"rgba(233,150,122,0.5)");
				    canvasGra.addColorStop(0.45,"rgba(250,140,0,0.5)");
				    canvasGra.addColorStop(0.5,"rgba(255,165,0,0.5)");
				    canvasGra.addColorStop(0.55,"rgba(238,200,130,0.5)");
				    canvasGra.addColorStop(0.6,"rgba(202,250,155,0.5)");
				    canvasGra.addColorStop(0.65,"rgba(154,205,50,0.5)");
				    canvasGra.addColorStop(0.7,"rgba(0,250,154,0.5)");
				    canvasGra.addColorStop(0.75,"rgba(70,130,180,0.5)");
				    canvasGra.addColorStop(0.8,"rgba(238,200,130,0.5)");
				    canvasGra.addColorStop(0.85,"rgba(64,244,208,0.5)");
				    canvasGra.addColorStop(0.9,"rgba(255,211,155,0.5)");
				    canvasGra.addColorStop(0.95,"rgba(238,44,44,0.5)");
				    canvasGra.addColorStop(1,"rgba(208,32,144,0.5)");
				    context_bak.fillStyle  = canvasGra;	
		//方块  4条直线搞定
		if(graphType == 'square'){
			if(canDraw){
				context_bak.beginPath();
				clearContext();
				context_bak.moveTo(startX , startY);						
				context_bak.lineTo(x  ,startY );
				context_bak.lineTo(x  ,y );
				context_bak.lineTo(startX  ,y );
				context_bak.lineTo(startX  ,startY );
				context_bak.stroke();
			}
		//直线
		}else if(graphType =='line'){						
			if(canDraw){
				context_bak.beginPath();
				clearContext();
				context_bak.moveTo(startX , startY);
				context_bak.lineTo(x  ,y );
				context_bak.stroke();
			}

		//画笔
		}else if(graphType == 'pencil'){
			if(canDraw){
				context_bak.lineTo(e.clientX   - canvasLeft ,e.clientY  - canvasTop);
				context_bak.stroke();						
			}
		//圆 未画得时候 出现一个小圆
		}else if(graphType == 'circle'){						
			clearContext();
			if(canDraw){
				context_bak.beginPath();			
				var radii = Math.sqrt((startX - x) *  (startX - x)  + (startY - y) * (startY - y));
				context_bak.arc(startX,startY,radii,0,Math.PI * 2,false);									
				context_bak.stroke();
			}else{	
				context_bak.beginPath();					
				context_bak.arc(x,y,20,0,Math.PI * 2,false);
				context_bak.stroke();
			}
		
		//涂鸦 未画得时候 出现一个小圆
		}else if(graphType == 'handwriting_circle'){	
		      									
			if(canDraw){
				context_bak.beginPath();	
				context_bak.arc(x,y,size*10,0,Math.PI * 2,false); 
				context_bak.fill(); 		
				context_bak.restore();
			}else{	
				clearContext();
				context_bak.beginPath();					
				context_bak.arc(x,y,size*10,0,Math.PI * 2,false);
				context_bak.fill();
				
			}
		
		}else if(graphType == 'handwriting_star'){
			var x1 = 100*Math.sin(Math.PI/10);  
				var h1 = 100*Math.cos(Math.PI/10);  
				var x2 = 50;  
				var h2 = 50*Math.tan(Math.PI/5);  
				if(canDraw){
			context_bak.beginPath();
             //五角星边的长度为100px，x1、h2为五角星的底部点坐标偏差值，x2、h2为五角星上部点偏差值  		
				context_bak.lineTo(x+x1,y+h1);  
				context_bak.lineTo(x-50,y+h2);  
				context_bak.lineTo(x+50,y+h2);  
				context_bak.lineTo(x-x1,y+h1);  
				context_bak.lineTo(x-x1,y+h1);  
				context_bak.lineTo(x,y);  
				context_bak.closePath();  
				context_bak.fill(); 		
				context_bak.restore();
			}else{	
				clearContext();
				context_bak.beginPath();					
				context_bak.lineTo(x+x1,y+h1);  
				context_bak.lineTo(x-50,y+h2);  
				context_bak.lineTo(x+50,y+h2);  
				context_bak.lineTo(x-x1,y+h1);  
				context_bak.lineTo(x-x1,y+h1);  
				context_bak.lineTo(x,y);  
				context_bak.closePath();  
				context_bak.fill();
			}
		}else if(graphType == 'mosaic'){
		var pixelData = piccontext.getImageData(x,y,1,1);
			var pixel = pixelData.data;
             var pixelColor = "rgba(" + pixel[0] + "," + pixel[1] + "," + pixel[2] + ",0.6)";
			context_bak.fillStyle = pixelColor;	      									
			if(canDraw){
			
				context_bak.beginPath();
                      
				context_bak.rect(x,y,size*15,size*15,false); 
				context_bak.fill(); 		
				context_bak.restore();
			
			}else{	
				clearContext();
				context_bak.beginPath();					
				context_bak.rect(x,y,size*15,size*15,false);
				context_bak.fill();
				
			}
		
		}
		
		//橡皮擦 不管有没有在画都出现小方块 按下鼠标 开始清空区域
		else if(graphType == 'rubber'){	
			context_bak.lineWidth = 1;
			clearContext();
			context_bak.beginPath();			
			context_bak.strokeStyle =  '#000000';						
			context_bak.moveTo(x - size * 10 ,  y - size * 10 );						
			context_bak.lineTo(x + size * 10  , y - size * 10 );
			context_bak.lineTo(x + size * 10  , y + size * 10 );
			context_bak.lineTo(x - size * 10  , y + size * 10 );
			context_bak.lineTo(x - size * 10  , y - size * 10 );	
			context_bak.stroke();		
			if(canDraw){							
				context.clearRect(x - size * 10 ,  y - size * 10 , size * 20 , size * 20);
										
			}			
		}


	};

   
   

	//鼠标离开区域以外 除了涂鸦 都清空
	var mouseout = function(){
		if(graphType != 'handwriting'){
			clearContext();
		}
	}

	$(canvas_bak).unbind();
	$(canvas_bak).bind('mousedown',mousedown);
	$(canvas_bak).bind('mousemove',mousemove);
	$(canvas_bak).bind('mouseup',mouseup);
	$(canvas_bak).bind('mouseout',mouseout);
}

var EventUilt={

                        addHandler: function(element,type,handler){
        		if(element.addEventListener){
        			element.addEventListener(type,handler,false);
        		}else if(element.attachEvent){
        			element.attachEvent("on"+type,handler);
        		}else{
        			element["on"+type] = handler;
        		}
        	}
        }


	$('#title').bind("change",drawTitle);
	$('#titleFontSize').bind("change",drawTitle);
	$('#titleLeft').bind("change",drawTitle);
	$('#titleTop').bind("change",drawTitle);
	$('#titleFontStyle').bind("change",drawTitle);
	$('#titleRotate').bind("change",drawTitle);
	$('#description').bind("change",drawDes);
	$('#desFontSize').bind("change",drawDes);
	$('#desLeft').bind("change",drawDes);
	$('#desTop').bind("change",drawDes);
	$('#desFontStyle').bind("change",drawDes);
	$('#desRotate').bind("change",drawDes);
	$('#textButton').click(showTextarea);
	$('#textConfirm').click(hiddenTextarea);
 //合并canvas
var combine = function(){
	 combinecanvas = document.getElementById("combineCanvas");
	 combinecontext = combinecanvas.getContext("2d");
	 if(imgIsLoaded){
	 combinecanvas.width = imgX;
	 combinecanvas.height = imgY;
     }
     else{
     	combinecanvas.width = canvasWidth;
	 combinecanvas.height = canvasHeight;
     }
     combinecontext.clearRect(0,0,combinecanvas.width,combinecanvas.height);
	 combinecontext.drawImage(piccanvas,0,0);
   
	 combinecontext.drawImage(textCanvas1,0,0);
	 combinecontext.drawImage(textCanvas2,0,0);

	 var  image = new Image();
	 var index = cancelList.length-1 - cancelIndex  ;
	 var url = cancelList[index];
			image.src = url; 
			combinecontext.drawImage(image,0,0);
}



//清空层
var clearContext = function(type){
	if(!type){
		context_bak.clearRect(0,0,canvasWidth,canvasHeight);
	}else{
		context.clearRect(0,0,canvasWidth,canvasHeight);
		context_bak.clearRect(0,0,canvasWidth,canvasHeight);
		combinecontext.clearRect(0,0,canvasWidth,canvasHeight);
	}
}

