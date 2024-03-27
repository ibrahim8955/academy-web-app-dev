import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'DHIS2 Web Academy',
  tagline: 'Web Academy 2024 - Abidjan, Ivory Coast',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://dhis2.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/academy-web-app-dev/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'dhis2',
  projectName: 'academy-web-app-dev',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/dhis2/academy-web-app-dev/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/dhis2/academy-web-app-dev/tree/main/packages/create-docusaurus/templates/shared/',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/dhis2-logo-rgb-positive-600.png',
    navbar: {
      title: 'DHIS2 Web Academy',
      logo: {
        alt: "DHIS2 Logo",
        src: "img/dhis2-logo.svg",
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'academySidebar',
          position: 'left',
          label: 'Web Academy',
        },
        {
          type: 'docSidebar',
          sidebarId: 'beforeAcademySidebar',
          position: 'left',
          label: 'Before the Academy',
        },
        {to: '/resources', label: 'Resources', position: 'left'},
        {
          href: 'https://github.com/dhis2/academy-web-app-dev',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Resources',
              to: '/resources',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Slack',
              href: 'https://dhis2-dev-community.slack.com',
            }
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/dhis2/academy-web-app-dev',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} DHIS2, Inc. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
