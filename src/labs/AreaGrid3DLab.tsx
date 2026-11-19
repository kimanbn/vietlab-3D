import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

interface Props {
  length: number;
  width: number;
}

export const AreaGrid3DLab: React.FC<Props> = ({ length, width }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const tilesGroupRef = useRef<THREE.Group | null>(null);

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
    camera.position.set(0, 11, 9);

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

    // Bảng lưới 10x10 ô vuông chuẩn 1cm2
    const grid = new THREE.GridHelper(10, 10, 0x94a3b8, 0xcbd5e1);
    scene.add(grid);

    const tilesGroup = new THREE.Group();
    scene.add(tilesGroup);
    tilesGroupRef.current = tilesGroup;

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

  // Xếp các ô vuông 1x1 cm2 và khung viền chu vi
  useEffect(() => {
    const group = tilesGroupRef.current;
    if (!group) return;

    while (group.children.length > 0) {
      group.remove(group.children[0]);
    }

    const tileGeo = new THREE.BoxGeometry(0.92, 0.16, 0.92);
    const tileMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      roughness: 0.4,
    });
    const borderTileMat = new THREE.MeshStandardMaterial({
      color: 0x0284c7,
      roughness: 0.4,
    });

    const offsetX = length / 2 - 0.5;
    const offsetZ = width / 2 - 0.5;

    for (let r = 0; r < width; r++) {
      for (let c = 0; c < length; c++) {
        const isEdge = r === 0 || r === width - 1 || c === 0 || c === length - 1;
        const tile = new THREE.Mesh(tileGeo, isEdge ? borderTileMat : tileMat);
        tile.position.set(c - offsetX, 0.08, r - offsetZ);
        group.add(tile);
      }
    }

    // Khung viền màu cam thể hiện Chu vi bao quanh
    const perimGeo = new THREE.EdgesGeometry(
      new THREE.BoxGeometry(length + 0.08, 0.24, width + 0.08)
    );
    const perimLine = new THREE.LineSegments(
      perimGeo,
      new THREE.LineBasicMaterial({ color: 0xf59e0b })
    );
    perimLine.position.y = 0.12;
    group.add(perimLine);
  }, [length, width]);

  return <div ref={mountRef} className="h-full w-full" />;
};