import {ProjectData, ProjectDataWithImages} from '@/src/data/ProjectDataTypes';
import {Carousel, Modal} from 'flowbite-react';
import Image from 'next/image';
import '../../../oldcss.css';

export default function ProjectModal(props: {
  openModalStatus: boolean;
  closeCallback: () => void;
  projectData: ProjectData | undefined;
}) {
  return (
    <>
      <Modal
        show={props.openModalStatus}
        size="3xl"
        onClose={props.closeCallback}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-10">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              {props.projectData?.name}
            </h3>
            <div
              dangerouslySetInnerHTML={{
                __html: props.projectData
                  ? props.projectData?.htmlDescription
                  : '',
              }}
            />
            {props.projectData instanceof ProjectDataWithImages ? (
              <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
                <Carousel>
                  {props.projectData.screenshots?.map((screenshots, index) => (
                    <Image
                      width={512}
                      height={288}
                      key={props?.projectData?.id + 'screenshot' + index}
                      alt={
                        'Screenshot ' +
                        index +
                        'of Project' +
                        props?.projectData?.name
                      }
                      src={screenshots}
                    />
                  ))}
                </Carousel>
              </div>
            ) : (
              ''
            )}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
