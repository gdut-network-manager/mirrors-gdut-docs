import {useEffect} from 'react';

/**
 * Enables the tab-switch animation only after the user interacts with a tab.
 *
 * The animation lives on `[role=tabpanel]`; because `hidden` toggles display,
 * every newly-shown panel restarts it — including all panels of a synced
 * `groupId` group, which is exactly what we want. But leaving it always on
 * would also animate the first paint, and Docusaurus remounts <Tabs> after
 * hydration, so the initial panel would fade in twice. Flagging the first
 * interaction keeps page load static.
 */
export function useTabsSwitchAnimation(): void {
  useEffect(() => {
    const root = document.documentElement;

    const mark = (event: Event) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      if (!target.closest('.tabs__item')) return;
      root.dataset.tabsInteracted = 'true';
    };

    // Capture phase: the flag must be set before React handles the event and
    // re-renders the panels, otherwise the new panel would not animate.
    document.addEventListener('pointerdown', mark, true);
    document.addEventListener('click', mark, true);
    document.addEventListener('keydown', mark, true);

    return () => {
      document.removeEventListener('pointerdown', mark, true);
      document.removeEventListener('click', mark, true);
      document.removeEventListener('keydown', mark, true);
    };
  }, []);
}
