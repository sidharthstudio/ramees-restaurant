import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import type { ReactNode } from "react";
import * as THREE from "three";
import { useInView, useIsCompact, usePrefersReducedMotion } from "../lib/hooks";

/* ---------- procedural textures ---------- */

function makeRiceTexture() {
  const size = 512;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = "#e9d6ae";
  ctx.fillRect(0, 0, size, size);
  for (let i = 0; i < 3000; i++) {
    const x = Math.random() * size;
    const y = Math.random() * size;
    const angle = Math.random() * Math.PI;
    const len = 9 + Math.random() * 16;
    const light = 168 + Math.floor(Math.random() * 82);
    ctx.strokeStyle = `rgba(${light}, ${light - 34}, ${light - 96}, ${0.42 + Math.random() * 0.5})`;
    ctx.lineWidth = 1.6 + Math.random() * 1.4;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + Math.cos(angle) * len, y + Math.sin(angle) * len);
    ctx.stroke();
  }
  // shadowed pockets between grains
  for (let i = 0; i < 420; i++) {
    const x = Math.random() * size;
    const y = Math.random() * size;
    ctx.fillStyle = `rgba(120, 88, 48, ${0.06 + Math.random() * 0.16})`;
    ctx.beginPath();
    ctx.ellipse(x, y, 2 + Math.random() * 7, 1 + Math.random() * 3, Math.random() * Math.PI, 0, Math.PI * 2);
    ctx.fill();
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(1.7, 1.25);
  return tex;
}

function makeCircleTexture(softness = 0.6) {
  const size = 128;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const g = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
  g.addColorStop(0, "rgba(255,255,255,1)");
  g.addColorStop(softness, "rgba(255,255,255,0.65)");
  g.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function makeShadowTexture() {
  const size = 256;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const g = ctx.createRadialGradient(128, 128, 10, 128, 128, 126);
  g.addColorStop(0, "rgba(0,0,0,0.72)");
  g.addColorStop(0.55, "rgba(0,0,0,0.3)");
  g.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  const tex = new THREE.CanvasTexture(canvas);
  return tex;
}

/* ---------- environment for metal reflections ---------- */

function BrassEnvironment() {
  const { gl, scene } = useThree();
  useEffect(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 256;
    const ctx = canvas.getContext("2d")!;
    const base = ctx.createLinearGradient(0, 0, 0, 256);
    base.addColorStop(0, "#5a3c1c");
    base.addColorStop(0.42, "#241608");
    base.addColorStop(0.5, "#3a2410");
    base.addColorStop(0.62, "#160d05");
    base.addColorStop(1, "#070504");
    ctx.fillStyle = base;
    ctx.fillRect(0, 0, 512, 256);

    const key = ctx.createRadialGradient(150, 60, 4, 150, 60, 150);
    key.addColorStop(0, "rgba(255,236,196,1)");
    key.addColorStop(1, "rgba(255,236,196,0)");
    ctx.fillStyle = key;
    ctx.fillRect(0, 0, 512, 256);

    const rim = ctx.createRadialGradient(400, 90, 4, 400, 90, 130);
    rim.addColorStop(0, "rgba(255,146,64,0.95)");
    rim.addColorStop(1, "rgba(255,146,64,0)");
    ctx.fillStyle = rim;
    ctx.fillRect(0, 0, 512, 256);

    const tex = new THREE.CanvasTexture(canvas);
    tex.mapping = THREE.EquirectangularReflectionMapping;
    const pmrem = new THREE.PMREMGenerator(gl);
    const env = pmrem.fromEquirectangular(tex).texture;
    scene.environment = env;
    scene.environmentIntensity = 0.85;
    tex.dispose();
    pmrem.dispose();
    return () => {
      scene.environment = null;
      env.dispose();
    };
  }, [gl, scene]);
  return null;
}

/* ---------- the thali ---------- */

function Plate() {
  const brass = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#b4802c",
        metalness: 0.92,
        roughness: 0.38,
      }),
    [],
  );
  const darkBrass = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#6d4a1e", metalness: 0.88, roughness: 0.5 }),
    [],
  );

  return (
    <group position={[0, 0, 0]}>
      <mesh material={brass} castShadow receiveShadow>
        <cylinderGeometry args={[2.25, 2.05, 0.12, 96]} />
      </mesh>
      <mesh material={brass} position={[0, 0.02, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.22, 0.075, 20, 120]} />
      </mesh>
      <mesh material={darkBrass} rotation={[Math.PI / 2, 0, 0]} position={[0, 0.062, 0]}>
        <torusGeometry args={[1.62, 0.012, 10, 120]} />
      </mesh>
      <mesh material={darkBrass} rotation={[Math.PI / 2, 0, 0]} position={[0, 0.062, 0]}>
        <torusGeometry args={[1.05, 0.01, 10, 96]} />
      </mesh>
    </group>
  );
}

