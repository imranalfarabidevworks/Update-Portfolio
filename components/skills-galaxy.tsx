'use client';

import * as React from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Zap, Briefcase, TrendingUp } from 'lucide-react';

type Skill = {
  name: string;
  category: 'Frontend' | 'Backend' | 'AI/ML' | 'DevOps' | 'Mobile';
  level: number;
  years: number;
  projects: number;
  color: string;
};

const SKILLS: Skill[] = [
  { name: 'TypeScript', category: 'Frontend', level: 95, years: 5, projects: 40, color: '#3178c6' },
  { name: 'React', category: 'Frontend', level: 96, years: 5, projects: 38, color: '#61dafb' },
  { name: 'Next.js', category: 'Frontend', level: 94, years: 4, projects: 25, color: '#ffffff' },
  { name: 'Three.js', category: 'Frontend', level: 85, years: 3, projects: 8, color: '#22d3ee' },
  { name: 'Tailwind', category: 'Frontend', level: 95, years: 4, projects: 35, color: '#06b6d4' },
  { name: 'Node.js', category: 'Backend', level: 93, years: 5, projects: 30, color: '#3c873a' },
  { name: 'Python', category: 'AI/ML', level: 92, years: 5, projects: 28, color: '#ffd43b' },
  { name: 'FastAPI', category: 'Backend', level: 90, years: 3, projects: 12, color: '#009688' },
  { name: 'PyTorch', category: 'AI/ML', level: 88, years: 3, projects: 10, color: '#ee4c2c' },
  { name: 'PostgreSQL', category: 'Backend', level: 91, years: 4, projects: 22, color: '#336791' },
  { name: 'Redis', category: 'Backend', level: 87, years: 3, projects: 15, color: '#dc382d' },
  { name: 'Docker', category: 'DevOps', level: 88, years: 4, projects: 25, color: '#2496ed' },
  { name: 'AWS', category: 'DevOps', level: 85, years: 3, projects: 18, color: '#ff9900' },
  { name: 'GraphQL', category: 'Backend', level: 86, years: 3, projects: 9, color: '#e10098' },
  { name: 'React Native', category: 'Mobile', level: 84, years: 3, projects: 7, color: '#61dafb' },
  { name: 'Prisma', category: 'Backend', level: 89, years: 3, projects: 14, color: '#2d3748' },
];

const CATEGORY_COLORS: Record<Skill['category'], string> = {
  Frontend: '#22d3ee',
  Backend: '#3c873a',
  'AI/ML': '#ee4c2c',
  DevOps: '#2496ed',
  Mobile: '#a855f7',
};

function SkillNode({
  skill,
  index,
  total,
  onHover,
  onSelect,
  hovered,
}: {
  skill: Skill;
  index: number;
  total: number;
  onHover: (s: Skill | null) => void;
  onSelect: (s: Skill) => void;
  hovered: string | null;
}) {
  const ref = React.useRef<THREE.Group>(null);
  const phi = Math.acos(-1 + (2 * index) / total);
  const theta = Math.sqrt(total * Math.PI) * phi;
  const radius = 3.2;

  const position: [number, number, number] = [
    radius * Math.cos(theta) * Math.sin(phi),
    radius * Math.cos(phi),
    radius * Math.sin(theta) * Math.sin(phi),
  ];

  const isActive = hovered === skill.name;

  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.position.x = position[0];
    ref.current.position.y = position[1];
    ref.current.position.z = position[2];
    ref.current.lookAt(0, 0, 0);
  });

  const color = isActive ? skill.color : CATEGORY_COLORS[skill.category];
  const size = 0.1 + (skill.level / 100) * 0.08;

  return (
    <group ref={ref}>
      <mesh
        onClick={(e) => {
          e.stopPropagation();
          onSelect(skill);
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          onHover(skill);
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          onHover(null);
          document.body.style.cursor = 'default';
        }}
      >
        <sphereGeometry args={[size, 16, 16]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={isActive ? 1.5 : 0.6}
          roughness={0.3}
          metalness={0.7}
        />
      </mesh>
      <Html
        center
        distanceFactor={8}
        position={[0, size + 0.18, 0]}
        style={{ pointerEvents: 'none' }}
      >
        <div
          className="select-none whitespace-nowrap rounded px-2 py-0.5 text-center"
          style={{
            fontSize: '11px',
            fontWeight: 500,
            color: isActive ? skill.color : 'rgba(255,255,255,0.6)',
            background: isActive ? 'rgba(0,0,0,0.6)' : 'transparent',
            backdropFilter: isActive ? 'blur(4px)' : 'none',
          }}
        >
          {skill.name}
        </div>
      </Html>
    </group>
  );
}

