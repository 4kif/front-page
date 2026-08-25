// 1. Setup Scene, Kamera, & Renderer
const container = document.getElementById('canvas-container');
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  45, 
  window.innerWidth / window.innerHeight, 
  0.1, 
  1000
);
camera.position.z = 4.5;

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
container.appendChild(renderer.domElement);

// 2. Pencahayaan (Lighting)
const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
scene.add(ambientLight);

const sunLight = new THREE.DirectionalLight(0xffffff, 1.2);
sunLight.position.set(5, 3, 5);
scene.add(sunLight);

// 3. Objek Satelit 3D (Bulan)
const geometry = new THREE.SphereGeometry(1.5, 64, 64);
const textureLoader = new THREE.TextureLoader();

// Tekstur permukaan Bulan
const moonTexture = textureLoader.load(
  'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/moon_1024.jpg'
);

const material = new THREE.MeshStandardMaterial({
  map: moonTexture,
  roughness: 0.8,
  metalness: 0.1
});

const moon = new THREE.Mesh(geometry, material);
moon.position.set(1.8, -0.2, 0); // Posisi di sebelah kanan
scene.add(moon);

// 4. Latar Belakang Bintang
const starsGeometry = new THREE.BufferGeometry();
const starsCount = 700;
const starPositions = new Float32Array(starsCount * 3);

for (let i = 0; i < starsCount * 3; i++) {
  starPositions[i] = (Math.random() - 0.5) * 20;
}

starsGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
const starsMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.015 });
const starField = new THREE.Points(starsGeometry, starsMaterial);
scene.add(starField);

// 5. Animasi Putaran
function animate() {
  requestAnimationFrame(animate);
  moon.rotation.y += 0.002; // Putaran automatik
  renderer.render(scene, camera);
}
animate();

// 6. Responsive Resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
