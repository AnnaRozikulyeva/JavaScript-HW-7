var doc = document;

var size = doc.getElementById('sizeSelect');
var newColor = doc.getElementsByClassName('color');
var canvas = doc.getElementById('canv');
var ctx = canvas.getContext('2d');
var xCoord = doc.getElementById('xCoord');
var yCoord = doc.getElementById('yCoord');

var activeTool = '';


var system = {
	width: canvas.getAttribute('width'),
	height: canvas.getAttribute('height'),
	currentColor: newColor.value,
	currentTool: '',
	brushSize : size.value
}
var speed = 1;
 var x = 0, y = 0;
function render()
{
    
    
    drawLines(evt);
   
}

//рендер Системы
var renderSystem = function (obj, elem, action) {
	obj[elem] = action;
};

//Получение коодинат
var getCoordinates = function (evt) {
	let mas = {};
	let x = evt.offsetX;
	let y = evt.offsetY;

	mas = {x : x, y : y};
	xCoord.innerText = x;
	yCoord.innerText = y;

	return mas;
};

//Изменение размера кисти
var switchSize = function (list) {
	return list.value;
};

//Изменение цвета кисти
var switchColor = function (button) {
	return button.value
};

//Изменение инструмента
var switchTool = function (button) {
	if (button.id == 'pen') {
		return 'pen'
	} else if (button.id == 'marker') {
		return 'marker'
	} else if (button.id == 'brush') {
		return 'brush'
	}
};

//Мышинные события (клики)
var mouseActionsClick = function (evt) {
	if (evt.target.classList.contains('toolButton') == true) {
		renderSystem (system, 'currentTool', switchTool (evt.target));
		console.log(system.currentTool)
	} else if (evt.target.id == 'sizeSelect') {
		renderSystem (system, 'brushSize', switchSize (evt.target));
	} else if (evt.target.classList.contains('color') == true) {
		renderSystem (system, 'currentColor', switchColor (evt.target));
	}
};


//НЕПОСРЕДСТВЕННО РИСОВАНИЕ

var startDraw = function (evt) {
	drawLines (evt);

};

var endDraw = function (evt) {
	canvas.onmousemove = null;
};

var drawLines = function (evt) {
	canvas.onmousemove = function (evt) {
		ctx.beginPath ();
		ctx.fillStyle = system.currentColor;
		if (system.currentTool == 'pen') {
			ctx.fillRect (xCoord.innerText, yCoord.innerText, system.brushSize, system.brushSize);	
		}
		if (system.currentTool == 'marker') {
			ctx.fillRect (xCoord.innerText, yCoord.innerText, system.brushSize, 4 * system.brushSize);	
		}
		if (system.currentTool == 'brush') {
			ctx.arc(xCoord.innerText, yCoord.innerText, system.brushSize, 0, Math.PI*2, true);	
			ctx.fill();
		}
			
	}
};

canvas.addEventListener ('mousemove', getCoordinates); //активация получения координат
doc.addEventListener ('click', mouseActionsClick); //активация кликов
canvas.addEventListener ('mousedown', startDraw);
canvas.addEventListener ('mouseup', endDraw);

//время

var clock = function () {
	var d = new Date ();
	var month = d.getMonth();
	var minutes = d.getMinutes();
	var seconds = d.getSeconds();
	if (month < 10) {month = '0' + month; }
	if (minutes < 10) {minutes = '0' + minutes; }
	if (seconds < 10) {seconds = '0' + seconds; }

	date = d.getDate() + '.' + month + '.' + d.getFullYear() + 'г. ' + d.getHours() + ':' + minutes + ':' + seconds;
	if (document.layers) {
 		document.layers.doc_time.document.write(date);
		 document.layers.doc_time.document.close();
	} else { doc.getElementById('doc_time').innerHTML = date;
 		setTimeout("clock()", 1000);
	}
}

 clock();