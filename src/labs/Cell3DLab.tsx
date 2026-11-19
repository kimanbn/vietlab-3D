import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

interface Props {
  cellType: 'plant' | 'animal';
  showMembrane: boolean;
  isPaused: boolean;
}

export const Cell3DLab: React.FC<Props> = ({
  cellType,
  showMembrane,
  isPaused,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const cellGroupRef = useRef<THREE.Group | null>(null);
  const pauseRef = useRef(isPaused);

  useEffect(() => {
    pauseRef.current = isPaused;
  }, [isPaused]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#0b1120');

    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      200
    );
    camera.position.set(0, 6, 13);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    scene.add(new THREE.AmbientLight(0xffffff, 0.75));
    const light = new THREE.DirectionalLight(0xffffff, 1.2);
    light.position.set(8, 12, 10);
    scene.add(light);

    const cellGroup = new THREE.Group();
    scene.add(cellGroup);
    cellGroupRef.current = cellGroup;

    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (!pauseRef.current && cellGroupRef.current) {
        cellGroupRef.current.rotation.y += 0.006;
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

  // Dựng lại cấu trúc tế bào khi đổi Thực vật / Động vật hoặc ẩn/hiện màng
  useEffect(() => {
    const group = cellGroupRef.current;
    if (!group) return;

    while (group.children.length > 0) {
      group.remove(group.children[0]);
    }

    if (cellType === 'plant') {
      // Vách tế bào lục giác cứng cáp (Tế bào thực vật)
      if (showMembrane) {
        const wall = new THREE.Mesh(
          new THREE.CylinderGeometry(4.2, 4.2, 3.2, 6),
          new THREE.MeshStandardMaterial({
            color: 0x10b981,
            transparent: true,
            opacity: 0.25,
            roughness: 0.4,
          })
        );
        group.add(wall);
      }

      // Nhân tế bào (màu tím)
      const nucleus = new THREE.Mesh(
        new THREE.SphereGeometry(0.95, 24, 24),
        new THREE.MeshStandardMaterial({ color: 0x8b5cf6 })
      );
      nucleus.position.set(-1.6, 0.2, 0.8);
      group.add(nucleus);

      // Không bào trung tâm lớn (xanh dương nhạt)
      const vacuole = new THREE.Mesh(
        new THREE.SphereGeometry(1.55, 24, 24),
        new THREE.MeshStandardMaterial({
          color: 0x38bdf8,
          transparent: true,
          opacity: 0.75,
        })
      );
      vacuole.scale.set(1.2, 0.8, 1);
      vacuole.position.set(1.1, 0, -0.3);
      group.add(vacuole);

      // Các lục lạp xanh (quang hợp)
      const chloroMat = new THREE.MeshStandardMaterial({ color: 0x22c55e });
      [
        [-2.1, -0.6, -1.2],
        [2.3, 0.7, 1.1],
        [-0.3, 0.8, 2.1],
        [0.4, -0.7, -2.1],
      ].forEach(([x, y, z]) => {
        const chloro = new THREE.Mesh(
          new THREE.CapsuleGeometry(0.32, 0.5, 8, 12),
          chloroMat
        );
        chloro.rotation.z = Math.PI / 3;
        chloro.position.set(x, y, z);
        group.add(chloro);
      });
    } else {
      // Tế bào động vật (Hình cầu mềm mại, không có vách & lục lạp)
      if (showMembrane) {
        const membrane = new THREE.Mesh(
          new THREE.SphereGeometry(3.8, 32, 32),
          new THREE.MeshStandardMaterial({
            color: 0xf43f5e,
            transparent: true,
            opacity: 0.22,
          })
        );
        group.add(membrane);
      }

      // Nhân nằm giữa tế bào
      const nucleus = new THREE.Mesh(
        new THREE.SphereGeometry(1.15, 28, 28),
        new THREE.MeshStandardMaterial({ color: 0x7c3aed })
      );
      group.add(nucleus);

      // Các ti thể màu cam (nhà máy năng lượng)
      const mitoMat = new THREE.MeshStandardMaterial({ color: 0xf97316 });
      [
        [2.0, 0.6, 0.8],
        [-2.1, -0.5, 0.9],
        [0.5, 1.5, -1.8],
        [-1.1, -1.4, -1.5],
      ].forEach(([x, y, z]) => {
        const mito = new THREE.Mesh(
          new THREE.CapsuleGeometry(0.28, 0.55, 8, 12),
          mitoMat
        );
        mito.rotation.x = Math.PI / 4;
        mito.position.set(x, y, z);
        group.add(mito);
      });
    }
  }, [cellType, showMembrane]);

  return <div ref={mountRef} className="h-full w-full" />;
};