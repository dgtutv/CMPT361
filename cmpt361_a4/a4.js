import { Mat4 } from './math.js';
import { Parser } from './parser.js';
import { Scene } from './scene.js';
import { Renderer } from './renderer.js';
import { TriangleMesh } from './trianglemesh.js';
// DO NOT CHANGE ANYTHING ABOVE HERE

////////////////////////////////////////////////////////////////////////////////
// TODO: Implement createCube, createSphere, computeTransformation, and shaders
////////////////////////////////////////////////////////////////////////////////

//Function to determine spherical coordinates
function getSphereCoords(stackCount,sectorCount, radius){
  let coords = [];
  let pi = Math.PI;
  //Iterate over the sectors and stacks
  for(let stackStep=0; stackStep<stackCount; stackStep++){
    let phi = pi/2-pi*stackStep/stackCount;
    for(let sectorStep=0; sectorStep<sectorCount; sectorStep++){
      let theta = 2*pi*sectorStep/sectorCount;
      //Calculate x,y,z coordinates of sphere's surface and add to coordinates list
      let x = (radius*Math.cos(phi))*Math.cos(theta);
      let y = (radius*Math.cos(phi))*Math.sin(theta);
      let z = radius*Math.sin(phi);
      coords.push([x,y,z]);
    }
  }
  return coords;
}

//Function to determine vertices for triangles of sphere
function getSphereTriangles(stackCount, sectorCount, indices){
  let triangleList = [];
  let index = 0; //This is the index of the indices list, denotes top left of square which will be split into two triangles
  //Iterate over the sectors and stacks, stop one before end of each sectors and steps, as we need to access k+1 vertex
  for(let stackStep=0; stackStep<stackCount-1; stackStep++){
    for(let sectorStep=0; sectorStep<sectorCount-1; sectorStep++){
      //Define the vertices that define our square
      let topLeft = indices[index];
      let topRight = indices[topLeft+1];
      let bottomLeft = indices[index+sectorCount];
      let bottomRight = indices[bottomLeft+1];

      //Write the two trianlges to our list [x1, y1, z1, x2, y2, z2, x3, y3, z3] in counter clockwise order
      triangleList.push(topLeft[0], topLeft[1], topLeft[2], bottomLeft[0], bottomLeft[1], bottomLeft[2], topRight[0], topRight[1], topRight[2]);
      triangleList.push(topRight[0], topRight[1], topRight[2], bottomLeft[0], bottomLeft[1], bottomLeft[2], bottomRight[0], bottomRight[1], bottomRight[2]);
      index++;
    }
  }
  return triangleList;
}


// Example two triangle quad
const quad = {
  positions: [-1, -1, -1, 1, -1, -1, 1, 1, -1, -1, -1, -1, 1,  1, -1, -1,  1, -1],
  normals: [0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1],
  uvCoords: [0, 0, 1, 0, 1, 1, 0, 0, 1, 1, 0, 1]
}

TriangleMesh.prototype.createCube = function() {
  //Creating an array to store the triangle soup
  //TODO: change so that order is counter clockwise
  this.positions = [
    //Front face:
    -1,1,1, 1,1,1, 1,-1,1, //Top left front corner, Top right front corner, bottom right front corner
    -1,1,1, -1,-1,1, 1,-1,1, //Top left front corner, Bottom left front corner, Bottom right front corner

    //Back face:
    -1,1,-1, 1,1,-1, 1,-1,-1, //Top left back corner, Top right back corner, Bottom right back corner
    -1,1,-1, -1,-1,-1, 1,-1,-1, //Top left back corner, Bottom left back corner, Bottom right back corner

    //Left face
    -1,1,1, -1,-1,1, -1,-1,-1, //Top left front corner, Bottom left front corner, Bottom left back corner
    -1,1,1, -1,1,-1, -1,-1,-1, //Top left front corner, Top left back corner, Bottom left back corner

    //Right face
    1,1,1, 1,1,-1, 1,-1,-1, //Top right front corner, Top right back corner, Bottom right back corner
    1,1,1, 1,-1,1, 1,-1,-1, //Top right front corner, Bottom right front corner, Bottom right back corner
  
    //Top face
    -1,1,1, -1,1,-1, 1,1,-1, //Top left front corner, Top left back corner, Top right back corner
    -1,1,1, 1,1,1, 1,1,-1, //Top left front corner, Top right front corner, Top right back corner

    //Bottom face
    -1,-1,1, -1,-1,-1, 1,-1,-1, //Bottom left front corner, Bottom left back corner, Bottom right back corner
    -1,-1,1, 1,-1,1, 1,-1,-1 //Bottom left front corner, Bottom right front corner, Bottom right back corner
  ]

  //Create surface normals for each face at each corner
  this.normals = [

  //Top left front corner
  0,1,0, //Top
  -1,0,0, //Left
  0,0,1, //Front

  //Top right front corner
  0,1,0, //Top
  1,0,0, //Right
  0,0,1, //Front

  //Bottom left front corner
  0,-1,0, //Bottom
  -1,0,0, //Left
  0,0,1, //Front

  //Bottom right front corner
  0,-1,0, //Bottom
  1,0,0, //Right
  0,0,1, //Front

  //Top left back corner
  0,1,0, //Top
  -1,0,0, //Left
  0,0,-1, //Back

  //Top right back corner
  0,1,0, //Top
  1,0,0, //Right
  0,0,-1, //Back

  //Bottom left back corner
  0,-1,0, //Bottom
  -1,0,0, //Left
  0,0,-1, //Back

  //Bottom right back corner
  0,-1,0, //Bottom
  1,0,0, //Right
  0,0,-1//Back
  ]

  //Fill in the uv coordinates for the square
  this.uvCoords = [
    -1,1,   //Bottom left front
    -1,-1,  //Bottom left back
    1,1,   //Bottom right front  
    1,-1,   //Bottom right back
    1,2, 2,1,   //Top right front
    1,-2, 2,-1,   //Top right back
    -2,1, -1,2, 3,1,    //Top left front
    -2,-1, -1,-2, 3,-1    //Top left back
  ]
}

TriangleMesh.prototype.createSphere = function(numStacks, numSectors) {
  //Store all generated spherical x,y,z coordinates in indicies so we can easily access when drawing triangles
  this.indices = getSphereCoords(numStacks, numSectors, 1);
  //Store the positions of the vertices that form our triangles
  this.positions = getSphereTriangles(numStacks, numSectors, this.indices);
  //Store the uv coordinate positions of the vertices that form our triangles

  //Store the surface normals for the vertices (an angle for each face it is connected to as well)

}

Scene.prototype.computeTransformation = function(transformSequence) {
  // TODO: go through transform sequence and compose into overallTransform
  let overallTransform = Mat4.create();  // identity matrix
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
