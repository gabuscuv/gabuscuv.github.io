import {Organizations} from '@/src/data/Organizations';
import {getTranslations} from 'next-intl/server';
import Image from 'next/image';

export async function AssociationsAndOrganizations() {
  const t = await getTranslations('AboutMe.Shorts');
  // const t = useTranslations('AboutMe.Shorts');
  return (
    <div>
      <b>{t('MemberOf')}</b>
      {Organizations.map(org => (
        <Image
          key={org.title}
          src={org.src}
          height={157}
          width={400}
          alt={'Logo of' + org.title}
        />
      ))}
    </div>
  );
}
