import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.170.0/build/three.module.js';

const CONFIG = {
  size: 1.0,
  depth: 55,
  speed: 1.0,
  mouse: 1.0,
  purple: ['#5f22b5', '#400185'],
  pink: ['#f826c3', '#f925ea'],
  solid: 1.0,
};

const EMBLEM = {"w":921.9,"h":1000.0,"shapes":[{"c":"purple","p":[[469.0,464.0],[467.1,470.5],[466.7,473.7],[553.9,970.1],[554.8,973.9],[555.6,975.6],[561.7,983.8],[569.1,979.4],[573.1,975.1],[647.9,819.3],[649.3,820.8],[657.1,831.7],[765.8,994.1],[767.5,996.2],[770.6,998.9],[773.0,999.8],[775.5,999.8],[779.5,998.3],[821.6,969.3],[867.5,938.9],[871.1,935.3],[872.6,931.6],[872.2,928.6],[869.8,924.2],[739.3,755.5],[747.3,753.6],[909.6,726.2],[915.1,723.7],[921.7,719.3],[916.4,712.5],[913.0,709.6],[482.1,468.2],[477.5,465.7],[474.9,464.8]]},{"c":"pink","p":[[539.0,396.6],[528.6,391.7],[520.4,388.8],[510.5,386.3],[498.7,384.6],[481.3,384.6],[471.6,385.8],[460.8,388.4],[450.1,392.2],[441.7,396.2],[433.0,401.2],[425.0,407.1],[418.3,413.0],[411.1,420.6],[404.4,429.4],[398.3,439.6],[394.1,448.6],[390.7,458.1],[388.6,466.5],[386.9,477.7],[386.5,483.6],[386.9,497.7],[388.2,506.7],[390.7,517.3],[394.1,526.7],[398.5,536.2],[404.4,545.9],[411.1,554.8],[418.3,562.3],[425.0,568.2],[434.7,575.2],[442.3,579.4],[437.0,542.5],[431.6,536.6],[427.3,531.2],[423.1,524.4],[419.1,516.0],[416.2,507.2],[414.5,499.2],[413.9,492.6],[413.9,482.7],[414.5,476.2],[416.8,466.1],[419.1,459.4],[422.9,451.3],[426.9,444.8],[433.2,436.8],[439.1,430.9],[445.7,425.7],[454.9,420.0],[460.8,417.2],[470.9,413.9],[479.4,412.2],[487.2,411.5],[496.8,411.8],[503.2,412.6],[511.8,414.7],[517.9,416.8],[526.7,421.0],[533.5,425.2],[539.2,429.7],[548.9,439.6],[552.2,444.0],[557.1,451.8],[591.8,471.1],[590.1,461.9],[586.1,449.7],[581.5,439.6],[574.8,428.6],[566.8,418.5],[559.0,410.7],[550.3,403.7]]},{"c":"pink","p":[[527.6,337.8],[512.6,334.9],[497.9,333.4],[481.9,333.4],[466.9,334.9],[455.8,337.0],[438.9,341.8],[426.3,346.9],[412.4,354.0],[398.9,362.9],[388.6,371.1],[377.2,382.1],[369.0,391.5],[360.8,402.9],[353.4,415.3],[347.3,428.2],[341.0,446.3],[337.6,461.5],[335.9,474.5],[335.5,494.3],[336.4,505.1],[338.5,518.5],[342.2,533.3],[347.3,547.2],[354.9,562.8],[363.9,577.1],[373.4,589.1],[384.2,600.3],[395.5,609.9],[406.9,617.9],[415.8,623.2],[432.2,631.0],[449.0,636.7],[450.5,636.9],[450.7,636.5],[446.5,607.4],[445.9,606.8],[437.7,603.6],[428.4,599.0],[420.0,593.9],[414.3,589.9],[402.1,579.6],[390.3,566.8],[381.0,553.5],[377.6,547.6],[372.8,537.5],[367.3,521.9],[365.6,515.2],[363.5,502.9],[362.7,492.8],[363.1,476.2],[364.4,466.5],[368.6,449.2],[374.5,434.1],[382.1,420.2],[392.0,406.5],[397.4,400.4],[405.4,392.6],[417.4,383.1],[432.6,374.1],[445.7,368.4],[455.3,365.2],[462.9,363.3],[479.8,360.8],[489.5,360.4],[499.8,360.8],[515.0,362.9],[522.1,364.6],[533.5,368.2],[542.3,371.7],[550.3,375.7],[564.7,384.8],[577.9,396.0],[588.5,407.3],[594.8,415.8],[599.0,422.3],[606.8,437.4],[612.0,452.2],[615.6,468.2],[616.9,479.6],[616.9,485.3],[642.4,500.0],[643.6,500.4],[644.3,482.9],[643.2,468.8],[640.7,454.1],[637.7,442.9],[633.1,429.9],[627.4,417.4],[622.2,408.0],[613.9,395.7],[604.5,384.2],[596.5,375.9],[587.4,367.9],[577.3,360.4],[565.5,353.0],[552.0,346.3],[541.5,342.0]]},{"c":"pink","p":[[523.6,280.1],[505.9,278.0],[481.3,277.6],[461.9,279.3],[443.1,282.6],[428.8,286.4],[418.7,289.8],[402.7,296.3],[383.3,306.4],[366.0,317.8],[351.1,329.8],[336.1,344.4],[323.9,358.7],[315.1,370.9],[309.0,380.6],[301.2,394.9],[296.5,405.0],[291.9,416.8],[286.6,433.7],[284.1,444.2],[282.0,455.8],[279.9,476.4],[279.7,493.7],[280.3,505.1],[281.6,516.6],[285.0,535.0],[287.9,546.3],[291.3,556.9],[298.9,575.6],[309.0,594.8],[320.1,611.6],[332.1,626.6],[346.3,641.1],[362.7,655.0],[377.8,665.5],[390.5,672.9],[401.9,678.6],[414.3,683.9],[427.5,688.5],[436.4,691.0],[456.4,695.2],[458.9,695.5],[459.1,694.6],[454.9,667.2],[441.9,664.3],[425.0,658.8],[412.2,653.3],[395.5,644.5],[384.6,637.3],[371.1,626.8],[365.2,621.5],[350.7,606.4],[345.0,599.4],[336.6,587.6],[330.7,577.9],[323.9,564.9],[318.4,551.8],[314.9,541.3],[310.4,523.8],[308.8,514.3],[307.1,497.5],[307.1,479.1],[307.5,472.0],[308.8,461.0],[311.3,447.6],[314.2,436.2],[318.4,423.5],[323.9,410.5],[330.5,397.9],[336.4,388.2],[343.7,377.6],[353.6,365.6],[365.0,354.0],[373.8,346.3],[384.6,338.0],[393.9,331.9],[406.5,324.8],[415.8,320.3],[428.4,315.3],[437.4,312.3],[450.3,309.0],[464.2,306.4],[475.6,305.2],[484.8,304.8],[503.6,305.2],[518.3,306.9],[531.4,309.4],[544.4,313.0],[553.7,316.1],[566.3,321.4],[580.2,328.6],[597.5,339.7],[604.9,345.4],[615.0,354.3],[623.2,362.5],[632.3,372.8],[640.9,384.4],[645.5,391.5],[652.3,403.3],[658.6,416.8],[664.5,432.8],[668.7,448.8],[671.7,466.5],[672.9,485.0],[672.5,500.0],[670.6,515.8],[695.7,529.9],[697.6,520.4],[699.7,501.5],[700.1,491.6],[699.9,477.9],[698.0,457.7],[694.6,439.8],[688.3,418.1],[681.3,400.8],[672.5,383.5],[665.8,372.6],[659.0,362.9],[645.5,346.5],[631.2,332.1],[618.2,321.2],[599.2,308.1],[581.1,298.2],[562.1,290.2],[543.4,284.3]]},{"c":"purple","p":[[471.8,0.2],[446.5,1.9],[424.6,4.4],[398.9,8.6],[380.8,12.4],[351.7,20.0],[325.6,28.4],[299.5,38.5],[285.2,44.9],[262.0,56.2],[239.5,68.9],[222.2,79.6],[198.8,95.8],[179.9,110.6],[162.6,125.3],[152.1,135.0],[128.5,159.0],[115.8,173.3],[101.5,191.0],[83.8,215.5],[70.3,236.5],[58.6,257.2],[47.6,278.6],[37.1,302.2],[30.3,319.5],[21.9,344.4],[16.0,365.0],[10.5,388.2],[5.5,416.4],[2.5,440.0],[0.8,461.0],[0.0,488.0],[0.4,510.5],[1.7,531.4],[4.2,555.6],[8.4,582.6],[13.5,606.6],[19.8,630.6],[27.4,654.4],[34.1,672.7],[43.0,693.8],[55.2,719.0],[64.9,736.7],[75.8,754.8],[88.5,773.8],[102.8,793.2],[120.9,815.1],[133.5,829.0],[152.9,848.4],[172.7,866.0],[190.4,880.4],[212.3,896.4],[229.6,907.8],[243.5,916.2],[262.4,926.7],[287.3,938.9],[314.2,950.3],[340.4,959.6],[359.9,965.5],[381.6,970.9],[406.9,976.0],[433.0,979.8],[454.9,981.9],[481.9,983.2],[500.4,983.2],[510.7,982.7],[511.2,982.3],[490.1,856.1],[464.4,855.3],[442.3,853.2],[416.2,849.0],[391.3,843.1],[370.9,836.8],[347.9,827.9],[326.5,817.8],[303.3,804.8],[281.8,790.4],[262.4,775.5],[242.6,758.0],[222.4,737.6],[206.0,718.6],[191.7,699.7],[179.2,680.7],[166.2,657.5],[156.9,638.2],[149.7,620.7],[143.0,601.3],[137.5,582.1],[132.5,559.4],[129.5,541.3],[127.4,522.5],[126.2,498.5],[126.6,472.8],[127.8,456.0],[131.2,430.7],[135.4,409.6],[140.9,388.6],[147.6,367.9],[154.2,351.1],[164.5,328.6],[172.1,314.2],[182.6,296.5],[195.0,278.2],[209.8,259.3],[221.6,245.8],[236.3,230.6],[252.7,215.5],[271.7,199.9],[289.4,187.0],[306.4,176.1],[324.8,165.8],[342.9,156.9],[362.7,148.7],[381.0,142.4],[404.0,136.1],[424.2,131.8],[452.0,128.1],[479.8,126.4],[499.4,126.4],[527.8,128.1],[551.2,131.0],[579.0,136.5],[601.9,142.8],[623.6,150.4],[645.3,159.6],[666.0,170.2],[688.3,183.7],[711.7,200.3],[732.3,217.4],[754.4,238.4],[770.6,255.9],[787.9,277.0],[788.5,277.0],[889.0,203.9],[873.4,182.6],[852.8,158.2],[842.5,147.2],[826.2,131.2],[807.7,114.8],[783.7,95.8],[756.7,77.3],[733.6,63.4],[707.0,49.5],[680.9,37.7],[653.3,27.2],[620.7,17.1],[588.7,9.5],[558.8,4.4],[532.2,1.5],[501.9,0.0]]}]};

