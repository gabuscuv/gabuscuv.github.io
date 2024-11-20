'use client';
import {ReactNode} from 'react';

export function ResumeSection(props: {title: string; children: ReactNode}) {
  return (
    <section className="m-1 p-4 rounded shadow">
      <h1 className="text-2xl">{props.title}</h1>

      {props.children}
    </section>
  );
}
