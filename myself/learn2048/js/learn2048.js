//主要逻辑----------------------------------
var bricknum = new Array();
var score = 0;
var hasConfliceted = new Array();//是否碰撞

documentWidth = window.screen.availWidth;
containerWidth = 0.92*documentWidth;
bricknumWidth = 0.18*documentWidth;
bricknumspace = 0.04*documentWidth;

$(document).ready(function(){
	prepareForMobile();
	newgame();
});

//开始新游戏
function newgame(){
	//初始化并生成两个数字
	init();

	genrateOneNumber();
	
	genrateOneNumber();
}
//初始化
function init(){
	for (var i = 0; i < 4; i++) {
		for(var j=0;j < 4; j++){
			var brick=$("#brick-"+i+"-"+j);
			brick.css('top', getPosTop(i,j));
			brick.css("left",getPosLeft(i,j));
		}
	}
	for(var i=0;i<4;i++){
		bricknum[i] = new Array();
		hasConfliceted[i] = new Array();
		for(var j=0;j<4;j++){
			bricknum[i][j]= 0;
			hasConfliceted[i][j] = false;
		}
	}
	updateBoardView();
	score = 0;
	updateScore(score);
}


//更新界面
function updateBoardView(){
	$(".bricknumber").remove();
	for (var i = 0; i < 4; i++) {
		for(var j = 0; j < 4; j++){
			$(".container").append('<div class="bricknumber" id="bricknumber-'+i+'-'+j+'"></div>');
			var theNumberBrick = $('#bricknumber-'+i+'-'+j);

			if(bricknum[i][j]==0){
				theNumberBrick.css('width','0px');
				theNumberBrick.css('height','0px');
				theNumberBrick.css('top',getPosTop(i,j)+bricknumWidth/2);
				theNumberBrick.css('left',getPosLeft(i,j)+bricknumWidth/2);
			}else{
				theNumberBrick.css('width',bricknumWidth);
				theNumberBrick.css('height',bricknumWidth);
				theNumberBrick.css('top',getPosTop(i,j));
				theNumberBrick.css('left',getPosLeft(i,j));
				theNumberBrick.css('background-color',getNumberBackgroundColor(bricknum[i][j]));
				theNumberBrick.css('color',getNumberColor(bricknum[i][j]));
				theNumberBrick.text(getNumberText(bricknum[i][j]));
			}
				hasConfliceted[i][j] = false;
		}
	}
	$('.bricknumber').css('line-height',bricknumWidth+"px");
}

//是否结束
function isgameover(){
	if(nospace(bricknum)&&nomove(bricknum)){
		alert("经验不足，还需努力!");
		}
}

//是否得到2048
function isgamewin(number){
	if(number==512){
		setTimeout('alert("恭喜你得到Offer!!")',210);
		setTimeout('newgame()',300);
	}
}

//能否继续移动
function nomove(bricknum){
	if(canMoveLeft(bricknum) || canMoveRight(bricknum) || canMoveUp(bricknum) || canMoveDown(bricknum)){
		return false;
	}
	return true;
}


//移动主逻辑
function moveLeft(){
	if(!canMoveLeft(bricknum) ){
		return false;
	}
	for(var i=0;i<4;i++){
		for(var j=1;j<4;j++){
			if(bricknum[i][j]!=0){
				for(var k = 0; k < j; k ++ ){
					if(bricknum[i][k]==0 && noHorizontal(i,k,j, bricknum)){
						showMoveAnimation(i,j,i,k);
						bricknum[i][k] = bricknum[i][j];
						bricknum[i][j] = 0;
						continue;
					}
					else if(bricknum[i][k]==bricknum[i][j] && noHorizontal(i,k,j, bricknum) && !hasConfliceted[i][k]){
						showMoveAnimation(i,j,i,k);
						bricknum[i][k]+=bricknum[i][j];
						bricknum[i][j]=0;
						score += bricknum[i][k];
						updateScore(score);

						hasConfliceted[i][k] = true;
						isgamewin(bricknum[i][k]);
						continue;
					}
				}
			}
		}
	}
		setTimeout("updateBoardView()",200);
	    return true;	
}

