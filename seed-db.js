const database = require('./lib/database');
const Advert = require('./models/Advert');

database.once('open', async () => {
  try {
    await Advert.deleteMany();
    await Advert.insertMany([
      {
        name: 'Ad for sale 1',
        price: 100,
        sale: true,
        image: '/images/samplead1.png',
        tags: ['work', 'lifestyle'],
      },
      {
        name: 'Ad for purchase 1',
        price: 150,
        sale: false,
        image: '/images/samplead1.png',
        tags: ['motor', 'work'],
      },
    ]);
    console.log('Seeding success');
    database.close();
  } catch (connectionError) {
    console.error('An error has occurred: ', connectionError);
    process.exit(1);
  }
});
