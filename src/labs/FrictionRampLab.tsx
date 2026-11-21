import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

interface Props {
  surface: 'ice' | 'wood' | 'carpet';
  isRunning: boolean;
  resetKey: number;
}

export const FrictionRampLab: React.FC<Props> = ({ surface, isRunning, resetKey }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const trackMatRef = useRef<THREE.MeshStandardMaterial | null>(null);
  const carRef = useRef<THREE.Group | null>(null);
  const st = useRef({ isRunning, x: -5.5, surface });

  useEffect(() => {
    st.current.isRunning = isRunning;
    st.current.surface = surface;
    if (trackMatRef.current) {
      const colorMap = { ice: 0xbae6fd, wood: 0xd97706, carpet: 0x059669 };
      trackMatRef.current.color.setHex(colorMap[surface]);
    }
  }, [surface, isRunning]);

  useEffect(() => {
    st.current.x = -5.5;
  }, [resetKey]);

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#f8fafc');

    const cam = new THREE.PerspectiveCamera(42, el.clientWidth / el.clientHeight, 0.1, 200);
    cam.position.set(0, 6.5, 13);

    const ren = new THREE.WebGLRenderer({ antialias: true });
    ren.setSize(el.clientWidth, el.clientHeight);
    el.appendChild(ren.domElement);

    const ctrl = new OrbitControls(cam, ren.domElement);
    ctrl.enableDamping = true;

    scene.add(new THREE.AmbientLight(0xffffff, 0.85));
    const dl = new THREE.DirectionalLight(0xffffff, 0.95);
    dl.position.set(8, 15, 10);
    scene.add(dl);

    const trackMat = new THREE.MeshStandardMaterial({ color: 0xbae6fd, roughness: 0.5 });
    trackMatRef.current = trackMat;
    const track = new THREE.Mesh(new THREE.BoxGeometry(14, 0.3, 3.6), trackMat);
    track.position.y = -0.15;
    scene.add(track);

    // Toy car
    const car = new THREE.Group();
    const body = new THREE.Mesh(
      new THREE.BoxGeometry(1.8, 0.7, 1.1),
      new THREE.MeshStandardMaterial({ color: 0xe11d48 })
    );
    body.position.y = 0.55;
    car.add(body);

    const wGeo = new THREE.CylinderGeometry(0.28, 0.28, 1.25, 16);
    const wMat = new THREE.MeshStandardMaterial({ color: 0x1e293b });
    [-0.55, 0.55].forEach((wx) => {
      const w = new THREE.Mesh(wGeo, wMat);
      w.rotation.x = Math.PI / 2;
      w.position.set(wx, 0.28, 0);
      car.add(w);
    });

    car.position.x = -5.5;
    scene.add(car);
    carRef.current = car;

    let id: number;
    const loop = () => {
      id = requestAnimationFrame(loop);
      const maxX =
        st.current.surface === 'ice' ? 5.5 : st.current.surface === 'wood' ? 1.5 : -2.0;
      if (st.current.isRunning && st.current.x < maxX) {
        st.current.x = Math.min(maxX, st.current.x + 0.12);
      }
      if (carRef.current) carRef.current.position.x = st.current.x;
      ctrl.update();
      ren.render(scene, cam);
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
      el.removeChild(ren.domElement);
      ren.dispose();
    };
  }, []);

  return <div ref={mountRef} className="h-full w-full" />;
};