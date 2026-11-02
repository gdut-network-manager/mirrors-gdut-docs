import React, {type ReactNode} from 'react';
import Link from '@docusaurus/Link';
import type {Props} from '@theme/TagsListByLetter';
import styles from './styles.module.css';

/**
 * Flat grid of tag cards instead of Docusaurus's default
 * group-by-initial list: single-character headings are meaningless
 * for Chinese tags, where every tag would get its own group.
 */
export default function TagsListByLetter({tags}: Props): ReactNode {
  return (
    <section className={styles.grid}>
      {tags.map((tag) => (
        <Link key={tag.permalink} to={tag.permalink} className={styles.card}>
          <span className={styles.head}>
            <span className={styles.label}>{tag.label}</span>
            <span className={styles.count}>{tag.count}</span>
          </span>
          {tag.description && (
            <span className={styles.description}>{tag.description}</span>
          )}
        </Link>
      ))}
    </section>
  );
}
