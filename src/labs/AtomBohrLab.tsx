import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

interface Props {
  atomicNumber: number; // 1 (H), 6 (C), 8 (O), 11 (Na)
  isPaused: boolean;
}

export const AtomBohrLab: React.FC<Props> = ({ atomicNumber, isPaused }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const atomGroupRef = useRef<THREE.Group | null>(null);
  const shellsRef = useRef<THREE.Group[]>([]);
  const pauseRef = useRef(isPaused);

  useEffect(() => {
    pauseRef.current = isPaused;
  }, [isPaused]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#090d16');

    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      200
    );
    camera.position.set(0, 12, 14);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    scene.add(new THREE.AmbientLight(0xffffff, 0.7));
    const light = new THREE.PointLight(0xffffff, 1.5, 100);
    light.position.set(10, 15, 10);
    scene.add(light);

    const atomGroup = new THREE.Group();
    scene.add(atomGroup);
    atomGroupRef.current = atomGroup;

    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (!pauseRef.current) {
        shellsRef.current.forEach((shell, idx) => {
          shell.rotation.y += (0.025 - idx * 0.005);
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

  // Dựng hạt nhân và các lớp vỏ electron theo số hiệu nguyên tử
  useEffect(() => {
    const group = atomGroupRef.current;
    if (!group) return;

    while (group.children.length > 0) {
      group.remove(group.children[0]);
    }
    shellsRef.current = [];

    // Hạt nhân ở tâm (Proton đỏ + Neutron xám)
    const nucleus = new THREE.Group();
    const pMat = new THREE.MeshStandardMaterial({ color: 0xf43f5e });
    const nMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8 });
    const nucleonGeo = new THREE.SphereGeometry(0.32, 16, 16);

    const totalNucleons = atomicNumber === 1 ? 1 : atomicNumber * 2;
    for (let i = 0; i < totalNucleons; i++) {
      const m = new THREE.Mesh(nucleonGeo, i % 2 === 0 ? pMat : nMat);
      const r = atomicNumber === 1 ? 0 : 0.45 * Math.cbrt(i);
      const theta = i * 2.4;
      const phi = Math.acos(1 - (2 * (i + 0.5)) / totalNucleons);
      m.position.set(
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta),
        r * Math.cos(phi)
      );
      nucleus.add(m);
    }
    group.add(nucleus);

    // Chia electron vào các lớp (tối đa 2 - 8 - 8)
    const distribution: number[] = [];
    let rem = atomicNumber;
    [2, 8, 8].forEach((cap) => {
      if (rem > 0) {
        const take = Math.min(rem, cap);
        distribution.push(take);
        rem -= take;
      }
    });

    const eGeo = new THREE.SphereGeometry(0.24, 16, 16);
    const eMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });

    distribution.forEach((eCount, shellIdx) => {
      const radius = 2.6 + shellIdx * 1.9;

      // Vòng quỹ đạo
      const ringGeo = new THREE.RingGeometry(radius - 0.03, radius + 0.03, 64);
      const ring = new THREE.Mesh(
        ringGeo,
        new THREE.MeshBasicMaterial({
          color: 0x334155,
          side: THREE.DoubleSide,
        })
      );
      ring.rotation.x = Math.PI / 2;
      group.add(ring);

      // Các hạt electron trên lớp
      const shellPivot = new THREE.Group();
      for (let e = 0; e < eCount; e++) {
        const angle = (e / eCount) * Math.PI * 2;
        const electron = new THREE.Mesh(eGeo, eMat);
        electron.position.set(Math.cos(angle) * radius, 0, Math.sin(angle) * radius);
        shellPivot.add(electron);
      }
      group.add(shellPivot);
      shellsRef.current.push(shellPivot);
    });
  }, [atomicNumber]);

  return <div ref={mountRef} className="h-full w-full" />;
};