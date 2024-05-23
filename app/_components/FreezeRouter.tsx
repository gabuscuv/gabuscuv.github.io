'use client';
// https://github.com/vercel/next.js/issues/49279
import React, {PropsWithChildren} from 'react';
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

  return (
    <>
      <AnimatePresence mode={'wait'} initial={false}>
        <motion.div
          key={pathname}
          initial={{opacity: 0}}
          animate={{opacity: 1}}
          exit={{opacity: 0}}
          transition={{duration: 0.2, type: 'tween'}}
        >
          <FrozenRouter>{children}</FrozenRouter>
        </motion.div>
      </AnimatePresence>
    </>
  );
}
