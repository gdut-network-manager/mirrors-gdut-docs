import React from 'react';
import Layout from '@theme-original/Layout';
import type {Props} from '@theme/Layout';
import type {ReactNode} from 'react';
import {useEffect} from 'react';

const GLASS_SELECTORS =
  '.navbar, .footer, .card, .theme-code-block, .theme-doc-sidebar-container, .pagination-nav__link, .blog-wrapper aside.col--3 > nav, .blog-wrapper.blog-list-page article';

export default function LayoutWrapper(props: Props): ReactNode {
  useEffect(() => {
    let rafId: number | null = null;
    let lastEvent: MouseEvent | null = null;

    const handleMouseMove = (e: MouseEvent) => {
      lastEvent = e;
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        if (!lastEvent) return;
        const target = (lastEvent.target as HTMLElement).closest<HTMLElement>(
          GLASS_SELECTORS,
        );
        if (!target) return;
        const rect = target.getBoundingClientRect();
        const x = ((lastEvent.clientX - rect.left) / rect.width) * 100;
        const y = ((lastEvent.clientY - rect.top) / rect.height) * 100;
        target.style.setProperty('--mouse-x', `${x}%`);
        target.style.setProperty('--mouse-y', `${y}%`);
      });
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <svg
        aria-hidden="true"
        width="0"
        height="0"
        style={{position: 'absolute', width: 0, height: 0}}>
        <filter
          id="liquid-glass-refraction"
          colorInterpolationFilters="sRGB">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.011 0.013"
            numOctaves={2}
            seed={17}
          />
          <feGaussianBlur stdDeviation="1.4" />
          <feDisplacementMap
            scale={26}
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </svg>
      <Layout {...props} />
    </>
  );
}
