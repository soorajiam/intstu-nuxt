export default defineSitemapEventHandler(async (event) => {
  try {
    // Fetching data from the external API
    const blogs = await $fetch('https://api.intstu.org/institutes/institutions/?limit=50000');

    // Assuming 'blogs' is an array of blog objects with relevant properties
    return blogs.data.results.map(blog => {
      return `/institutes/${blog.slug}`; // Assuming each blog has a 'slug' property
        
    });
  } catch (error) {
    console.error('Failed to fetch blogs:', error);
    throw new Error('Failed to fetch blogs');
  }
});
