require('dotenv').config();

const database = require('./lib/database');
const Advert = require('./models/Advert');
const User = require('./models/User');

database.once('open', async () => {
  try {
    await Advert.deleteMany();
    await Advert.insertMany([
      {
        name: 'Ad for sale 1',
        price: 100,
        sale: true,
        image: process.env.API_URL + '/images/samplead1.png',
        tags: ['RPG', 'Puzzle'],
        username: 'user',
      },
      {
        name: 'Ad for purchase 1',
        price: 150,
        sale: false,
        image: process.env.API_URL + '/images/samplead1.png',
        tags: ['Adventure'],
        username: 'user2',
      },
    ]);

    await User.deleteMany();
    await User.insertMany([
      {
        username: 'user',
        email: 'user@example.com',
        password: await User.hashPassword('1234'),
      },
    ]);

    console.log('Seeding success');
    database.close();
  } catch (connectionError) {
    console.error('An error has occurred: ', connectionError);
    process.exit(1);
  }
});
