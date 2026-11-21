import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

interface Props { temperature: number; }

export const StatesOfMatterLab: React.FC<Props> = ({ temperature }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const ptsRef = useRef<{ m: THREE.Mesh; b: THREE.Vector3; v: THREE.Vector3 }[]>([]);
  const tRef = useRef(temperature);

  useEffect(() => { tRef.current = temperature; }, [temperature]);

  useEffect(() => {
    const el = mountRef.current; if (!el) return;
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#0f172a');
    const cam = new THREE.PerspectiveCamera(42, el.clientWidth / el.clientHeight, 0.1, 200);
    cam.position.set(0, 4, 11);
    const ren = new THREE.WebGLRenderer({ antialias: true });
    ren.setSize(el.clientWidth, el.clientHeight);
    el.appendChild(ren.domElement);
    const ctrl = new OrbitControls(cam, ren.domElement);
    ctrl.enableDamping = true;

    scene.add(new THREE.AmbientLight(0xffffff, 0.8));
    const dl = new THREE.DirectionalLight(0xffffff, 1.1);
    dl.position.set(6, 12, 8); scene.add(dl);

    scene.add(new THREE.LineSegments(
      new THREE.EdgesGeometry(new THREE.BoxGeometry(5.2, 5.2, 5.2)),
      new THREE.LineBasicMaterial({ color: 0x38bdf8 })
    ));

    const pG = new THREE.SphereGeometry(0.28, 16, 16);
    const pM = new THREE.MeshStandardMaterial({ color: 0x38bdf8 });
    const list: { m: THREE.Mesh; b: THREE.Vector3; v: THREE.Vector3 }[] = [];

    for (let x = -1; x <= 1; x++) {
      for (let y = 0; y < 4; y++) {
        for (let z = -1; z <= 1; z++) {
          const m = new THREE.Mesh(pG, pM);
          const b = new THREE.Vector3(x * 0.9, -2.0 + y * 0.85, z * 0.9);
          m.position.copy(b); scene.add(m);
          list.push({
            m, b,
            v: new THREE.Vector3((Math.random() - 0.5) * 0.08, (Math.random() - 0.5) * 0.08, (Math.random() - 0.5) * 0.08)
          });
        }
      }
    }
    ptsRef.current = list;

    let id: number;
    const loop = () => {
      id = requestAnimationFrame(loop);
      const t = tRef.current;
      ptsRef.current.forEach((p) => {
        if (t <= 0) {
          p.m.position.set(p.b.x + (Math.random() - 0.5) * 0.06, p.b.y + (Math.random() - 0.5) * 0.06, p.b.z + (Math.random() - 0.5) * 0.06);
        } else if (t < 100) {
          p.m.position.addScaledVector(p.v, 0.6);
          if (Math.abs(p.m.position.x) > 2.2) p.v.x *= -1;
          if (p.m.position.y > -0.2 || p.m.position.y < -2.3) p.v.y *= -1;
          if (Math.abs(p.m.position.z) > 2.2) p.v.z *= -1;
        } else {
          p.m.position.addScaledVector(p.v, 1.5);
          if (Math.abs(p.m.position.x) > 2.3) p.v.x *= -1;
          if (Math.abs(p.m.position.y) > 2.3) p.v.y *= -1;
          if (Math.abs(p.m.position.z) > 2.3) p.v.z *= -1;
        }
      });
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