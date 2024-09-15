import {Sinopsis} from './components/Sinopsis';
import {HobbySections} from './components/HobbySection';
import {AssociationsAndOrganizations} from './components/Organizations';

export async function AboutMeComponent() {
  return (
    <div className="space-y-4 flex flex-col">
      <Sinopsis />
      <AssociationsAndOrganizations />
      <HobbySections />
    </div>
  );
}
