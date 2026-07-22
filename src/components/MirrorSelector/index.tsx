/**
 * MirrorSelector — dropdown-based mirror source switcher.
 *
 * Provides a <select> dropdown and shares the selection via React Context.
 * Use <MirrorContent type="nginx"> / <MirrorContent type="nexus"> to
 * conditionally render content based on the selected mirror.
 */

import {useState, createContext, useContext} from 'react';
import type {ReactNode} from 'react';
import styles from './styles.module.css';

export type MirrorType = 'nginx' | 'nexus';

interface MirrorSelectorContextValue {
  type: MirrorType;
}

const MirrorSelectorContext = createContext<MirrorSelectorContextValue>({
  type: 'nginx',
});

interface MirrorOption {
  value: MirrorType;
  label: string;
}

const DEFAULT_OPTIONS: MirrorOption[] = [
  {value: 'nginx', label: 'Nginx 缓存加速（推荐）'},
  {value: 'nexus', label: 'Nexus 缓存代理'},
];

interface MirrorSelectorProps {
  /** Optional custom options */
  options?: MirrorOption[];
  /** Label text next to the select */
  label?: string;
  children: ReactNode;
}

export function MirrorSelector({
  options = DEFAULT_OPTIONS,
  label = '镜像源',
  children,
}: MirrorSelectorProps): ReactNode {
  const [type, setType] = useState<MirrorType>('nginx');

  return (
    <MirrorSelectorContext.Provider value={{type}}>
      <div className={styles.selectorBar}>
        <label className={styles.selectorLabel} htmlFor="mirror-source-select">
          {label}
        </label>
        <select
          id="mirror-source-select"
          className={styles.select}
          value={type}
          onChange={(e) => setType(e.target.value as MirrorType)}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
      {children}
    </MirrorSelectorContext.Provider>
  );
}

interface MirrorContentProps {
  type: MirrorType;
  children: ReactNode;
}

export function MirrorContent({type, children}: MirrorContentProps): ReactNode {
  const ctx = useContext(MirrorSelectorContext);
  if (ctx.type !== type) return null;
  return <>{children}</>;
}
