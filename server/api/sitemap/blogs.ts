export default defineSitemapEventHandler(async (event) => {
  try {
    // Fetching data from the external API
    const blogs = await $fetch('https://api.intstu.org/blogs/blog/?limit=100');

    // Assuming 'blogs' is an array of blog objects with relevant properties
    console.log('Fetched blogs:', blogs);
    return blogs.data.results.map(blog => {
      return {
        loc: `/blog/${blog.slug}`, // Assuming each blog has a 'slug' property
        lastmod: new Date().toISOString(), // Assuming each blog has a 'modifiedAt' property
        _i18nTransform: true, // Enable i18n transformation
      };
    });
  } catch (error) {
    console.error('Failed to fetch blogs:', error);
    throw new Error('Failed to fetch blogs');
  }
});
