import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ParticleNetwork({ reducedMotion = false }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const width = mount.clientWidth;
    const height = mount.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.z = 35;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    const NODE_COUNT = 45;
    const MAX_CONNECTIONS = 250;
    const MAX_DIST = 13;

    const positions = new Float32Array(NODE_COUNT * 3);
    const velocities = [];

    for (let i = 0; i < NODE_COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 50;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 35;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 30;
      velocities.push({
        x: (Math.random() - 0.5) * (reducedMotion ? 0 : 0.03),
        y: (Math.random() - 0.5) * (reducedMotion ? 0 : 0.03),
        z: (Math.random() - 0.5) * (reducedMotion ? 0 : 0.03),
      });
    }

    const pointsGeo = new THREE.BufferGeometry();
    pointsGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const pointsTexture = (() => {
      const canvas = document.createElement('canvas');
      canvas.width = 64;
      canvas.height = 64;
      const ctx = canvas.getContext('2d');
      const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      gradient.addColorStop(0, 'rgba(45, 91, 255, 1)');
      gradient.addColorStop(0.4, 'rgba(45, 91, 255, 0.6)');
      gradient.addColorStop(1, 'rgba(45, 91, 255, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 64, 64);
      return new THREE.CanvasTexture(canvas);
    })();

    const pointsMat = new THREE.PointsMaterial({
      size: 1.2,
      map: pointsTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const points = new THREE.Points(pointsGeo, pointsMat);
    scene.add(points);

    const linePositions = new Float32Array(MAX_CONNECTIONS * 6);
    const lineColors = new Float32Array(MAX_CONNECTIONS * 6);
    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    lineGeo.setAttribute('color', new THREE.BufferAttribute(lineColors, 3));
    const lineMat = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending,
    });
    const lines = new THREE.LineSegments(lineGeo, lineMat);
    scene.add(lines);

    const cobalt = new THREE.Color(0x2d5bff);
    const amber = new THREE.Color(0xffb000);
    const tempColor = new THREE.Color();

    const mouse = { x: 0, y: 0 };
    const targetRot = { x: 0, y: 0 };

    function onMouseMove(e) {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
      targetRot.x = mouse.y * 0.25;
      targetRot.y = mouse.x * 0.25;
    }

    function onTouchMove(e) {
      if (e.touches.length > 0) {
        mouse.x = (e.touches[0].clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(e.touches[0].clientY / window.innerHeight) * 2 + 1;
        targetRot.x = mouse.y * 0.25;
        targetRot.y = mouse.x * 0.25;
      }
    }

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('touchmove', onTouchMove, { passive: true });

    let frameId;
    let rotationY = 0;

    function animate() {
      frameId = requestAnimationFrame(animate);

      if (!reducedMotion) {
        for (let i = 0; i < NODE_COUNT; i++) {
          positions[i * 3] += velocities[i].x;
          positions[i * 3 + 1] += velocities[i].y;
          positions[i * 3 + 2] += velocities[i].z;

          if (Math.abs(positions[i * 3]) > 25) velocities[i].x *= -1;
          if (Math.abs(positions[i * 3 + 1]) > 17) velocities[i].y *= -1;
          if (Math.abs(positions[i * 3 + 2]) > 15) velocities[i].z *= -1;
        }
        pointsGeo.attributes.position.needsUpdate = true;
      }

      let connectionIdx = 0;
      for (let i = 0; i < NODE_COUNT; i++) {
        for (let j = i + 1; j < NODE_COUNT; j++) {
          if (connectionIdx >= MAX_CONNECTIONS) break;
          const dx = positions[i * 3] - positions[j * 3];
          const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
          const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
          if (dist < MAX_DIST) {
            const alpha = 1 - dist / MAX_DIST;
            const idx = connectionIdx * 6;
            linePositions[idx] = positions[i * 3];
            linePositions[idx + 1] = positions[i * 3 + 1];
            linePositions[idx + 2] = positions[i * 3 + 2];
            linePositions[idx + 3] = positions[j * 3];
            linePositions[idx + 4] = positions[j * 3 + 1];
            linePositions[idx + 5] = positions[j * 3 + 2];

            tempColor.copy(cobalt).lerp(amber, 0.15);
            const r = tempColor.r * alpha;
            const g = tempColor.g * alpha;
            const b = tempColor.b * alpha;
            lineColors[idx] = r;
            lineColors[idx + 1] = g;
            lineColors[idx + 2] = b;
            lineColors[idx + 3] = r;
            lineColors[idx + 4] = g;
            lineColors[idx + 5] = b;

            connectionIdx++;
          }
        }
      }

      for (let i = connectionIdx; i < MAX_CONNECTIONS; i++) {
        const idx = i * 6;
        for (let k = 0; k < 6; k++) {
          linePositions[idx + k] = 0;
          lineColors[idx + k] = 0;
        }
      }

      lineGeo.attributes.position.needsUpdate = true;
      lineGeo.attributes.color.needsUpdate = true;
      lineGeo.setDrawRange(0, connectionIdx * 2);

      if (reducedMotion) {
        scene.rotation.x = 0;
        scene.rotation.y = 0;
      } else {
        scene.rotation.x += (targetRot.x - scene.rotation.x) * 0.04;
        rotationY += 0.0015;
        scene.rotation.y = targetRot.y + rotationY;
      }

      renderer.render(scene, camera);
    }
    animate();

    function onResize() {
      if (!mount) return;
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    }
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('resize', onResize);
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
      pointsGeo.dispose();
      lineGeo.dispose();
      pointsMat.dispose();
      pointsTexture.dispose();
      lineMat.dispose();
      renderer.dispose();
    };
  }, [reducedMotion]);

  return <div ref={mountRef} className="absolute inset-0 w-full h-full" aria-label="Interactive 3D network topology of glowing nodes connected by data strands" />;
}