const User = require('../models/User');

const seedUsers = async () => {
  const count = await User.countDocuments();
  if (count === 0) {
    const initialUsers = [
      'Rahul', 'Kamal', 'Sanak', 'Amit', 'Priya', 'Neha', 'Vikas', 'Anjali', 'Rohit', 'Sneha'
    ].map(name => ({ name }));
    await User.insertMany(initialUsers);
    console.log('Seeded initial users');
  }
};

module.exports = seedUsers; 