const THREE_UTILS_URL = 'https://cdn.jsdelivr.net/npm/three@0.170.0/examples/jsm/utils/BufferGeometryUtils.js';
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const mounted = new WeakSet();

function color(hex) {
  return new THREE.Color(hex);
}

function fallbackCreasedNormals(geometry) {
  geometry.computeVertexNormals();
  return geometry;
}

async function loadUtilities() {
  try {
    const module = await import(THREE_UTILS_URL);
    return module.toCreasedNormals || fallbackCreasedNormals;
  } catch (error) {
    // The utility module is optional; the geometry still renders with computed normals
    // if a browser/CDN does not expose its bare Three.js dependency.
    return fallbackCreasedNormals;
  }
}

function paint(geometry, palette, scale, height) {
  const positions = geometry.attributes.position;
  const colors = new Float32Array(positions.count * 3);
  const top = color(palette[0]);
  const bottom = color(palette[1]);
  const current = new THREE.Color();

  for (let i = 0; i < positions.count; i += 1) {
    const y = positions.getY(i) / scale;
    const t = THREE.MathUtils.clamp((y + height * 0.5) / height, 0, 1);
    current.copy(bottom).lerp(top, t);
    colors[i * 3] = current.r;
    colors[i * 3 + 1] = current.g;
    colors[i * 3 + 2] = current.b;
  }

  geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
  return geometry;
}

