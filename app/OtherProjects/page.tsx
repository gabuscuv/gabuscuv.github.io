'use client';
import OtherProjectsData from '@/src/data/OtherProjectsData';
import {ReactNode} from 'react';
import {ProjectCards} from '../_components/ProjectCards';

export default function OtherProjects(): ReactNode {
  return (
    <>
      <ProjectCards projectdata={OtherProjectsData} />
    </>
  );
}
