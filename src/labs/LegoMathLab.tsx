import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

interface Props {
  rows: number;
  cols: number;
}

const ROW_COLORS = [0xf43f5e, 0x3b82f6, 0x10b981, 0xf59e0b, 0x8b5cf6];

export const LegoMathLab: React.FC<Props> = ({ rows, cols }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const bricksGroupRef = useRef<THREE.Group | null>(null);

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
    camera.position.set(8, 9, 10);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    scene.add(new THREE.AmbientLight(0xffffff, 0.85));
    const dirLight = new THREE.DirectionalLight(0xffffff, 1.0);
    dirLight.position.set(8, 15, 10);
    scene.add(dirLight);

    // Tấm đế Lego màu xanh nhạt
    const basePlate = new THREE.Mesh(
      new THREE.BoxGeometry(11, 0.35, 11),
      new THREE.MeshStandardMaterial({ color: 0xe2e8f0, roughness: 0.6 })
    );
    basePlate.position.y = -0.2;
    scene.add(basePlate);

    const bricksGroup = new THREE.Group();
    scene.add(bricksGroup);
    bricksGroupRef.current = bricksGroup;

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

  // Cập nhật các viên gạch Lego mỗi khi đổi phép tính
  useEffect(() => {
    const group = bricksGroupRef.current;
    if (!group) return;

    while (group.children.length > 0) {
      group.remove(group.children[0]);
    }

    const spacing = 1.65;
    const offsetX = ((cols - 1) * spacing) / 2;
    const offsetZ = ((rows - 1) * spacing) / 2;

    const brickGeo = new THREE.BoxGeometry(1.2, 0.7, 1.2);
    const studGeo = new THREE.CylinderGeometry(0.18, 0.18, 0.18, 12);

    for (let r = 0; r < rows; r++) {
      const mat = new THREE.MeshStandardMaterial({
        color: ROW_COLORS[r % ROW_COLORS.length],
        roughness: 0.35,
      });

      for (let c = 0; c < cols; c++) {
        const brick = new THREE.Mesh(brickGeo, mat);
        brick.position.set(c * spacing - offsetX, 0.35, r * spacing - offsetZ);

        // 4 nút tròn trên mặt viên Lego
        [
          [-0.3, -0.3],
          [0.3, -0.3],
          [-0.3, 0.3],
          [0.3, 0.3],
        ].forEach(([sx, sz]) => {
          const stud = new THREE.Mesh(studGeo, mat);
          stud.position.set(sx, 0.42, sz);
          brick.add(stud);
        });

        group.add(brick);
      }
    }
  }, [rows, cols]);

  return <div ref={mountRef} className="h-full w-full" />;
};