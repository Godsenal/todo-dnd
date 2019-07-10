import React, { useEffect } from 'react';

const useOutsideClick = <E extends HTMLElement, F extends () => void, D extends any[]>(ref: React.MutableRefObject<E | null>, callback: F, deps?: D) => {
  useEffect(() => {
    if (ref.current) {
      const handleOutsideClick = (e: MouseEvent) => {
        if (ref.current && !ref.current.contains((e.target as HTMLInputElement))) {
          callback();
        }
      }
      window.addEventListener('mousedown', handleOutsideClick);
      return () => window.removeEventListener('mousedown', handleOutsideClick);
    }
  }, deps ? [callback, ref, ...deps] : [callback, ref]);
}

export default useOutsideClick;