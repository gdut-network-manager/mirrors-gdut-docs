import React from 'react';
import type {ReactNode} from 'react';
import {useDoc} from '@docusaurus/plugin-content-docs/client';
import Heading from '@theme/Heading';
import MDXContent from '@theme/MDXContent';
import CopyMarkdownButton from '@site/src/components/CopyMarkdownButton';
import EditThisPage from '@theme/EditThisPage';

export default function DocItemContentWrapper({
  children,
}: {
  children: ReactNode;
}): React.ReactElement {
  const {metadata, frontMatter} = useDoc();
  const showTitleRow = frontMatter.hide_title !== true;

  return (
    <>
      {showTitleRow && (
        <header className="doc-title-header">
          <Heading as="h1">{metadata.title}</Heading>
          <div className="doc-title-actions">
            <CopyMarkdownButton />
            {metadata.editUrl && <EditThisPage editUrl={metadata.editUrl} />}
          </div>
        </header>
      )}
      <MDXContent>{children}</MDXContent>
    </>
  );
}
