import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

interface Props {
  circuitMode: 'series' | 'parallel';
  isSwitchOn: boolean;
}

export const ElectricCircuitLab: React.FC<Props> = ({
  circuitMode,
  isSwitchOn,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const dynamicGroupRef = useRef<THREE.Group | null>(null);
  const electronsRef = useRef<{ mesh: THREE.Mesh; path: 'main' | 'branch' }[]>([]);
  const stateRef = useRef({ circuitMode, isSwitchOn });

  useEffect(() => {
    stateRef.current = { circuitMode, isSwitchOn };
  }, [circuitMode, isSwitchOn]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#0f172a');

    const camera = new THREE.PerspectiveCamera(
      42,
      container.clientWidth / container.clientHeight,
      0.1,
      200
    );
    camera.position.set(0, 11, 12);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    scene.add(new THREE.AmbientLight(0xffffff, 0.7));
    const dirLight = new THREE.DirectionalLight(0xffffff, 1.0);
    dirLight.position.set(8, 15, 8);
    scene.add(dirLight);

    // Bàn thí nghiệm kỹ thuật
    const board = new THREE.Mesh(
      new THREE.BoxGeometry(13, 0.4, 9),
      new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.6 })
    );
    board.position.y = -0.2;
    scene.add(board);

    // Nguồn Pin bên trái
    const batteryBody = new THREE.Mesh(
      new THREE.CylinderGeometry(0.65, 0.65, 2.4, 24),
      new THREE.MeshStandardMaterial({ color: 0x0284c7 })
    );
    batteryBody.rotation.x = Math.PI / 2;
    batteryBody.position.set(-4.5, 0.65, 0);
    scene.add(batteryBody);

    const batteryCap = new THREE.Mesh(
      new THREE.CylinderGeometry(0.28, 0.28, 0.3, 16),
      new THREE.MeshStandardMaterial({ color: 0xf59e0b })
    );
    batteryCap.rotation.x = Math.PI / 2;
    batteryCap.position.set(-4.5, 0.65, -1.35);
    scene.add(batteryCap);

    const dynamicGroup = new THREE.Group();
    scene.add(dynamicGroup);
    dynamicGroupRef.current = dynamicGroup;

    let animId: number;
    let phase = 0;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const { isSwitchOn: on, circuitMode: mode } = stateRef.current;

      if (on) {
        phase += mode === 'parallel' ? 0.035 : 0.02;
        electronsRef.current.forEach((item, idx) => {
          const t = (phase + idx * 0.14) % 1;
          if (item.path === 'main') {
            // Chạy vòng quanh khung chính (-4.5 -> 4.2)
            if (t < 0.25) {
              const p = t / 0.25;
              item.mesh.position.set(-4.5 + p * 8.7, 0.2, -3);
            } else if (t < 0.5) {
              const p = (t - 0.25) / 0.25;
              item.mesh.position.set(4.2, 0.2, -3 + p * 6);
            } else if (t < 0.75) {
              const p = (t - 0.5) / 0.25;
              item.mesh.position.set(4.2 - p * 8.7, 0.2, 3);
            } else {
              const p = (t - 0.75) / 0.25;
              item.mesh.position.set(-4.5, 0.2, 3 - p * 6);
            }
          } else {
            // Nhánh rẽ ở giữa x = 1.2 cho mạch song song
            item.mesh.position.set(1.2, 0.2, -3 + t * 6);
          }
        });
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

  // Dựng dây dẫn, công tắc và bóng đèn theo trạng thái
  useEffect(() => {
    const group = dynamicGroupRef.current;
    if (!group) return;

    while (group.children.length > 0) {
      group.remove(group.children[0]);
    }
    electronsRef.current = [];

    const wireMat = new THREE.MeshStandardMaterial({ color: 0x64748b });
    const addWire = (w: number, d: number, x: number, z: number) => {
      const m = new THREE.Mesh(new THREE.BoxGeometry(w, 0.12, d), wireMat);
      m.position.set(x, 0.1, z);
      group.add(m);
    };

    // Khung dây dẫn chính
    addWire(0.15, 6.1, -4.5, 0); // Trái (qua pin)
    addWire(8.8, 0.15, -0.1, 3); // Dưới
    addWire(0.15, 6.1, 4.2, 0); // Phải
    addWire(3.2, 0.15, -2.9, -3); // Trên trái (đến công tắc)
    addWire(4.2, 0.15, 2.1, -3); // Trên phải (từ công tắc sang phải)

    // Công tắc điện ở (-0.6, -3)
    const switchBlade = new THREE.Mesh(
      new THREE.BoxGeometry(1.3, 0.14, 0.18),
      new THREE.MeshStandardMaterial({
        color: isSwitchOn ? 0x22c55e : 0xf43f5e,
      })
    );
    switchBlade.position.set(-0.6, isSwitchOn ? 0.22 : 0.65, -3);
    switchBlade.rotation.z = isSwitchOn ? 0 : 0.55;
    group.add(switchBlade);

    // Hàm tạo bóng đèn
    const addBulb = (x: number, z: number) => {
      const base = new THREE.Mesh(
        new THREE.CylinderGeometry(0.45, 0.45, 0.4, 20),
        new THREE.MeshStandardMaterial({ color: 0x94a3b8 })
      );
      base.position.set(x, 0.25, z);
      group.add(base);

      const brightness = !isSwitchOn ? 0 : circuitMode === 'parallel' ? 1 : 0.45;
      const glass = new THREE.Mesh(
        new THREE.SphereGeometry(0.65, 24, 24),
        new THREE.MeshStandardMaterial({
          color: isSwitchOn ? 0xfef08a : 0xcbd5e1,
          emissive: isSwitchOn ? 0xfacc15 : 0x000000,
          emissiveIntensity: brightness * 1.4,
          transparent: true,
          opacity: 0.92,
        })
      );
      glass.position.set(x, 0.9, z);
      group.add(glass);

      if (isSwitchOn) {
        const glow = new THREE.PointLight(0xfde047, brightness * 2.2, 6);
        glow.position.set(x, 1.4, z);
        group.add(glow);
      }
    };

    if (circuitMode === 'series') {
      // 2 đèn mắc nối tiếp trên nhánh phải
      addBulb(4.2, -1.2);
      addBulb(4.2, 1.2);
    } else {
      // Mạch song song: thêm nhánh giữa x = 1.2
      addWire(0.15, 6.0, 1.2, 0);
      addBulb(1.2, 0);
      addBulb(4.2, 0);
    }

    // Hạt dòng điện chạy khi đóng công tắc
    if (isSwitchOn) {
      const eGeo = new THREE.SphereGeometry(0.14, 10, 10);
      const eMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
      for (let i = 0; i < 7; i++) {
        const m = new THREE.Mesh(eGeo, eMat);
        group.add(m);
        electronsRef.current.push({ mesh: m, path: 'main' });
      }
      if (circuitMode === 'parallel') {
        for (let i = 0; i < 3; i++) {
          const m = new THREE.Mesh(eGeo, eMat);
          group.add(m);
          electronsRef.current.push({ mesh: m, path: 'branch' });
        }
      }
    }
  }, [circuitMode, isSwitchOn]);

  return <div ref={mountRef} className="h-full w-full" />;
};