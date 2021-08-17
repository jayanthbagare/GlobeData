import * as THREE from "https://cdn.skypack.dev/three@0.131.3";
import { OrbitControls } from 
    "https://cdn.skypack.dev/three@0.131.3/examples/jsm/controls/OrbitControls.js"
let scene,camera,renderer,geometry,material,mesh,controls;
let width = window.innerWidth;
let height = window.innerHeight;

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

    const texture = new THREE.TextureLoader().load("earth_hires.jpg")

    geometry = new THREE.SphereGeometry(4,50,50);
    material = new THREE.MeshBasicMaterial({
        color:0xFFFFFF,
        map:texture,
        // wireframe:true
    });
    mesh = new THREE.Mesh(geometry,material);
    scene.add(mesh);

    renderer.setSize(width, height);
    animate();
}

function animate(){
    requestAnimationFrame(animate);
    controls.update();
    mesh.rotation.y += 0.001;
    renderer.render(scene,camera);
}

init();