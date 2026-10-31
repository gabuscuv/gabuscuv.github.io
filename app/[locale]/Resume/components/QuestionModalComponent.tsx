'use client';
import {JobTypeEnum, roles} from '@/src/data/Resume';
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from 'flowbite-react';
import {useTranslations} from 'next-intl';
import {useEffect, useState} from 'react';

export function QuestionModal(props: {
  openModalStatus: boolean;
  closeModalCallback: (jobType: JobTypeEnum) => void;
}) {
  const [selectedJobType, setSelectedJobType] =
    useState<JobTypeEnum | undefined>();

  const t = useTranslations('Resume.QuestionModal');

  useEffect(() => {
    if (!props.openModalStatus) {
      setSelectedJobType(undefined);
    }
  }, [props.openModalStatus]);


const options = roles.map(({value, label}) => ({
  value,
  label: t(`Roles.${label}`),
}));

  return (
    <Modal
      show={props.openModalStatus}
      size="lg"
    >
      <ModalHeader theme={{close: {base: 'hidden'}}}>{t('Title')}</ModalHeader>
      <ModalBody>
        <div className="space-y-5">
          <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
            {t('Description')}
          </p>
          <div
            className="grid grid-cols-1 gap-3 sm:grid-cols-2"
            role="group"
            aria-label={t('Title')}
          >
            {options.map(option => {
              const selected =
                selectedJobType === option.value;

              return (
                <Button
                  key={option.value}
                  color={selected ? 'blue' : 'gray'}
                  outline={!selected}
                  className="h-auto min-h-12 whitespace-normal text-center"
                  aria-pressed={selected}
                  onClick={() =>
                    setSelectedJobType(option.value)
                  }
                >
                  {option.label}
                </Button>
              );
            })}
          </div>
        </div>
      </ModalBody>
      <ModalFooter className="justify-end">
        <Button
          onClick={() => {
            if (selectedJobType !== undefined) {
              props.closeModalCallback(selectedJobType);
            }
          }}
          disabled={selectedJobType === undefined}
        >
          {t('Choose')}
        </Button>
      </ModalFooter>
    </Modal>
  );
}
