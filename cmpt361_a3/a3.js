import { Framebuffer } from './framebuffer.js';
import { Rasterizer } from './rasterizer.js';
// DO NOT CHANGE ANYTHING ABOVE HERE

////////////////////////////////////////////////////////////////////////////////
// TODO: Implement functions drawLine(v1, v2) and drawTriangle(v1, v2, v3) below.
////////////////////////////////////////////////////////////////////////////////

//Function to determine color of line at pixel v
function linePixelColor(v1, v2){
    //defining variables from input
    const [x1, y1, [r1, g1, b1]] = v1;
    const [x2, y2, [r2, g2, b2]] = v2;
    //use pythagorean theorem to get total length of the line
    TotalDistance = Math.sqrt((x2-x1)^2+(y2-y1)^2);
    //find the rate of change for each color component
    var dr = r2 - r1;
    var dg = g2 - g1;
    var db = b2 - b1;
    var rateR = dr/distance;
    var rateG = dg/distance;
    var rateB = db/distance;
    //determine the color of k
    return([rateR, rateG, rateB]);
}

// take two vertices defining line and rasterize to framebuffer
Rasterizer.prototype.drawLine = function(v1, v2) {
  const [x1, y1, [r1, g1, b1]] = v1;
  const [x2, y2, [r2, g2, b2]] = v2;
  // TODO/HINT: use this.setPixel(x, y, color) in this function to draw line
  this.setPixel(Math.floor(x1), Math.floor(y1), [r1, g1, b1]);
  this.setPixel(Math.floor(x2), Math.floor(y2), [r2, g2, b2]);
  //Flip vertices when drawing a line backwards
  if(x1>x2){
    const [X1, Y1, [R1, G1, B1]] = v2;
    const [X2, Y2, [R2, G2, B2]] = v1;
  }
  var [rateR, rateG, rateB] = linePixelColor(v1, v2);
  var distanceK;
  var m = (Y2 - Y1)/(X2 - X1);
  //when m = 0 draw a horizontal line
  if(Y1==Y2){
    var y = Y1;
    for(var x=X1; x<X2; ++x){
        distanceK = Math.sqrt((x-X1)^2+(y-Y1)^2);
        this.setPixel(Math.round(x), Math.round(y), [rateR*distanceK, rateG*distanceK, rateB*distanceK]);
    }
  }
  //when m is undefined, draw a vertical line
  if(X2-X1 == 0){
      var x = X1;
      for (var y = Y1; y<Y2; ++y){
          distanceK = Math.sqrt((x-X1)^2+(y-Y1)^2);
          this.setPixel(Math.round(x), Math.round(y), [rateR*distanceK, rateG*distanceK, rateB*distanceK]);
      }
  }
  //when |m|<1
  if(Math.abs(m)<=1){
    var y = Y1;
    for(var x = X1; x < X2; ++x){
        y += m;
        distanceK = Math.sqrt((x-X1)^2+(y-Y1)^2);
        this.setPixel(Math.round(x), Math.round(y), [rateR*distanceK, rateG*distanceK, rateB*distanceK]);
    }
  }
  //when |m|>1
  if(Math.abs(m)>1){
    var x = X1;
    for(var y = Y1; y<Y2; ++y){
        x += 1/m;
        distanceK = Math.sqrt((x-X1)^2+(y-Y1)^2);
        this.setPixel(Math.round(x), Math.round(y), [rateR*distanceK, rateG*distanceK, rateB*distanceK]);
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