import * as THREE from "https://cdn.skypack.dev/three@0.131.3";
import { OrbitControls } from 
    "https://cdn.skypack.dev/three@0.131.3/examples/jsm/controls/OrbitControls.js"
let scene,camera,renderer,geometry,material,mesh,controls;
let width = window.innerWidth;
let height = window.innerHeight;

function calculateSphericalFromLatLon(radius,lat,lon){
    var spherical = new THREE.Spherical(
        radius,
        THREE.Math.degToRad(90 - lon),
        THREE.Math.degToRad(lat)
      );
    
      var vector = new THREE.Vector3();
      vector.setFromSpherical(spherical);
    
      console.log(vector.x, vector.y, vector.z);
      return vector;
}

function init(){
    const fov = 75;
    const aspect = width/height;
    const near = 0.1;
    const far = 1000;

    const canvas = document.querySelector("#canvas");

    scene = new THREE.Scene();
    renderer = new THREE.WebGLRenderer({canvas:canvas});

    camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.z = 10;
    scene.add(camera);

    controls = new OrbitControls(camera,canvas);

    const texture = new THREE.TextureLoader().load("earthnight.jpg")
    const bumpTexture = new THREE.TextureLoader().load("earthbump1k.jpg");
    const specularTexture = new THREE.TextureLoader().load("earthspec1k.jpg");

    geometry = new THREE.SphereGeometry(4,50,50);
    material = new THREE.MeshBasicMaterial({
        color:0xFFFFFF,
        map:texture,
        bumpMap:bumpTexture,
        specularMap:specularTexture,
        specular:new THREE.Color('grey'),
    });
    mesh = new THREE.Mesh(geometry,material);
    scene.add(mesh);

    scene.add(new THREE.AmbientLight(0x333333));

    var light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(5,3,5);
    scene.add(light);

    renderer.setSize(width, height);
    let pos = calculateSphericalFromLatLon(4,12.9716,77.5946);
    const box = new THREE.BoxGeometry(1,1,1);
    const boxMaterial = new THREE.MeshBasicMaterial({
        color:0xFF0000,
    });
    const boxMesh = new THREE.Mesh(box,boxMaterial);
    boxMesh.position.set(pos.x,pos.y,pos.z);
    scene.add(boxMesh);
    animate();
}

function animate(){
    requestAnimationFrame(animate);
    controls.update();
    mesh.rotation.y += 0.005;
    renderer.render(scene,camera);
}



init();