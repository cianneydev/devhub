import { defineConfig } from 'vitepress';

export default defineConfig({
  title: 'DevHub',
  description: 'Le hub central du développeur moderne — CLI tout-en-un',

  base: '/devhub/',
  cleanUrls: false,
  ignoreDeadLinks: true,

  head: [
    ['link', { rel: 'canonical', href: 'https://cianneydev.github.io/devhub/' }],
    ['meta', { name: 'google-site-verification', content: 'B0jPipYXxtLdEwcxLnoEd1IOGEAhoHw_V9UACXFrew' }],
    [
      'script',
      {},
      `
        (function() {
          const urlParams = new URLSearchParams(window.location.search);
          const redirect = urlParams.get('redirect');
          if (redirect) {
            window.history.replaceState({}, '', redirect);
          }
        })();
      `
    ]
  ],

  themeConfig: {
    logo: '/logo.png',

    nav: [
      { text: 'Accueil', link: '/' },
      { text: 'Guide', link: '/guide/getting-started' },
      { text: 'Roadmap', link: '/guide/roadmap' },
      { text: 'DevHub Web (bientôt)', link: '#' },
      { text: 'GitHub', link: 'https://github.com/cianneydev/devhub' },
    ],

    sidebar: [
      {
        text: '🚀 Démarrage',
        items: [
          { text: '📥 Installation', link: '/guide/getting-started' },
          { text: '🗺️ Roadmap', link: '/guide/roadmap' },
        ],
      },
      {
        text: '📚 Commandes',
        items: [
          { text: '📝 Snippets', link: '/guide/snippets' },
          { text: '📋 Copier', link: '/guide/copy' },
          { text: '📓 Notes', link: '/guide/notes' },
          { text: '📊 Projets', link: '/guide/project' },
          { text: '✅ Tâches', link: '/guide/task' },
          { text: '🔍 Recherche', link: '/guide/search' },
          { text: '⚡ Avancé', link: '/guide/advanced' },
          { text: '🖥️ Interface TUI', link: '/guide/ui' },
        ],
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/cianneydev/devhub' },
    ],

    footer: {
      message: 'Publié sous licence MIT · CIANNEY LABS',
      copyright: 'Copyright © 2026 cianneydev',
    },

    search: {
      provider: 'local',
    },

    outline: {
      label: 'Sur cette page',
      level: [2, 3],
    },

    docFooter: {
      prev: 'Page précédente',
      next: 'Page suivante',
    },

    lastUpdated: {
      text: 'Mis à jour le',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'short',
      },
    },
  },
});