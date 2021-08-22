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

    const texture = new THREE.TextureLoader().load("earthmap1k.jpg")
    const bumpTexture = new THREE.TextureLoader().load("earthbump1k.jpg");
    const specularTexture = new THREE.TextureLoader().load("earthspec1k.jpg");

    geometry = new THREE.SphereGeometry(4,50,50);
    material = new THREE.MeshPhongMaterial({
        color:0xFFFFFF,
        map:texture,
        bumpMap:bumpTexture,
        specularMap:specularTexture,
         specular:new THREE.Color('Grey'),
    });
    mesh = new THREE.Mesh(geometry,material);
    scene.add(mesh);

    var hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 0.6 );
    hemiLight.position.set( 0, 50, 0 );
    scene.add( hemiLight );

    var dirLight = new THREE.DirectionalLight( 0xffffff, 1 );
    dirLight.position.set( 1, 0.75, 1 );
    dirLight.position.multiplyScalar( 50);
    dirLight.name = "dirlight";
    dirLight.castShadow = true;
    scene.add( dirLight );

    

    renderer.setSize(width, height);
    let pos = calculateSphericalFromLatLon(4,12.9716,77.5946);
    const box = new THREE.BoxGeometry(1,1,1);
    const boxMaterial = new THREE.MeshBasicMaterial({
        color:0xFF0000,
    });
    const boxMesh = new THREE.Mesh(box,boxMaterial);
    boxMesh.position.setFromSpherical(pos.x,pos.y,pos.z);
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