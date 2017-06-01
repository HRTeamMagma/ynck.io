const models = require('../models');
var faker = require('faker');
var randomWords = require('random-words');

let createTag = (knex, id) => {
  return knex('tags').insert({
    id,
    name: randomWords()
  });
};

let createImage = (knex, id) => {
  return knex('images').insert({
    id,
    url: faker.image.imageUrl()
  });
};

let createTagImage = (knex, imageId, tagId) => {
  return knex('tags_images').insert({
    image_id: imageId,
    tag_id: tagId
  });
};

exports.seed = function (knex, Promise) {

  return models.Profile.where({ email: 'admin@domain.com' }).fetch()
    .then((profile) => {
      if (profile) {
        throw profile;
      }
      return models.Profile.forge({
        first: 'System',
        last: 'Admin',
        display: 'Administrator',
        email: 'admin@domain.com',
        shop_id: null
      }).save();
    })
    .error(err => {
      console.error('ERROR: failed to create profile');
      throw err;
    })
    .then((profile) => {
      return models.Auth.forge({
        type: 'local',
        password: 'admin123',
        profile_id: profile.get('id')
      }).save();
    })
    .error(err => {
      console.error('ERROR: failed to create auth');
    })
    .catch(() => {
      console.log('WARNING: defualt user already exists.');
    })
    .then(() => {
      return knex('profiles').insert([
        {
          first: 'System2',
          last: 'Admin2',
          display: 'Administrator2',
          email: 'admin2@domain.com',
          shop_id: null
        },
        {
          first: 'Bazooka',
          last: 'Joe',
          display: 'Mr. Cool',
          email: 'cool@bazooka.com',
          shop_id: null
        },
        {
          first: 'Beyonce',
          last: 'Knowles',
          display: 'Bey',
          email: 'beyonce@beyonce.com',
          shop_id: null
        }
      ]);
    })
    .then(() => {
      return knex('auths').insert([
        {
          type: 'local',
          password: 'admin123',
          profile_id: 1
        },
        {
          type: 'local',
          password: 'bazooka123',
          profile_id: 2
        },
        {
          type: 'local',
          password: 'bey123',
          profile_id: 3
        }
      ]);
    })
    .then(() => {
      let records = [];
      for (let i = 1; i <= 20; i++) {
        records.push(createImage(knex, i));
      }
      return Promise.all(records);
    })
    .then(() => {
      let tags = [];
      for ( let i = 1; i <= 10; i++ ) {
        tags.push( createTag( knex, i) );
      }
      return Promise.all(tags);
    })
    .then(() => {
      let records = [];

      for ( let i = 1; i <= 10; i++) {
        records.push( createTagImage( knex, ( Math.floor( Math.random() * 10 ) + 1 ), i ) );
        records.push( createTagImage( knex, i, ( Math.floor( Math.random() * 10 ) + 1 ) ) );
      }
      return Promise.all(records);
    })
    .then(() => {
      return knex('shops').insert([
        {
          name: randomWords(),
          url: faker.internet.url(),
          address1: faker.address.streetAddress(),
          address2: faker.address.secondaryAddress(),
          city: faker.address.city(),
          state: faker.address.state(),
          zip: faker.address.zipCode(),
          phone: faker.phone.phoneNumber()
        },
        {
          name: randomWords(),
          url: faker.internet.url(),
          address1: faker.address.streetAddress(),
          address2: faker.address.secondaryAddress(),
          city: faker.address.city(),
          state: faker.address.state(),
          zip: faker.address.zipCode(),
          phone: faker.phone.phoneNumber()
        }
      ]);
    })
    .then(() => {
      return knex('profiles').where('id', '=', '1')
      .update({
        shop_id: 2
      });
    })
    .then(() => {
      return knex('profiles').where('id', '=', '2')
      .update({
        shop_id: 1
      });
    })
    .then(() => {
      return knex('profiles_images').insert([
        {
          user_id: 1,
          image_id: 1,
          image_type: 'design'
        },
        {
          user_id: 2,
          image_id: 2,
          image_type: 'tattoo'
        },
        {
          user_id: 3,
          image_id: 3,
          image_type: 'inspiration'
        }
      ]);
    })
    .then(() => {

    });
};
