	//撤销的array
		var cancelList = new Array();
		//撤销的次数
		var cancelIndex = 0;

var mouseOutHide = function(obj){
	$(obj).mouseleave(function(){
					$(obj).hide();
			});
}
		$(function(){
			initCanvas();
			//initDrag();
			$("img")[0].click();
			$("#color input").click(chooseColor);
			$("#textColor1 input").click(chooseTextColor1);
			$("#textColor2 input").click(chooseTextColor2);
			mouseOutHide("#color");
			mouseOutHide("#textColor1");
			mouseOutHide("#textColor2");
			mouseOutHide("#line_size");
			mouseOutHide("#pattern");
			mouseOutHide("#shapePattern");
		
	});	
		//初始化
		var initCanvas = function(){
			canvas =  document.getElementById("canvas");
			canvas.width = canvasWidth;
			canvas.height = canvasHeight;
			context = canvas.getContext('2d');
				
			canvas_bak =  document.getElementById("canvas_bak");
			canvas_bak.width = canvasWidth;
			canvas_bak.height = canvasHeight;
			context_bak = canvas_bak.getContext('2d');		
		}	
		
		//下载图片
		var downloadImage = function(){
			combine();
			console.log($("#downloadImage_a")[0].href);
			$("#downloadImage_a")[0].href=combinecanvas.toDataURL("");
			
		}

		//展开颜色选择器
		var showColor = function(obj){
			var top = $(obj).offset().top;
			var left = $(obj).offset().left;		
			$("#color")[0].style.left = left + "px";;
			$("#color")[0].style.top = top + "px";
			$("#color").show();
		
		}
		var showTextColor1 = function(obj){
			var top = $(obj).offset().top;
			var left = $(obj).offset().left;		
			$("#textColor1")[0].style.left = left + "px";;
			$("#textColor1")[0].style.top = top + "px";
			$("#textColor1").show();
		}
		var showTextColor2 = function(obj){
			var top = $(obj).offset().top;
			var left = $(obj).offset().left;		
			$("#textColor2")[0].style.left = left + "px";;
			$("#textColor2")[0].style.top = top + "px";
			$("#textColor2").show();
		}
		var changePattern = function(obj){
			var changePattern = document.getElementById('cahgnePattern');
			var picturesrc= obj.src;
			changePattern.src =picturesrc;
		}
		//展开图案选择器
		var showPattern = function(obj){
			var top = $(obj).offset().top;
			var left = $(obj).offset().left;		
			$("#pattern")[0].style.left = left + "px";;
			$("#pattern")[0].style.top = top + "px";
			$("#pattern").show();
		}
		var showShapePattern = function(obj){
			var top = $(obj).offset().top;
			var left = $(obj).offset().left;		
			$("#shapePattern")[0].style.left = left + "px";
	
			$("#shapePattern").show();
		}
		//展开线条大小选择器
		var showLineSize = function(obj){		
			if($("#line_size").is(":hidden")){
				var top = $(obj).offset().top;
				var left = $(obj).offset().left;				
				$("#line_size")[0].style.left = left + $(obj).width() + 5; +  "px";
				$("#line_size")[0].style.top = top   + "px";
				$("#line_size").show();
			}else{
				$("#line_size").hide();
			}
		}

		//选择颜色
		var chooseColor = function(obj){		
			var objClass = $(this).attr("class");
			$("#chooseColor").attr("class" , "");
			$("#chooseColor").addClass (objClass).addClass('border_nochoose');			
			color  = $(this).css('background-color');
			$("#color").hide();

		}
			//选择文本颜色
		var chooseTextColor1 = function(obj){		
				
			textcolor1  = $(this).css('background-color');
			document.getElementById("titleFontColor").style.backgroundColor = textcolor1;
			$("#textColor1").hide();
			drawTitle();
		}
		var chooseTextColor2 = function(obj){		
				
			textcolor2  = $(this).css('background-color');
			document.getElementById("desFontColor").style.backgroundColor = textcolor2;
			$("#textColor2").hide();
			drawDes();
		}


		//选择大小
		var chooseLineSize =  function(_size){		
			$("#chooseSize").attr("src" , "img/line_size_"+_size+".png");		
			size = _size;
			$("#line_size").hide();
		}
		//选择所有文字
		var selectAll= function(op){
			op.select();
		}
			;
        //显示文字域
		var showTextarea = function(){
			document.getElementById("textword").style.visibility = "visible";
		}
	 //隐藏文字域
	 var hiddenTextarea = function(){
	 	document.getElementById("textword").style.visibility ="hidden";
	 	
	 }
	 //绘制文字
	
	 var drawTitle = function(){
	  var textcanvas = document.getElementById("textCanvas1");
	  var textcontext = textcanvas.getContext("2d");
	  textcanvas.width = canvasWidth;
	  textcanvas.height = canvasHeight;	
	 	var titleFontSize = document.getElementById('titleFontSize').value;
        var titleFontColor = document.getElementById('titleFontColor').value;
        var titleLeft = document.getElementById('titleLeft').value;
        var titleTop = document.getElementById('titleTop').value;
        var title = document.getElementById('title').value;
        var titleFontStyle = document.getElementById('titleFontStyle').value;
        var titleRotate = document.getElementById('titleRotate').value;
        var titleRotatePI = Math.PI*titleRotate/180;
         checkTitle();    
	 	textcontext.font = "normal "+ titleFontSize + "px "+titleFontStyle;
   		textcontext.fillStyle = textcolor1;
   		textcontext.clearRect(0,0,textcanvas.width,textcanvas.height);
   		textcontext.save();
   		  textcontext.translate(titleLeft,titleTop);
 		textcontext.rotate(titleRotatePI);
   		textcontext.fillText(title,0,0);
   		textcontext.restore();
	 }
	 var drawDes = function(){
	 	 var textcanvas = document.getElementById("textCanvas2");
	 	 var textcontext = textcanvas.getContext("2d");
	 	   textcanvas.width = canvasWidth;
	       textcanvas.height = canvasHeight;		
        var desFontSize = document.getElementById('desFontSize').value;
        var desFontColor = document.getElementById('desFontColor').value;
        var desTop = document.getElementById('desTop').value;
        var desLeft = document.getElementById('desLeft').value;
        var description = document.getElementById('description').value;
		var desFontStyle = document.getElementById('desFontStyle').value;
		var desRotate = document.getElementById('desRotate').value;
		var desRotatePI = Math.PI*desRotate/180;
		checkDes();
        textcontext.font = "normal "+ desFontSize + "px "+desFontStyle;
   		textcontext.fillStyle = textcolor2;
   		textcontext.clearRect(0,0,textcanvas.width,textcanvas.height);
   		textcontext.save();
   		textcontext.translate(desLeft,desTop);
   		textcontext.rotate(desRotatePI);
   		textcontext.fillText( description ,0,0);
   		textcontext.restore();
	 }
 var regex = {
        reg1:/^([1-9]\d*)$/,      // 验证正整数
        reg2:/^-?(0|[1-9]\d*)$/, // 验证零正负整数
       
    }
    var tips = ['字号只能为正整数','偏移量只能为零和正负整数','旋转角度只能为零和正负数'];
    function checkTitle(){

        checkFormat('titleFontSize',regex.reg1,tips[0],25);
     	checkFormat('titleRotate',regex.reg2,tips[2],0);
        checkFormat('titleLeft',regex.reg2,tips[1],10);
        checkFormat('titleTop',regex.reg2,tips[1],10);
      
    }
    function checkDes(){
    	  checkFormat('desFontSize',regex.reg1,tips[0],25);
       checkFormat('desLeft',regex.reg2,tips[1],10);
       checkFormat('desTop',regex.reg2,tips[1],10);
       checkFormat('desRotate',regex.reg2,tips[2],0);
    }
	 
	 
  function checkFormat(id,reg,tip,defaultValue){
        var node = document.getElementById(id);
        var value = node.value;
        if(!reg.test(value)){
            alert(tip);
          node.value = defaultValue;
            node.focus();
           
        }
       
    }

	 	
		//撤销上一个操作
		var cancel = function(){
			cancelIndex++;
			context.clearRect(0,0,canvasWidth,canvasHeight);
			var  image = new Image();
			var index = cancelList.length-1 - cancelIndex  ;
			var url = cancelList[index];
			image.src = url;
			image.onload = function(){
				context.drawImage(image , 0 ,0 , image.width , image.height , 0 ,0 , canvasWidth , canvasHeight);

			}
		}

		//重做上一个操作
		var next = function(){
			cancelIndex--;
			context.clearRect(0,0,canvasWidth,canvasHeight);
			var  image = new Image();
			var index = cancelList.length-1 - cancelIndex  ;
			var url ;
			if(index>cancelList.length-1){
				url=cancelList[cancelList.length-1];
			}else{
				url = cancelList[index];
			}
			image.src = url;
			image.onload = function(){
				context.drawImage(image , 0 ,0 , image.width , image.height , 0 ,0 , canvasWidth , canvasHeight);
			}
		}

		//保存历史 用于撤销
		var saveImageToAry = function (){
			cancelIndex = 0;
			var dataUrl =  canvas.toDataURL();
			cancelList.push(dataUrl);		
		}		
		
        // 处理文件拖入事件，防止浏览器默认事件带来的重定向  
   //      function handleDragOver(evt) {  
			// evt.stopPropagation();  
			// evt.preventDefault();  
   //       }
		 
		// 判断是否图片  
		function isImage(type) {  
			switch (type) {  
			case 'image/jpeg':  
			case 'image/png':  
			case 'image/gif':  
			case 'image/bmp':  
			case 'image/jpg':  
				return true;  
			default:  
				return false;  
			}  
		}  
       
		 // 处理拖放文件列表  
		/*function handleFileSelect(evt) {  
			evt.stopPropagation();  
			evt.preventDefault();  
  
			var files = evt.dataTransfer.files;  
  
			for (var i = 0, f; f = files[i]; i++) {    
				var t = f.type ? f.type : 'n/a';
				reader = new FileReader();
				isImg = isImage(t);
				  
				// 处理得到的图片  
				if (isImg) {  
					reader.onload = (function (theFile) {  
						return function (e) {  
							var  image = new Image(); 
							image.src =  e.target.result ;
							image.onload = function(){
								context.drawImage(image , 0 ,0 , image.width , image.height , 0 ,0 , canvasWidth , canvasHeight);
							}

						};  
					})(f)  
					reader.readAsDataURL(f);  
				}   
			}    
		}  

		//初始化拖入效果
		var initDrag= function(){
			var dragDiv  = document.getElementById("canvas_bak");
			dragDiv.addEventListener('dragover', handleDragOver, false);  
			dragDiv.addEventListener('drop', handleFileSelect, false);  
		}
		*/