function RiceDome({ texture }: { texture: THREE.Texture }) {
  const geometry = useMemo(() => {
    const g = new THREE.SphereGeometry(1.22, 80, 48, 0, Math.PI * 2, 0, Math.PI / 2.06);
    const pos = g.attributes.position as THREE.BufferAttribute;
    const v = new THREE.Vector3();
    for (let i = 0; i < pos.count; i++) {
      v.fromBufferAttribute(pos, i);
      const n =
        Math.sin(v.x * 5.2 + v.y * 3.1) * Math.cos(v.z * 4.7 - v.x * 2.3) * 0.07 +
        Math.sin(v.z * 11.2 + v.y * 6.4) * 0.026;
      v.multiplyScalar(1 + n);
      v.y *= 0.52;
      pos.setXYZ(i, v.x, v.y, v.z);
    }
    g.computeVertexNormals();
    return g;
  }, []);

  return (
    <mesh geometry={geometry} position={[0, 0.07, 0]} castShadow receiveShadow>
      <meshStandardMaterial
        map={texture}
        bumpMap={texture}
        bumpScale={0.085}
        color="#dcc093"
        roughness={0.97}
        metalness={0.01}
      />
    </mesh>
  );
}

function CurryBowl({ position, hue }: { position: [number, number, number]; hue: string }) {
  return (
    <group position={position}>
      <mesh castShadow>
        <cylinderGeometry args={[0.42, 0.3, 0.24, 48, 1, true]} />
        <meshStandardMaterial color="#8a6528" metalness={0.86} roughness={0.46} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0, 0.09, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.39, 48]} />
        <meshStandardMaterial color={hue} roughness={0.36} metalness={0.08} />
      </mesh>
      <mesh position={[0, 0.09, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.28, 0.31, 40]} />
        <meshStandardMaterial color="#c07a2e" roughness={0.6} metalness={0.35} />
      </mesh>
    </group>
  );
}

function Kebab({ position, rotation }: { position: [number, number, number]; rotation: number }) {
  const piece = useMemo(() => new THREE.IcosahedronGeometry(1, 1), []);
  const offsets = [-0.36, -0.11, 0.15, 0.4];
  return (
    <group position={position} rotation={[0, rotation, 0]}>
      {offsets.map((x, i) => (
        <mesh
          key={i}
          geometry={piece}
          position={[x, 0, (i % 2) * 0.025]}
          scale={[0.18, 0.135, 0.155]}
          rotation={[i * 0.8, i * 1.3, i * 0.6]}
          castShadow
        >
          <meshStandardMaterial color={i % 2 ? "#5c2c17" : "#6d3820"} roughness={0.88} metalness={0.04} />
        </mesh>
      ))}
      <mesh rotation={[0, 0, Math.PI / 2]} position={[0, 0.01, 0]}>
        <cylinderGeometry args={[0.009, 0.009, 1.15, 8]} />
        <meshStandardMaterial color="#b9b2a4" metalness={0.9} roughness={0.35} />
      </mesh>
    </group>
  );
}

type Vec3 = [number, number, number];

/** Point sitting on the rice dome, so garnishes rest on the surface. */
const onDome = (radius: number, angle: number): Vec3 => {
  const ratio = Math.min(1, radius / 1.22);
  return [
    Math.cos(angle) * radius,
    0.08 + 0.64 * Math.sqrt(Math.max(0, 1 - ratio * ratio)),
    Math.sin(angle) * radius,
  ];
};

