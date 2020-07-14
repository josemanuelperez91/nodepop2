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
        image: 'samplead1.png',
        tags: ['work', 'lifestyle'],
      },
      {
        name: 'Ad for purchase 1',
        price: 150,
        sale: false,
        image: 'samplead1.png',
        tags: ['motor'],
      },
    ]);

    await User.deleteMany();
    await User.insertMany([
      {
        username: 'user@example.com',
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
