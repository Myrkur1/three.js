import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.121.1/build/three.module.js";
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/loaders/GLTFLoader.js';

let mouse, raycasting;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 200);
const canvas = document.querySelector('#canv');
const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
camera.position.z = 10;
scene.add(camera);

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(2, 2, 5)
scene.add(light);

const controls = new OrbitControls(camera, canvas);
controls.target.set(0, 0, 0);

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;

mouse = new THREE.Vector2();
raycasting = new THREE.Raycaster();

const loader = new GLTFLoader();
loader.load('model/pizzashop.glb', function (glb) {
  const root = glb.scene;
  root.scale.set(0.5, 0.5, 0.5)
  scene.add(root);
}
);

function removeEntity() {
  var selectedObject = scene.getObjectByName('Pizza');
  selectedObject.parent.remove(selectedObject);
}

canvas.addEventListener('click', function (event) {
  var bounds = canvas.getBoundingClientRect()
  mouse.x = ((event.clientX - bounds.left) / canvas.clientWidth) * 2 - 1;
  mouse.y = - ((event.clientY - bounds.top) / canvas.clientHeight) * 2 + 1;
  raycasting.setFromCamera(mouse, camera);
  var intersects = raycasting.intersectObjects(scene.children, true);
  if (intersects.length > 0) {
    removeEntity()
    animate();
  }
}, false)

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
};
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
};

window.addEventListener('resize', onWindowResize, false);
animate()