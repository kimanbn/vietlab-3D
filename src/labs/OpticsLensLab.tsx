import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

interface Props {
  objectDistance: number; // Khoảng cách vật d (từ 3.5 đến 7.5, tiêu cự f = 2.5)
}

export const OpticsLensLab: React.FC<Props> = ({ objectDistance }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const dynamicGroupRef = useRef<THREE.Group | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#090d16');

    const camera = new THREE.PerspectiveCamera(
      42,
      container.clientWidth / container.clientHeight,
      0.1,
      200
    );
    camera.position.set(0, 6, 14);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    scene.add(new THREE.AmbientLight(0xffffff, 0.75));
    const dirLight = new THREE.DirectionalLight(0xffffff, 1.1);
    dirLight.position.set(6, 12, 10);
    scene.add(dirLight);

    // Bàn quang học & Trục chính
    const bench = new THREE.Mesh(
      new THREE.BoxGeometry(16, 0.35, 3.2),
      new THREE.MeshStandardMaterial({ color: 0x1e293b })
    );
    bench.position.y = -0.2;
    scene.add(bench);

    const axisLine = new THREE.Mesh(
      new THREE.CylinderGeometry(0.02, 0.02, 15.5, 8),
      new THREE.MeshBasicMaterial({ color: 0x64748b })
    );
    axisLine.rotation.z = Math.PI / 2;
    axisLine.position.y = 1.6;
    scene.add(axisLine);

    // Thấu kính hội tụ ở tâm x = 0 (Tiêu cự f = 2.5)
    const lens = new THREE.Mesh(
      new THREE.SphereGeometry(1.7, 32, 32),
      new THREE.MeshStandardMaterial({
        color: 0x38bdf8,
        transparent: true,
        opacity: 0.45,
        roughness: 0.1,
      })
    );
    lens.scale.set(0.22, 1, 1);
    lens.position.set(0, 1.6, 0);
    scene.add(lens);

    // 2 Tiêu điểm F và F' ở x = -2.5 và x = +2.5
    const fGeo = new THREE.SphereGeometry(0.12, 12, 12);
    const fMat = new THREE.MeshBasicMaterial({ color: 0xf43f5e });
    [-2.5, 2.5].forEach((fx) => {
      const pt = new THREE.Mesh(fGeo, fMat);
      pt.position.set(fx, 1.6, 0);
      scene.add(pt);
    });

    const dynamicGroup = new THREE.Group();
    scene.add(dynamicGroup);
    dynamicGroupRef.current = dynamicGroup;

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

  // Tính toán vị trí ảnh d' = (d * f) / (d - f) và vẽ đường truyền tia sáng
  useEffect(() => {
    const group = dynamicGroupRef.current;
    if (!group) return;

    while (group.children.length > 0) {
      group.remove(group.children[0]);
    }

    const f = 2.5;
    const d = objectDistance;
    const objHeight = 1.2;
    const axisY = 1.6;

    // Công thức thấu kính: 1/f = 1/d + 1/d'
    const dPrime = (d * f) / (d - f);
    const imgHeight = objHeight * (dPrime / d);

    // Vật sáng AB (mũi tên vàng bên trái)
    const objBody = new THREE.Mesh(
      new THREE.CylinderGeometry(0.1, 0.1, objHeight, 12),
      new THREE.MeshStandardMaterial({ color: 0xf59e0b })
    );
    objBody.position.set(-d, axisY + objHeight / 2, 0);
    group.add(objBody);

    const flame = new THREE.Mesh(
      new THREE.SphereGeometry(0.18, 12, 12),
      new THREE.MeshBasicMaterial({ color: 0xfef08a })
    );
    flame.position.set(-d, axisY + objHeight, 0);
    group.add(flame);

    // Ảnh thật A'B' ngược chiều bên phải
    const imgBody = new THREE.Mesh(
      new THREE.CylinderGeometry(0.09, 0.09, imgHeight, 12),
      new THREE.MeshStandardMaterial({ color: 0x10b981 })
    );
    imgBody.position.set(dPrime, axisY - imgHeight / 2, 0);
    group.add(imgBody);

    const imgTip = new THREE.Mesh(
      new THREE.SphereGeometry(0.16, 12, 12),
      new THREE.MeshBasicMaterial({ color: 0x6ee7b7 })
    );
    imgTip.position.set(dPrime, axisY - imgHeight, 0);
    group.add(imgTip);

    // Đường truyền 2 tia sáng đặc biệt
    const rayMat = new THREE.LineBasicMaterial({ color: 0xfde047 });
    const topObj = new THREE.Vector3(-d, axisY + objHeight, 0);
    const botImg = new THREE.Vector3(dPrime, axisY - imgHeight, 0);

    // Tia 1: Song song trục chính -> qua tiêu điểm F' -> tới ảnh
    const ray1Points = [
      topObj,
      new THREE.Vector3(0, axisY + objHeight, 0),
      botImg,
    ];
    group.add(
      new THREE.Line(new THREE.BufferGeometry().setFromPoints(ray1Points), rayMat)
    );

    // Tia 2: Đi thẳng qua quang tâm O tới ảnh
    const ray2Points = [topObj, new THREE.Vector3(0, axisY, 0), botImg];
    group.add(
      new THREE.Line(new THREE.BufferGeometry().setFromPoints(ray2Points), rayMat)
    );
  }, [objectDistance]);

  return <div ref={mountRef} className="h-full w-full" />;
};