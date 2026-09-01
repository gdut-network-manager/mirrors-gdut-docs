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

  const ini = PrismObject.languages.ini;
  if (ini) {
    const DOMAIN =
      /(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.){1,}[a-z]{2,}/.source;

    PrismObject.languages.insertBefore('ini', 'key', {
      'hosts-entry': {
        pattern: new RegExp(
          `^[ \\t]*(\\d{1,3}(?:\\.\\d{1,3}){3})((?:[ \\t]+${DOMAIN})+)`,
          'gm',
        ),
        inside: {
          'hosts-ip': {
            pattern: /\d{1,3}(?:\.\d{1,3}){3}/,
            alias: 'number',
          },
          'hosts-domain': {
            pattern: new RegExp(DOMAIN),
            alias: 'attr-value',
          },
        },
      },
    });
  }

  const groovy = PrismObject.languages.groovy;
  if (groovy) {
    if (groovy['boolean']) {
      groovy['boolean'] = /\b(?:true|false|null)\b/;
    }

    PrismObject.languages.insertBefore('groovy', 'function', {
      'gradle-block': {
        pattern: /\b(?:allprojects|subprojects|buildscript|repositories|dependencies|configurations|plugins|publishing|sourceSets|artifacts|tasks|extensions|maven|mavenCentral|mavenLocal|google|flatDir|ivy|all|resolutionStrategy)\b(?=\s*\{)/,
        alias: 'function',
      },
      'gradle-call': {
        pattern: /\b(?:url|remove|include|exclude|force|eachDependency|dependsOn|doFirst|doLast)\b(?=\s)/,
        alias: 'function',
      },
    });

    PrismObject.languages.insertBefore('groovy', 'class-name', {
      'gradle-type': {
        pattern: /\b(?:MavenArtifactRepository|ArtifactRepository|Project|Gradle|Settings|Configuration|Dependency|ModuleDependency|Task|SourceSet|JavaVersion|ResolutionStrategy|DependencyHandler|RepositoryHandler|Closure|Action)\b/,
        alias: 'builtin',
      },
    });
  }

  const kotlin = PrismObject.languages.kotlin;
  if (kotlin) {
    PrismObject.languages.insertBefore('kotlin', 'function', {
      'gradle-block': {
        pattern: /\b(?:allprojects|subprojects|buildscript|repositories|dependencies|configurations|plugins|publishing|sourceSets|artifacts|tasks|extensions|maven|mavenCentral|mavenLocal|google|flatDir|ivy|all|resolutionStrategy)\b(?=\s*\{)/,
        alias: 'function',
      },
    });

    PrismObject.languages.insertBefore('kotlin', 'class-name', {
      'gradle-type': {
        pattern: /\b(?:MavenArtifactRepository|ArtifactRepository|Project|Gradle|Settings|Configuration|Dependency|ModuleDependency|Task|SourceSet|JavaVersion|ResolutionStrategy|DependencyHandler|RepositoryHandler)\b/,
        alias: 'builtin',
      },
    });
  }

  delete (globalThis as Optional<typeof globalThis, 'Prism'>).Prism;
  if (typeof PrismBefore !== 'undefined') {
    globalThis.Prism = PrismObject;
  }
}
