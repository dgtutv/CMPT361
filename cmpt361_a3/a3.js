import { Framebuffer } from './framebuffer.js';
import { Rasterizer } from './rasterizer.js';
// DO NOT CHANGE ANYTHING ABOVE HERE

////////////////////////////////////////////////////////////////////////////////
// TODO: Implement functions drawLine(v1, v2) and drawTriangle(v1, v2, v3) below.
////////////////////////////////////////////////////////////////////////////////
//Class for vertices
class vertex{
	constructor(x, y, [r, g, b]){
	this.x = x;
	this.y = y;
	this.c = [r,g,b];
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
//Function to determine normalized point on line
function getT(a, b, x, y){
	//Get total line length
	var diffX = b.x-a.x;
	if(a.y>b.y){
		var diffY = a.y-b.y;
	}
	else{
		var diffY = b.y-a.y;
	}
	var totalLength = Math.sqrt(diffX^2 + diffY^2);
	//Get length of line from a to point
	var lenX = x-a.x;
	if(a.y>b.y){
        var lenY = y-b.y;
    }
    else{
        var lenY = y-a.y;
    }
    var segmentLength = Math.sqrt(lenX^2 + lenY^2);
	//Divide to get normalization
	console.log(segmentLength/totalLength);
	return segmentLength/totalLength;
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
		//Determine which point has greater y value
		if(a.y>b.y){
			for(var y=b.y; y<a.y; ++y){
				var t = getT(a,b,x,y);
				this.setPixel(Math.floor(x), Math.floor(y), getColor(b, a, t));
			}
		}
		else{
			for(var y=a.y; y<b.y; ++y){
				var t = getT(a,b,x,y);
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
		for(var x=a.x; x<b.x; ++x){
			var t = getT(a,b,x,y);
			this.setPixel(Math.floor(x), Math.floor(y), getColor(a, b, t));
			y+=m;
		}
	}
	//When |m|>1, increment y by 1 and x by 1/m
	if(Math.abs(m)>1){
		var x = a.x;
        for(var y=a.y; y<b.y; ++y){
            x+=1/m;
			var t = getT(a,b,x,y);
            this.setPixel(Math.floor(x), Math.floor(y), getColor(a, b, x, y));
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