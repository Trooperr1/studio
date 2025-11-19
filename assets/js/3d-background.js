// ============================================
// JAFF STUDIO - 3D BACKGROUND ANIMATION
// ============================================

// THREE.JS 3D Background - BLACK & WHITE
const canvas = document.getElementById('canvas-3d');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
camera.position.z = 5;

// Particle System - White particles (reduce for mobile)
const particlesGeometry = new THREE.BufferGeometry();
const isMobile = window.innerWidth <= 768;
const particleCount = isMobile ? 800 : 2000;
const positions = new Float32Array(particleCount * 3);

for (let i = 0; i < particleCount * 3; i += 3) {
    positions[i] = (Math.random() - 0.5) * 20;
    positions[i + 1] = (Math.random() - 0.5) * 20;
    positions[i + 2] = (Math.random() - 0.5) * 20;
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

const particlesMaterial = new THREE.PointsMaterial({
    size: 0.03,
    color: 0xffffff,
    transparent: true,
    opacity: 0.6,
    blending: THREE.AdditiveBlending
});

const particles = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particles);

// 3D Geometric Shapes - White wireframe
const torusGeometry = new THREE.TorusGeometry(1.5, 0.4, 16, 100);
const torusMaterial = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    wireframe: true,
    transparent: true,
    opacity: 0.1
});
const torus = new THREE.Mesh(torusGeometry, torusMaterial);
scene.add(torus);

// Mouse Movement
let mouseX = 0, mouseY = 0;
document.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
});

// Animation Loop
function animate() {
    requestAnimationFrame(animate);

    particles.rotation.y += 0.0003;
    particles.rotation.x += 0.0002;

    torus.rotation.x += 0.002;
    torus.rotation.y += 0.003;

    camera.position.x += (mouseX * 0.3 - camera.position.x) * 0.05;
    camera.position.y += (mouseY * 0.3 - camera.position.y) * 0.05;

    renderer.render(scene, camera);
}
animate();

// Handle Resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
