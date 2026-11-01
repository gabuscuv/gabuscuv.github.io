import {JobTypeEnum, CertificateEnumType} from './types';


export const certificateTypesByRole: Partial<
  Record<JobTypeEnum, readonly CertificateEnumType[]>
> = {
  [JobTypeEnum.Backend]: ['network'],
  [JobTypeEnum.WebDev]: ['design'],
  [JobTypeEnum.GameDev]: ['gamedev'],
};
