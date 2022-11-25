import { Mat4 } from './math.js';
import { Parser } from './parser.js';
import { Scene } from './scene.js';
import { Renderer } from './renderer.js';
import { TriangleMesh } from './trianglemesh.js';
// DO NOT CHANGE ANYTHING ABOVE HERE

////////////////////////////////////////////////////////////////////////////////
// TODO: Implement createCube, createSphere, computeTransformation, and shaders
////////////////////////////////////////////////////////////////////////////////

//Function to turn degrees to radians
function degreeToRadian(phi){
  let theta = phi * (Math.PI/180);    //360 degrees is 2pi radians => pi/180 radians per degree => degrees * pi/180 = radians
  return theta;
}

//Function that returns sin(phi), where phi is in degrees
function sin(phi){
  //Check if sin(phi) should equal 0
  if(phi%180 == 0 || phi == 0){   //If phi is a multiple of 180, or is 0, return 0
    return 0;
  }
  //Otherwise, calculate the radian equivalent, theta, and return Math.sin(theta)
  else{
    let theta = degreeToRadian(phi);
    return Math.sin(theta);
  }
}
//Function that returns cos(phi), where phi is in degrees
function cos(phi){
  //Check if sin(phi) should equal 0
  if(phi%270 == 0 || phi == 90 || phi == -90){   //If phi is a multiple of 270, or is +-90, return 0
    return 0;
  }
  //Otherwise, calculate the radian equivalent, theta, and return Math.cos(theta)
  else{
    let theta = degreeToRadian(phi);
    return Math.cos(theta);
  }
}
//Function to create translation matrix
function translate(x,y,z){
  let matrix = Mat4.set(Mat4.create(), 1, 0, 0, x, 0, 1, 0, y, 0, 0, 1, z, 0, 0, 0, 1);
  return matrix;
}
//Function to create scaling matrix
function scale(x, y, z){
  let matrix = Mat4.set(Mat4.create(), x, 0, 0, 0, 0, y, 0, 0, 0, 0, z, 0, 0, 0, 0, 1);
  return matrix;
}
//Function to create x axis rotation matrix
function rotateX(phi){
  let matrix = Mat4.set(Mat4.create(), 1, 0, 0, 0, 0, cos(phi), -sin(phi), 0, 0, sin(phi), cos(phi), 0, 0, 0, 0, 1);
  return matrix;
}
//Function to create y axis rotation matrix
function rotateY(phi){
  let matrix = Mat4.set(Mat4.create(), cos(phi), 0, sin(phi), 0, 0, 1, 0, 0, -sin(phi), 0, cos(phi), 0, 0, 0, 0, 1);
  return matrix;
}
//Function to create z axis rotation matrix
function rotateZ(phi){
  let matrix = Mat4.set(Mat4.create(), cos(phi), -sin(phi), 0, 0, sin(phi), cos(phi), 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
  return matrix;
}

//Function to determine spherical coordinates 3D, inspired by http://www.songho.ca/opengl/gl_sphere.html
function getSphereCoords3D(stackCount,sectorCount){
  let coords3D = [];
  let pi = Math.PI;
  //Iterate over the sectors and stacks
  for(let stackStep=0; stackStep<=stackCount; ++stackStep){
    let phi = pi/2-stackStep*pi/stackCount;
    for(let sectorStep=0; sectorStep<=sectorCount; ++sectorStep){
      let theta = sectorStep*2*pi/sectorCount;
      //Calculate (x,y,z) coordinates of sphere's surface and add to coordinates list
      let x = Math.cos(phi)*Math.cos(theta);
      let y = Math.cos(phi)*Math.sin(theta);
      let z = Math.sin(phi);
      coords3D.push(y);
      coords3D.push(x);
      coords3D.push(z);
    }
  }
  //Return both of the 3D and 2D spherical coordinates
  return coords3D;
}
//Function to determine spherical coordinates 2D, inspired by http://www.songho.ca/opengl/gl_sphere.html
function getSphereCoords2D(stackCount,sectorCount){
  let coords2D = [];
  let pi = Math.PI;
  //Iterate over the sectors and stacks
  for(let stackStep=0; stackStep<=stackCount; ++stackStep){
    let phi = pi/2-stackStep*pi/stackCount;
    for(let sectorStep=0; sectorStep<=sectorCount; ++sectorStep){
      let theta = sectorStep*2*pi/sectorCount;

      //Calculate the (u,v) coordinates 
      let u = sectorStep/sectorCount;
      let v = stackStep/stackCount;
      coords2D.push(u);
      coords2D.push(v);
    }
  }

  //Return both of the 3D and 2D spherical coordinates
  return coords2D;
}

//Function to determine vertices for triangles of sphere, inspired by http://www.songho.ca/opengl/gl_sphere.html
function getSphereIndices(stackCount, sectorCount){
  let indexList = [];

  //Iterate over the stacks & sectors
  for(let stackStep=0; stackStep<stackCount; ++stackStep){
    //Define the corners of our square
    let topLeft = stackStep*(sectorCount+1);
    let bottomLeft = topLeft + sectorCount + 1; //Move a row down from the top left index essentially

    for(let sectorStep=0; sectorStep<sectorCount; ++sectorStep, ++topLeft, ++bottomLeft){
      //If not the first stack only draw top triangle (bottom triangle is only triangle on top row)
      if(stackStep != 0){   
        indexList.push(topLeft);
        indexList.push(bottomLeft);
        indexList.push(topLeft+1);
      }
      //If not the last stack only draw the bottom triangle (top triangle is only triangle on bottom row)
      if(stackStep != (stackCount - 1)){   
        indexList.push(topLeft+1);
        indexList.push(bottomLeft);
        indexList.push(bottomLeft+1);
      }
    }
  }
  return indexList;
}


// Example two triangle quad
const quad = {
  positions: [-1, -1, -1, 1, -1, -1, 1, 1, -1, -1, -1, -1, 1,  1, -1, -1,  1, -1],
  normals: [0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1],
  uvCoords: [0, 0, 1, 0, 1, 1, 0, 0, 1, 1, 0, 1]
}

TriangleMesh.prototype.createCube = function() {
  //Creating an array to store the triangle soup, faces ordered as dice numbers
  this.positions = [

    //Face 3 (top)**
    1,1,-1, 1,-1,1, 1,-1,-1,
    1,1,-1, 1,-1,1, 1,1,1,

    //Face 4 (bottom)
    -1,1,-1, -1,-1,1, -1,-1,-1,
    -1,1,-1, -1,-1,1, -1,1,1,

    //Face 2 (right)**
    1,1,-1, -1,1,1, -1,1,-1,
    1,1,-1, -1,1,1, 1,1,1,

    //Face 5 (left)**
    1,-1,-1, -1,-1,1, -1,-1,-1,
    1,-1,-1, -1,-1,1, 1,-1,1,
    
    //Face 1 (front)**
    1,-1,1, -1,1,1, -1,-1,1,
    1,-1,1, -1,1,1, 1,1,1,
    
    //Face 6 (back)**
    1,-1,-1, -1,1,-1, -1,-1,-1,
    1,-1,-1, -1,1,-1, 1,1,-1,
    ];
  //Create surface normals for each face at each corner
  this.normals = [

    //Top left front corner
    1,0,0, //Top
    0,-1,0, //Left
    0,0,1, //Front

    //Top right front corner
    1,0,0, //Top
    0,1,0, //Right
    0,0,1, //Front

    //Bottom left front corner
    -1,0,0, //Bottom
    0,-1,0, //Left
    0,0,1, //Front

    //Bottom right front corner
    -1,0,0, //Bottom
    0,1,0, //Right
    0,0,1, //Front

    //Top left back corner
    1,0,0, //Top
    0,-1,0, //Left
    0,0,-1, //Back

    //Top right back corner
    1,0,0, //Top
    0,1,0, //Right
    0,0,-1, //Back

    //Bottom left back corner
    -1,0,0, //Bottom
    0,-1,0, //Left
    0,0,-1, //Back

    //Bottom right back corner
    -1,0,0, //Bottom
    0,1,0, //Right
    0,0,-1    //Back
  ]

  //Fill in the uv coordinates for the cube, faces ordered as dice numbers
  this.uvCoords = [
    //Face 1 (front)
    0.5,1, 0,1, 0.5,0.66666666666,    //Top left front, Bottom left front, Top right front
    0.5,0.66666666666, 0,1, 0,0.66666666666,    //Top right front, Bottom left front, Bottom right front

    //Face 2 (right)
    0.5,0.66666666666, 0,0.66666666666, 0.5,0.33333333333,    //Top right front, Bottom right front, Top right back
    0.5,0.33333333333, 0,0.66666666666, 0,0.33333333333,    //Top right back, Bottom right front, Bottom right back 

    //Face 3 (top)
    0.5,0.33333333333, 0,0.33333333333, 0.5,0,    //Top left back, Top left front, Top right back
    0.5,0, 0,0.33333333333, 0,0,    //Top right back, Top left front, Top right front

    //Face 4 (bottom)
    1,0.66666666666, 0.5,0.66666666666, 1,1,    //Bottom left back, Bottom left front, Bottom right back
    1,1, 0.5,0.66666666666, 0.5,1,    //Bottom right back, Bottom left front, Bottom right front

    //Face 5 (left)
    0.5,0.66666666666, 1,0.66666666666, 0.5,0.33333333333,    //Top left front, Bottom left front, Top left back
    0.5,0.33333333333, 1,0.66666666666, 1,0.33333333333,    //Top left back, Bottom left front, Bottom left back 

    //Face 6 (back)
    0.5,0.33333333333, 1,0.33333333333, 0.5,0,    //Top left back, Bottom left back, Top right back
    0.5,0, 1,0.33333333333, 1,0   //Top right back, Bottom left back, Bottom right back
  ]
}

TriangleMesh.prototype.createSphere = function(numStacks, numSectors) {
  //Store all generated spherical x,y,z coordinates in positions so we can easily access when drawing triangles
  this.positions = getSphereCoords3D(numStacks, numSectors);

  //Store the positions of the vertices that form our triangles
  this.indices = getSphereIndices(numStacks, numSectors);

  //Store the uv coordinate positions of the vertices that form our triangles
  this.uvCoords = getSphereCoords2D(numStacks, numSectors);

  //Store the surface normals for the vertices (same as positions as is unit sphere)
  this.normals = getSphereCoords3D(numStacks, numSectors);
}

Scene.prototype.computeTransformation = function(transformSequence) {
  // TODO: go through transform sequence and compose into overallTransform
  let overallTransform = Mat4.create();  // identity matrix
  console.log(transformSequence[0]);
  //Iterate over list of transformations
  for(let i=transformSequence.length-1; i>=0; i--){
    //Determine what type of transformation to do 
    let transformType = transformSequence[i][0];
    //Find the correct transformatrion matrix given the type of transformation requested
    let transformMatrix = [];
    switch(transformType){
      case "Rx":
        transformMatrix = rotateX(transformSequence[i][1]);   //Pass phi
        break;
      case "Ry":
        transformMatrix = rotateY(transformSequence[i][1]);   //Pass phi
        break;
      case "Rz":
        transformMatrix = rotateZ(transformSequence[i][1]);   //Pass phi
        break;
      case "S":           
        transformMatrix = scale(transformSequence[i][1], transformSequence[i][2], transformSequence[i][3]);   //Pass x,y,z
        break;
      default:
        transformMatrix = translate(transformSequence[i][1], transformSequence[i][2], transformSequence[i][3]);   //Pass x,y,z
        break;        
    }
    console.log(transformSequence[i])
    console.log(transformMatrix)
    Mat4.multiply(overallTransform, transformMatrix, overallTransform);
  }
  console.log (overallTransform)
  return overallTransform;
}

Renderer.prototype.VERTEX_SHADER = `
precision mediump float;
attribute vec3 position, normal;
attribute vec2 uvCoord;
uniform vec3 lightPosition;
uniform mat4 projectionMatrix, viewMatrix, modelMatrix;
uniform mat3 normalMatrix;
varying vec2 vTexCoord;
// TODO: implement vertex shader logic below
varying vec3 temp;
void main() {
  temp = vec3(position.x, normal.x, uvCoord.x);
  vTexCoord = uvCoord;
  gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);
}
`;

Renderer.prototype.FRAGMENT_SHADER = `
precision mediump float;
uniform vec3 ka, kd, ks, lightIntensity;
uniform float shininess;
uniform sampler2D uTexture;
uniform bool hasTexture;
varying vec2 vTexCoord;
// TODO: implement fragment shader logic below
varying vec3 temp;
void main() {
  gl_FragColor = vec4(temp, 1.0);
}
`;

////////////////////////////////////////////////////////////////////////////////
// EXTRA CREDIT: change DEF_INPUT to create something interesting!
////////////////////////////////////////////////////////////////////////////////
const DEF_INPUT = [
  "c,myCamera,perspective,5,5,5,0,0,0,0,1,0;",
  "l,myLight,point,0,5,0,2,2,2;",
  "p,unitCube,cube;",
  "p,unitSphere,sphere,20,20;",
  "m,redDiceMat,0.3,0,0,0.7,0,0,1,1,1,15,dice.jpg;",
  "m,grnDiceMat,0,0.3,0,0,0.7,0,1,1,1,15,dice.jpg;",
  "m,bluDiceMat,0,0,0.3,0,0,0.7,1,1,1,15,dice.jpg;",
  "m,globeMat,0.3,0.3,0.3,0.7,0.7,0.7,1,1,1,5,globe.jpg;",
  "o,rd,unitCube,redDiceMat;",
  "o,gd,unitCube,grnDiceMat;",
  "o,bd,unitCube,bluDiceMat;",
  "o,gl,unitSphere,globeMat;",
  "X,rd,Rz,75;X,rd,Rx,90;X,rd,S,0.5,0.5,0.5;X,rd,T,-1,0,2;",
  "X,gd,Ry,45;X,gd,S,0.5,0.5,0.5;X,gd,T,2,0,2;",
  "X,bd,S,0.5,0.5,0.5;X,bd,Rx,90;X,bd,T,2,0,-1;",
  "X,gl,S,1.5,1.5,1.5;X,gl,Rx,90;X,gl,Ry,-150;X,gl,T,0,1.5,0;",
].join("\n");

// DO NOT CHANGE ANYTHING BELOW HERE
export { Parser, Scene, Renderer, DEF_INPUT };
