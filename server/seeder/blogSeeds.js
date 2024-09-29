const { Blog } = require('../models');

const blogData = [
  { title: 'Dune Discussion', content: 'Let’s talk about Dune!', club_id: 1, user_id: 1 },
  { title: 'Harry Potter Theories', content: 'What do you think?', club_id: 2, user_id: 2 }
];

async function seedBlogs() {
  try {
    await Blog.bulkCreate(blogData);
    console.log('Blogs seeded successfully');
  } catch (err) {
    console.error('Error seeding blogs:', err);
  }
}

module.exports = seedBlogs;
