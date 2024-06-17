import {ProjectData} from '@/src/data/ProjectDataTypes';
import {Checkbox, Label} from 'flowbite-react';
import {ReactNode} from 'react';
import {type} from '@/src/data/type';

const categories: Array<{FullName: string; type: string}> = [
  {FullName: 'Language', type: 'language'},
  {FullName: 'Game Engine', type: 'gameEngine'},
  {FullName: 'Game Lib', type: 'gameLib'},
  {FullName: 'Middleware', type: 'middleware'},
  {FullName: 'Web Framework', type: 'webFramework'},
];

function getCurrentStack(projectsData: ProjectData[]): Array<string> {
  return [
    ...new Set(
      projectsData
        .map(item => item.stack.map(e => e))
        .reduce((a, b) => a.concat(b))
    ),
  ];
}

let tmp;

export function Types(props: {
  projectsData: ProjectData[];
  className?: string;
  _filterStack: Set<string>;
  callback: (filterstack: string) => void;
}): ReactNode {
  if (props.projectsData.length === 0) {
    return <></>;
  }
  return (
    <>
      <div className={'flex flex-col pl-20 pt-10 mt-40 ' + props.className}>
        <h3 className="pb-5">Filter</h3>
        {categories.map(category => {
          tmp = getCurrentStack(props.projectsData)
            .filter(_category => type[_category]?.type === category.type)
            .toSorted((a, b) => (a > b ? 1 : 0));
          if (tmp.length === 0) {
            return <></>;
          }
          return (
            <>
              <h4 className="h3">{category.FullName}</h4>
              {tmp.map(e => (
                <div key={e} className="pt-1 pb-1 flex items-center gap-2">
                  <Checkbox
                    id={e}
                    onClick={() => {
                      props.callback(e);
                    }}
                    // https://stackoverflow.com/a/49714237 Thanks!
                    key={`${Math.floor(Math.random() * 1000)}-min`}
                    defaultChecked={props._filterStack.has(e)}
                  />
                  <Label htmlFor={e}>{type[e]?.FullName}</Label>
                </div>
              ))}
            </>
          );
        })}
      </div>
    </>
  );
}
