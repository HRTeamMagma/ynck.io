const models = require('../models');
const photoData = require('../../photoData');

let createTag = (knex, id, word) => {
  return knex('tags').insert({
    id,
    name: word
  });
};

let createTagImage = (knex, imageId, tagId) => {
  return knex('images_tags').insert({
    image_id: imageId,
    tag_id: tagId
  });
};

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('table_name').del()
    .then(function () {
      // Inserts seed entries
      return knex('table_name').insert([
        {id: 1, colName: 'rowValue1'},
        {id: 2, colName: 'rowValue2'},
        {id: 3, colName: 'rowValue3'}
      ]);
    });
};
