import React from 'react';
import clsx from 'clsx';
import Translate from '@docusaurus/Translate';
import {ThemeClassNames} from '@docusaurus/theme-common';
import Link from '@docusaurus/Link';
import IconEdit from '@theme/Icon/Edit';
import styles from './styles.module.css';

export default function EditThisPage({editUrl}: {editUrl: string}): React.ReactElement {
  return (
    <Link
      to={editUrl}
      className={clsx(ThemeClassNames.common.editThisPage, styles.button)}
    >
      <IconEdit className={styles.icon} />
      <Translate
        id="theme.common.editThisPage"
        description="The link label to edit the current page"
      >
        编辑此页
      </Translate>
    </Link>
  );
}
