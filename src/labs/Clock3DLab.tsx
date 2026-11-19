import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

interface Props {
  hour: number;
  minute: number;
}

export const Clock3DLab: React.FC<Props> = ({ hour, minute }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const hourHandRef = useRef<THREE.Group | null>(null);
  const minuteHandRef = useRef<THREE.Group | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#f1f5f9');

    const camera = new THREE.PerspectiveCamera(
      42,
      container.clientWidth / container.clientHeight,
      0.1,
      200
    );
    camera.position.set(0, 8, 9);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    scene.add(new THREE.AmbientLight(0xffffff, 0.85));
    const dirLight = new THREE.DirectionalLight(0xffffff, 0.95);
    dirLight.position.set(6, 12, 8);
    scene.add(dirLight);

    const clockGroup = new THREE.Group();
    clockGroup.rotation.x = -0.35;
    scene.add(clockGroup);

    // Viền đồng hồ màu xanh dương
    const rim = new THREE.Mesh(
      new THREE.CylinderGeometry(4.2, 4.2, 0.5, 48),
      new THREE.MeshStandardMaterial({ color: 0x0284c7, roughness: 0.35 })
    );
    clockGroup.add(rim);

    // Mặt số trắng
    const face = new THREE.Mesh(
      new THREE.CylinderGeometry(3.8, 3.8, 0.54, 48),
      new THREE.MeshStandardMaterial({ color: 0xffffff })
    );
    clockGroup.add(face);

    // 12 vạch giờ xung quanh mặt đồng hồ
    for (let i = 1; i <= 12; i++) {
      const angle = (i / 12) * Math.PI * 2;
      const isQuarter = i % 3 === 0;
      const tick = new THREE.Mesh(
        new THREE.BoxGeometry(isQuarter ? 0.22 : 0.12, 0.1, isQuarter ? 0.55 : 0.35),
        new THREE.MeshStandardMaterial({
          color: isQuarter ? 0xe11d48 : 0x334155,
        })
      );
      tick.position.set(Math.sin(angle) * 3.2, 0.28, -Math.cos(angle) * 3.2);
      tick.rotation.y = -angle;
      clockGroup.add(tick);
    }

    // Kim giờ (ngắn, màu đỏ)
    const hourPivot = new THREE.Group();
    hourPivot.position.y = 0.34;
    const hourMesh = new THREE.Mesh(
      new THREE.BoxGeometry(0.24, 0.08, 2.0),
      new THREE.MeshStandardMaterial({ color: 0xe11d48 })
    );
    hourMesh.position.z = -0.85;
    hourPivot.add(hourMesh);
    clockGroup.add(hourPivot);
    hourHandRef.current = hourPivot;

    // Kim phút (dài, màu xanh đậm)
    const minutePivot = new THREE.Group();
    minutePivot.position.y = 0.42;
    const minuteMesh = new THREE.Mesh(
      new THREE.BoxGeometry(0.15, 0.08, 2.9),
      new THREE.MeshStandardMaterial({ color: 0x1e3a8a })
    );
    minuteMesh.position.z = -1.3;
    minutePivot.add(minuteMesh);
    clockGroup.add(minutePivot);
    minuteHandRef.current = minutePivot;

    // Chốt tâm đồng hồ
    const cap = new THREE.Mesh(
      new THREE.CylinderGeometry(0.24, 0.24, 0.22, 20),
      new THREE.MeshStandardMaterial({ color: 0xf59e0b })
    );
    cap.position.y = 0.44;
    clockGroup.add(cap);

    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);
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

  // Cập nhật góc xoay kim giờ & kim phút
  useEffect(() => {
    if (minuteHandRef.current) {
      minuteHandRef.current.rotation.y = -(minute / 60) * Math.PI * 2;
    }
    if (hourHandRef.current) {
      const totalHours = (hour % 12) + minute / 60;
      hourHandRef.current.rotation.y = -(totalHours / 12) * Math.PI * 2;
    }
  }, [hour, minute]);

  return <div ref={mountRef} className="h-full w-full" />;
};