import React from 'react';
import {useBlogPost} from '@docusaurus/plugin-content-blog/client';
import BlogPostItemHeaderTitle from '@theme/BlogPostItem/Header/Title';
import BlogPostItemHeaderInfo from '@theme/BlogPostItem/Header/Info';
import BlogPostItemHeaderAuthors from '@theme/BlogPostItem/Header/Authors';
import CopyMarkdownButton from '@site/src/components/CopyMarkdownButton';
import EditThisPage from '@theme/EditThisPage';

export default function BlogPostItemHeaderWrapper(): React.ReactElement {
  const {metadata} = useBlogPost();
  const {editUrl} = metadata;

  return (
    <header>
      <BlogPostItemHeaderTitle />
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '0.5rem',
        }}>
        <BlogPostItemHeaderInfo />
        <div style={{display: 'inline-flex', gap: '0.5rem'}}>
          <CopyMarkdownButton />
          {editUrl && <EditThisPage editUrl={editUrl} />}
        </div>
      </div>
      <BlogPostItemHeaderAuthors />
    </header>
  );
}
