import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

interface Props { isRolling: boolean; resetKey: number; }

export const RollingShapesLab: React.FC<Props> = ({ isRolling, resetKey }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const st = useRef({ isRolling, progress: 0 });

  useEffect(() => { st.current.isRolling = isRolling; }, [isRolling]);
  useEffect(() => { st.current.progress = 0; }, [resetKey]);

  useEffect(() => {
    const el = mountRef.current; if (!el) return;
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#f1f5f9');
    const cam = new THREE.PerspectiveCamera(42, el.clientWidth / el.clientHeight, 0.1, 200);
    cam.position.set(0, 8, 13);
    const ren = new THREE.WebGLRenderer({ antialias: true });
    ren.setSize(el.clientWidth, el.clientHeight);
    el.appendChild(ren.domElement);
    const ctrl = new OrbitControls(cam, ren.domElement);
    ctrl.enableDamping = true;

    scene.add(new THREE.AmbientLight(0xffffff, 0.85));
    const dl = new THREE.DirectionalLight(0xffffff, 0.95);
    dl.position.set(8, 15, 10); scene.add(dl);

    const ramp = new THREE.Mesh(new THREE.BoxGeometry(10, 0.4, 8), new THREE.MeshStandardMaterial({ color: 0xcbd5e1 }));
    ramp.rotation.x = 0.28; scene.add(ramp);

    const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.85, 32, 32), new THREE.MeshStandardMaterial({ color: 0xf43f5e }));
    scene.add(sphere);

    const cyl = new THREE.Mesh(new THREE.CylinderGeometry(0.8, 0.8, 1.6, 32), new THREE.MeshStandardMaterial({ color: 0x0284c7 }));
    cyl.rotation.z = Math.PI / 2; scene.add(cyl);

    const cube = new THREE.Mesh(new THREE.BoxGeometry(1.5, 1.5, 1.5), new THREE.MeshStandardMaterial({ color: 0xf59e0b }));
    cube.rotation.x = 0.28; scene.add(cube);

    let id: number;
    const loop = () => {
      id = requestAnimationFrame(loop);
      if (st.current.isRolling && st.current.progress < 1) {
        st.current.progress = Math.min(1, st.current.progress + 0.012);
      }
      const p = st.current.progress; const a = 0.28;
      const zS = -2.8 + p * 5.6;
      sphere.position.set(-3, -Math.tan(a) * zS + 1.05, zS);
      sphere.rotation.x = p * 8;
      const zC = -2.8 + p * 4.8;
      cyl.position.set(0, -Math.tan(a) * zC + 1.0, zC);
      cyl.rotation.x = p * 6;
      cube.position.set(3, -Math.tan(a) * (-2.8) + 0.95, -2.8);
      ctrl.update(); ren.render(scene, cam);
    };
    loop();

    const onR = () => {
      if (!el) return;
      cam.aspect = el.clientWidth / el.clientHeight;
      cam.updateProjectionMatrix();
      ren.setSize(el.clientWidth, el.clientHeight);
    };
    window.addEventListener('resize', onR);
    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener('resize', onR);
      el.removeChild(ren.domElement); ren.dispose();
    };
  }, []);

  return <div ref={mountRef} className="h-full w-full" />;
};