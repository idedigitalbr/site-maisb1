'use client';

import { X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export function LinksModal() {
  const [open, setOpen] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    const sync = () => setOpen(window.location.hash === '#links');
    const onClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const link = target?.closest<HTMLAnchorElement>('a[href="#links"]');
      if (!link) return;
      event.preventDefault();
      triggerRef.current = link;
      window.history.replaceState(null, '', '#links');
      setOpen(true);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && window.location.hash === '#links') close();
    };
    sync();
    window.addEventListener('hashchange', sync);
    document.addEventListener('click', onClick);
    document.addEventListener('keydown', onKeyDown);
    return () => { window.removeEventListener('hashchange', sync); document.removeEventListener('click', onClick); document.removeEventListener('keydown', onKeyDown); };
  }, []);

  useEffect(() => {
    if (open) closeButtonRef.current?.focus();
  }, [open]);

  const close = () => {
    window.history.replaceState(null, '', window.location.pathname + window.location.search);
    setOpen(false);
    window.setTimeout(() => triggerRef.current?.focus(), 0);
  };

  return <><div className={`wf-modal-overlay${open ? ' open' : ''}`} onClick={close} aria-hidden="true" /><div className={`wf-modal links-fullscreen-modal${open ? ' open' : ''}`} id="modal-redes-sociais" role="dialog" aria-modal="true" aria-label="Links do Grupo Mais Barato" aria-hidden={!open}><button ref={closeButtonRef} type="button" className="wf-modal-close" aria-label="Fechar modal" onClick={close}><X size={26} /></button><iframe title="Links do Grupo Mais Barato" src="/links?modal=1" tabIndex={open ? 0 : -1} /></div></>;
}
