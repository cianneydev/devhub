import { defineConfig } from 'vitepress';

export default defineConfig({
  title: 'DevHub',
  description: 'Le hub central du développeur moderne — CLI tout-en-un',

  // ✅ Correspond exactement au nom du dépôt en minuscules
  base: '/devhub/',

  // ✅ Désactivé pour éviter les problèmes de routage sur GitHub Pages
  cleanUrls: false,

  ignoreDeadLinks: true,

  head: [
    // Balise canonique pour le SEO
    ['link', { rel: 'canonical', href: 'https://cianneydev.github.io/devhub/' }],
    
    // Vérification Google Search Console
    ['meta', { name: 'google-site-verification', content: 'B0jPipYXxtLdEwcxLnoEd1IOGEAhoHw_V9UACXFrew' }],
    
    // ✅ Script pour restaurer l'URL après un 404 sur GitHub Pages
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
      { text: 'GitHub', link: 'https://github.com/cianneydev/devhub' },
    ],

    sidebar: [
      {
        text: '🚀 Démarrage',
        items: [
          { text: 'Installation', link: '/guide/getting-started' },
        ],
      },
      {
        text: '📚 Commandes',
        items: [
          { text: 'Snippets', link: '/guide/snippets' },
          { text: 'Copier', link: '/guide/copy' },
          { text: 'Notes', link: '/guide/notes' },
          { text: 'Recherche', link: '/guide/search' },
          { text: 'Avancé', link: '/guide/advanced' },
          { text: 'Interface TUI', link: '/guide/ui' },
        ],
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/cianneydev/devhub' },
    ],

    footer: {
      message: 'Publié sous licence MIT',
      copyright: 'Copyright © 2026 cianneydev',
    },

    search: {
      provider: 'local',
    },
  },
});