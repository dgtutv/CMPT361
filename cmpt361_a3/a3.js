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
function getColor(a, b, x, y){
    //Find normalized distance along line pixel v is
    var totalDistance = Math.sqrt((b.x-a.x)^2 + (b.y-a.y)^2);
    var distanceVtoV2 = Math.sqrt((x-a.x)^2 + (y-a.y)^2);
    var normDist = distanceVtoV2/totalDistance;
    //Apply linear interpolation for distance of pixel v along the line.
    var R = a.c[0] + (b.c[0]-a.c[0])*normDist;
    var G = a.c[1] + (b.c[1]-a.c[1])*normDist;
    var B = a.c[2] + (b.c[2]-a.c[2])*normDist;
    return [R, G, B];
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
	if(a.x==b.x){
		var x = a.x;
		for(var y = a.y; y<b.y; ++y){
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