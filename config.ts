const config = {
  siteName: 'Next.js CMS',
  siteDescription: 'Example of the CMS based on Next 13',
  siteUrl: 'https://nextjs-app-router-examples.vercel.app',
  githubUrl: 'https://github.com/gregrickaby/nextjs-app-router-examples',
  author: 'Author',
  nav: [
    {
      name: 'Home',
      path: '/',
    },
    {
      name: 'About',
      path: '/about',
    },
    {
      name: 'Blog',
      path: '/blog',
    },
  ],
  navAdmin: [
    {
      name: 'Articles',
      path: '/admin/articles',
    },
    {
      name: 'Comments',
      path: '/admin/comments',
    },
  ],
};

export default config;
