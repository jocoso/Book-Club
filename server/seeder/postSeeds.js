const { Post } = require('../models');

const postData = [
  { title: 'Dune Discussion', content: 'Let’s talk about Dune!', club_id: 1, user_id: 1 },
  { title: 'Harry Potter Theories', content: 'What do you think?', club_id: 2, user_id: 2 }
];

async function seedPosts() {
  try {
    await Post.bulkCreate(postData);
    console.log('Posts seeded successfully');
  } catch (err) {
    console.error('Error seeding posts:', err);
  }
}

module.exports = seedPosts;
