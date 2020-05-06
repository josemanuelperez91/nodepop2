const mongoose = require('mongoose');

const advertSchema = mongoose.Schema({
  name: { type: String, index: true },
  price: { type: Number, index: true },
  sale: { type: Boolean, index: true },
  image: String,
  tags: { type: [String], index: true },
  thumb: String,
});

advertSchema.statics.queryDocs = function (filter, search, pagination, sort) {
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
  sort && query.sort(sort);

  return query.exec();
};
advertSchema.statics.queryTags = function () {
  const query = this.find().distinct('tags');
  return query.exec();
};
const Advert = mongoose.model('Advert', advertSchema);

module.exports = Advert;
