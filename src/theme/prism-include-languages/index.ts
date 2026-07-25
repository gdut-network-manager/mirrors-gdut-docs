import siteConfig from '@generated/docusaurus.config';
import type * as PrismNamespace from 'prismjs';
import type {Optional} from 'utility-types';

export default function prismIncludeLanguages(
  PrismObject: typeof PrismNamespace,
): void {
  const {
    themeConfig: {prism},
  } = siteConfig;
  const {additionalLanguages} = prism as {additionalLanguages: string[]};

  const PrismBefore = globalThis.Prism;
  globalThis.Prism = PrismObject;

  additionalLanguages.forEach((lang) => {
    if (lang === 'php') {
      // eslint-disable-next-line global-require
      require('prismjs/components/prism-markup-templating.js');
    }
    // eslint-disable-next-line global-require, import/no-dynamic-require
    require(`prismjs/components/prism-${lang}`);
  });

  const ps = PrismObject.languages.powershell;
  if (ps) {
    if (Array.isArray(ps['function'])) {
      ps['function'].push(
        /\b(?:curl|powershell|pwsh|bash|sh|python|python3|pip|pip3|node|npm|npx|docker|git|wget|chmod|chown|cp|mv|rm|mkdir|rmdir|touch|cat|echo|sudo|tee|sed|awk|grep|find|tar|gzip|gunzip|systemctl|service|apt|apt-get|dpkg|yum|dnf|rpm|pacman|gem|bundle|bundler|ruby|go|cargo|rustc|make|cmake|gcc|clang|java|javac|mvn|gradle)\b/,
      );
    }

    PrismObject.languages.insertBefore('powershell', 'operator', {
      'parameter': {
        pattern: /(^|\s)(--?[A-Za-z][A-Za-z0-9-]*)/,
        lookbehind: true,
      },
    });
  }

  delete (globalThis as Optional<typeof globalThis, 'Prism'>).Prism;
  if (typeof PrismBefore !== 'undefined') {
    globalThis.Prism = PrismObject;
  }
}
