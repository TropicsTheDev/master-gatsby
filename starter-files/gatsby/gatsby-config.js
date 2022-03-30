// This file is empty, but some people were reporting that it would not start unless they had an empty file. So here it is! You can delete the comment. Or replace it with your favourite shania twain lyrics.
export default {
  siteMetadata: {
    title: `Slick's Slices`,
    siteUrl: 'https://gatsby.pizza',
    description: 'The best pizza place in Hamilton',
  },
  plugins: [
    'gatsby-plugin-styled-components',
    {
      // name of plugin
      resolve: 'gatsby-source-sanity',
      options: {
        projectId: 'uw5k246k',
        dataset: 'production',
        watchMode: true,
        token: process.env.SANITY_TOKEN,
      },
    },
  ],
};
