import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

interface Props {
  angleDeg: number; // Clockwise degrees from North (0, 90, 180, 270...)
}

export const AngleRobotLab: React.FC<Props> = ({ angleDeg }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const robotRef = useRef<THREE.Group | null>(null);
  const targetRadRef = useRef<number>(0);

  useEffect(() => {
    targetRadRef.current = -THREE.MathUtils.degToRad(angleDeg);
  }, [angleDeg]);

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#f8fafc');

    const cam = new THREE.PerspectiveCamera(42, el.clientWidth / el.clientHeight, 0.1, 200);
    cam.position.set(0, 9, 9);

    const ren = new THREE.WebGLRenderer({ antialias: true });
    ren.setSize(el.clientWidth, el.clientHeight);
    el.appendChild(ren.domElement);

    const ctrl = new OrbitControls(cam, ren.domElement);
    ctrl.enableDamping = true;

    scene.add(new THREE.AmbientLight(0xffffff, 0.85));
    const dl = new THREE.DirectionalLight(0xffffff, 0.9);
    dl.position.set(6, 14, 8);
    scene.add(dl);

    scene.add(new THREE.GridHelper(10, 10, 0x94a3b8, 0xe2e8f0));

    // Compass markers (N=Red, E=Blue, S=Green, W=Amber)
    const dirs = [
      { pos: [0, 0.15, -4], col: 0xe11d48 },
      { pos: [4, 0.15, 0], col: 0x0284c7 },
      { pos: [0, 0.15, 4], col: 0x10b981 },
      { pos: [-4, 0.15, 0], col: 0xf59e0b },
    ];
    dirs.forEach((d) => {
      const m = new THREE.Mesh(
        new THREE.CylinderGeometry(0.45, 0.45, 0.2, 20),
        new THREE.MeshStandardMaterial({ color: d.col })
      );
      m.position.set(d.pos[0], d.pos[1], d.pos[2]);
      scene.add(m);
    });

    // Cute 3D Robot facing North (-Z)
    const robot = new THREE.Group();
    const body = new THREE.Mesh(
      new THREE.BoxGeometry(1.4, 1.5, 1.0),
      new THREE.MeshStandardMaterial({ color: 0x0284c7 })
    );
    body.position.y = 1.0;
    robot.add(body);

    const head = new THREE.Mesh(
      new THREE.BoxGeometry(1.1, 0.9, 0.9),
      new THREE.MeshStandardMaterial({ color: 0x38bdf8 })
    );
    head.position.y = 2.25;
    robot.add(head);

    // Eyes on the front (-Z face)
    const eyeMat = new THREE.MeshBasicMaterial({ color: 0xfef08a });
    [-0.25, 0.25].forEach((ex) => {
      const eye = new THREE.Mesh(new THREE.SphereGeometry(0.12, 10, 10), eyeMat);
      eye.position.set(ex, 2.3, -0.46);
      robot.add(eye);
    });

    // Red direction pointer arrow in front of robot
    const pointer = new THREE.Mesh(
      new THREE.ConeGeometry(0.35, 1.2, 12),
      new THREE.MeshStandardMaterial({ color: 0xe11d48 })
    );
    pointer.rotation.x = -Math.PI / 2;
    pointer.position.set(0, 0.4, -1.6);
    robot.add(pointer);

    scene.add(robot);
    robotRef.current = robot;

    let id: number;
    const loop = () => {
      id = requestAnimationFrame(loop);
      if (robotRef.current) {
        robotRef.current.rotation.y +=
          (targetRadRef.current - robotRef.current.rotation.y) * 0.12;
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