import * as THREE from 'three';

/**
 * A perspective "floor" of dots that breathes slowly and ripples
 * around the pointer. Monochrome; dots near the ripple pick up the cyan accent.
 */
export class DotField {
  constructor(canvas, { cols = 150, rows = 80, gap = 0.42 } = {}) {
    this.canvas = canvas;
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: true, powerPreference: 'high-performance' });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
    this.camera.position.set(0, 3.2, 11);
    this.camera.lookAt(0, 0, -2);

    const count = cols * rows;
    const pos = new Float32Array(count * 3);
    let i = 0;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        pos[i++] = (c - cols / 2) * gap;
        pos[i++] = 0;
        pos[i++] = (r - rows + 8) * gap;
      }
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));

    this.uniforms = {
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uStrength: { value: 0 },
      uPixel: { value: this.renderer.getPixelRatio() },
      uReveal: { value: 0 },
      uAccent: { value: new THREE.Color('#0AFFEC') },
    };

    const mat = new THREE.ShaderMaterial({
      uniforms: this.uniforms,
      transparent: true,
      depthWrite: false,
      vertexShader: /* glsl */ `
        uniform float uTime; uniform vec2 uMouse; uniform float uStrength; uniform float uPixel; uniform float uReveal;
        varying float vGlow; varying float vFade;
        void main() {
          vec3 p = position;
          float wave = sin(p.x * 0.32 + uTime * 0.6) * cos(p.z * 0.28 + uTime * 0.45) * 0.38;
          float d = distance(p.xz, uMouse);
          float ripple = sin(d * 2.4 - uTime * 4.2) * exp(-d * 0.42) * 0.55 * uStrength;
          p.y += wave + ripple;
          // reveal: rows rise from below, near to far
          p.y -= (1.0 - smoothstep(0.0, 1.0, uReveal * 1.6 - (-p.z) * 0.05)) * 3.0;
          vec4 mv = modelViewMatrix * vec4(p, 1.0);
          gl_Position = projectionMatrix * mv;
          gl_PointSize = uPixel * (2.2 / -mv.z) * 9.0;
          vGlow = clamp(exp(-d * 0.55) * uStrength * 1.4, 0.0, 1.0);
          vFade = smoothstep(32.0, 6.0, -mv.z) * smoothstep(0.0, 0.4, uReveal);
        }
      `,
      fragmentShader: /* glsl */ `
        uniform vec3 uAccent;
        varying float vGlow; varying float vFade;
        void main() {
          vec2 c = gl_PointCoord - 0.5;
          if (dot(c, c) > 0.25) discard;
          vec3 col = mix(vec3(1.0), uAccent, vGlow);
          gl_FragColor = vec4(col, (0.22 + vGlow * 0.7) * vFade);
        }
      `,
    });

    this.points = new THREE.Points(geo, mat);
    this.scene.add(this.points);

    this.ray = new THREE.Raycaster();
    this.floor = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
    this.target = new THREE.Vector2(0, -4);
    this.hit = new THREE.Vector3();
    this.strengthTarget = 0;
    this.clock = new THREE.Clock();
    this.running = false;

    this.onResize = this.resize.bind(this);
    this.onPointer = this.pointer.bind(this);
    window.addEventListener('resize', this.onResize);
    window.addEventListener('pointermove', this.onPointer, { passive: true });
    this.resize();
    this.loop = this.loop.bind(this);
  }

  pointer(e) {
    const rect = this.canvas.getBoundingClientRect();
    if (e.clientY < rect.top || e.clientY > rect.bottom) { this.strengthTarget = 0; return; }
    const ndc = new THREE.Vector2(((e.clientX - rect.left) / rect.width) * 2 - 1, -((e.clientY - rect.top) / rect.height) * 2 + 1);
    this.ray.setFromCamera(ndc, this.camera);
    if (this.ray.ray.intersectPlane(this.floor, this.hit)) {
      this.target.set(this.hit.x, this.hit.z);
      this.strengthTarget = 1;
    }
  }

  resize() {
    const { clientWidth: w, clientHeight: h } = this.canvas;
    if (!w || !h) return;
    this.renderer.setSize(w, h, false);
    this.camera.aspect = w / h;
    // keep the floor wide enough on portrait screens
    this.camera.fov = w / h < 1 ? 58 : 40;
    this.camera.updateProjectionMatrix();
  }

  start() { if (!this.running) { this.running = true; this.clock.getDelta(); requestAnimationFrame(this.loop); } }
  stop() { this.running = false; }

  loop() {
    if (!this.running) return;
    const dt = Math.min(this.clock.getDelta(), 0.05);
    const u = this.uniforms;
    u.uTime.value += dt;
    u.uMouse.value.lerp(this.target, 0.08);
    u.uStrength.value += (this.strengthTarget - u.uStrength.value) * 0.04;
    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(this.loop);
  }

  dispose() {
    this.stop();
    window.removeEventListener('resize', this.onResize);
    window.removeEventListener('pointermove', this.onPointer);
    this.points.geometry.dispose();
    this.points.material.dispose();
    this.renderer.dispose();
  }
}
