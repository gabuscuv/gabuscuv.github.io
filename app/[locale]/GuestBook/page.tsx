import {unstable_setRequestLocale} from 'next-intl/server';
import {GuestFunctionMain} from './components/PostComponent';

export async function generateStaticParams() {
  return ['en', 'es'].map(locale => ({locale}));
}

// @ts-expect-error -- TypeScript will validate that only known `params`
// are used in combination with a given `pathname`. Since the two will
// always match for the current route, we can skip runtime checks.
export default function GuestBook({params: {locale}}) {
  unstable_setRequestLocale(locale);

  return <GuestFunctionMain />;
}
