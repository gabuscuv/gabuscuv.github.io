'use client';

import {ReactNode} from 'react';
import gameProjects from '@/src/data/GameProjectsData';
import {ProjectCards} from '../_components/ProjectCards';

export default function GameProjects(): ReactNode {
  return (
    <>
      <ProjectCards projectdata={gameProjects} />
    </>
  );
}
