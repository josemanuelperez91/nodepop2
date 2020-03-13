const database = require('./lib/database');
const Advert = require('./models/Advert');

database.once('open', async () => {
  try {
    await Advert.deleteMany();
    await Advert.insertMany([
      {
        name: 'Ad for selling 1',
        price: 100,
        sell: true,
        image: '/images/samplead1.png',
        tags: ['work', 'lifestyle', 'motor', 'mobile']
      },
      {
        name: 'Ad for buying 1',
        price: 150,
        sell: false,
        image: '/images/samplead1.png',
        tags: []
      }
    ]);
    console.log('Seeding success');
    database.close();
  } catch (connectionError) {
    console.error('An error has occurred: ', connectionError);
    process.exit(1);
  }
});
