import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

interface Props {
  rightFlipped: boolean; // false: N-S facing N-S (Attract), true: N-S facing S-N (Repel)
}

export const Magnets3DLab: React.FC<Props> = ({ rightFlipped }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const rightMagRef = useRef<THREE.Group | null>(null);
  const targetRef = useRef({ x: 1.6, rotY: 0 });

  useEffect(() => {
    // Left magnet has S on left (-), N on right (+)
    // If rightFlipped is false: S is on left -> N attracts S -> close together (x = 1.6)
    // If rightFlipped is true: N is on left -> N repels N -> pushed apart (x = 4.6)
    targetRef.current = rightFlipped
      ? { x: 4.6, rotY: Math.PI }
      : { x: 1.6, rotY: 0 };
  }, [rightFlipped]);

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#f1f5f9');

    const cam = new THREE.PerspectiveCamera(42, el.clientWidth / el.clientHeight, 0.1, 200);
    cam.position.set(0, 7, 11);

    const ren = new THREE.WebGLRenderer({ antialias: true });
    ren.setSize(el.clientWidth, el.clientHeight);
    el.appendChild(ren.domElement);

    const ctrl = new OrbitControls(cam, ren.domElement);
    ctrl.enableDamping = true;

    scene.add(new THREE.AmbientLight(0xffffff, 0.85));
    const dl = new THREE.DirectionalLight(0xffffff, 0.95);
    dl.position.set(6, 14, 10);
    scene.add(dl);

    const table = new THREE.Mesh(
      new THREE.BoxGeometry(14, 0.4, 7),
      new THREE.MeshStandardMaterial({ color: 0xe2e8f0 })
    );
    table.position.y = -0.2;
    scene.add(table);

    const makeMagnet = () => {
      const g = new THREE.Group();
      const sPole = new THREE.Mesh(
        new THREE.BoxGeometry(1.5, 0.7, 1.0),
        new THREE.MeshStandardMaterial({ color: 0x0284c7 }) // Blue = S
      );
      sPole.position.set(-0.75, 0.35, 0);
      const nPole = new THREE.Mesh(
        new THREE.BoxGeometry(1.5, 0.7, 1.0),
        new THREE.MeshStandardMaterial({ color: 0xe11d48 }) // Red = N
      );
      nPole.position.set(0.75, 0.35, 0);
      g.add(sPole, nPole);
      return g;
    };

    const leftMag = makeMagnet();
    leftMag.position.x = -1.6;
    scene.add(leftMag);

    const rightMag = makeMagnet();
    rightMag.position.x = 1.6;
    scene.add(rightMag);
    rightMagRef.current = rightMag;

    let id: number;
    const loop = () => {
      id = requestAnimationFrame(loop);
      if (rightMagRef.current) {
        rightMagRef.current.position.x +=
          (targetRef.current.x - rightMagRef.current.position.x) * 0.1;
        rightMagRef.current.rotation.y +=
          (targetRef.current.rotY - rightMagRef.current.rotation.y) * 0.12;
      }
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