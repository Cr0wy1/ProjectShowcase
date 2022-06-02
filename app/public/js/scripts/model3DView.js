const modelCanvasContainer = document.querySelector(".modelCanvasContainer");

if (modelCanvasContainer && modelCanvasContainer.dataset.model) {
  Render3DView();
}

function Render3DView() {
  let SceneWidth = 700;
  let SceneHeight = 600;

  let scene, camera, renderer;

  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xf5f5f5);

  camera = new THREE.PerspectiveCamera(35, SceneWidth / SceneHeight, 1, 5000);

  camera.rotation.y = (45 / 180) * Math.PI;
  camera.position.x = 200;
  camera.position.y = 100;
  camera.position.z = 100;

  let hlight = new THREE.AmbientLight(0xffffff, 2);
  scene.add(hlight);

  let directionalLight = new THREE.DirectionalLight(0xffffff, 1);

  directionalLight.castShadow = true;
  directionalLight.shadow.radius = 1;
  directionalLight.shadow.mapSize.width = 512;
  directionalLight.shadow.mapSize.height = 512;
  let d = 100;
  directionalLight.shadow.camera.left = -d;
  directionalLight.shadow.camera.right = d;
  directionalLight.shadow.camera.top = d;
  directionalLight.shadow.camera.bottom = -d;
  directionalLight.shadow.camera.near = 0.5;
  directionalLight.shadow.camera.far = 100;

  scene.add(directionalLight.target);
  scene.add(directionalLight);

  let pLight = new THREE.PointLight(0xffffff, 0.5);
  pLight.position.set(0, 300, 0);
  scene.add(pLight);

  const helper = new THREE.CameraHelper(directionalLight.shadow.camera);
  scene.add(helper);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(SceneWidth, SceneHeight);
  renderer.shadowMap.enabled = true;
  renderer.shadowMapSoft = true;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;

  let controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.autoRotate = true;
  controls.update();

  modelCanvasContainer.appendChild(renderer.domElement);

  let objectCenter;
  let cMesh;
  let loader = new THREE.GLTFLoader();
  loader.load(
    `./models/${modelCanvasContainer.dataset.model}.glb`,
    function (gltf) {
      let mesh = gltf.scene.children[0];
      mesh.castShadow = true;
      mesh.receiveShadow = true;

      //mesh.material.flatShading = true;
      objectCenter = getCenterPoint(mesh);
      fitCameraToCenteredObject(camera, mesh, 1.1, controls);
      controls.target = objectCenter;
      //const box = new THREE.BoxHelper(mesh, 0xffff00);
      //scene.add(box);

      //camera.position.z = 1000;
      camera.position.x = 200;
      camera.position.y = 220;

      controls.update();
      cMesh = mesh;
      scene.add(gltf.scene);
      animate();
    }
  );

  let bFollowCamera = true;
  document.addEventListener("keydown", function (e) {
    if (e.code == "Space") {
      bFollowCamera = bFollowCamera ? false : true;
    }
  });

  function animate() {
    if (bFollowCamera) {
      var right = new THREE.Vector3(1, 0, 0);
      right.applyQuaternion(camera.quaternion);
      right.multiplyScalar(1000).add(camera.position);

      directionalLight.position.copy(right);
      directionalLight.target.position.set(
        objectCenter.x,
        objectCenter.y,
        objectCenter.z
      );

      //cMesh.rotation.y += 0.003;
    }
    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }

  //generatePlane();

  function generatePlane() {
    var geo = new THREE.PlaneGeometry(1000, 1000);
    var mat = new THREE.MeshBasicMaterial({
      color: 0xf5f5f5
    });
    var plane = new THREE.Mesh(geo, new THREE.MeshPhongMaterial());

    plane.rotateX(-Math.PI / 2);
    plane.receiveShadow = true;
    plane.castShadow = true;
    scene.add(plane);
  }

  function getCenterPoint(mesh) {
    var center = new THREE.Vector3();

    var bbox = new THREE.Box3().setFromObject(mesh);
    center.x = (bbox.max.x + bbox.min.x) / 2;
    center.y = (bbox.max.y + bbox.min.y) / 2;
    center.z = (bbox.max.z + bbox.min.z) / 2;

    return center;
  }

  const fitCameraToCenteredObject = function (
    camera,
    object,
    offset,
    orbitControls
  ) {
    const boundingBox = new THREE.Box3();
    boundingBox.setFromObject(object);

    var middle = new THREE.Vector3();
    var size = new THREE.Vector3();
    boundingBox.getSize(size);

    const fov = camera.fov * (Math.PI / 180);
    const fovh = 2 * Math.atan(Math.tan(fov / 2) * camera.aspect);
    let dx = size.z / 2 + Math.abs(size.x / 2 / Math.tan(fovh / 2));
    let dy = size.z / 2 + Math.abs(size.y / 2 / Math.tan(fov / 2));
    let cameraZ = Math.max(dx, dy);

    // offset the camera, if desired (to avoid filling the whole canvas)
    if (offset !== undefined && offset !== 0) cameraZ *= offset;

    camera.position.set(0, 0, cameraZ);

    // set the far plane of the camera so that it easily encompasses the whole object
    const minZ = boundingBox.min.z;
    const cameraToFarEdge = minZ < 0 ? -minZ + cameraZ : cameraZ - minZ;

    camera.far = cameraToFarEdge * 3;
    camera.updateProjectionMatrix();

    if (orbitControls !== undefined) {
      // set camera to rotate around the center
      orbitControls.target = new THREE.Vector3(0, 0, 0);

      // prevent camera from zooming out far enough to create far plane cutoff
      orbitControls.maxDistance = cameraToFarEdge * 1;
    }
  };
}
