'use client';
import {JobTypeEnum} from '@/src/data/Resume';
import {Button, Modal} from 'flowbite-react';
import {useTranslations} from 'next-intl';
import {ReactNode} from 'react';

export function QuestionModal(props: {
  openModalStatus: boolean;
  closeModalCallback: (jobeNum: JobTypeEnum) => void;
}): ReactNode {
  let jobeNum: JobTypeEnum;
  const t = useTranslations('Resume.QuestionModal');
  return (
    <Modal
      show={props.openModalStatus}
      onClose={() => props.closeModalCallback}
    >
      <Modal.Header>Small modal</Modal.Header>
      <Modal.Body>
        <div className="space-y-6 p-6">
          <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
            Hi!, Thanks for getting interested in me, As I am multidisciplined
            developer, I am obligated to get some resumes optimized for each
            role,
          </p>
          <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
            <Button.Group>
              <Button
                color="gray"
                onClick={() => {
                  jobeNum = JobTypeEnum.All;
                }}
              >
                {t('all')}
              </Button>
              <Button
                color="gray"
                onClick={() => {
                  jobeNum = JobTypeEnum.GameDev;
                }}
              >
                Game Developer/Interative App/Virtual Production
              </Button>
              <Button
                color="gray"
                onClick={() => {
                  jobeNum = JobTypeEnum.Web;
                }}
              >
                {t('web')}
              </Button>
              <Button
                color="gray"
                onClick={() => {
                  jobeNum = JobTypeEnum.Backend;
                }}
              >
                {t('backend')}
              </Button>
            </Button.Group>
          </p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={() => {
            props.closeModalCallback(jobeNum);
          }}
        >
          I accept
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
