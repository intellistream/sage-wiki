import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Sage Wiki',
  tagline: '团队知识库 — 沉淀技术，共享成长',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  url: 'https://lab.sage.org.ai',
  baseUrl: '/sage-wiki/',

  organizationName: 'intellistream',
  projectName: 'sage-wiki',

  onBrokenLinks: 'warn',

  i18n: {
    defaultLocale: 'zh-Hans',
    locales: ['zh-Hans'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/intellistream/sage-wiki/edit/main/',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          editUrl: 'https://github.com/intellistream/sage-wiki/edit/main/',
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themes: [
    [
      require.resolve('@easyops-cn/docusaurus-search-local'),
      {
        hashed: true,
        language: ['zh', 'en'],
        highlightSearchTermsOnTargetPage: true,
      },
    ],
  ],

  themeConfig: {
    image: 'img/sage-wiki-social-card.jpg',
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'Sage Wiki',
      logo: {
        alt: 'Sage Wiki Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          to: '/docs/intro',
          label: 'Wiki',
          position: 'left',
          activeBaseRegex: '/docs/(?!blog)',
        },
        {
          to: '/blog',
          label: '博客',
          position: 'left',
        },
        {
          href: 'https://github.com/intellistream/sage-wiki',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: '文档',
          items: [
            {label: '成果展示', to: '/docs/achievements/'},
            {label: '学习教程', to: '/docs/tutorials/'},
            {label: '技术心得', to: '/docs/tech-notes/'},
          ],
        },
        {
          title: '更多',
          items: [
            {label: '团队规范', to: '/docs/standards/'},
            {label: '资源汇总', to: '/docs/resources/'},
            {label: '博客', to: '/blog'},
          ],
        },
        {
          title: '链接',
          items: [
            {label: 'GitHub', href: 'https://github.com/intellistream/sage-wiki'},
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Intellistream. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
