let scene, camera, renderer, cube, cylinder, cone;

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const canvas = document.querySelector('#canv');
    renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias:true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    const spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(200, 400, 300);
    scene.add(spotLight);

    camera.position.z = 4;

    const cylinderGeometry = new THREE.CylinderBufferGeometry(1, 1, 1, 5);
    const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
    const coneGeometry = new THREE.ConeGeometry(1, 2, 5);
    const coneMaterial = new THREE.MeshPhongMaterial({ color: 'red' });
    const cubeMaterial = new THREE.MeshLambertMaterial({ color: 'green' });
    const cylinderTexture = new THREE.TextureLoader().load('textures/brick_diffuse.jpg');
    const cylinderMaterial = new THREE.MeshBasicMaterial({ map: cylinderTexture });
    cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
    cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cone = new THREE.Mesh(coneGeometry, coneMaterial);
    cube.position.x = 0;
    cylinder.position.x = -4;
    cone.position.x = 4;
    scene.add(cube, cylinder, cone);
};

function animate() {
    requestAnimationFrame(animate);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    cylinder.rotation.x += 0.01;
    cylinder.rotation.y += 0.01;
    cone.rotation.y += 0.01;

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