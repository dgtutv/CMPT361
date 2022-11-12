import { Framebuffer } from './framebuffer.js';
import { Rasterizer } from './rasterizer.js';
// DO NOT CHANGE ANYTHING ABOVE HERE

////////////////////////////////////////////////////////////////////////////////
// TODO: Implement functions drawLine(v1, v2) and drawTriangle(v1, v2, v3) below.
////////////////////////////////////////////////////////////////////////////////

//Class for vertices
class vertex{
	x;
	y;
	constructor(x, y, c){
		this.x = x;
		this.y = y;
		//If no color is given as a parameter, default to black.
		if(typeof(c)===undefined){
			this.c = [0,0,0];
		}
		else{
			this.c = c;
		}
	}
}
//Function to determine color of line at pixel v
function getColor(a, b, t){
    //Apply linear interpolation for normalized distance(t) along the line.
    var R = a.c[0] + (b.c[0]-a.c[0])*t;
    var G = a.c[1] + (b.c[1]-a.c[1])*t;
    var B = a.c[2] + (b.c[2]-a.c[2])*t;
    return [R, G, B];
}
//Function to determine length of a line
function getLineLength(a,b){
    //Find the difference in our x and y values
    var diffX = a.x-b.x;
    var diffY = a.y-b.y;
    //Apply the Pythagorean Theorem
    return(Math.sqrt(diffX*diffX + diffY*diffY));
}
//Function to determine the area of a triangle
function getTriangleArea(a,b,c){
	//Compute side lengths of triangle
	var s1 = getLineLength(a,b);
	var s2 = getLineLength(b,c);
	var s3 = getLineLength(a,c);
	//Calculate the semi-perimeter
	var s = (s1+s2+s3)/2;
	//Apply Heron's formula
	return(Math.sqrt(s*(s-s1)*(s-s2)*(s-s3)));
}
//Function to determine barycentric coordinates of triangle
function barycentricCoordinates(a,b,c,p){
	//Compute area of three triangles formed from vertices a,b,c & p via Heron's formula
    var A0 = getTriangleArea(b,c,p);
    var A1 = getTriangleArea(c,a,p);
    var A2 = getTriangleArea(a,b,p);
    //If any area is NaN, it is because it is very close to 1, so set it to a very small value
    if(isNaN(A0)){
        A0=0.0000000000000001;
    }
    if(isNaN(A1)){
        A1=0.0000000000000001;
    }
    if(isNaN(A2)){
        A2=0.0000000000000001;
    }
    //Compute area of big triangle
    var A = getTriangleArea(a,b,c);
	//Compute our barycentric coordinates
	var u = A0/A;
	var v = A1/A;
	var w = A2/A;
	//Calculate & return the color at p
	var R = u*a.c[0] + v*b.c[0] + w*c.c[0];
	var G = u*a.c[1] + v*b.c[1] + w*c.c[1];
	var B = u*a.c[2] + v*b.c[2] + w*c.c[2];
	return([R, G, B]);

}
//Function to determine whether a pixel is inside a triangle
function pointIsInsideTriangle(a,b,c,p){
	//Compute area of three triangles formed from vertices a,b,c & p via Heron's formula
    var A0 = Math.floor(getTriangleArea(a,b,p));
    var A1 = Math.floor(getTriangleArea(a,c,p));
    var A2 = Math.floor(getTriangleArea(b,c,p));
    //Compute area of big triangle
    var A = Math.ceil(getTriangleArea(a,b,c));
    //If p is in the triangle, the sum of the areas will be equal the the total area
    if((A0+A1+A2)>A){
        return false;
    }
    else{
        return true;
    }
}

