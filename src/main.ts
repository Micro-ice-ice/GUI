import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import * as CellType from './grid/cells/cell_type'
import { Node } from './grid/node';
import { Value } from './grid/values/value';
import { Attribute } from './grid/values/attribute';
import { Scalar } from './grid/values/scalar';

const width = window.innerWidth;
const height = window.innerHeight;

const renderer = new THREE.WebGL1Renderer({
    canvas: document.getElementById('canvas') as HTMLCanvasElement
});
renderer.setSize(width, height);

const camera = new THREE.PerspectiveCamera(40, width / height, 1, 100);
camera.position.set(0, 0, 10);

const controls = new OrbitControls(camera, renderer.domElement);
controls.minDistance = 1;
controls.maxDistance = 100;
controls.maxPolarAngle = Math.PI;

const scene = new THREE.Scene();

const light = new THREE.AmbientLight(0xffffff);
scene.add(light);

animate();

function animate() {
    requestAnimationFrame(animate);

    //group.rotation.z += 0.005;

    render();
}



function render() {
    renderer.render(scene, camera);
}