function Cluster({ onHover, onSelect, hovered }: {
  onHover: (s: Skill | null) => void;
  onSelect: (s: Skill) => void;
  hovered: string | null;
}) {
  const groupRef = React.useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.15;
      groupRef.current.rotation.x += delta * 0.03;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial
          color="#06b6d4"
          emissive="#0891b2"
          emissiveIntensity={1.2}
          roughness={0.2}
          metalness={0.9}
        />
      </mesh>
      <mesh scale={1.5}>
        <sphereGeometry args={[0.5, 16, 16]} />
        <meshBasicMaterial color="#22d3ee" wireframe transparent opacity={0.15} />
      </mesh>
      {SKILLS.map((skill, i) => (
        <SkillNode
          key={skill.name}
          skill={skill}
          index={i}
          total={SKILLS.length}
          onHover={onHover}
          onSelect={onSelect}
          hovered={hovered}
        />
      ))}
    </group>
  );
}

function SkillDetail({ skill, onClose }: { skill: Skill; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 40 }}
      className="glass-strong absolute right-4 top-4 z-20 w-72 rounded-2xl p-6"
    >
      <button
        onClick={onClose}
        className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
        aria-label="Close"
      >
        <X className="h-4 w-4" />
      </button>

      <div className="flex items-center gap-2">
        <div
          className="h-3 w-3 rounded-full"
          style={{ background: skill.color, boxShadow: `0 0 12px ${skill.color}` }}
        />
        <span className="font-mono text-xs text-muted-foreground">
          {skill.category}
        </span>
      </div>

      <h3 className="mt-3 font-display text-2xl font-bold">{skill.name}</h3>

      <div className="mt-5 space-y-4">
        <div>
          <div className="flex items-center justify-between text-xs">
            <span className="flex items-center gap-1 text-muted-foreground">
              <TrendingUp className="h-3 w-3" /> Expertise
            </span>
            <span className="font-mono font-semibold">{skill.level}%</span>
          </div>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-border">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${skill.level}%` }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="h-full rounded-full"
              style={{ background: `linear-gradient(90deg, ${skill.color}, ${skill.color}aa)` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-xl border border-border/60 bg-background/40 p-3">
            <div className="font-display text-xl font-bold" style={{ color: skill.color }}>
              {skill.years}yr
            </div>
            <div className="mt-0.5 text-[10px] uppercase tracking-wider text-muted-foreground">
              Experience
            </div>
          </div>
          <div className="rounded-xl border border-border/60 bg-background/40 p-3">
            <div className="font-display text-xl font-bold" style={{ color: skill.color }}>
              {skill.projects}
            </div>
            <div className="mt-0.5 text-[10px] uppercase tracking-wider text-muted-foreground">
              Projects
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Zap className="h-3 w-3" style={{ color: skill.color }} />
          <span>
            {skill.level >= 90
              ? 'Expert — production-grade mastery'
              : skill.level >= 80
                ? 'Advanced — confident in production'
                : 'Proficient — solid working knowledge'}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

const FILTERS: ('All' | Skill['category'])[] = [
  'All', 'Frontend', 'Backend', 'AI/ML', 'DevOps', 'Mobile',
];

export function SkillsGalaxy() {
  const [hovered, setHovered] = React.useState<Skill | null>(null);
  const [selected, setSelected] = React.useState<Skill | null>(null);
  const [filter, setFilter] = React.useState<'All' | Skill['category']>('All');

  return (
    <section id="skills" className="relative h-screen overflow-hidden py-32">
      <div className="absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8 text-center"
        >
          <p className="font-mono text-xs uppercase tracking-widest text-primary">
            Skills Universe
          </p>
          <h2 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Technologies in <span className="text-gradient">Orbit</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-balance text-muted-foreground">
            Click any technology to explore my experience, projects, and
            expertise level. Drag to rotate the galaxy.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative mx-auto h-[420px] w-full max-w-5xl overflow-hidden rounded-3xl border border-border/60 bg-card/20 backdrop-blur-sm sm:h-[520px]"
        >
          <Canvas
            camera={{ position: [0, 0, 8], fov: 50 }}
            dpr={[1, 1.5]}
            gl={{ antialias: true, alpha: true }}
          >
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1.5} color="#22d3ee" />
            <pointLight position={[-10, -10, -5]} intensity={0.5} color="#0ea5e9" />
            <Cluster
              onHover={setHovered}
              onSelect={setSelected}
              hovered={hovered?.name ?? null}
            />
            <OrbitControls
              enableZoom={false}
              enablePan={false}
              autoRotate={false}
              rotateSpeed={0.5}
            />
          </Canvas>

          <div className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full glass px-4 py-1.5 font-mono text-[10px] text-muted-foreground">
            {hovered ? hovered.name : 'Drag to explore · Click any node'}
          </div>

          <div className="absolute left-4 top-4 flex flex-wrap gap-1.5">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`pointer-events-auto rounded-full px-3 py-1 text-xs transition-colors ${
                  filter === f
                    ? 'bg-primary text-primary-foreground'
                    : 'glass text-muted-foreground hover:text-foreground'
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          <AnimatePresence>
            {selected && (
              <SkillDetail skill={selected} onClose={() => setSelected(null)} />
            )}
          </AnimatePresence>
        </motion.div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          {Object.entries(CATEGORY_COLORS).map(([cat, color]) => (
            <div key={cat} className="flex items-center gap-2 text-xs text-muted-foreground">
              <div className="h-2.5 w-2.5 rounded-full" style={{ background: color }} />
              {cat}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
