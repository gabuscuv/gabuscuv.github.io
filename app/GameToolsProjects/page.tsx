'use client';
import {ReactNode} from 'react';
import GameToolsProjectsData from '@/src/data/GameToolsProjectsData';
import {ProjectCards} from '../_components/ProjectCards';

export default function GameToolsProjects(): ReactNode {
  return (
    <div className="flex">
      <ProjectCards projectdata={GameToolsProjectsData} />
    </div>
  );
}