function Garnish() {
  const mint = useMemo(() => new THREE.IcosahedronGeometry(0.07, 0), []);
  const onion = useMemo(() => new THREE.TorusGeometry(0.048, 0.016, 6, 14), []);
  const threads = useMemo(
    () =>
      Array.from({ length: 16 }, (_, i) => ({
        pos: onDome(0.18 + Math.random() * 0.85, i * 2.4 + Math.random()),
        rot: [Math.random() * 3, Math.random() * 3, Math.random() * 3] as Vec3,
        len: 0.9 + Math.random() * 0.8,
      })),
    [],
  );

  return (
    <group>
      {[
        onDome(0.92, 0.65),
        onDome(1.02, 0.95),
        onDome(0.78, 1.2),
      ].map((p, i) => (
        <mesh key={i} geometry={mint} position={p} scale={[1, 0.7, 1]} castShadow>
          <meshStandardMaterial color="#4a6f32" roughness={0.8} />
        </mesh>
      ))}

      {/* fried shallots and cashews scattered over the rice */}
      {Array.from({ length: 16 }, (_, i) => (
        <mesh
          key={`onion${i}`}
          geometry={onion}
          position={onDome(0.15 + Math.random() * 0.95, i * 1.9)}
          rotation={[Math.random() * 3, Math.random() * 3, Math.random() * 3]}
          scale={[1, 1, 0.6]}
        >
          <meshStandardMaterial color={i % 3 === 0 ? "#c78a3d" : "#8a4a1c"} roughness={0.65} />
        </mesh>
      ))}
      {[0.6, 1.9, 3.4, 4.9].map((angle, i) => (
        <mesh key={`cashew${i}`} position={onDome(0.35 + i * 0.16, angle)} rotation={[i, angle, 0]}>
          <sphereGeometry args={[0.05, 14, 10]} />
          <meshStandardMaterial color="#e9d3a3" roughness={0.55} />
        </mesh>
      ))}

      {/* saffron threads */}
      {threads.map((t, i) => (
        <mesh key={`thread${i}`} position={t.pos} rotation={t.rot} scale={[t.len, 1, 1]}>
          <cylinderGeometry args={[0.006, 0.006, 0.09, 5]} />
          <meshStandardMaterial color="#d1551d" roughness={0.7} />
        </mesh>
      ))}

      {/* lemon wedges */}
      <mesh position={[0.9, 0.17, 0.78]} rotation={[0, 0.5, 0.18]} scale={[1, 0.72, 1]} castShadow>
        <sphereGeometry args={[0.19, 24, 16]} />
        <meshStandardMaterial color="#cfc24f" roughness={0.62} />
      </mesh>
      <mesh position={[0.66, 0.14, 1.0]} rotation={[0, 0.1, -0.35]} scale={[1, 0.66, 1]} castShadow>
        <sphereGeometry args={[0.14, 20, 14]} />
        <meshStandardMaterial color="#b8b93e" roughness={0.66} />
      </mesh>

      {/* porotta folded at the edge of the platter */}
      <mesh position={[1.78, 0.12, 0.05]} rotation={[-Math.PI / 2, 0, 0.5]} castShadow>
        <circleGeometry args={[0.62, 40]} />
        <meshStandardMaterial color="#d3a463" roughness={0.88} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[1.72, 0.17, 0.02]} rotation={[-Math.PI / 2, 0, 0.9]} castShadow>
        <circleGeometry args={[0.44, 32]} />
        <meshStandardMaterial color="#c79a55" roughness={0.9} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

function Steam() {
  const textures = useMemo(() => [makeCircleTexture(0.35), makeCircleTexture(0.5)], []);
  const refs = useRef<THREE.Mesh[]>([]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    refs.current.forEach((mesh, i) => {
      if (!mesh) return;
      const phase = t * 0.32 + i * 1.7;
      const progress = (phase % 2.2) / 2.2;
      mesh.position.y = 0.62 + progress * 0.95;
      const material = mesh.material as THREE.MeshBasicMaterial;
      material.opacity = 0.085 * Math.sin(progress * Math.PI);
      mesh.scale.setScalar(0.42 + progress * 0.5);
      mesh.rotation.z = Math.sin(phase) * 0.2;
    });
  });

  return (
    <group>
      {[0, 1, 2, 3].map((i) => (
        <mesh
          key={i}
          ref={(el) => {
            if (el) refs.current[i] = el;
          }}
          position={[-0.22 + i * 0.14, 0.62 + i * 0.2, 0.1 + (i % 2) * 0.1]}
        >
          <planeGeometry args={[0.55, 0.9]} />
          <meshBasicMaterial
            map={textures[i % 2]}
            transparent
            opacity={0.18}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
            color="#ffe2b8"
          />
        </mesh>
      ))}
    </group>
  );
}

function SpiceDust({ count }: { count: number }) {
  const points = useRef<THREE.Points>(null);
  const texture = useMemo(() => makeCircleTexture(0.4), []);

  const { geometry, speeds } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const speed = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const radius = 1.6 + Math.random() * 2.9;
      const angle = Math.random() * Math.PI * 2;
      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = Math.random() * 4 - 0.6;
      positions[i * 3 + 2] = Math.sin(angle) * radius * 0.7;
      speed[i] = 0.08 + Math.random() * 0.22;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return { geometry: g, speeds: speed };
  }, [count]);

  useFrame((_, delta) => {
    const attr = geometry.getAttribute("position") as THREE.BufferAttribute;
    const arr = attr.array as Float32Array;
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 1] += speeds[i] * delta;
      arr[i * 3] += Math.sin(arr[i * 3 + 1] * 0.7 + i) * 0.0016;
      if (arr[i * 3 + 1] > 3.6) arr[i * 3 + 1] = -0.6;
    }
    attr.needsUpdate = true;
    if (points.current) points.current.rotation.y += delta * 0.02;
  });

  return (
    <points ref={points} geometry={geometry}>
      <pointsMaterial
        map={texture}
        size={0.055}
        sizeAttenuation
        transparent
        opacity={0.7}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        color="#f0b968"
      />
    </points>
  );
}

