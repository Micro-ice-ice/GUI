import * as THREE from 'three'
import * as dat from 'dat.gui'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import * as CellType from './grid/cells/cell_type'
import { Node } from './grid/node';
import { Value } from './grid/values/value';
// import { Attribute } from './grid/values/attribute';
import { Grid } from './grid/grid';
// import { Scalar } from './grid/values/scalar';

//dat gui
const params = {
    wireframe: false,
}

const gui = new dat.GUI();
gui.add(params, "wireframe")

//
const button: any = document.querySelector("#ButtonSendRequest");
button.addEventListener("click", sendRequest);
function sendRequest() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://127.0.0.1:8000/filename=ventrical.vtk");
    xhr.onload = function () {
        if (xhr.status === 200) {
            group.children.forEach(child => {
                const mesh = child as THREE.Mesh;
                mesh.geometry.dispose();
            })
            group.clear();
            //console.log(xhr.responseText);
            const json_string = xhr.responseText;
            const grid = new Grid(json_string);
            //console.log(grid.cells);
            //console.log(grid.Cells[0]);
            for (let i = 0; i < grid.Cells.length; ++i) {
                const mesh = grid.Cells[i].ThreeObject;
                group.add(mesh);
            }

            console.log(grid.Cells[0].Value);
            grid.Cells.forEach(cell => {
                cell.SetColorByValueInCell(0);
            })
        }

    };
    xhr.send();
}

const group = new THREE.Group();

const width = window.innerWidth;
const height = window.innerHeight;

const renderer = new THREE.WebGL1Renderer({
    canvas: document.getElementById('canvas') as HTMLCanvasElement
});
renderer.setSize(width, height);

const camera = new THREE.PerspectiveCamera(40, width / height, 1, 1000);
camera.position.set(0, 0, 100);

const controls = new OrbitControls(camera, renderer.domElement);
controls.minDistance = 1;
controls.maxDistance = 100;
controls.maxPolarAngle = Math.PI;

const scene = new THREE.Scene();
scene.add(group)

scene.background = new THREE.Color(0x444444);

const ambientLight = new THREE.AmbientLight(0x666666);
scene.add(ambientLight);



const light = new THREE.PointLight(0x888888);
light.position.set(...camera.position.toArray());
scene.add(light);




// const g = new THREE.PlaneGeometry();
// const m = new THREE.MeshBasicMaterial();

// g.computeVertexNormals

// console.log(g.attributes)

// const mesh = new THREE.Mesh(g, m);
// scene.add(mesh)

// mesh.geometry.dispose

// let v = new Value();

// const nodes = [
//     new Node(-1, -1, -1, v),
//     new Node(1, -1, -1, v),
//     new Node(-1, 1, -1, v),
//     new Node(1, 1, -1, v),
//     new Node(-1, -1, 1, v),
//     new Node(1, -1, 1, v),
//     new Node(-1, 1, 1, v),
//     new Node(1, 1, 1, v),
// ]

// const vox = new CellType.Voxel(nodes, v);

// scene.add(vox.ThreeObject);

// console.log(vox.Geometry)



animate();

function animate() {
    requestAnimationFrame(animate);

    light.position.set(...camera.position.toArray());

    if ("wireframe" in CellType.Cell.Material) {
        CellType.Cell.Material.wireframe = params.wireframe
    }
    //CellType.Cell.Material = new THREE.MeshNormalMaterial();
    render();


}






function render() {
    renderer.render(scene, camera);
}
