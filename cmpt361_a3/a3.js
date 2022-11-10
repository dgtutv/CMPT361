import { Framebuffer } from './framebuffer.js';
import { Rasterizer } from './rasterizer.js';
// DO NOT CHANGE ANYTHING ABOVE HERE

////////////////////////////////////////////////////////////////////////////////
// TODO: Implement functions drawLine(v1, v2) and drawTriangle(v1, v2, v3) below.
////////////////////////////////////////////////////////////////////////////////

//Function to determine color of line at pixel v
function linePixelColor(v1, v2, x, y){
    //defining variables from input
    const [x1, y1, [r1, g1, b1]] = v1;
    const [x2, y2, [r2, g2, b2]] = v2;
    //Find normalized distance along line pixel v is
    var totalDistance = (x2-x1)^2 + (y2-y1)^2;
    var distanceVtoV2 = (x-x1)^2 + (y-y1)^2;
    var normDist = distanceVtoV2/totalDistance;
    //Apply linear interpolation for distance of pixel v along the line.
    var R = r1 + (r2-r1)*normDist;
    var G = g1 + (g2-g1)*normDist;
    var B = b1 + (b2-b1)*normDist;
    return [R, G, B];
}

// take two vertices defining line and rasterize to framebuffer
Rasterizer.prototype.drawLine = function(v1, v2) {
  var [x1, y1, [r1, g1, b1]] = v1;
  var [x2, y2, [r2, g2, b2]] = v2;
  // TODO/HINT: use this.setPixel(x, y, color) in this function to draw line
  this.setPixel(Math.floor(x1), Math.floor(y1), [r1, g1, b1]);
  this.setPixel(Math.floor(x2), Math.floor(y2), [r2, g2, b2]);
  //Flip vertices when drawing a line backwards
  var color;
  if(x1>x2){
    var [X1, Y1, [R1, G1, B1]] = v2;
    var [X2, Y2, [R2, G2, B2]] = v1;
    var V1 = v2;
    var V2 = v1;
  }
  else{
    var [X1, Y1, [R1, G1, B1]] = v1;
    var [X2, Y2, [R2, G2, B2]] = v2;
    var V1 = v1;
    var V2 = v2;
  }
  var m = (Y2 - Y1)/(X2 - X1);
  //when m is undefined, draw a vertical line
  if(X2-X1 == 0){
      var x = X1;
      for (var y = Y1; y<Y2; ++y){
          color = linePixelColor(V1, V2, x, y);
          this.setPixel(Math.floor(x), Math.floor(y), color);
      }
  }
  //when m = 0 draw a horizontal line
  if(Y1==Y2){
    var y = Y1;
    for(var x=X1; x<X2; ++x){
        color = linePixelColor(V1, V2, x, y);
        this.setPixel(Math.floor(x), Math.floor(y), color);
    }
  }
  //when |m|<1
  if(Math.abs(m)<=1){
    var y = Y1;
    for(var x = X1; x < X2; ++x){
        y += m;
        color = linePixelColor(V1, V2, x, y);
        this.setPixel(Math.floor(x), Math.floor(y), color);
    }
  }
  //when |m|>1
  if(Math.abs(m)>1){
    var x = X1;
    for(var y = Y1; y<Y2; ++y){
        x += 1/m;
        color = linePixelColor(V1, V2, x, y);
        this.setPixel(Math.floor(x), Math.floor(y), color);
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