// 3D Cube Renderer using Three.js
let scene, camera, renderer, cube, rotationCount = 0;
let cubeRotationX = 0;
let cubeRotationY = 0;
let cubeRotationZ = 0;

function initCubeRenderer() {
  const container = document.getElementById('cube-canvas');
  
  // Scene setup
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xf0f0f0);
  
  // Camera setup
  const width = container.clientWidth;
  const height = container.clientHeight;
  camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
  camera.position.z = 3;
  
  // Renderer setup
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(width, height);
  renderer.setPixelRatio(window.devicePixelRatio);
  container.appendChild(renderer.domElement);
  
  // Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
  scene.add(ambientLight);
  
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
  directionalLight.position.set(5, 5, 5);
  scene.add(directionalLight);
  
  // Create Rubik's Cube
  createRubiksCube();
  
  // Animation loop
  function animate() {
    requestAnimationFrame(animate);
    
    // Smooth continuous rotation
    cube.rotation.x += 0.001;
    cube.rotation.y += 0.002;
    
    renderer.render(scene, camera);
  }
  animate();
  
  // Handle window resize
  window.addEventListener('resize', onWindowResize);
}

function createRubiksCube() {
  const group = new THREE.Group();
  
  // Cube colors (standard Rubik's cube)
  const colors = [
    0xFF6B6B, // Red
    0xFFA500, // Orange
    0xFFFF00, // Yellow
    0x4CAF50, // Green
    0x2196F3, // Blue
    0xFFFFFF  // White
  ];
  
  const cubeSize = 0.3;
  const spacing = 0.02;
  
  // Create 3x3x3 Rubik's cube
  for (let x = -1; x <= 1; x++) {
    for (let y = -1; y <= 1; y++) {
      for (let z = -1; z <= 1; z++) {
        const geometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
        
        // Create materials with different colors for each face
        const materials = colors.map(color => 
          new THREE.MeshStandardMaterial({ 
            color: color,
            metalness: 0.3,
            roughness: 0.4
          })
        );
        
        const piece = new THREE.Mesh(geometry, materials);
        piece.position.set(
          x * (cubeSize + spacing),
          y * (cubeSize + spacing),
          z * (cubeSize + spacing)
        );
        
        // Add black edges
        const edges = new THREE.EdgesGeometry(geometry);
        const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0x000000 }));
        piece.add(line);
        
        group.add(piece);
      }
    }
  }
  
  cube = group;
  scene.add(cube);
}

function rotateCubeWASD(key) {
  const rotationSpeed = 0.3;
  
  switch(key.toUpperCase()) {
    case 'W':
      cubeRotationX += rotationSpeed;
      break;
    case 'A':
      cubeRotationY -= rotationSpeed;
      break;
    case 'S':
      cubeRotationX -= rotationSpeed;
      break;
    case 'D':
      cubeRotationY += rotationSpeed;
      break;
  }
  
  // Smoothly apply rotations
  cube.rotation.x = cubeRotationX;
  cube.rotation.y = cubeRotationY;
  
  rotationCount++;
  updateCubeInfo();
}

function updateCubeInfo() {
  const rotationEl = document.getElementById('cube-rotation');
  if (rotationEl) {
    rotationEl.textContent = `Rotations: ${rotationCount}`;
  }
}

function resetCubeRotation() {
  cubeRotationX = 0;
  cubeRotationY = 0;
  cubeRotationZ = 0;
  rotationCount = 0;
  
  if (cube) {
    cube.rotation.x = 0;
    cube.rotation.y = 0;
    cube.rotation.z = 0;
  }
  
  updateCubeInfo();
}

function onWindowResize() {
  const container = document.getElementById('cube-canvas');
  const width = container.clientWidth;
  const height = container.clientHeight;
  
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
}

// Initialize when trainer screen is shown
function initCubeOnTrainerLoad() {
  // Small delay to ensure DOM is ready
  setTimeout(() => {
    if (!renderer && document.getElementById('cube-canvas')) {
      initCubeRenderer();
    }
  }, 100);
}
