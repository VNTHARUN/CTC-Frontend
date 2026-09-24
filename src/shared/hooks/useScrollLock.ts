import { useEffect } from 'react';

let lockCount = 0;

const unlockDocumentScroll = () => {
  document.documentElement.style.removeProperty('overflow');
  document.body.style.removeProperty('overflow');
  document.body.style.removeProperty('padding-right');
};

const acquireScrollLock = () => {
  if (lockCount === 0) {
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }
  }
  lockCount += 1;
};

const releaseScrollLock = () => {
  lockCount = Math.max(0, lockCount - 1);
  if (lockCount === 0) {
    unlockDocumentScroll();
  }
};

/** Clears a leftover auth/modal lock when nothing currently owns it. */
export const resetIdleDocumentScrollLock = () => {
  if (lockCount === 0) {
    unlockDocumentScroll();
  }
};

export const useScrollLock = (locked: boolean) => {
  useEffect(() => {
    if (!locked) return;
    acquireScrollLock();
    return () => releaseScrollLock();
  }, [locked]);
};
