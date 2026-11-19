import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

interface Props {
  unfoldPercent: number; // 0 (đóng hộp) -> 100 (bung phẳng 2D)
  isCube: boolean;
}

export const BoxUnfoldLab: React.FC<Props> = ({ unfoldPercent, isCube }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const pivotsRef = useRef<{
    front: THREE.Group;
    back: THREE.Group;
    left: THREE.Group;
    right: THREE.Group;
    top: THREE.Group;
  } | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#f8fafc');

    const camera = new THREE.PerspectiveCamera(
      42,
      container.clientWidth / container.clientHeight,
      0.1,
      200
    );
    camera.position.set(7, 8, 9);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    scene.add(new THREE.AmbientLight(0xffffff, 0.85));
    const dirLight = new THREE.DirectionalLight(0xffffff, 0.9);
    dirLight.position.set(8, 15, 10);
    scene.add(dirLight);

    const grid = new THREE.GridHelper(16, 16, 0xcbd5e1, 0xe2e8f0);
    scene.add(grid);

    const w = isCube ? 2.4 : 3.2; // Dài
    const d = isCube ? 2.4 : 2.0; // Rộng
    const h = isCube ? 2.4 : 1.8; // Cao
    const t = 0.06;

    const root = new THREE.Group();
    scene.add(root);

    const makeFace = (fw: number, fd: number, color: number) => {
      const m = new THREE.Mesh(
        new THREE.BoxGeometry(fw, t, fd),
        new THREE.MeshStandardMaterial({
          color,
          roughness: 0.4,
          transparent: true,
          opacity: 0.92,
        })
      );
      return m;
    };

    // Mặt đáy cố định
    const bottom = makeFace(w, d, 0x0284c7);
    bottom.position.y = t / 2;
    root.add(bottom);

    // Mặt trước
    const frontPivot = new THREE.Group();
    frontPivot.position.set(0, t, d / 2);
    const frontFace = makeFace(w, h, 0x38bdf8);
    frontFace.position.set(0, 0, h / 2);
    frontPivot.add(frontFace);
    root.add(frontPivot);

    // Mặt sau + Nắp trên gắn liền mặt sau
    const backPivot = new THREE.Group();
    backPivot.position.set(0, t, -d / 2);
    const backFace = makeFace(w, h, 0x38bdf8);
    backFace.position.set(0, 0, -h / 2);
    backPivot.add(backFace);

    const topPivot = new THREE.Group();
    topPivot.position.set(0, 0, -h);
    const topFace = makeFace(w, d, 0x0ea5e9);
    topFace.position.set(0, 0, -d / 2);
    topPivot.add(topFace);
    backPivot.add(topPivot);
    root.add(backPivot);

    // Mặt trái
    const leftPivot = new THREE.Group();
    leftPivot.position.set(-w / 2, t, 0);
    const leftFace = makeFace(h, d, 0xf59e0b);
    leftFace.position.set(-h / 2, 0, 0);
    leftPivot.add(leftFace);
    root.add(leftPivot);

    // Mặt phải
    const rightPivot = new THREE.Group();
    rightPivot.position.set(w / 2, t, 0);
    const rightFace = makeFace(h, d, 0xf59e0b);
    rightFace.position.set(h / 2, 0, 0);
    rightPivot.add(rightFace);
    root.add(rightPivot);

    pivotsRef.current = {
      front: frontPivot,
      back: backPivot,
      left: leftPivot,
      right: rightPivot,
      top: topPivot,
    };

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
      scene.remove(root);
      container.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, [isCube]);

  // Cập nhật góc gập theo thanh trượt 0 -> 100%
  useEffect(() => {
    const p = pivotsRef.current;
    if (!p) return;
    const ratio = 1 - unfoldPercent / 100; // 1 = đóng 90 độ, 0 = mở phẳng 0 độ
    const angle = (Math.PI / 2) * ratio;

    p.front.rotation.x = -angle;
    p.back.rotation.x = angle;
    p.left.rotation.z = -angle;
    p.right.rotation.z = angle;
    p.top.rotation.x = angle;
  }, [unfoldPercent, isCube]);

  return <div ref={mountRef} className="h-full w-full" />;
};