function moveRight(){
	if(!canMoveRight){
		return false;
	}
	for(var i = 0; i < 4; i++){
		for(var j = 2; j >= 0; j--){
			if(bricknum[i][j]!=0){
				for(var k = 3; k > j; k--){
					if(bricknum[i][k]==0 && noHorizontal(i,j,k, bricknum)){
						showMoveAnimation(i,j,i,k);
						bricknum[i][k] = bricknum[i][j];
						bricknum[i][j] = 0;
						continue;
					}
					else if(bricknum[i][k]==bricknum[i][j] && noHorizontal(i,j,k, bricknum) && !hasConfliceted[i][k]){
						bricknum[i][k] += bricknum[i][j];
						bricknum[i][j] = 0;
						score += bricknum[i][k];
						updateScore(score);
						hasConfliceted[i][k] = true;
						isgamewin(bricknum[i][k]);
						continue;
					}
				}
			}
		}
	}
	setTimeout("updateBoardView()",200);
	return true;
}

function moveUp(){
	if(!canMoveUp(bricknum)){
		return false;
	}
	for(var j=0;j<4;j++){
		for(var i=1;i<4;i++){
			if(bricknum[i][j]!=0){
				for(var k=0;k<i;k++){
					if(bricknum[k][j]==0 && noVertical(j,k,i, bricknum)){
						showMoveAnimation(i,j,k,j);
						bricknum[k][j] = bricknum[i][j];
						bricknum[i][j] = 0;
						continue;
					}
					else if(bricknum[k][j]==bricknum[i][j] && noVertical(j,k,i, bricknum) && !hasConfliceted[k][j]){
						bricknum[k][j] += bricknum[i][j];
						bricknum[i][j] = 0;
						score += bricknum[k][j];
						updateScore(score);
						isgamewin(bricknum[k][j]);
						continue;
					}
				}
			}
		}
	}
	setTimeout("updateBoardView()",200);
	return true;
}

function moveDown(){
	if(!canMoveDown(bricknum)){
		return false;
	}
	for(var j=0;j<4;j++){
		for(var i=2;i>=0;i--){
			if(bricknum[i][j]!=0){
				for(var k=3;k>i;k--){
					if(bricknum[k][j]==0 && noVertical(j,i,k, bricknum)){
						showMoveAnimation(i,j,k,j);
						bricknum[k][j] = bricknum[i][j];
						bricknum[i][j] = 0;
						continue;
					}
					else if(bricknum[k][j]==bricknum[i][j] && noVertical(j,i,k, bricknum) && !hasConfliceted[k][j]){
						showMoveAnimation(i,j,k,j);
						bricknum[k][j] += bricknum[i][j];
						bricknum[i][j] = 0;
						score += bricknum[k][j];
						updateScore(score);
						hasConfliceted[k][j] = true;
						isgamewin(bricknum[k][j]);
						continue;
					}
				}
			}
		}
	}
	setTimeout("updateBoardView()",200);
	return true;
}

//按键判断
$(document).keydown(function(event){
	switch(event.keyCode){
		//left
		case 37:
		event.preventDefault();
		if(moveLeft()){
			setTimeout("genrateOneNumber()",210);
			setTimeout("isgameover()",300);
			
		}
		break;
		//up
		case 38:
		event.preventDefault();
		if(moveUp()){
			setTimeout("genrateOneNumber()",210);
			setTimeout("isgameover()",300);
		}
		break;
		//right
		case 39:
		event.preventDefault();
		if(moveRight()){
			setTimeout("genrateOneNumber()",210);
			setTimeout("isgameover()",300);
		}
		break;
		//down
		case 40:
		event.preventDefault();
		if(moveDown()){
			setTimeout("genrateOneNumber()",210);
			setTimeout("isgameover()",300);
		}
		break;
	}
});
//样式及判断------------------------------------------------------

