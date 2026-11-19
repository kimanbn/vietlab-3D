import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

interface Props {
  speed: number;
  isPaused: boolean;
}

export const WaterCycleLab: React.FC<Props> = ({ speed, isPaused }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef({ speed, isPaused });

  useEffect(() => {
    stateRef.current = { speed, isPaused };
  }, [speed, isPaused]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#e2e8f0');

    const camera = new THREE.PerspectiveCamera(42, container.clientWidth / container.clientHeight, 0.1, 200);
    camera.position.set(12, 10, 14);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    scene.add(new THREE.AmbientLight(0xffffff, 0.8));
    const dirLight = new THREE.DirectionalLight(0xffffff, 1.1);
    dirLight.position.set(10, 18, 10);
    scene.add(dirLight);

    const table = new THREE.Mesh(
      new THREE.BoxGeometry(14, 0.5, 9),
      new THREE.MeshStandardMaterial({ color: 0x92400e, roughness: 0.7 })
    );
    table.position.y = -1.25;
    scene.add(table);

    const bedrock = new THREE.Mesh(
      new THREE.BoxGeometry(12, 1, 7),
      new THREE.MeshStandardMaterial({ color: 0x475569 })
    );
    bedrock.position.y = -0.5;
    scene.add(bedrock);

    const ocean = new THREE.Mesh(
      new THREE.BoxGeometry(5.5, 1.2, 6.8),
      new THREE.MeshStandardMaterial({ color: 0x0284c7, transparent: true, opacity: 0.85 })
    );
    ocean.position.set(-3.1, 0.6, 0);
    scene.add(ocean);

    const land = new THREE.Mesh(
      new THREE.BoxGeometry(6.3, 1.4, 6.8),
      new THREE.MeshStandardMaterial({ color: 0x16a34a })
    );
    land.position.set(2.8, 0.7, 0);
    scene.add(land);

    const mountain = new THREE.Mesh(
      new THREE.ConeGeometry(2.4, 3.5, 5),
      new THREE.MeshStandardMaterial({ color: 0x64748b })
    );
    mountain.position.set(3.8, 3.1, 0);
    scene.add(mountain);

    const snowCap = new THREE.Mesh(
      new THREE.ConeGeometry(0.85, 1.2, 5),
      new THREE.MeshStandardMaterial({ color: 0xffffff })
    );
    snowCap.position.set(3.8, 4.25, 0);
    scene.add(snowCap);

    const cloudGroup = new THREE.Group();
    const cloudMat = new THREE.MeshStandardMaterial({ color: 0xffffff });
    [
      [0, 0, 0, 0.9],
      [0.8, 0.1, 0.2, 0.75],
      [-0.8, -0.05, -0.1, 0.7],
    ].forEach(([x, y, z, r]) => {
      const puff = new THREE.Mesh(new THREE.SphereGeometry(r, 16, 16), cloudMat);
      puff.position.set(x, y, z);
      cloudGroup.add(puff);
    });
    cloudGroup.position.set(-2.5, 4.8, 0);
    scene.add(cloudGroup);

    const vaporParticles: THREE.Mesh[] = [];
    const dropGeo = new THREE.SphereGeometry(0.08, 8, 8);
    const vaporMat = new THREE.MeshBasicMaterial({ color: 0xbae6fd });
    for (let i = 0; i < 18; i++) {
      const p = new THREE.Mesh(dropGeo, vaporMat);
      p.position.set(-4.5 + Math.random() * 3.5, 1.3 + Math.random() * 3, (Math.random() - 0.5) * 4);
      scene.add(p);
      vaporParticles.push(p);
    }

    const rainParticles: THREE.Mesh[] = [];
    const rainMat = new THREE.MeshBasicMaterial({ color: 0x2563eb });
    for (let i = 0; i < 24; i++) {
      const r = new THREE.Mesh(dropGeo, rainMat);
      r.position.set(1.2 + Math.random() * 3, 1.5 + Math.random() * 3, (Math.random() - 0.5) * 4);
      scene.add(r);
      rainParticles.push(r);
    }

    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      const { speed: s, isPaused: p } = stateRef.current;

      if (!p) {
        vaporParticles.forEach((v) => {
          v.position.y += 0.02 * s;
          if (v.position.y > 4.6) v.position.y = 1.3;
        });

        cloudGroup.position.x += 0.012 * s;
        if (cloudGroup.position.x > 2.6) cloudGroup.position.x = -3.2;

        rainParticles.forEach((r) => {
          r.position.y -= 0.035 * s;
          if (r.position.y < 1.4) r.position.y = 4.6;
        });
      }

      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      container.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="h-full w-full" />;
};