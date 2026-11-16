import React, {type ReactNode, useCallback, useRef} from 'react';
import {useColorMode, useThemeConfig} from '@docusaurus/theme-common';
import type {ColorMode} from '@docusaurus/theme-common';
import ColorModeToggle from '@theme/ColorModeToggle';
import type {Props} from '@theme/Navbar/ColorModeToggle';
import {
  getElementOrigin,
  revealThemeChange,
} from '@site/src/utils/themeReveal';
import styles from './styles.module.css';

// @docusaurus/theme-common exports ColorMode but not the choice type
type ColorModeChoice = ColorMode | null;

function getSystemColorMode(): ColorMode {
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}

/** The colour mode that a choice actually renders. */
function resolveColorMode(
  choice: ColorModeChoice,
  respectPrefersColorScheme: boolean,
  defaultMode: ColorMode,
): ColorMode {
  if (choice !== null) {
    return choice;
  }
  return respectPrefersColorScheme ? getSystemColorMode() : defaultMode;
}

function getCurrentColorMode(): ColorMode {
  return document.documentElement.getAttribute('data-theme') === 'dark'
    ? 'dark'
    : 'light';
}

export default function NavbarColorModeToggle({className}: Props): ReactNode {
  const navbarStyle = useThemeConfig().navbar.style;
  const {disableSwitch, respectPrefersColorScheme, defaultMode} =
    useThemeConfig().colorMode;
  const {colorModeChoice, setColorMode} = useColorMode();
  const containerRef = useRef<HTMLSpanElement>(null);

  const handleChange = useCallback(
    (next: ColorModeChoice) => {
      const nextColorMode = resolveColorMode(
        next,
        respectPrefersColorScheme,
        defaultMode,
      );

      // Switching between "system" and an explicit mode can land on the very
      // same light/dark value (system is light, user picks light). Nothing
      // changes visually then, so the reveal would be a pointless flash.
      if (nextColorMode === getCurrentColorMode()) {
        setColorMode(next);
        return;
      }

      revealThemeChange(
        getElementOrigin(containerRef.current?.querySelector('button')),
        () => setColorMode(next),
      );
    },
    [defaultMode, respectPrefersColorScheme, setColorMode],
  );

  if (disableSwitch) {
    return null;
  }

  return (
    // `display: contents` keeps the navbar flex layout untouched while giving
    // us a node to measure the button from.
    <span ref={containerRef} style={{display: 'contents'}}>
      <ColorModeToggle
        className={className}
        buttonClassName={
          navbarStyle === 'dark' ? styles.darkNavbarColorModeToggle : undefined
        }
        respectPrefersColorScheme={respectPrefersColorScheme}
        value={colorModeChoice}
        onChange={handleChange}
      />
    </span>
  );
}