//绝对定位坐标
function getPosTop(i,j){
	return bricknumspace+i*(bricknumspace+bricknumWidth);
}
function getPosLeft(i,j){
	return bricknumspace+j*(bricknumspace+bricknumWidth);
}


//数字颜色
function getNumberColor(number){
	if(number<=4){
		return "#776e65";
	}
	return "#ffffff";
}

//数字背景
function getNumberBackgroundColor(number){
	switch(number){
		case 2: return "#eee4da";break;
		case 4: return "#ede0c8";break;
		case 8: return "#f2b179";break;
		case 16: return "#f59563";break;
		case 32: return "#f67e5f";break;
		case 64: return "#f65e3b";break;
		case 128: return "#edcf72";break;
		case 256: return "#edcc61";break;
		case 512: return "#99cc00";break;
		case 1024: return "#n6c";break;
		case 2048: return "#93c";break;
	}
	return "#000000";
}

//显示的文字
function getNumberText(number){
	switch(number){
		case 2:return "网申"; break;
		case 4:return "宣讲会"; break;	
		case 8:return "刷简历"; break;	
		case 16:return "笔试"; break;
		case 32:return "一面"; break;
		case 64:return "二面"; break;	
		case 128:return "三面"; break;	
		case 256:return "HR面"; break;	
		case 512:return "Offer"; break;
		
	}
    
}

//生成随机数
function genrateOneNumber(number){
   if(nospace(bricknum)){
   	  return false;
   }
   
   var randx = parseInt(Math.floor(Math.random()*4));
   var randy = parseInt(Math.floor(Math.random()*4));

  /* var times =0;//自动随机
   while(times<50){
   	if(bricknum[randx][randy]==0){
   		break;
   	}
   	randx = parseInt(Math.floor(Math.random()*4));
   	randy = parseInt(Math.floor(Math.random()*4));
   	times++;
   }
   //按顺序生成
	if(times==50){
		for(var i=0;i<4;i++){
			for(var j=0;j<4;j++){
				if(bricknum[i][j]==0){
					randx = i;
					randy = y;
				}
			}
		}
	} */

	var count = 0;
	var temporary = new Array();
	for(i=0;i<4;i++){
		for(j=0;j<4;j++){
			if(bricknum[i][j]==0){
				temporary[count] = i*4+j;
				count++;
			}
		}
	}

var pos= parseInt( Math.floor( Math.random()  * count ) );
 
 randx=Math.floor(temporary[pos]/4);
 randy=Math.floor(temporary[pos]%4);

   var randNumber = Math.random()<0.6?2:4;

   bricknum[randx][randy] = randNumber;
   showNumberWithAnimation(randx,randy,randNumber);

   return true;
}

//是否有空格，生成随机数的判断
function nospace(bricknum){
	for(var i=0;i<4;i++){
		for(var j=0;j<4;j++){
			if(bricknum[i][j]==0){
				return false;
			}
		}
	}
	return true;
}

//判断能否移动
function canMoveLeft(bricknum){
	for(var i=0;i<4;i++){
		for(var j=1;j<4;j++){
			if(bricknum[i][j]!=0){
				if(bricknum[i][j-1]==0 || bricknum[i][j-1]==bricknum[i][j]){
					return true;
				}
			}
		}
	}
	return false;
}

function canMoveRight(bricknum){
	for(var i=0;i<4;i++){
		for(var j=2;j>=0;j--){
			if(bricknum[i][j]!=0){
				if(bricknum[i][j+1]==0 || bricknum[i][j+1]==bricknum[i][j]){
					return true;
				}
			}
		}
	}
	return false;
}

