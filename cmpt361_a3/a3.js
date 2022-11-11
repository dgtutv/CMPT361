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
    //If any area is NaN, it is because it is very close to 1, so set it to smallest possible value
    if(isNaN(A0)){
        A0=Number.MIN_VALUE;
    }
    if(isNaN(A1)){
        A1=Number.MIN_VALUE;
    }
    if(isNaN(A2)){
        A2=Number.MIN_VALUE;
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
	for(var x = xMin; x<=xMax; x++){
		for(var y = yMin; y<=yMax; y++){
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
  "v,10,10,1.0,0.0,0.0;",
  "v,52,52,0.0,1.0,0.0;",
  "v,52,10,0.0,0.0,1.0;",
  "v,10,52,1.0,1.0,1.0;",
  "t,0,1,2;",
  "t,0,3,1;",
  "v,10,10,1.0,1.0,1.0;",
  "v,10,52,0.0,0.0,0.0;",
  "v,52,52,1.0,1.0,1.0;",
  "v,52,10,0.0,0.0,0.0;",
  "l,4,5;",
  "l,5,6;",
  "l,6,7;",
  "l,7,4;"
].join("\n");


// DO NOT CHANGE ANYTHING BELOW HERE
export { Rasterizer, Framebuffer, DEF_INPUT };