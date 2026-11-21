import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

interface Props {
  lightDistance: number; // 2.5 (close) -> 8.0 (far)
  materialType: 'opaque' | 'translucent' | 'transparent';
}

export const LightShadowLab: React.FC<Props> = ({
  lightDistance,
  materialType,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const torchRef = useRef<THREE.Group | null>(null);
  const objMatRef = useRef<THREE.MeshStandardMaterial | null>(null);
  const shadowMeshRef = useRef<THREE.Mesh | null>(null);
  const beamRef = useRef<THREE.Mesh | null>(null);

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#0f172a');

    const cam = new THREE.PerspectiveCamera(
      42,
      el.clientWidth / el.clientHeight,
      0.1,
      200
    );
    cam.position.set(1, 5.5, 13);

    const ren = new THREE.WebGLRenderer({ antialias: true });
    ren.setSize(el.clientWidth, el.clientHeight);
    el.appendChild(ren.domElement);

    const ctrl = new OrbitControls(cam, ren.domElement);
    ctrl.enableDamping = true;

    scene.add(new THREE.AmbientLight(0xffffff, 0.7));
    const dl = new THREE.DirectionalLight(0xffffff, 0.9);
    dl.position.set(4, 10, 8);
    scene.add(dl);

    // Optical table
    const table = new THREE.Mesh(
      new THREE.BoxGeometry(16, 0.4, 6),
      new THREE.MeshStandardMaterial({ color: 0x1e293b })
    );
    table.position.y = -0.2;
    scene.add(table);

    // White projection screen at x = 4.5
    const screen = new THREE.Mesh(
      new THREE.BoxGeometry(0.25, 5.5, 5.5),
      new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.9 })
    );
    screen.position.set(4.5, 2.75, 0);
    scene.add(screen);

    // Shadow projected on the screen
    const shadowMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(1.6, 1.6),
      new THREE.MeshBasicMaterial({
        color: 0x020617,
        transparent: true,
        opacity: 0.85,
      })
    );
    shadowMesh.rotation.y = -Math.PI / 2;
    shadowMesh.position.set(4.36, 1.8, 0);
    scene.add(shadowMesh);
    shadowMeshRef.current = shadowMesh;

    // Target object at x = 0
    const objMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      roughness: 0.3,
      transparent: false,
      opacity: 1,
    });
    const targetObj = new THREE.Mesh(
      new THREE.BoxGeometry(1.6, 1.6, 1.6),
      objMat
    );
    targetObj.position.set(0, 1.8, 0);
    scene.add(targetObj);
    objMatRef.current = objMat;

    // Stand for the object
    const stand = new THREE.Mesh(
      new THREE.CylinderGeometry(0.15, 0.25, 1.0, 16),
      new THREE.MeshStandardMaterial({ color: 0x64748b })
    );
    stand.position.set(0, 0.5, 0);
    scene.add(stand);

    // Flashlight group
    const torch = new THREE.Group();
    const body = new THREE.Mesh(
      new THREE.CylinderGeometry(0.32, 0.28, 1.6, 20),
      new THREE.MeshStandardMaterial({ color: 0x0284c7 })
    );
    body.rotation.z = Math.PI / 2;
    torch.add(body);

    const bulb = new THREE.Mesh(
      new THREE.CylinderGeometry(0.42, 0.32, 0.3, 20),
      new THREE.MeshBasicMaterial({ color: 0xfef08a })
    );
    bulb.rotation.z = Math.PI / 2;
    bulb.position.x = 0.85;
    torch.add(bulb);

    // Light cone beam
    const beam = new THREE.Mesh(
      new THREE.ConeGeometry(2.2, 1, 24, 1, true),
      new THREE.MeshBasicMaterial({
        color: 0xfde047,
        transparent: true,
        opacity: 0.12,
        side: THREE.DoubleSide,
      })
    );
    beam.rotation.z = Math.PI / 2;
    torch.add(beam);
    beamRef.current = beam;

    torch.position.set(-5, 1.8, 0);
    scene.add(torch);
    torchRef.current = torch;

    let id: number;
    const loop = () => {
      id = requestAnimationFrame(loop);
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

  // Update flashlight position, material transparency, and shadow size/opacity
  useEffect(() => {
    if (torchRef.current) {
      torchRef.current.position.x = -lightDistance;
    }
    if (beamRef.current) {
      const beamLen = lightDistance + 4.0;
      beamRef.current.scale.set(1, beamLen, 1);
      beamRef.current.position.x = 0.9 + beamLen / 2;
    }
    if (objMatRef.current) {
      if (materialType === 'opaque') {
        objMatRef.current.color.setHex(0xf59e0b);
        objMatRef.current.transparent = false;
        objMatRef.current.opacity = 1;
      } else if (materialType === 'translucent') {
        objMatRef.current.color.setHex(0x93c5fd);
        objMatRef.current.transparent = true;
        objMatRef.current.opacity = 0.5;
      } else {
        objMatRef.current.color.setHex(0xe0f2fe);
        objMatRef.current.transparent = true;
        objMatRef.current.opacity = 0.18;
      }
      objMatRef.current.needsUpdate = true;
    }
    if (shadowMeshRef.current) {
      // Similar triangles: shadow grows larger as light moves closer
      const scale = Math.min(3.1, (lightDistance + 4.36) / lightDistance);
      shadowMeshRef.current.scale.set(scale, scale, 1);
      const mat = shadowMeshRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity =
        materialType === 'opaque'
          ? 0.88
          : materialType === 'translucent'
          ? 0.35
          : 0.0;
    }
  }, [lightDistance, materialType]);

  return <div ref={mountRef} className="h-full w-full" />;
};