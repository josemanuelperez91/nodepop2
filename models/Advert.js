const mongoose = require('mongoose');

const advertSchema = mongoose.Schema({
  name: { type: String, index: true, required: 'Title is required' },
  price: { type: Number, index: true, required: 'Price is required' },
  sale: { type: Boolean, index: true, required: 'Type of Ad is required' },
  image: String,
  tags: { type: [String], index: true },
  username: { type: String, index: true, required: 'Username is required' },
  last_update: {
    type: Date,
    default: Date.now,
    required: 'Date must be created',
  },
});

advertSchema.statics.queryDocs = function (filter, search, pagination) {
  const query = this.find(filter);

  search.name && query.regex('name', new RegExp(`^${search.name}`, 'i'));

  if (search.price) {
    const priceArray = search.price.split('-');
    query.where('price');

    priceArray[0] && query.gte(parseFloat(priceArray[0]));
    priceArray[1] && query.lte(parseFloat(priceArray[1]));
  }
  pagination.skip && query.skip(parseInt(pagination.skip));
  pagination.limit && query.limit(parseInt(pagination.limit));
  query.sort({ last_update: 'desc' });

  return query.exec();
};
advertSchema.statics.queryTags = function () {
  const query = this.find().distinct('tags');
  return query.exec();
};

const Advert = mongoose.model('Advert', advertSchema);

module.exports = Advert;
