import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: '广东工业大学开源镜像站帮助文档',
  tagline: '开源镜像站',
  favicon: 'img/logo.png',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://mirrors.gdut.edu.cn',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/help',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'gdutnic', // Usually your GitHub org/user name.
  projectName: 'mirrors-docs', // Usually your repo name.

  onBrokenLinks: 'throw',
  //onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'cn',
    locales: ['cn'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          sidebarCollapsible: true,
          sidebarCollapsed: false,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: 'https://github.com/gdut-network-manager/mirrors-gdut-docs/edit/master',
          remarkPlugins: [require('remark-math')],
          rehypePlugins: [require('rehype-katex')],
        },
        blog: {
          routeBasePath: '/news',
          blogSidebarTitle: '全部公告',
          blogSidebarCount: 'ALL',
          showReadingTime: false,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: 'https://github.com/gdut-network-manager/mirrors-gdut-docs/edit/master',
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
          remarkPlugins: [require('remark-math')],
          rehypePlugins: [require('rehype-katex')],
          // 置顶排序：pin: true 的公告排到最前面，各组内部仍按日期倒序
          processBlogPosts: async ({blogPosts}) => {
            const pinned = blogPosts.filter(
              (post) => post.metadata.frontMatter.pin === true,
            );
            const unpinned = blogPosts.filter(
              (post) => post.metadata.frontMatter.pin !== true,
            );
            return [...pinned, ...unpinned];
          },
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  stylesheets: [],

  themes: [
    // ... Your other themes.
    [
      require.resolve("@easyops-cn/docusaurus-search-local"),
      /** @type {import("@easyops-cn/docusaurus-search-local").PluginOptions} */
      ({
        hashed: true,
        language: ["en", "zh"],
        blogRouteBasePath: "/news",
        askAi: {
          apiUrl: "https://mirrors.gdut.edu.cn/ai-proxy/api/chat",
          project: "mirrors-docs",
          hotkey: "mod+i",
          exampleQuestions: [
            "如何配置 Ubuntu 镜像源？",
            "Docker 镜像名称转换工具怎么用？",
            "支持哪些镜像源？",
          ],
          texts: {
            triggerButtonText: "问 AI",
            triggerButtonAriaLabel: "向 AI 提问",
            drawerTitle: "AI 助手",
            drawerCloseAriaLabel: "关闭",
            drawerNewSessionAriaLabel: "新对话",
            welcomeMessage: "你好！我是 GDUT 镜像站 AI 助手，有什么可以帮你的吗？",
            exampleQuestionsTitle: "试试这些问题",
            inputPlaceholder: "输入你的问题...",
            sendButtonAriaLabel: "发送",
            emptyResponseText: "抱歉，我没有理解你的问题，请换一种方式提问。",
          },
        },
      }),
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    colorMode: {
      defaultMode: 'light',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
    docs: {
      sidebar: {
        hideable: true,
        autoCollapseCategories: false,
      },
    },
    navbar: {
      title: '广东工业大学开源镜像站',
      logo: {
        alt: 'GDUT Logo',
        src: 'img/logo.png',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: '文档',
        },
        {
          to: '/news',
          label: '新闻公告',
          position: 'left',
        },
        {
          href: '/help/news/rss.xml',
          label: 'RSS',
          position: 'right',
          target: '_blank',
          rel: 'noopener',
        },
        {
          href: 'https://mirrors.gdut.edu.cn',
          label: '镜像站主页',
          position: 'right',
        },
        {
          href: 'https://github.com/gdut-network-manager/mirrors-gdut-docs',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'light',
      links: [
        {
          title: '文档',
          items: [
            {
              label: '使用文档',
              to: '/docs/intro',
            },
            {
              label: '新闻公告',
              to: '/news',
            },
          ],
        },
        {
          title: '其他网站',
          items: [
            {
              label: '广东工业大学首页',
              href: 'https://www.gdut.edu.cn/',
            },
            {
              label: '网络中心首页',
              href: 'https://nic.gdut.edu.cn/',
            },
            {
              label: '镜像站状态',
              href: 'https://mirrors.gdut.edu.cn/status.html',
            },
            {
              label: '容器镜像库',
              href: 'https://registry.gdut.edu.cn/',
            },
	          {
              label: '校内测速站',
              href: 'https://speed.gdut.edu.cn',
	          },
          ],
        },
        {
          title: '更多',
          items: [
            //{
            //  label: 'Blog',
            //  to: '/blog',
            //},
            {
              label: '文档源码',
              href: 'https://github.com/gdut-network-manager/mirrors-gdut-docs',
            },
            {
              label: '镜像站源码',
              href: 'https://github.com/chn-lee-yumi/mirrors-gdut',
            },
          ],
        },
      ],
      copyright: `版权所有 © ${new Date().getFullYear()} 广东工业大学网管队. 基于 MIT 协议开源. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['bash', 'ini', 'toml', 'properties', 'lisp', 'powershell', 'perl'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;

