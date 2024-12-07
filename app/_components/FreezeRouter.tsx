'use client';
// https://github.com/vercel/next.js/issues/49279
import React, {PropsWithChildren} from 'react';
// eslint-disable-next-line n/no-extraneous-import
import {motion, AnimatePresence} from 'framer-motion';
import {usePathname} from 'next/navigation';
import {LayoutRouterContext} from 'next/dist/shared/lib/app-router-context.shared-runtime';
import {useContext, useRef} from 'react';

// Prevents instant page opening

export function FrozenRouter(props: PropsWithChildren<{}>) {
  const context = useContext(LayoutRouterContext);
  const frozen = useRef(context).current;
  return (
    <LayoutRouterContext.Provider value={frozen}>
      {props.children}
    </LayoutRouterContext.Provider>
  );
}
export default function Layout({children}: {children: React.ReactNode}) {
  const pathname = usePathname();
  const pathNameArray = pathname.split('/');
  return !(
    pathNameArray.includes('Notes') || pathNameArray.includes('Blog')
  ) ? (
    <>
      <AnimatePresence mode={'wait'} initial={false}>
        <motion.div
          key={pathname}
          initial={{top: -1000, scale: 0, position: 'absolute'}}
          animate={{top: 0, scale: 1, position: 'relative'}}
          exit={{top: 1000, scale: 0, position: 'absolute'}}
          transition={{duration: 0.4, type: 'tween'}}
        >
          <FrozenRouter>{children}</FrozenRouter>
        </motion.div>
      </AnimatePresence>
    </>
  ) : (
    <>{children}</>
  );
}
