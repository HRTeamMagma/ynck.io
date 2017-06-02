const models = require('../../db/models');
const knex = require('../../db/').knex;

module.exports.getLatestImages = (req, res) => {
  knex.raw(`select * from images inner join images_profiles on images_profiles.image_id = images.id and images_profiles.image_type = 'tattoo' limit 3;`)
  .then((results) => {
    console.log(results.rows);
    res.send(results.rows);
  });
  
  //  inner join images_tags where images.id = images_tags.image_id inner join tags on tags.id = images_tags.tag_id;
  // models.Image
  // .query( (qb) => {
  //   qb.where('image_type', '=', 'tattoo');
  // })
  // .orderBy('created_at')
  // .fetchPage({
  //   pageSize: 10,
  //   page: 1
  // })
  // .then((result) => {
  //   console.log(result);
  // })

  // .orderBy('created_at')
  // .fetchPage({
  //   pageSize: 10,
  //   page: 1,
  //   withRelated: 'tags'
  // })
  // .then((images) => {
  //   console.log(images);
  //   res.send('yo');
  // }) 
};