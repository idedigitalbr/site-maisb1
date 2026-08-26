'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export function RouteTheme() {
  const pathname = usePathname();

  useEffect(() => {
    const body = document.body;
    const isAdmin = pathname.startsWith('/admin');
    body.classList.remove('theme-holding', 'news-list-page-theme', 'article-page-theme-light', 'links-page-body', 'admin-page-body');
    if (isAdmin) body.classList.add('admin-page-body');
    else body.classList.add('theme-holding');
    if (pathname === '/noticias') body.classList.add('news-list-page-theme');
    if (pathname.startsWith('/noticias/')) body.classList.add('article-page-theme-light');
    if (pathname === '/links') body.classList.add('links-page-body');
    return () => body.classList.remove('theme-holding', 'news-list-page-theme', 'article-page-theme-light', 'links-page-body', 'admin-page-body');
  }, [pathname]);

  useEffect(() => {
    if (pathname.startsWith('/admin') || window.matchMedia('(hover: none)').matches || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let targetX = -999;
    let targetY = -999;
    let currentX = -999;
    let currentY = -999;
    let frame = 0;
    const root = document.documentElement;
    const previousCursorVariables = {
      x: root.style.getPropertyValue('--cursor-x'),
      y: root.style.getPropertyValue('--cursor-y'),
      opacity: root.style.getPropertyValue('--cursor-glow-opacity'),
    };
    const onMouseMove = (event: MouseEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
      root.style.setProperty('--cursor-glow-opacity', '1');
      if (!frame) frame = window.requestAnimationFrame(animate);
    };
    const onMouseLeave = () => { root.style.setProperty('--cursor-glow-opacity', '0'); };
    const animate = () => {
      currentX += (targetX - currentX) * 0.1;
      currentY += (targetY - currentY) * 0.1;
      root.style.setProperty('--cursor-x', `${currentX}px`);
      root.style.setProperty('--cursor-y', `${currentY}px`);
      if (Math.abs(targetX - currentX) > 0.1 || Math.abs(targetY - currentY) > 0.1) frame = window.requestAnimationFrame(animate);
      else frame = 0;
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      if (frame) window.cancelAnimationFrame(frame);
      if (previousCursorVariables.x) root.style.setProperty('--cursor-x', previousCursorVariables.x); else root.style.removeProperty('--cursor-x');
      if (previousCursorVariables.y) root.style.setProperty('--cursor-y', previousCursorVariables.y); else root.style.removeProperty('--cursor-y');
      if (previousCursorVariables.opacity) root.style.setProperty('--cursor-glow-opacity', previousCursorVariables.opacity); else root.style.removeProperty('--cursor-glow-opacity');
    };
  }, [pathname]);

  return null;
}
