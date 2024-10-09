import * as THREE from 'three';

const imagePath = "https://lucascranach.org/data-proxy/image.php?subpath=/";
let camera, scene, renderer;
let images = [];
let zoom = 1;
let lightAngle = 10;
const scrollSpeed = 0.05;
let isDragging = false;
let previousMousePosition = {
  x: 0,
  y: 0
};

let spotLight;

const init = () => {
  // Renderer
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  // renderer.setClearColor(0xffffff, 1); // Weißer Hintergrund
  document.body.appendChild(renderer.domElement);

  // Szene
  scene = new THREE.Scene();

  // Kamera
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 5;

  // Licht hinzufügen (für bessere Farben)
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.02); // Weißes Licht
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(1, 1, 1);
  // scene.add(directionalLight);

  // Lichtkegel (SpotLight)
  spotLight = new THREE.SpotLight(0xffffff, 1); // Weißes Licht, Intensität 1
  spotLight.position.set(0, 2, 2); // Position des Lichts über der Mitte der Szene
  spotLight.angle = Math.PI / lightAngle; // Breite des Lichtkegels (in Rad)
  spotLight.distance = 20; // Maximale Entfernung, die das Licht beleuchtet
  spotLight.penumbra = 0.5; // Weichheit des Lichtkegels
  spotLight.decay = 0; // Wie stark das Licht abnimmt
  spotLight.target.position.set(0, 0, 0);
  scene.add(spotLight);

  // Spotlight-Hilfe (optional, um den Lichtkegel zu sehen)
  const spotLightHelper = new THREE.SpotLightHelper(spotLight);
  // scene.add(spotLightHelper);

  // Bilder hinzufügen
  addImages();

  // Event Listener für Scrollen und Zoomen
  document.addEventListener('wheel', onScroll, false);

  // Event Listener für Drag mit der Maus
  document.addEventListener('mousedown', onMouseDown, false);
  document.addEventListener('mousemove', onMouseMove, false);
  document.addEventListener('mouseup', onMouseUp, false);

  animate();
};

const addImages = () => {
  const loader = new THREE.TextureLoader();

  const items = JSON.parse(paintings);

  const rows = Math.floor(Math.sqrt(items.length));
  const cols = rows;
  const imageSize = 1; // Größe jedes Bildes
  const padding = 0.5; // Abstand zwischen den Bildern

  let pointer = 0;

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const paintingPath = items[pointer];
      const src = imagePath + paintingPath;
      pointer++;

      loader.load(src, (texture) => {
        const aspectRatio = texture.image.width / texture.image.height;
        const geometry = new THREE.PlaneGeometry(imageSize * aspectRatio, imageSize);
        const material = new THREE.MeshStandardMaterial({ map: texture });
        const plane = new THREE.Mesh(geometry, material);

        // Setze die Position jedes Bildes mit Padding
        plane.position.set(j * (imageSize + padding), -i * (imageSize + padding), 0);
        scene.add(plane);
        images.push(plane);
      });
    }
  }

  // Berechne die Mitte des Rasters
  const totalWidth = cols * (imageSize + padding) - padding;
  const totalHeight = rows * (imageSize + padding) - padding;
  const centerX = totalWidth / 2;
  const centerY = -totalHeight / 2;

  // Setze die Kamera auf die Mitte des Rasters
  camera.position.set(centerX, centerY, 5);
};


const onScroll = (event) => {
  if (event.shiftKey) {
    // Mit Shift + Scrollrad zoomt die Kamera
    const zoomFactor = 0.01;
    if (event.deltaY > 0) {
      // Scrollen nach unten -> Herauszoomen
      zoom = Math.max(zoom - zoomFactor, 0.1); // Begrenzung auf minimalen Zoom
    } else {
      // Scrollen nach oben -> Hineinzoomen
      zoom = Math.min(zoom + zoomFactor, 10); // Begrenzung auf maximalen Zoom
    }
    camera.zoom = zoom;
    camera.updateProjectionMatrix();

     // Passe den Lichtkegelwinkel basierend auf dem Zoom an
     spotLight.angle = Math.PI / (lightAngle * zoom); // Je kleiner der Zoom, desto größer der Winkel
  
  } else {
    // Normales Scrollen verschiebt die Kamera horizontal/vertikal
    camera.position.x += event.deltaX * scrollSpeed;
    camera.position.y -= event.deltaY * scrollSpeed;
  }
};

const onMouseDown = (event) => {
  isDragging = true;
  previousMousePosition = {
    x: event.clientX,
    y: event.clientY
  };
};

const onMouseMove = (event) => {
  if (isDragging) {
    const deltaX = event.clientX - previousMousePosition.x;
    const deltaY = event.clientY - previousMousePosition.y;

    // Passe die Kameraposition relativ zur Mausbewegung an
    camera.position.x -= deltaX * scrollSpeed * 0.1;
    camera.position.y += deltaY * scrollSpeed * 0.1;

    previousMousePosition = {
      x: event.clientX,
      y: event.clientY
    };
  }
};

const onMouseUp = () => {
  isDragging = false;
};

const animate = () => {
  spotLight.position.set(camera.position.x, camera.position.y, camera.position.z + 5);
  
  // Das Licht soll immer auf den Punkt (0, 0, 0) zielen, oder einen anderen festen Punkt in der Szene
  spotLight.target.position.set(camera.position.x, camera.position.y, 0);
  spotLight.target.updateMatrixWorld();

  requestAnimationFrame(animate);
  renderer.render(scene, camera);
};

// Fenstergröße ändern
window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});

// Initialisierung starten
init();
