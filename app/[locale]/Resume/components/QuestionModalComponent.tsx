'use client';
import {JobTypeEnum} from '@/src/data/Resume';
import {
  Button,
  ButtonGroup,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from 'flowbite-react';
import {useTranslations} from 'next-intl';
import {ReactNode, useState} from 'react';

export function QuestionModal(props: {
  openModalStatus: boolean;
  closeModalCallback: (jobeNum: JobTypeEnum) => void;
}): ReactNode {
  const [jobeNum, setJobEnum] = useState<JobTypeEnum | undefined>();
  const t = useTranslations('Resume.QuestionModal');
  return (
    <Modal
      show={props.openModalStatus}
      onClose={() => props.closeModalCallback}
    >
      <ModalHeader theme={{close: {base: 'hidden'}}}>{t('Title')}</ModalHeader>
      <ModalBody>
        <div className="space-y-6 p-6">
          <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
            {t('Description')}
          </p>
          <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
            <ButtonGroup>
              <Button
                color="gray"
                onClick={() => {
                  setJobEnum(JobTypeEnum.All);
                }}
              >
                {t('all')}
              </Button>
              <Button
                color="gray"
                onClick={() => {
                  setJobEnum(JobTypeEnum.GameDev);
                }}
              >
                Game Developer/Interative App/Virtual Production
              </Button>
              <Button
                color="gray"
                onClick={() => {
                  setJobEnum(JobTypeEnum.WebDev);
                }}
              >
                {t('web')}
              </Button>
              <Button
                color="gray"
                onClick={() => {
                  setJobEnum(JobTypeEnum.Backend);
                }}
              >
                {t('backend')}
              </Button>
            </ButtonGroup>
          </p>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button
          onClick={() => {
            if (jobeNum !== undefined) props.closeModalCallback(jobeNum);
          }}
          disabled={jobeNum === undefined}
        >
          {t('Choose')}
        </Button>
      </ModalFooter>
    </Modal>
  );
}
