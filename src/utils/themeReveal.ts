export type RevealOrigin = {x: number; y: number};

const REVEAL_DURATION = 480;
const REVEAL_EASING = 'cubic-bezier(0.4, 0, 0.2, 1)';

type ViewTransitionLike = {
  ready: Promise<void>;
  finished: Promise<void>;
};

type DocumentWithViewTransition = Document & {
  startViewTransition?: (callback: () => void) => ViewTransitionLike;
};

export function prefersReducedMotion(): boolean {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

export function supportsViewTransition(): boolean {
  return (
    typeof document !== 'undefined' &&
    typeof (document as DocumentWithViewTransition).startViewTransition ===
      'function'
  );
}

/** Centre of an element, used as the circle's origin. */
export function getElementOrigin(
  element: Element | null | undefined,
): RevealOrigin | null {
  if (!element?.getBoundingClientRect) {
    return null;
  }
  const rect = element.getBoundingClientRect();
  if (!rect.width && !rect.height) {
    return null;
  }
  return {x: rect.left + rect.width / 2, y: rect.top + rect.height / 2};
}

/**
 * Runs `apply` behind a circular reveal centred on `origin`.
 *
 * Old theme stays as the backdrop and the new one is clipped in from a
 * zero-radius circle until it covers the viewport (the same technique the
 * mirror site homepage uses). Falls back to an instant switch when the
 * browser lacks View Transitions, the user prefers reduced motion, or there
 * is no usable origin — the caller decides whether the switch changes any
 * colours at all and can skip this helper entirely in that case.
 */
export function revealThemeChange(
  origin: RevealOrigin | null,
  apply: () => void,
): boolean {
  if (!origin || prefersReducedMotion() || !supportsViewTransition()) {
    apply();
    return false;
  }

  const root = document.documentElement;
  // Snapshots must not catch colours mid-transition, otherwise the new one
  // is a washed-out blend instead of the actual theme.
  root.classList.add('theme-switching');

  let transition: ViewTransitionLike;
  try {
    transition = (
      document as DocumentWithViewTransition
    ).startViewTransition!(() => {
      apply();
    });
  } catch {
    root.classList.remove('theme-switching');
    apply();
    return false;
  }

  const cleanup = () => root.classList.remove('theme-switching');

  transition.ready
    .then(() => {
      // New snapshot is already captured at this point.
      cleanup();
      const {x, y} = origin;
      const radius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y),
      );
      root.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${radius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: REVEAL_DURATION,
          easing: REVEAL_EASING,
          pseudoElement: '::view-transition-new(root)',
        } as KeyframeAnimationOptions & {pseudoElement: string},
      );
    })
    .catch(cleanup);

  // Skipped transitions and rapid re-clicks still have to restore transitions.
  transition.finished.catch(cleanup);

  return true;
}
