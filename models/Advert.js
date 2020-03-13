const mongoose = require('mongoose');

const advertSchema = mongoose.Schema({
  name: String,
  price: Number,
  sell: Boolean,
  image: String,
  tags: [String]
});

// advertSchema.statics.queryDocs = function(filter, limit, skip, sort, fields) {
//   const query = this.find(filter);
//   query.limit(limit);
//   query.skip(skip);
//   query.sort(sort);
//   query.select(fields);
//   return query.exec();
// };
advertSchema.statics.queryDocs = function() {
  // const query = this.find(filter);
  // query.limit(limit);
  // query.skip(skip);
  // query.sort(sort);
  // query.select(fields);
  return this.find();
};
const Advert = mongoose.model('Advert', advertSchema);

module.exports = Advert;
