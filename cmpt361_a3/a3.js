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
  var m = (y2 - y1)/(x2 - x1);
  //Flip variables when drawing a line backwards
  if(y2>y1){
    var Y2 = y2;
    var Y1 = y1;
  }
  else if(y1>y2){
    var Y1 = y2;
    var Y2 = y1;
  }
  if(x2>x1){
    var X2 = x2;
    var X1 = x1;
  }
  else if(x1>x2);
    var X2 = x1;
    var X1 = x2;
  )
  //when m = 0 draw a horizontal line
  if(Y1==Y2){
    for(var x=X1; x<X2; ++x){
        this.setPixel(Math.round(x), Y1, [r1, g1, b1])
    }
  }
  //when m is undefined, draw a vertical line
  else if(x2 == x1){
    var y = Y1;
    for (var y = Y1; y<Y2; ++y){
        this.setPixel(X1, Math.round(y), [r1, g1, b1]);
    }
  }
  //when m =1, draw a diagonal line
  else if (m==1){
    for (var x = X1; x<X2; ++x){
        for(var y = Y1; y<=Y2; y++){
            this.setPixel(Math.round(x), Math.round(y), [r1, g1, b1])
        }
    }
  }
  //when |m|<1
  else if(Math.abs(m)<1){
    var x = X1, y = Y1;
    this.setPixel(x, y, [r1, g1, b1]);
    while(x < X2){
        x = x+1;
        y = y+m;
        this.setPixel(Math.round(x), Math.round(y), [r1, g1, b1]);
    }
  }
  //when |m|>1
  else if(Math.abs(m)>1){
  var x = X1, y = Y1;
  this.setPixel(x, y, [r1, g1, b1]);
  while(y < Y2){
    y = y+1;
    x = x+(1/m);
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