function canMoveUp(bricknum){
	for(var j=0;j<4;j++){
		for(var i=1;i<4;i++){
			if(bricknum[i][j]!=0){
				if(bricknum[i-1][j]==0 || bricknum[i-1][j]==bricknum[i][j]){
					return true;
				}
			}
		}
	}
	return false;
}

function canMoveDown(bricknum){
	for(var j=0;j<4;j++){
		for(var i=2;i>=0;i--){
			if(bricknum[i][j]!=0){
				if(bricknum[i+1][j]==0 || bricknum[i+1][j]==bricknum[i][j]){
					return true;
				}
			}
		}
	}
	return false;
}
//可移动两数间是否有阻碍
function noHorizontal(row,col1,col2,bricknum){
	for(var i=col1+1;i<col2;i++){
		if(bricknum[row][i]!=0){
			return false;
		}
	}
	return true;
}

function noVertical(col,row1,row2,bricknum){
	for(var i= row1+1;i < row2;i++){
		if(bricknum[i][col]!=0){
			return false;
		}
	}
	return true;
}

//过渡动画-------------------------------------------------------------------------
function showNumberWithAnimation( i , j , randNumber){
	var theNumberBrick = $('#bricknumber-'+i+'-'+j);

	theNumberBrick.css('background-color',getNumberBackgroundColor(randNumber));
	theNumberBrick.css('color',getNumberColor(randNumber));
	theNumberBrick.text(getNumberText(randNumber));
	theNumberBrick.animate({
		width:bricknumWidth,
		height:bricknumWidth,
		top:getPosTop(i,j),
		left:getPosLeft(i,j)
	},100);
}

function showMoveAnimation(fromx,fromy,tox,toy){
	var theNumberBrick = $("#bricknumber-"+fromx+"-"+fromy);
	theNumberBrick.animate({
		top:getPosTop(tox,toy),
		left:getPosLeft(tox,toy)
	},200);
}

function updateScore(score){
	$("#score").text(score);
}

//移动端支持------------------------------------------------------------------
var startx = 0;
var starty = 0;
var endx = 0;
var endy = 0;

//界面自适应移动设备
function prepareForMobile(){
	if(documentWidth>500){
		containerWidth = 500;
		bricknumspace = 20;
		bricknumWidth = 100;
	}
	$(".container").css('width',containerWidth-2*bricknumspace);
	$(".container").css('height',containerWidth-2*bricknumspace);
	$(".container").css('padding',bricknumspace);
	$(".container").css('border-radius',0.02*containerWidth);

	$(".brick").css('width',bricknumWidth);
	$(".brick").css('height',bricknumWidth);
}


document.addEventListener('touchmove',function(event){
		event.preventDefault();
	});
//监听接触开始
document.addEventListener('touchstart',function(event){
	startx = event.touches[0].pageX;
	starty = event.touches[0].pageY;
});

//监听接触结束
document.addEventListener('touchend',function(event){
	endx = event.changedTouches[0].pageX;
	endy = event.changedTouches[0].pageY;

	var deltax = endx - startx;
	var deltay = endy - starty;

	if(Math.abs(deltax)<0.04*documentWidth && Math.abs(deltay)<0.04*documentWidth){
		return;
	}

	if(Math.abs(deltax)>Math.abs(deltay)){
		if(deltax<0){
			if(moveLeft()){
				setTimeout("genrateOneNumber()",210);
				setTimeout("isgameover()",300);
			}
		}
		else{
			if(moveRight()){
				setTimeout("genrateOneNumber()",210);
				setTimeout("isgameover()",300);
			}
		}
	}else{
		if(deltay<0){
			if(moveUp()){
				setTimeout("genrateOneNumber()",210);
				setTimeout("isgameover()",300);
			}
		}else{
			if(moveDown()){
				setTimeout("genrateOneNumber()",210);
			 	setTimeout("isgameover()",300);
			}
		}
	}
});