// take two vertices defining line and rasterize to framebuffer
Rasterizer.prototype.drawLine = function(v1, v2) {
    const [x1, y1, [r1, g1, b1]] = v1;
    const [x2, y2, [r2, g2, b2]] = v2;
    // TODO/HINT: use this.setPixel(x, y, color) in this function to draw line
    this.setPixel(Math.floor(x1), Math.floor(y1), [r1, g1, b1]);
    this.setPixel(Math.floor(x2), Math.floor(y2), [r2, g2, b2]);
    //Determine the starting point(a) and end point(b)
    var a, b;
    if(x1>x2){
        a = new vertex(x2, y2, [r2, g2, b2]);
        b = new vertex(x1, y1, [r1, g1, b1]);
    }
    else{
		a = new vertex(x1, y1, [r1, g1, b1]);
		b = new vertex(x2, y2, [r2, g2, b2]);
	}
	//When m is undefined(x1 == x2), then draw a vertical line
	var m;
	if(a.x==b.x){
		var x = a.x;
		//Flip the vertices if by>ay
		if(a.y>b.y){
			var totalSteps = a.y-b.y;
			var step = 0;
			for(var y=b.y; y<a.y; ++y){
				step++;
				t = step/totalSteps;
				this.setPixel(Math.floor(x), Math.floor(y), getColor(b, a, t));
			}
		}
		else{
			var totalSteps = b.y-a.y;
			var step = 0;
			for(var y=a.y; y<b.y; ++y){
				step++;
				t = step/totalSteps;
				this.setPixel(Math.floor(x), Math.floor(y), getColor(a, b, t));
			}
		}
	}
	//Otherwise, define m
	else{
		m = (b.y-a.y)/(b.x-a.x);
	}
	//When |m|<=1, increment x by 1 and y by m
	if(Math.abs(m)<=1){
		var y = a.y;
		var totalSteps = b.x-a.x;
		var step = 0;
		for(var x=a.x; x<b.x; ++x){
			step ++;
			var t = step/totalSteps;
			this.setPixel(Math.floor(x), Math.floor(y), getColor(a, b, t));
			y+=m;
		}
	}
	//When |m|>1, increment y by 1 and x by 1/m
	if(Math.abs(m)>1){
		//Flip the vertices if by>ay
		if(a.y>b.y){
			var x = b.x;
			var totalSteps = a.y-b.y;
			var step = 0;
	        for(var y=b.y; y<a.y; ++y){
	            step++;
				var t = step/totalSteps;
	            this.setPixel(Math.floor(x), Math.floor(y), getColor(b, a, t));
	            x+=1/m;
			}
		}
		else{
			var x = a.x;
			var totalSteps = b.y-a.y;
			var step = 0;
	        for(var y=a.y; y<b.y; ++y){
	            step++;
				var t = step/totalSteps;
	            this.setPixel(Math.floor(x), Math.floor(y), getColor(a, b, t));
                x+=1/m;
	        }
        }
	}

}

// take 3 vertices defining a solid triangle and rasterize to framebuffer
Rasterizer.prototype.drawTriangle = function(v1, v2, v3) {
	const [x1, y1, [r1, g1, b1]] = v1;
	const [x2, y2, [r2, g2, b2]] = v2;
	const [x3, y3, [r3, g3, b3]] = v3;
	// TODO/HINT: use this.setPixel(x, y, color) in this function to draw triangle
	this.setPixel(Math.floor(x1), Math.floor(y1), [r1, g1, b1]);
	this.setPixel(Math.floor(x2), Math.floor(y2), [r2, g2, b2]);
	this.setPixel(Math.floor(x3), Math.floor(y3), [r3, g3, b3]);
	//Convert our vertices to vertex type classes for easy readability
	var a = new vertex(x1, y1, [r1, g1, b1]);
	var b = new vertex(x2, y2, [r2, g2, b2]);
	var c = new vertex(x3, y3, [r3, g3, b3]);
	//Compute our bounding box
	var xMin = Math.ceil(Math.min(a.x, b.x, c.x));
	var xMax = Math.ceil(Math.max(a.x, b.x, c.x));
	var yMin = Math.ceil(Math.min(a.y, b.y, c.y));
	var yMax = Math.ceil(Math.max(a.y, b.y, c.y));
	//Define our iterating pixel
	var p;
	//Iterate over all the pixels in the bounding box
	for(var x = xMin; x<xMax+1; x++){
		for(var y = yMin; y<yMax+1; y++){
			//Perform triangle inside-outside test (Half planes)
			p = new vertex(x, y);
			var inside = pointIsInsideTriangle(a,b,c,p);
			//If the point is in the triangle, draw it and color with barycentric coordinates
			if(inside){
				var color = barycentricCoordinates(a,b,c,p);
				this.setPixel(Math.floor(x), Math.floor(y), color);
			}
		}
	}
}


