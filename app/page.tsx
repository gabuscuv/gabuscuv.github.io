'use client';
import {ReferencesCarouselComponent} from './components/ratings';

export default function Home() {
  return (
    <main className=" m-5 ">
      <div className="w-full justify-center grid gap-4 grid-cols-2 grid-flow-row">
        <h1 className=" col-span-2 text-3xl">Hi!</h1>
        <div className="rounded-md mr-10  shadow p-5">
          <div>
            I'm <b>Gabriel Bustillo del Cuvillo</b>, a Jack-of-all-trades IT,
            But officially I'm a Software Developer (and former IT Technician).
          </div>
        </div>
        <div className="rounded-md shadow p-5">
          <div>
            I'm <b>Gabriel Bustillo del Cuvillo</b>, a Jack-of-all-trades IT,
            But officially I'm a Software Developer (and former IT Technician).
          </div>
        </div>
        <div className="xl:mx-80 col-span-2">
          <ReferencesCarouselComponent />
        </div>
      </div>
    </main>
  );
}
