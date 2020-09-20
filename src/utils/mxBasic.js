/**
 * $Id: mxBasic.js,v 1.5 2016/04/1 12:32:06 mate Exp $
 * Copyright (c) 2006-2018, JGraph Ltd
 */
//**********************************************************************************************************************************************************
// Cross
//**********************************************************************************************************************************************************
/**
* Extends mxShape.
*/

export function setupmxShapeBasic()
{
	
	
//**********************************************************************************************************************************************************
//Arc
//**********************************************************************************************************************************************************
/**
* Extends mxShape.
*/
function mxShapeBasicArc(bounds, fill, stroke, strokewidth)
{
	mxShape.call(this);
	this.bounds = bounds;
	this.fill = fill;
	this.stroke = stroke;
	this.strokewidth = (strokewidth != null) ? strokewidth : 1;
	this.startAngle = 0.25;
	this.endAngle = 0.75;
};

/**
* Extends mxShape.
*/
mxUtils.extend(mxShapeBasicArc, mxActor);

mxShapeBasicArc.prototype.customProperties = [
	{name: 'startAngle', dispName: 'Start Angle', type: 'float', min:0, max:1, defVal: 0.3},
	{name: 'endAngle', dispName: 'End Angle', type: 'float', min:0, max:1, defVal:0.1}
];

mxShapeBasicArc.prototype.cst = {ARC : 'mxgraph.basic.arc'};

/**
* Function: paintVertexShape
* 
* Paints the vertex shape.
*/
mxShapeBasicArc.prototype.paintVertexShape = function(c, x, y, w, h)
{
	c.translate(x, y);

	var startAngleSource = Math.max(0, Math.min(1, parseFloat(mxUtils.getValue(this.style, 'startAngle', this.startAngle))));
	var endAngleSource = Math.max(0, Math.min(1, parseFloat(mxUtils.getValue(this.style, 'endAngle', this.endAngle))));
	var startAngle = 2 * Math.PI * startAngleSource;
	var endAngle = 2 * Math.PI * endAngleSource;
	var rx = w * 0.5;
	var ry = h * 0.5;
	
	var startX = rx + Math.sin(startAngle) * rx;
	var startY = ry - Math.cos(startAngle) * ry;
	var endX = rx + Math.sin(endAngle) * rx;
	var endY = ry - Math.cos(endAngle) * ry;
	
	var angDiff = endAngle - startAngle;
	
	if (angDiff < 0)
	{
		angDiff = angDiff + Math.PI * 2;
	}
		
	var bigArc = 0;
	
	if (angDiff > Math.PI)
	{
		bigArc = 1;
	}
		
	c.begin();
	
	var startAngleDiff = startAngleSource % 1;
	var endAngleDiff = endAngleSource % 1;
	
	if (startAngleDiff == 0 && endAngleDiff == 0.5)
	{
		c.moveTo(startX, startY);
		c.arcTo(rx, ry, 0, 0, 1, w, h * 0.5);
		c.arcTo(rx, ry, 0, 0, 1, w * 0.5, h);
	}
	else if (startAngleDiff == 0.5 && endAngleDiff == 0)
	{
		c.moveTo(startX, startY);
		c.arcTo(rx, ry, 0, 0, 1, 0, h * 0.5);
		c.arcTo(rx, ry, 0, 0, 1, w * 0.5, 0);
	}
	else
	{
		c.moveTo(startX, startY);
		c.arcTo(rx, ry, 0, bigArc, 1, endX, endY);
	}

	c.stroke();
};

mxCellRenderer.registerShape(mxShapeBasicArc.prototype.cst.ARC, mxShapeBasicArc);

mxShapeBasicArc.prototype.constraints = null;

//**********************************************************************************************************************************************************
//Pie
//**********************************************************************************************************************************************************
/**
* Extends mxShape.
*/
function mxShapeBasicPie(bounds, fill, stroke, strokewidth)
{
	mxShape.call(this);
	this.bounds = bounds;
	this.fill = fill;
	this.stroke = stroke;
	this.strokewidth = (strokewidth != null) ? strokewidth : 1;
	this.startAngle = 0.25;
	this.endAngle = 0.75;
};

/**
* Extends mxShape.
*/
mxUtils.extend(mxShapeBasicPie, mxActor);

mxShapeBasicPie.prototype.customProperties = [
	{name: 'startAngle', dispName: 'Start Angle', type: 'float', min:0, max:1, defVal: 0.2},
	{name: 'endAngle', dispName: 'End Angle', type: 'float', min:0, max:1, defVal: 0.9}
];

mxShapeBasicPie.prototype.cst = {PIE : 'mxgraph.basic.pie'};

/**
* Function: paintVertexShape
* 
* Paints the vertex shape.
*/
mxShapeBasicPie.prototype.paintVertexShape = function(c, x, y, w, h)
{
	c.translate(x, y);
	var startAngleSource = Math.max(0, Math.min(1, parseFloat(mxUtils.getValue(this.style, 'startAngle', this.startAngle))));
	var endAngleSource = Math.max(0, Math.min(1, parseFloat(mxUtils.getValue(this.style, 'endAngle', this.endAngle))));
	var startAngle = 2 * Math.PI * startAngleSource;
	var endAngle = 2 * Math.PI * endAngleSource;
	var rx = w * 0.5;
	var ry = h * 0.5;
	
	var startX = rx + Math.sin(startAngle) * rx;
	var startY = ry - Math.cos(startAngle) * ry;
	var endX = rx + Math.sin(endAngle) * rx;
	var endY = ry - Math.cos(endAngle) * ry;
	
	var angDiff = endAngle - startAngle;
	
	if (angDiff < 0)
	{
		angDiff = angDiff + Math.PI * 2;
	}
		
	var bigArc = 0;
	
	if (angDiff >= Math.PI)
	{
		bigArc = 1;
	}
		
	c.begin();
	var startAngleDiff = startAngleSource % 1;
	var endAngleDiff = endAngleSource % 1;
	
	if (startAngleDiff == 0 && endAngleDiff == 0.5)
	{
		c.moveTo(rx, ry);
		c.lineTo(startX, startY);
		c.arcTo(rx, ry, 0, 0, 1, w, h * 0.5);
		c.arcTo(rx, ry, 0, 0, 1, w * 0.5, h);
	}
	else if (startAngleDiff == 0.5 && endAngleDiff == 0)
	{
		c.moveTo(rx, ry);
		c.lineTo(startX, startY);
		c.arcTo(rx, ry, 0, 0, 1, 0, h * 0.5);
		c.arcTo(rx, ry, 0, 0, 1, w * 0.5, 0);
	}
	else
	{
		c.moveTo(rx, ry);
		c.lineTo(startX, startY);
		c.arcTo(rx, ry, 0, bigArc, 1, endX, endY);
	}
	
	c.close();
	c.fillAndStroke();
};

mxCellRenderer.registerShape(mxShapeBasicPie.prototype.cst.PIE, mxShapeBasicPie);

mxShapeBasicPie.prototype.constraints = null;

}

