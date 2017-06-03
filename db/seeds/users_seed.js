const models = require('../models');
const photoData = require('../../photoData');
var faker = require('faker');
var randomWords = require('random-words');
const dummyData = require('../../dummyData');

let createShopImage = (knex, id) => {
  return knex('shop_images').insert({
    title: randomWords(),
    url: dummyData.shop.images[i],
    shop_id: 1
  });
};

let createTag = (knex, id, word) => {
  return knex('tags').insert({
    id,
    name: word
  });
};

let createImage = (knex, photo, id) => {
  Math.floor(Math.random() * 3);
  var types = ['tattoo', 'inspiration', 'design'];
  return knex('images').insert({
    id,
    url: photo.url,
    profile_id: Math.floor(Math.random() * 4) + 1,
    image_type: types[Math.floor(Math.random() * 3)],
    favoriteCount: Math.floor(Math.random() * 100)
  });
};

let createTagImage = (knex, imageId, tagId) => {
  return knex('images_tags').insert({
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
        shop_id: null,
        profile_image: 'https://pbs.twimg.com/profile_images/863826013251227648/bvhrddjv.jpg'
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
          shop_id: null,
          profile_image: 'https://pbs.twimg.com/profile_images/865981444161642496/-wxhRxPD.jpg'
        },
        {
          first: 'Bazooka',
          last: 'Joe',
          display: 'Mr. Cool',
          email: 'cool@bazooka.com',
          shop_id: null,
          profile_image: 'https://pbs.twimg.com/profile_images/718588760003383296/2AG8omMO.jpg'
        },
        {
          first: 'Beyonce',
          last: 'Knowles',
          display: 'Bey',
          email: 'beyonce@beyonce.com',
          shop_id: null,
          profile_image: 'https://pbs.twimg.com/profile_images/860171768119517187/2UlAzLGD.jpg'
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
      console.log(photoData.data.length);
      for (let i = 1; i < photoData.data.length; i++) {
        records.push(createImage(knex, photoData.data[i], i));
      }
      return Promise.all(records);
    })
    .then(() => {
      let words = ['funny', 'cute', 'classic', 'flash', 'cartoon', 'crazy', 'simple', 'nerd', 'videogame', 'retro'];
      let tags = [];
      for ( let i = 1; i <= 10; i++ ) {
        tags.push( createTag( knex, i, words[i - 1]) );
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
          name: 'High Voltage Tattoo',
          url: 'http://www.highvoltagetattoo.com/',
          address1: '1259 North La Brea Avenue',
          address2: 'Suite 200',
          city: 'West Hollywood',
          state: 'California',
          zip: '90038-1023',
          phone: '310-555-1212',
          rating: '4.5',
          profileImage: 'https://store.bandmerch.com/katvond/v1/img/logo.png'
        },
        {
          name: randomWords(),
          url: faker.internet.url(),
          address1: faker.address.streetAddress(),
          address2: faker.address.secondaryAddress(),
          city: faker.address.city(),
          state: faker.address.state(),
          zip: faker.address.zipCode(),
          phone: faker.phone.phoneNumber(),
          rating: '1.7',
          profileImage: 'https://c1.staticflickr.com/3/2112/2183178160_2064667a4d_z.jpg'
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
      return knex('ratings').insert([
        {
          shop_id: 2,
          profile_id: 3,
          value: 4
        },
        {
          shop_id: 1,
          profile_id: 3,
          value: 1
        },
        {
          shop_id: 1,
          profile_id: 1,
          value: 5
        },
        {
          shop_id: 2,
          profile_id: 2,
          value: 5
        }
      ]);
    })
    .then(() => {
      let shopImages = [];
      dummyData.shop.images.forEach(function(image, index) {
        shopImages.push(createShopImage(knex, index));
      });
      return Promise.all(shopImages);
    })
    .then(() => {
      return knex('favorites').insert([
        {
          profile_id: 2,
          image_id: 4
        },
        {
          profile_id: 2,
          image_id: 2
        },
        {
          profile_id: 3,
          image_id: 5
        },
        {
          profile_id: 3,
          image_id: 2
        },
        {
          profile_id: 1,
          image_id: 2
        },
        {
          profile_id: 1,
          image_id: 5
        },
        {
          profile_id: 2,
          image_id: 6
        },
        {
          profile_id: 2,
          image_id: 8
        },
        {
          profile_id: 3,
          image_id: 7
        },
        {
          profile_id: 3,
          image_id: 8
        },
        {
          profile_id: 1,
          image_id: 9
        },
        {
          profile_id: 1,
          image_id: 10
        },
        {
          profile_id: 4,
          image_id: 8
        },
        {
          profile_id: 4,
          image_id: 7
        },
        {
          profile_id: 4,
          image_id: 15
        },
        {
          profile_id: 4,
          image_id: 9
        },
        {
          profile_id: 4,
          image_id: 10
        }
      ]);
    });
};