////////////////////////////////////////////////////////////////////////////////
// EXTRA CREDIT: change DEF_INPUT to create something interesting!
////////////////////////////////////////////////////////////////////////////////
const DEF_INPUT = [
//Display the background first
	"t,108,109,110;",
	"t,108,110,111;",
//draw the bulb
	"v,27,4,1.00000, 0.60000, 0.00000;",
	"v,35,4,1.00000, 0.60000, 0.00000;",
	"l,0,1;",
	"v,24,5,1.00000, 0.60000, 0.00000;",
	"v,26,5,1.00000, 0.60000, 0.00000;",
	"l,2,3;",
	"v,22,6,1.00000, 0.60000, 0.00000;",
	"v,23,6,1.00000, 0.60000, 0.00000;",
	"l,4,5;",
	"v,21,7,1.00000, 0.60000, 0.00000;",
	"p,6;",
	"v,20,8,1.00000, 0.60000, 0.00000;",
	"v,19,8,1.00000, 0.60000, 0.00000;",
	"l,7,8;",
	"v,18,9,1.00000, 0.60000, 0.00000;",
	"p,9;",
	"v,17,10,1.00000, 0.60000, 0.00000;",
	"p,10;",
	"v,16,11,1.00000, 0.60000, 0.00000;",
	"v,16,12,1.00000, 0.60000, 0.00000;",
	"l,11,12;",
	"v,15,13,1.00000, 0.60000, 0.00000;",
	"p,13;",
	"v,14,14,1.00000, 0.60000, 0.00000;",
	"v,14,15,1.00000, 0.60000, 0.00000;",
	"l,14,15;",
	"v,13,16,1.00000, 0.60000, 0.00000;",
	"v,13,18,1.00000, 0.60000, 0.00000;",
	"l,16,17;",
	"v,12,19,1.00000, 0.60000, 0.00000;",
	"v,12,27,1.00000, 0.60000, 0.00000;",
	"l,18,19;",
	"v,13,28,1.00000, 0.60000, 0.00000;",
	"v,13,30,1.00000, 0.60000, 0.00000;",
	"l,20,21;",
	"v,14,31,1.00000, 0.60000, 0.00000;",
	"v,14,32,1.00000, 0.60000, 0.00000;",
	"l,22,23;",
	"v,15,33,1.00000, 0.60000, 0.00000;",
	"p,24;",
	"v,16,34,1.00000, 0.60000, 0.00000;",
	"v,16,35,1.00000, 0.60000, 0.00000;",
	"l,25,26;",
	"v,22,41,1.00000, 0.60000, 0.00000;",
	"l,26,27;",
	"v,23,41,1.00000, 0.60000, 0.00000;",
	"l,27,28;",
	"v,25,43,1.00000, 0.60000, 0.00000;",
	"l,28,29;",
	"v,25,44,1.00000, 0.60000, 0.00000;",
	"l,29,30;",
	"v,26,45,1.00000, 0.60000, 0.00000;",
	"v,26,47,1.00000, 0.60000, 0.00000;",
	"l,31,32;",
	"v,27,47,1.00000, 0.60000, 0.00000;",
	"l,32,33;",
	"v,27,48,1.00000, 0.60000, 0.00000;",
	"l,33,34;",
	"v,28,49,1.00000, 0.60000, 0.00000;",
	"p,35;",
	"v,28,50,0.76471,0.76471,0.76471;",
	"v,28,53,0.49804,0.49804,0.49804;",
	"l,36,37;",
	"v,29,55,0.49804,0.49804,0.49804;",
	"v,30,55,0.49804,0.49804,0.49804;",
	"p,39;",
	"v,36,5,1.00000, 0.60000, 0.00000;",
	"v,38,5,1.00000, 0.60000, 0.00000;",
	"l,40,41;",
	"v,39,6,1.00000, 0.60000, 0.00000;",
	"v,40,6,1.00000, 0.60000, 0.00000;",
	"l,42,43;",
	"v,42,8,1.00000, 0.60000, 0.00000;",
	"l,43,44;",
	"v,43,8,1.00000, 0.60000, 0.00000;",
	"l,44,45;",
	"v,46,11,1.00000, 0.60000, 0.00000;",
	"l,45,46;",
	"v,46,12,1.00000, 0.60000, 0.00000;",
	"l,46,47;",
	"v,48,14,1.00000, 0.60000, 0.00000;",
	"l,47,48;",
	"v,48,15,1.00000, 0.60000, 0.00000;",
	"l,48,49;",
	"v,49,16,1.00000, 0.60000, 0.00000;",
	"l,49,50;",
	"v,49,18,1.00000, 0.60000, 0.00000;",
	"l,50,51;",
	"v,50,19,1.00000, 0.60000, 0.00000;",
	"v,50,27,1.00000, 0.60000, 0.00000;",
	"l,52,53;",
	"v,49,28,1.00000, 0.60000, 0.00000;",
	"v,49,30,11.00000, 0.60000, 0.00000;",
	"l,54,55;",
	"v,48,31,1.00000, 0.60000, 0.00000;",
	"v,48,32,1.00000, 0.60000, 0.00000;",
	"l,56,57;",
	"v,46,34,1.00000, 0.60000, 0.00000;",
	"l,57,58;",
	"v,46,35,1.00000, 0.60000, 0.00000;",
	"l,58,59;",
	"v,40,41,1.00000, 0.60000, 0.00000;",
	"l,59,60;",
	"v,39,41,1.00000, 0.60000, 0.00000;",
	"l,60,61;",
	"v,37,43,1.00000, 0.60000, 0.00000;",
	"l,61,62;",
	"v,37,44,1.00000, 0.60000, 0.00000;",
	"l,62,63;",
	"v,36,45,1.00000, 0.60000, 0.00000;",
	"v,36,47,1.00000, 0.60000, 0.00000;",
	"l,64,65;",
	"v,35,47,1.00000, 0.60000, 0.00000;",
	"v,35,48,1.00000, 0.60000, 0.00000;",
	"l,66,67;",
	"v,34,49,1.00000, 0.60000, 0.00000;",
	"p,68;",
	"v,34,50,0.76471,0.76471,0.76471;",
	"v,34,53,0.49804,0.49804,0.49804;",
	"l,69,70;",
	"v,32,55,0.49804,0.49804,0.49804;",
	"v,31,53,0.49804,0.49804,0.49804;",
	"t,72,70,71;",
	"t,36,70,37;",
	"t,69,70,36;",
	"v,31,55,1.00000, 0.78824, 0.05490;",
	"v,31,54,1.00000, 0.78824, 0.05490;",
	"l,73,74;",
	"v,30,53,1.00000, 0.78824, 0.05490;",
	"p,75;",
	"v,32,53,1.00000, 0.78824, 0.05490;",
	"p,76;",
	"t,37,72,39;",
	"v,29,41,0.76471, 0.76471, 0.76471;",
	"v,33,41,0.76471, 0.76471, 0.76471;",

	"v,30,49,1.00000, 0.78824, 0.05490;",
	"v,32,49,1.00000, 0.78824, 0.05490;",
	"v,31,48,1.00000, 0.78824, 0.05490;",
	"v,31,47,1.00000, 0.78824, 0.05490;",
	"l,79,80;",
	"l,81,82;",
	"v,30,40,0,0,0;",
	"v,32,12,0,0,0;",
	"l,83,84;",
	"v,31,40,1.00000, 0.49804, 0.15294;",
	"v,29,39,1.00000, 0.49804, 0.15294;",
	"p,85;",
	"p,86;",
	"v,29,38,1.00000, 0.49804, 0.15294;",
	"v,30,38,1.00000, 0.49804, 0.15294;",
	"p,87;",
	"p,88;",
	"v,31,37,1.00000, 0.49804, 0.15294;",
	"v,33,37,1.00000, 0.49804, 0.15294;",
	"l,89,90;",
	"v,33,36,1.00000, 0.49804, 0.15294;",
	"v,34,36,1.00000, 0.49804, 0.15294;",
	"p,91;",
	"p,92;",
	"v,34,33,1.00000, 0.49804, 0.15294;",
	"l,92,93;",
	"v,33,33,1.00000, 0.49804, 0.15294;",
	"v,33,31,1.00000, 0.49804, 0.15294;",
	"l,94,95;",
	"v,32,31,1.00000, 0.49804, 0.15294;",
	"v,31,30,1.00000, 0.49804, 0.15294;",
	"l,96,97;",
	"v,29,30,1.00000, 0.49804, 0.15294;",
	"v,26,26,1.00000, 0.49804, 0.15294;",
	"l,98,99;",
	"v,28,23,1.00000, 0.49804, 0.15294;",
	"l,99,100;",
	"v,35,19,1.00000, 0.49804, 0.15294;",
	"l,100,101;",
	"v,32,16,1.00000, 0.49804, 0.15294;",
	"v,35,18,1.00000, 0.49804, 0.15294;",
	"l,103,102;",
	"v,30,15,1.00000, 0.49804, 0.15294;",
	"p,104;",
	"v,29,14,1.00000, 0.49804, 0.15294;",
	"v,31,12,1.00000, 0.49804, 0.15294;",
	"l,105,106;",
//light the bulb, center of light is node 107
	"v,31,25,1,1,1;",
	"t,1,107,0;",
	"t,1,2,107;",
	"t,2,12,107;",
	"t,12,18,107;",
	"t,18,21,107;",
	"t,21,26,107;",
	"t,26,35,107;",
	"t,1,45,107;",
	"t,45,50,107;",
	"t,50,55,107;",
	"t,55,60,107;",
	"t,60,68,107;",
	"t,68,35,107;",
	"t,77,70,78;",
    "t,77,37,78;",
//background
	"v,0,0,0.70196, 0.70196, 1.00000;",
    "v,63,0,0.70196, 0.70196, 1.00000;",
    "v,63,63,0.6,0.12,0;",
    "v,0,63,0.6,0.12,0;"
].join("\n");


// DO NOT CHANGE ANYTHING BELOW HERE
export { Rasterizer, Framebuffer, DEF_INPUT };