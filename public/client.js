import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { USDZExporter } from 'three/examples/jsm/exporters/USDZExporter';
import { ARButton } from 'three/examples/jsm/webxr/ARButton';

console.log(THREE)
console.log(OrbitControls)
console.log(USDZExporter)

let camera, scene, renderer, model;

const init = () => {
    const container = document.createElement('div');
    document.body.appendChild(container);

    // Creating a Scene where all will be displayed
    scene = new THREE.Scene();

    // Creating a camera
    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 40);

    // Creating the WebGL renderer
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    renderer.xr.enabled = true;
    container.appendChild(renderer.domElement);

    // Light
    const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
    light.position.set(0.5, 1, 0.25);
    scene.add(light);

    // GLB object and USDZ
    const loader = new GLTFLoader().setPath('../assets/');
    loader.load('Bee.glb', async (glb) => {
        model = glb.scene;
        model.position.z = -10;
        scene.add(model);
        
        // USDZ
        const exporter = new USDZExporter();
        const arraybuffer = await exporter.parse(model);
        const blob = new Blob( [ arraybuffer ], { type: 'application/octet-stream' } );
        const link = document.getElementById('link');
        link.href = URL.createObjectURL(blob);
    })

    // Add the AR button to the DOM
    const button = ARButton.createButton(renderer);
    console.log(button);
    document.body.appendChild(button);

    // Funtion so that whenever you resize the window, it doesn't loose the aspect ratio
    window.addEventListener('resize', onWindowResize, false);
}

const onWindowResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight)
}

const animate = () => {
    renderer.setAnimationLoop(render);
}

// const rotateObjects = () => {
//     mesh.rotation.y = mesh.rotation.y - 0.01;
//     mesh2.rotation.x = mesh2.rotation.x - 0.04;
// }

const render = () => {
    // rotateObjects()
    renderer.render(scene, camera);
}
 
init();
animate();