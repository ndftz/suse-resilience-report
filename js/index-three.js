import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(85, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.domElement.id = 'bg-canvas';
document.body.appendChild(renderer.domElement);

camera.position.x = 0;
camera.position.y = 0;
camera.position.z = -1;

// Sphere parameters
const pointCount = 60;
const radius = 30;
const maxDistance = 16;

// Points geometry
const pointsGeometry = new THREE.BufferGeometry();
const positions = new Float32Array(pointCount * 6);
const velocities = new Float32Array(pointCount * 1.3);

for (let i = 0; i < pointCount; i++) {
    const phi = Math.acos(-1 + (2 * i) / pointCount);
    const theta = Math.sqrt(pointCount * Math.PI) * phi;

    positions[i * 3] = radius * Math.cos(theta) * Math.sin(phi);
    positions[i * 3 + 1] = radius * Math.sin(theta) * Math.sin(phi);
    positions[i * 3 + 2] = radius * Math.cos(phi);

    velocities[i * 3] = (Math.random() - 0.5) * 0.01;
    velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.01;
    velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.01;
}

pointsGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

// Create a circular texture for the points
const createCircleTexture = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    if (ctx) {
        ctx.beginPath();
        ctx.arc(32, 32, 30, 0, Math.PI * 2);
        ctx.fillStyle = '#fff';
        ctx.fill();
    }
    return new THREE.CanvasTexture(canvas);
};

const pointsMaterial = new THREE.PointsMaterial({
    color: 0x008878,
    size: 0.5,
    transparent: true,
    opacity: 1,
    map: createCircleTexture(),
    alphaTest: 1,
});

const points = new THREE.Points(pointsGeometry, pointsMaterial);
scene.add(points);

// Lines geometry
const linesGeometry = new THREE.BufferGeometry();
const lineMaterial = new THREE.LineBasicMaterial({
    color: 0x008878,
    transparent: true,
    opacity: 1,
});

const lineMesh = new THREE.LineSegments(linesGeometry, lineMaterial);
scene.add(lineMesh);

// Animation loop
const animate = () => {
    requestAnimationFrame(animate);

    const positionsAttr = pointsGeometry.attributes.position;
    const currentPositions = positionsAttr.array;

    // Update positions
    for (let i = 0; i < pointCount; i++) {
        currentPositions[i * 3] += velocities[i * 3];
        currentPositions[i * 3 + 1] += velocities[i * 3 + 1];
        currentPositions[i * 3 + 2] += velocities[i * 3 + 2];

        const dist = Math.sqrt(
            currentPositions[i * 3] ** 2 +
            currentPositions[i * 3 + 1] ** 2 +
            currentPositions[i * 3 + 2] ** 2
        );

        if (dist > radius * 1.1 || dist < radius * 0.9) {
            velocities[i * 3] *= -1;
            velocities[i * 3 + 1] *= -1;
            velocities[i * 3 + 2] *= -1;
        }
    }
    positionsAttr.needsUpdate = true;

    // Update lines
    const linePositions = [];
    for (let i = 0; i < pointCount; i++) {
        for (let j = i + 1; j < pointCount; j++) {
            const dx = currentPositions[i * 3] - currentPositions[j * 3];
            const dy = currentPositions[i * 3 + 1] - currentPositions[j * 3 + 1];
            const dz = currentPositions[i * 3 + 2] - currentPositions[j * 3 + 2];
            const distSq = dx * dx + dy * dy + dz * dz;

            if (distSq < maxDistance * maxDistance) {
                linePositions.push(
                    currentPositions[i * 3], currentPositions[i * 3 + 1], currentPositions[i * 3 + 2],
                    currentPositions[j * 3], currentPositions[j * 3 + 1], currentPositions[j * 3 + 2]
                );
            }
        }
    }

    linesGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));

    scene.rotation.y += -0.0006;
    scene.rotation.x += 0.0006;

    renderer.render(scene, camera);
};

animate();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0xffffff, 0);
});
