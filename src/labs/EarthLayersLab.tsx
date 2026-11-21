import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

interface Props {
  selectedLayer: 'all' | 'crust' | 'mantle' | 'core';
  isPaused: boolean;
}

export const EarthLayersLab: React.FC<Props> = ({ selectedLayer, isPaused }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const groupRef = useRef<THREE.Group | null>(null);
  const pauseRef = useRef(isPaused);

  useEffect(() => { pauseRef.current = isPaused; }, [isPaused]);

  useEffect(() => {
    const el = mountRef.current; if (!el) return;
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#090d16');
    const cam = new THREE.PerspectiveCamera(42, el.clientWidth / el.clientHeight, 0.1, 200);
    cam.position.set(7, 5, 8);
    const ren = new THREE.WebGLRenderer({ antialias: true });
    ren.setSize(el.clientWidth, el.clientHeight);
    el.appendChild(ren.domElement);
    const ctrl = new OrbitControls(cam, ren.domElement);
    ctrl.enableDamping = true;

    scene.add(new THREE.AmbientLight(0xffffff, 0.8));
    const dl = new THREE.DirectionalLight(0xffffff, 1.1);
    dl.position.set(10, 12, 10); scene.add(dl);

    const eg = new THREE.Group(); scene.add(eg); groupRef.current = eg;

    let id: number;
    const loop = () => {
      id = requestAnimationFrame(loop);
      if (!pauseRef.current && groupRef.current) groupRef.current.rotation.y += 0.005;
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

  useEffect(() => {
    const g = groupRef.current; if (!g) return;
    while (g.children.length > 0) g.remove(g.children[0]);
    const cut = Math.PI * 1.5;

    const cDim = selectedLayer !== 'all' && selectedLayer !== 'crust';
    g.add(new THREE.Mesh(
      new THREE.SphereGeometry(3.6, 36, 36, 0, cut),
      new THREE.MeshStandardMaterial({ color: 0x0284c7, side: THREE.DoubleSide, transparent: cDim, opacity: cDim ? 0.2 : 1 })
    ));

    const mDim = selectedLayer !== 'all' && selectedLayer !== 'mantle';
    g.add(new THREE.Mesh(
      new THREE.SphereGeometry(3.25, 32, 32, 0, cut),
      new THREE.MeshStandardMaterial({ color: 0xea580c, side: THREE.DoubleSide, transparent: mDim, opacity: mDim ? 0.25 : 1 })
    ));

    g.add(new THREE.Mesh(
      new THREE.SphereGeometry(1.5, 28, 28),
      new THREE.MeshStandardMaterial({ color: 0xfacc15, emissive: 0xf59e0b, emissiveIntensity: 0.6 })
    ));
  }, [selectedLayer]);

  return <div ref={mountRef} className="h-full w-full" />;
};