function createBackground(THREERef) {
  const material = new THREERef.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
    },
    vertexShader: [
      'varying vec2 vUv;',
      'void main(){',
      '  vUv = uv;',
      '  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);',
      '}',
    ].join('\n'),
    fragmentShader: [
      'uniform float uTime;',
      'varying vec2 vUv;',
      'void main(){',
      '  vec2 uv = vUv;',
      '  float beam = smoothstep(0.84, 0.08, abs(uv.x - (0.66 + sin(uTime * 0.12) * 0.035)));',
      '  float glow = smoothstep(0.95, 0.08, distance(uv, vec2(0.76, 0.45)));',
      '  vec3 dark = vec3(0.035, 0.012, 0.075);',
      '  vec3 purple = vec3(0.24, 0.045, 0.58);',
      '  vec3 light = vec3(0.62, 0.18, 0.95);',
      '  vec3 col = mix(dark, purple, beam * 0.72);',
      '  col += light * glow * 0.42;',
      '  gl_FragColor = vec4(col, 1.0);',
      '}',
    ].join('\n'),
    depthWrite: false,
  });

  const mesh = new THREERef.Mesh(new THREERef.PlaneGeometry(2, 2), material);
  mesh.position.z = -2.2;
  mesh.scale.set(8, 4.5, 1);
  return { mesh, material, geometry: mesh.geometry };
}