function Table({ shadow }: { shadow: THREE.Texture }) {
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.28, 0]}>
        <circleGeometry args={[9, 64]} />
        <meshStandardMaterial color="#170f08" roughness={0.72} metalness={0.18} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.27, 0]}>
        <planeGeometry args={[7.4, 7.4]} />
        <meshBasicMaterial map={shadow} transparent depthWrite={false} opacity={0.95} />
      </mesh>
    </group>
  );
}

function Choreography({ children }: { children: ReactNode }) {
  const group = useRef<THREE.Group>(null);
  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    const ease = Math.min(1, delta * 3);
    const t = state.clock.elapsedTime;
    const scroll = Math.min(1, window.scrollY / Math.max(1, window.innerHeight));
    // A slow sway instead of a full turntable keeps the composition deliberate.
    const targetY = -0.32 + Math.sin(t * 0.16) * 0.22 + state.pointer.x * 0.18;
    g.rotation.y += (targetY - g.rotation.y) * ease;
    g.rotation.x += (-0.06 + state.pointer.y * 0.05 - g.rotation.x) * ease;
    g.position.y += (-0.06 - scroll * 0.35 - g.position.y) * ease;
    g.rotation.z += (state.pointer.x * 0.02 - g.rotation.z) * ease;
  });
  return <group ref={group}>{children}</group>;
}

function CameraRig() {
  const { camera } = useThree();
  useFrame((state, delta) => {
    const ease = Math.min(1, delta * 2.2);
    const scroll = Math.min(1, window.scrollY / Math.max(1, window.innerHeight));
    camera.position.x += (state.pointer.x * 0.5 - camera.position.x) * ease;
    camera.position.y += (3.3 - state.pointer.y * 0.3 - scroll * 0.45 - camera.position.y) * ease;
    camera.position.z += (9.4 - scroll * 1.2 - camera.position.z) * ease;
    camera.lookAt(0, 0.15 - scroll * 0.3, 0);
  });
  return null;
}

/* ---------- scene ---------- */

function Scene({ compact }: { compact: boolean }) {
  const rice = useMemo(() => makeRiceTexture(), []);
  const shadow = useMemo(() => makeShadowTexture(), []);

  return (
    <>
      <BrassEnvironment />
      <CameraRig />
      <ambientLight intensity={0.26} color="#8a755a" />
      <spotLight
        position={[4.6, 6.4, 3.6]}
        angle={0.55}
        penumbra={0.9}
        intensity={150}
        distance={32}
        color="#ffd9a4"
      />
      <spotLight
        position={[-5, 3.4, -2.4]}
        angle={0.7}
        penumbra={1}
        intensity={70}
        distance={24}
        color="#ff7a34"
      />
      <pointLight position={[0.4, 3.6, 3.6]} intensity={12} distance={16} color="#ffcf9b" />

      <Table shadow={shadow} />

      <Choreography>
        <Plate />
        <RiceDome texture={rice} />
        <CurryBowl position={[-1.42, 0.2, -0.58]} hue="#8f2a0f" />
        <CurryBowl position={[-1.52, 0.2, 0.14]} hue="#5f360f" />
        <Kebab position={[0.78, 0.23, 1.12]} rotation={0.3} />
        <Kebab position={[1.36, 0.23, 0.68]} rotation={0.62} />
        <Kebab position={[0.14, 0.23, 1.34]} rotation={0.12} />
        <Garnish />
        <Steam />
      </Choreography>

      <SpiceDust count={compact ? 90 : 240} />
    </>
  );
}

export default function PlateScene({ className }: { className?: string }) {
  const reduced = usePrefersReducedMotion();
  const compact = useIsCompact();
  const { ref, inView } = useInView<HTMLDivElement>("240px");

  return (
    <div ref={ref} className={className} aria-hidden="true">
      <Canvas
        dpr={compact ? [1, 1.4] : [1, 1.75]}
        frameloop={reduced ? "demand" : inView ? "always" : "never"}
        camera={{ position: [0, 3.3, 9.4], fov: 30, near: 0.1, far: 60 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <Scene compact={compact} />
      </Canvas>
    </div>
  );
}
