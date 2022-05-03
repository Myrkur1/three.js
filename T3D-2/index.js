import * as THREE from "https://cdn.skypack.dev/three@0.133.1/build/three.module";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.133.1/examples/jsm/controls/OrbitControls";
import dat from "https://cdn.skypack.dev/dat.gui";

let scene, camera, cube, light, renderer, floor, directionalLight;

function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 1000);
  const canvas = document.querySelector('#canv');
  renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.setSize(window.innerWidth, window.innerHeight);

  light = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(light);

  directionalLight = new THREE.DirectionalLight(0xffffff, 1, 100);
  directionalLight.position.set(0, 10, 0);
  directionalLight.target.position.set(0, 0, 0);
  directionalLight.castShadow = true;
  directionalLight.shadow.mapSize.width = 512;
  directionalLight.shadow.mapSize.height = 512;
  directionalLight.shadow.camera.near = 0.5;
  directionalLight.shadow.camera.far = 1000;


  scene.add(directionalLight, directionalLight.target, light.target);

  const controls = new OrbitControls(camera, canvas);
  controls.target.set(0, 0, 0);
  controls.update();

  camera.position.z = 6;

  const cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
  const cubeMaterial = new THREE.MeshStandardMaterial({ color: 'green' });
  const floorGeometry = new THREE.BoxGeometry(20, 0.2, 20);
  const floorMaterial = new THREE.MeshStandardMaterial();
  floor = new THREE.Mesh(floorGeometry, floorMaterial);
  cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
  cube.castShadow = true;
  cube.receiveShadow = false;
  floor.receiveShadow = true;
  cube.position.y = 3;
  floor.position.y = -2;
  scene.add(cube, floor);



  const gui = new dat.GUI();
  const geometryFolder = gui.addFolder('Cube Geometry');
  geometryFolder.open();
  const rotationFolder = geometryFolder.addFolder('Rotation')
  rotationFolder.add(cube.rotation, 'x', 0, Math.PI).name('Rotate X Axis');
  rotationFolder.add(cube.rotation, 'y', 0, Math.PI).name('Rotate Y Axis');
  rotationFolder.add(cube.rotation, 'z', 0, Math.PI).name('Rotate Z Axis');
  const colorFolder = geometryFolder.addFolder('Color')
  colorFolder.open();
  const materialParams = {
    cubeColor: cube.material.color.getHex(),
  };
  colorFolder.addColor(materialParams, 'cubeColor').onChange((value) => cube.material.color.set(value));

  const lightFolder = gui.addFolder('Light Parameters');
  lightFolder.open();
  const directionalLightFolder = lightFolder.addFolder('Directional Light');
  directionalLightFolder.add(directionalLight, 'intensity', 0, 2, 0.01);
  directionalLightFolder.add(directionalLight.target.position, 'x', -10, 10);
  directionalLightFolder.add(directionalLight.target.position, 'y', -10, 10);
  directionalLightFolder.add(directionalLight.target.position, 'z', -10, 10);
  const ambientLightFolder = lightFolder.addFolder('Ambient Light');
  ambientLightFolder.add(directionalLight, 'intensity', 0, 1, 0.01);

}

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
};

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
};
window.addEventListener('resize', onWindowResize, false);
init();
animate();