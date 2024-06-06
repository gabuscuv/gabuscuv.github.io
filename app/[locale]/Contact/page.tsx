import {ReactNode} from 'react';

//function to generate the routes for all the locales
export async function generateStaticParams() {
  return ['en', 'es'].map((locale) => ({ locale }))
}

export default function Contact(): ReactNode {
  return <></>;
}