function createEmblem(THREERef, toCreasedNormals) {
  const group = new THREERef.Group();
  const face = new THREERef.MeshBasicMaterial({
    vertexColors: true,
    side: THREERef.DoubleSide,
    transparent: true,
    opacity: CONFIG.solid,
  });
  const glass = new THREERef.MeshPhysicalMaterial({
    color: '#d9c6ff',
    transparent: true,
    opacity: 0.3,
    roughness: 0.08,
    metalness: 0.15,
    transmission: 0.72,
    thickness: 0.22,
    ior: 1.45,
    clearcoat: 1,
    clearcoatRoughness: 0.08,
    side: THREERef.DoubleSide,
  });
  const materials = [face, glass];
  const unit = CONFIG.size / Math.max(EMBLEM.w, EMBLEM.h);
  const depth = CONFIG.depth * unit;
  const pieces = [];

  EMBLEM.shapes.forEach((shapeData, index) => {
    const shape = new THREERef.Shape();
    shapeData.p.forEach((point, pointIndex) => {
      const x = (point[0] - EMBLEM.w * 0.5) * unit;
      const y = (EMBLEM.h * 0.5 - point[1]) * unit;
      if (pointIndex === 0) shape.moveTo(x, y);
      else shape.lineTo(x, y);
    });
    shape.closePath();

    const geometry = new THREERef.ExtrudeGeometry(shape, {
      depth,
      bevelEnabled: true,
      bevelSegments: 3,
      bevelSize: Math.max(unit * 2.5, 0.002),
      bevelThickness: Math.max(unit * 2.2, 0.002),
      curveSegments: 3,
    });
    geometry.translate(0, 0, -depth * 0.5);
    const polished = toCreasedNormals(geometry, 0.45);
    paint(polished, shapeData.c === 'pink' ? CONFIG.pink : CONFIG.purple, unit, EMBLEM.h);

    const mesh = new THREERef.Mesh(polished, materials);
    mesh.rotation.z = (index % 2 ? -1 : 1) * (0.008 + index * 0.002);
    mesh.position.z = (index - EMBLEM.shapes.length * 0.5) * unit * 2.2;
    group.add(mesh);
    pieces.push(mesh);
  });

  return { group, pieces, face, glass };
}

