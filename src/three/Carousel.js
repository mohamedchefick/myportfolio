import * as THREE from 'three';

/**
 * Cylindrical gallery: every screenshot is a curved plane wrapped around
 * a vertical axis. Rotation is driven from outside (scroll progress);
 * planes facing away fade to monochrome, and fast rotation bends the ring.
 */
export class Carousel {
  constructor(canvas, images) {
    this.canvas = canvas;
    this.count = images.length;
    this.step = (Math.PI * 2) / this.count;
    this.radius = 6.2;

    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100);
    this.group = new THREE.Group();
    this.scene.add(this.group);

    this.uniforms = { uVel: { value: 0 } };
    this.meshes = [];

    const arc = this.step * 0.86;
    this.planeW = 2 * this.radius * Math.sin(arc / 2); // chord width, used for framing
    const arcLen = this.radius * arc;
    const h = arcLen / 1.6;
    const loader = new THREE.TextureLoader();
    const maxAniso = this.renderer.capabilities.getMaxAnisotropy();

    images.forEach((src, i) => {
      const geo = new THREE.PlaneGeometry(arcLen, h, 48, 1);
      const p = geo.attributes.position;
      const phi = i * this.step;
      for (let v = 0; v < p.count; v++) {
        const theta = p.getX(v) / this.radius + phi;
        p.setXYZ(v, Math.sin(theta) * this.radius, p.getY(v), Math.cos(theta) * this.radius);
      }
      geo.computeVertexNormals();

      const tex = loader.load(src, () => this.render());
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.anisotropy = maxAniso;
      tex.generateMipmaps = true;
      tex.minFilter = THREE.LinearMipmapLinearFilter;

      const mat = new THREE.ShaderMaterial({
        uniforms: { uTex: { value: tex }, uVel: this.uniforms.uVel, uHover: { value: 0 } },
        transparent: true,
        vertexShader: /* glsl */ `
          uniform float uVel;
          varying vec2 vUv; varying float vFacing;
          void main() {
            vUv = uv;
            vec4 wp = modelMatrix * vec4(position, 1.0);
            vFacing = normalize(wp.xz).y;           // 1 = facing the camera
            wp.y += uVel * pow(wp.x * 0.2, 2.0) * 1.6; // bend the ring while spinning fast
            gl_Position = projectionMatrix * viewMatrix * wp;
          }
        `,
        fragmentShader: /* glsl */ `
          uniform sampler2D uTex; uniform float uHover;
          varying vec2 vUv; varying float vFacing;
          void main() {
            vec4 c = texture2D(uTex, vUv);
            float g = dot(c.rgb, vec3(0.299, 0.587, 0.114));
            float front = smoothstep(0.82, 0.985, vFacing);
            vec3 col = mix(vec3(g) * 0.42, c.rgb, front);
            col *= 1.0 + uHover * 0.06;
            float a = smoothstep(-0.1, 0.45, vFacing);
            gl_FragColor = vec4(col, a);
            #include <colorspace_fragment>
          }
        `,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.userData.index = i;
      this.group.add(mesh);
      this.meshes.push(mesh);
    });

    this.target = 0;
    this.current = 0;
    this.mouse = new THREE.Vector2();
    this.mouseSmooth = new THREE.Vector2();
    this.running = false;
    this.loop = this.loop.bind(this);
    this.onResize = this.resize.bind(this);
    window.addEventListener('resize', this.onResize);
    this.resize();
  }

  /** progress 0 → 1 maps to the first → last project */
  setProgress(p) {
    this.target = -p * (this.count - 1) * this.step;
  }

  setPointer(nx, ny) { this.mouse.set(nx, ny); }

  resize() {
    const w = this.canvas.clientWidth, h = this.canvas.clientHeight;
    if (!w || !h) return;
    this.renderer.setSize(w, h, false);
    const aspect = w / h;
    this.camera.aspect = aspect;
    const frac = aspect < 1 ? 0.86 : aspect < 1.4 ? 0.66 : 0.5; // how much of the width the front plane takes
    const visibleW = this.planeW / frac;
    const dist = visibleW / (2 * Math.tan(THREE.MathUtils.degToRad(this.camera.fov / 2)) * aspect);
    this.camera.position.set(0, 0, this.radius + dist);
    this.camera.lookAt(0, 0, 0);
    this.camera.updateProjectionMatrix();
    this.render();
  }

  render() { this.renderer.render(this.scene, this.camera); }

  start() { if (!this.running) { this.running = true; requestAnimationFrame(this.loop); } }
  stop() { this.running = false; }

  loop() {
    if (!this.running) return;
    const prev = this.current;
    this.current += (this.target - this.current) * 0.085;
    const vel = this.current - prev;
    this.uniforms.uVel.value += (THREE.MathUtils.clamp(vel * 9, -1, 1) - this.uniforms.uVel.value) * 0.12;
    this.mouseSmooth.lerp(this.mouse, 0.06);
    this.group.rotation.y = this.current + this.mouseSmooth.x * 0.05;
    this.group.rotation.x = this.mouseSmooth.y * 0.05;
    this.group.rotation.z = -0.025;
    this.render();
    requestAnimationFrame(this.loop);
  }

  dispose() {
    this.stop();
    window.removeEventListener('resize', this.onResize);
    this.meshes.forEach((m) => { m.geometry.dispose(); m.material.uniforms.uTex.value.dispose(); m.material.dispose(); });
    this.renderer.dispose();
  }
}
