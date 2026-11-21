import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

interface Props {
  shape: 'cube' | 'prism' | 'pyramid' | 'cylinder' | 'cone';
  wireframe: boolean;
}

export const Shapes3DExplorerLab: React.FC<Props> = ({ shape, wireframe }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const grpRef = useRef<THREE.Group | null>(null);

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#0f172a');

    const cam = new THREE.PerspectiveCamera(42, el.clientWidth / el.clientHeight, 0.1, 200);
    cam.position.set(4.5, 4, 6);

    const ren = new THREE.WebGLRenderer({ antialias: true });
    ren.setSize(el.clientWidth, el.clientHeight);
    el.appendChild(ren.domElement);

    const ctrl = new OrbitControls(cam, ren.domElement);
    ctrl.enableDamping = true;

    scene.add(new THREE.AmbientLight(0xffffff, 0.8));
    const dl = new THREE.DirectionalLight(0xffffff, 1.0);
    dl.position.set(6, 10, 8);
    scene.add(dl);

    const grp = new THREE.Group();
    scene.add(grp);
    grpRef.current = grp;

    let id: number;
    const loop = () => {
      id = requestAnimationFrame(loop);
      if (grpRef.current) grpRef.current.rotation.y += 0.007;
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

  useEffect(() => {
    const g = grpRef.current;
    if (!g) return;
    while (g.children.length > 0) g.remove(g.children[0]);

    let geo: THREE.BufferGeometry;
    let color = 0x38bdf8;
    if (shape === 'cube') {
      geo = new THREE.BoxGeometry(2.6, 2.6, 2.6);
      color = 0x38bdf8;
    } else if (shape === 'prism') {
      geo = new THREE.CylinderGeometry(1.7, 1.7, 3.0, 3);
      color = 0xf59e0b;
    } else if (shape === 'pyramid') {
      geo = new THREE.ConeGeometry(2.0, 2.8, 4);
      color = 0x10b981;
    } else if (shape === 'cylinder') {
      geo = new THREE.CylinderGeometry(1.4, 1.4, 2.8, 32);
      color = 0x8b5cf6;
    } else {
      geo = new THREE.ConeGeometry(1.6, 3.0, 32);
      color = 0xf43f5e;
    }

    const mesh = new THREE.Mesh(
      geo,
      new THREE.MeshStandardMaterial({
        color,
        roughness: 0.35,
        transparent: wireframe,
        opacity: wireframe ? 0.25 : 0.92,
      })
    );
    g.add(mesh);

    const edges = new THREE.LineSegments(
      new THREE.EdgesGeometry(geo),
      new THREE.LineBasicMaterial({ color: 0xffffff })
    );
    g.add(edges);
  }, [shape, wireframe]);

  return <div ref={mountRef} className="h-full w-full" />;
};