function mountBanner(banner, toCreasedNormals) {
  if (mounted.has(banner)) return () => {};
  mounted.add(banner);

  const canvas = banner.querySelector('.cg-canvas');
  if (!canvas) return () => {};

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: false,
      powerPreference: 'high-performance',
    });
  } catch (error) {
    banner.classList.add('is-fallback');
    return () => {};
  }

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(25, 1, 0.1, 100);
  camera.position.set(0, 0, 4.1);

  const background = createBackground(THREE);
  scene.add(background.mesh);

  const ambient = new THREE.AmbientLight('#ffffff', 1.6);
  const key = new THREE.PointLight('#f5e8ff', 28, 10, 2);
  key.position.set(1.4, 1.8, 2.5);
  const rim = new THREE.PointLight('#8b35ff', 20, 8, 2);
  rim.position.set(-2.4, -1.2, 1.2);
  scene.add(ambient, key, rim);

  const emblem = createEmblem(THREE, toCreasedNormals);
  emblem.group.rotation.x = -0.08;
  emblem.group.rotation.y = 0.18;
  scene.add(emblem.group);

  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.setClearColor('#170626', 1);

  let visible = true;
  let running = false;
  let disposed = false;
  let width = 1;
  let height = 1;
  let compact = false;
  let pointerX = 0;
  let pointerY = 0;
  let lastTime = 0;

  function resize() {
    if (disposed) return;
    const rect = banner.getBoundingClientRect();
    width = Math.max(1, rect.width);
    height = Math.max(1, rect.height);
    compact = width / height < 1.15;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.8));
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    background.mesh.scale.set(8, 4.5, 1);
  }

  function render(time = 0) {
    if (disposed || !visible) return;
    const seconds = time * 0.001;
    const delta = Math.min(0.04, Math.max(0, seconds - lastTime || 0));
    lastTime = seconds;

    background.material.uniforms.uTime.value = seconds;
    emblem.group.rotation.y += delta * CONFIG.speed * 0.18;
    emblem.group.rotation.x = -0.08 + pointerY * 0.08;
    emblem.group.rotation.z = pointerX * 0.045;
    emblem.group.position.x = (compact ? 0 : 1.25) + pointerX * 0.08;
    emblem.group.position.y = (compact ? -0.76 : 0) + pointerY * 0.06;
    emblem.pieces.forEach((piece, index) => {
      piece.position.z += Math.sin(seconds * 1.1 + index * 0.7) * delta * 0.005;
    });
    renderer.render(scene, camera);
  }

  function start() {
    if (disposed || running || !visible) return;
    running = true;
    if (reducedMotion.matches) {
      render(0);
      return;
    }
    renderer.setAnimationLoop(render);
  }

  function stop() {
    if (!running) return;
    running = false;
    renderer.setAnimationLoop(null);
  }

  function onPointerMove(event) {
    const rect = banner.getBoundingClientRect();
    pointerX = THREE.MathUtils.clamp(((event.clientX - rect.left) / rect.width - 0.5) * 2, -1, 1);
    pointerY = THREE.MathUtils.clamp(((event.clientY - rect.top) / rect.height - 0.5) * -2, -1, 1);
  }

  function onPointerLeave() {
    pointerX = 0;
    pointerY = 0;
  }

  function cleanup() {
    if (disposed) return;
    disposed = true;
    stop();
    resizeObserver.disconnect();
    intersectionObserver.disconnect();
    banner.removeEventListener('pointermove', onPointerMove);
    banner.removeEventListener('pointerleave', onPointerLeave);
    window.removeEventListener('pagehide', cleanup);
    emblem.pieces.forEach(piece => piece.geometry.dispose());
    emblem.face.dispose();
    emblem.glass.dispose();
    background.geometry.dispose();
    background.material.dispose();
    renderer.dispose();
  }

  const resizeObserver = new ResizeObserver(resize);
  const intersectionObserver = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (visible) {
      resize();
      start();
    } else {
      stop();
    }
  }, { rootMargin: '120px' });

  banner.addEventListener('pointermove', onPointerMove, { passive: true });
  banner.addEventListener('pointerleave', onPointerLeave, { passive: true });
  window.addEventListener('pagehide', cleanup, { once: true });
  resizeObserver.observe(banner);
  intersectionObserver.observe(banner);
  resize();
  start();

  return cleanup;
}

export async function initGlassBanners() {
  const banners = [...document.querySelectorAll('[data-cg-banner]')];
  if (!banners.length) return;

  const toCreasedNormals = await loadUtilities();
  const cleanups = banners.map(banner => mountBanner(banner, toCreasedNormals));
  window.addEventListener('pagehide', () => cleanups.forEach(cleanup => cleanup()), { once: true });
}

