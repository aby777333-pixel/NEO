// Three.js globe for FXAB (light theme with midnight/cyan accents)
window.FXAB_GLOBE = function initFXABGlobe(){
  const canvas = document.getElementById('globe');
  if (!canvas || !window.THREE) return;

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
  camera.position.set(0, 0, 3.1);

  const group = new THREE.Group();
  scene.add(group);

  const light = new THREE.DirectionalLight(0xffffff, 1.0);
  light.position.set(4, 2, 4);
  scene.add(light);
  scene.add(new THREE.AmbientLight(0x88aaff, 0.55));

  const geo = new THREE.SphereGeometry(1, 64, 64);
  const mat = new THREE.MeshStandardMaterial({
    color: 0x1E293B,
    metalness: 0.22,
    roughness: 0.55,
    emissive: 0x001022,
    emissiveIntensity: 0.26,
  });
  const earth = new THREE.Mesh(geo, mat);
  group.add(earth);

  const glowGeo = new THREE.SphereGeometry(1.02, 64, 64);
  const glowMat = new THREE.MeshBasicMaterial({ color: 0x00E5FF, transparent: true, opacity: 0.10, side: THREE.BackSide });
  const glow = new THREE.Mesh(glowGeo, glowMat);
  group.add(glow);

  // points
  const ptsGeo = new THREE.BufferGeometry();
  const pts = [];
  function addPoint(lat, lon){
    const phi = (90 - lat) * (Math.PI/180);
    const theta = (lon + 180) * (Math.PI/180);
    const r = 1.01;
    const x = r * Math.sin(phi) * Math.cos(theta);
    const y = r * Math.cos(phi);
    const z = r * Math.sin(phi) * Math.sin(theta);
    pts.push(x,y,z);
  }
  [[51.5074,-0.1278],[40.7128,-74.0060],[35.6895,139.6917],[1.3521,103.8198],[25.2048,55.2708],[22.3193,114.1694],[52.5200,13.4050],[19.0760,72.8777]].forEach(p=>addPoint(p[0],p[1]));
  ptsGeo.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3));
  const ptsMat = new THREE.PointsMaterial({ color: 0x00D9A3, size: 0.03, transparent:true, opacity:0.9 });
  const points = new THREE.Points(ptsGeo, ptsMat);
  group.add(points);

  // arcs
  function arc(lat1, lon1, lat2, lon2, steps=64){
    const a=[];
    for(let i=0;i<=steps;i++){
      const t=i/steps;
      const lat = lat1 + (lat2-lat1)*t;
      const lon = lon1 + (lon2-lon1)*t;
      const bump = Math.sin(Math.PI*t)*0.18;
      const phi=(90-lat)*(Math.PI/180);
      const theta=(lon+180)*(Math.PI/180);
      const r=1.01 + bump;
      a.push(
        r*Math.sin(phi)*Math.cos(theta),
        r*Math.cos(phi),
        r*Math.sin(phi)*Math.sin(theta)
      );
    }
    const g=new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute(a,3));
    const m=new THREE.LineBasicMaterial({ color: 0x00E5FF, transparent:true, opacity:0.55 });
    const l=new THREE.Line(g,m);
    group.add(l);
    return l;
  }
  const arcs=[
    arc(51.5074,-0.1278,40.7128,-74.0060),
    arc(40.7128,-74.0060,35.6895,139.6917),
    arc(35.6895,139.6917,1.3521,103.8198),
    arc(51.5074,-0.1278,25.2048,55.2708)
  ];

  // pulses
  const pulseGeo = new THREE.SphereGeometry(0.02, 12, 12);
  const pulses=[];
  function spawnPulse(){
    const idx = Math.floor(Math.random() * (pts.length/3));
    const x=pts[idx*3], y=pts[idx*3+1], z=pts[idx*3+2];
    const m=new THREE.MeshBasicMaterial({ color: 0x00D9A3, transparent:true, opacity:0.85 });
    const p=new THREE.Mesh(pulseGeo, m);
    p.position.set(x,y,z);
    p.userData={t:0};
    pulses.push(p);
    group.add(p);
  }

  function resize(){
    const r = canvas.getBoundingClientRect();
    renderer.setSize(r.width, r.height, false);
    camera.aspect = r.width / r.height;
    camera.updateProjectionMatrix();
  }
  const ro=new ResizeObserver(resize); ro.observe(canvas);
  resize();

  // drag
  let dragging=false, lx=0, ly=0;
  canvas.addEventListener('pointerdown', (e)=>{dragging=true; lx=e.clientX; ly=e.clientY; canvas.setPointerCapture(e.pointerId)});
  canvas.addEventListener('pointerup', ()=>dragging=false);
  canvas.addEventListener('pointermove', (e)=>{
    if(!dragging) return;
    const dx=(e.clientX-lx)/240;
    const dy=(e.clientY-ly)/240;
    group.rotation.y += dx;
    group.rotation.x += dy;
    group.rotation.x = Math.max(-0.9, Math.min(0.9, group.rotation.x));
    lx=e.clientX; ly=e.clientY;
  });

  let t=0;
  function animate(){
    t += 0.01;
    if (!dragging) group.rotation.y += 0.002;
    arcs.forEach((a,i)=>{a.material.opacity = 0.30 + 0.22*Math.sin(t + i);});
    if (Math.random() < 0.06) spawnPulse();
    for (let i=pulses.length-1;i>=0;i--){
      const p=pulses[i];
      p.userData.t += 0.02;
      const s=1 + p.userData.t*2.5;
      p.scale.setScalar(s);
      p.material.opacity = Math.max(0, 0.85 - p.userData.t);
      if (p.userData.t > 1){
        group.remove(p);
        pulses.splice(i,1);
      }
    }
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }
  animate();
};
