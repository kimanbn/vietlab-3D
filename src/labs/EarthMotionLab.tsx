import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

interface Props {
  speed: number;
  isPaused: boolean;
}

export const EarthMotionLab: React.FC<Props> = ({ speed, isPaused }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef({ speed, isPaused });

  useEffect(() => {
    stateRef.current = { speed, isPaused };
  }, [speed, isPaused]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#070b14');

    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 500);
    camera.position.set(0, 18, 30);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    scene.add(new THREE.AmbientLight(0x28324a));
    const sunLight = new THREE.PointLight(0xfff4d6, 2.5, 150);
    scene.add(sunLight);

    const sun = new THREE.Mesh(
      new THREE.SphereGeometry(2.8, 32, 32),
      new THREE.MeshBasicMaterial({ color: 0xffb703 })
    );
    scene.add(sun);

    const orbitRadius = 13;
    const curve = new THREE.EllipseCurve(0, 0, orbitRadius, orbitRadius, 0, Math.PI * 2, false, 0);
    const orbitGeo = new THREE.BufferGeometry().setFromPoints(
      curve.getPoints(100).map((p) => new THREE.Vector3(p.x, 0, p.y))
    );
    scene.add(new THREE.Line(orbitGeo, new THREE.LineBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.4 })));

    const earthSystem = new THREE.Group();
    scene.add(earthSystem);

    const tiltGroup = new THREE.Group();
    tiltGroup.rotation.z = THREE.MathUtils.degToRad(23.5);
    earthSystem.add(tiltGroup);

    const earth = new THREE.Mesh(
      new THREE.SphereGeometry(1.2, 32, 32),
      new THREE.MeshStandardMaterial({ color: 0x2563eb, roughness: 0.5 })
    );
    tiltGroup.add(earth);

    const axis = new THREE.Mesh(
      new THREE.CylinderGeometry(0.03, 0.03, 3.4, 8),
      new THREE.MeshBasicMaterial({ color: 0xf43f5e })
    );
    tiltGroup.add(axis);

    const moonPivot = new THREE.Group();
    earthSystem.add(moonPivot);
    const moon = new THREE.Mesh(
      new THREE.SphereGeometry(0.32, 20, 20),
      new THREE.MeshStandardMaterial({ color: 0xe2e8f0 })
    );
    moon.position.set(2.5, 0, 0);
    moonPivot.add(moon);

    let angle = 0;
    let animId: number;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const { speed: s, isPaused: p } = stateRef.current;
      if (!p) {
        angle += 0.004 * s;
        earthSystem.position.set(Math.cos(angle) * orbitRadius, 0, Math.sin(angle) * orbitRadius);
        earth.rotation.y += 0.025 * s;
        moonPivot.rotation.y += 0.018 * s;
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