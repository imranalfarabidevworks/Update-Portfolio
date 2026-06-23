'use client';

import * as React from 'react';
import dynamic from 'next/dynamic';
import { HeroSection } from '@/components/hero-section';
import { StoryExperience } from '@/components/story-experience';
import { ProjectsShowcase } from '@/components/projects-showcase';
import { SkillsGalaxy } from '@/components/skills-galaxy';
import { SocialProof } from '@/components/social-proof';

const LoadingSequence = dynamic(
  () => import('@/components/loading-sequence').then((m) => m.LoadingSequence),
  { ssr: false },
);

export default function Home() {
  const [loaded, setLoaded] = React.useState(false);

  return (
    <>
      <LoadingSequence onComplete={() => setLoaded(true)} />
      <div
        className={loaded ? 'opacity-100' : 'opacity-0'}
        style={{ transition: 'opacity 0.6s ease-out 0.2s' }}
      >
        <HeroSection />
        <StoryExperience />
        <ProjectsShowcase />
        <SkillsGalaxy />
        <SocialProof />
      </div>
    </>
  );
}
