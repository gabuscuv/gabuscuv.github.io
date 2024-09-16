import {unstable_setRequestLocale} from 'next-intl/server';
import {Sections} from './_Components/Sections';

export async function generateStaticParams() {
  return ['en', 'es'].map(locale => ({locale}));
}

export default async function BlogLayout({
  children,
  params: {locale},
}: Readonly<{
  children: React.ReactNode;
  params: {locale: string};
}>) {
  unstable_setRequestLocale(locale);

  return (
    <div>
      <p>
        Warning!, Data Migrated from my old blog, Formatting & review in
        progress
      </p>
      <div className="md:flex">
        <Sections />
        {children}
      </div>
    </div>
  );
}
