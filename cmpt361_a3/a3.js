import { Framebuffer } from './framebuffer.js';
import { Rasterizer } from './rasterizer.js';
// DO NOT CHANGE ANYTHING ABOVE HERE

////////////////////////////////////////////////////////////////////////////////
// TODO: Implement functions drawLine(v1, v2) and drawTriangle(v1, v2, v3) below.
////////////////////////////////////////////////////////////////////////////////

// take two vertices defining line and rasterize to framebuffer
Rasterizer.prototype.drawLine = function(v1, v2) {
  const [x1, y1, [r1, g1, b1]] = v1;
  const [x2, y2, [r2, g2, b2]] = v2;
  // TODO/HINT: use this.setPixel(x, y, color) in this function to draw line
  this.setPixel(Math.floor(x1), Math.floor(y1), [r1, g1, b1]);
  this.setPixel(Math.floor(x2), Math.floor(y2), [r2, g2, b2]);
  var y = y1;
  var m = (y2 - y1)/(x2 - x1);
  if(x2-x1 == 0){
      for (var y = y1; y<y2; ++y){
          this.setPixel(x1, Math.round(y), [r1, g1, b1]);
      }
  }
  else if (m<1){
    for (var x = x1; x <x2; ++x){
        y += m;
        this.setPixel(x, Math.round(y), [r1, g1, b1]);
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
