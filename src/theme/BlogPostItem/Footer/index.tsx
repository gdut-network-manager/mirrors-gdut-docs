import React from 'react';
import clsx from 'clsx';
import {ThemeClassNames} from '@docusaurus/theme-common';
import {useBlogPost} from '@docusaurus/plugin-content-blog/client';
import TagsListInline from '@theme/TagsListInline';
import ReadMoreLink from '@theme/BlogPostItem/Footer/ReadMoreLink';

// Blog footer with the Edit-this-page link removed (it moved to the title row).
export default function BlogPostItemFooter(): React.ReactElement | null {
  const {metadata, isBlogPostPage} = useBlogPost();
  const {tags, editUrl, hasTruncateMarker} = metadata;
  const truncatedPost = !isBlogPostPage && hasTruncateMarker;
  const tagsExists = tags.length > 0;
  const renderFooter = tagsExists || truncatedPost || editUrl;
  if (!renderFooter) {
    return null;
  }
  if (isBlogPostPage) {
    return (
      <footer
        className={clsx(
          'docusaurus-mt-lg',
          ThemeClassNames.blog.blogFooterContainer,
        )}>
        {tagsExists && (
          <div
            className={clsx(
              'row margin-top--sm',
              ThemeClassNames.blog.blogFooterEditMetaRow,
            )}>
            <div className="col">
              <TagsListInline tags={tags} />
            </div>
          </div>
        )}
      </footer>
    );
  }
  return (
    <footer className="row docusaurus-mt-lg">
      {tagsExists && (
        <div className={clsx('col', {'col--9': truncatedPost})}>
          <TagsListInline tags={tags} />
        </div>
      )}
      {truncatedPost && (
        <div
          className={clsx('col text--right', {
            'col--3': tagsExists,
          })}>
          <ReadMoreLink blogPostTitle={metadata.title} to={metadata.permalink} />
        </div>
      )}
    </footer>
  );
}
