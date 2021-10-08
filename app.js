import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

let scene, camera, renderer;

const init = () => {
    // const container = document.createElement('div');
    // document.body.appendChild(container);
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 40);
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    // renderer.xr.enabled = true;
    document.body.appendChild(renderer.domElement);
    console.log("object")


    window.addEventListener('resize', onWindowResize, false);
}

const onWindowResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

    renderer.setAnimationLoop(render);
}

const render = () => {
    renderer.render(scene, camera);
}

init();