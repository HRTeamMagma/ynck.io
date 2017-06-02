const models = require('../models');
var faker = require('faker');
var randomWords = require('random-words');

let createTag = (knex, id, word) => {
  return knex('tags').insert({
    id,
    name: word
  });
};

let createImage = (knex, id) => {
  return knex('images').insert({
    id,
    url: faker.image.imageUrl()
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
      for (let i = 1; i <= 20; i++) {
        records.push(createImage(knex, i));
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
          name: randomWords(),
          url: faker.internet.url(),
          address1: faker.address.streetAddress(),
          address2: faker.address.secondaryAddress(),
          city: faker.address.city(),
          state: faker.address.state(),
          zip: faker.address.zipCode(),
          phone: faker.phone.phoneNumber(),
          shop_image: 'https://www.form.ink/wp-content/uploads/2016/02/best-tattoo-shops-in-atlanta-abt-tattoo.png'
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
          shop_image: 'https://c1.staticflickr.com/3/2112/2183178160_2064667a4d_z.jpg'
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
      return knex('images_profiles').insert([
        {
          profile_id: 1,
          image_id: 1,
          image_type: 'design'
        },
        {
          profile_id: 1,
          image_id: 2,
          image_type: 'tattoo'
        },
        {
          profile_id: 1,
          image_id: 3,
          image_type: 'inspiration'
        },
        {
          profile_id: 1,
          image_id: 4,
          image_type: 'design'
        },
        {
          profile_id: 2,
          image_id: 5,
          image_type: 'tattoo'
        },
        {
          profile_id: 2,
          image_id: 6,
          image_type: 'inspiration'
        },
        {
          profile_id: 2,
          image_id: 7,
          image_type: 'design'
        },
        {
          profile_id: 2,
          image_id: 8,
          image_type: 'tattoo'
        },
        {
          profile_id: 3,
          image_id: 9,
          image_type: 'inspiration'
        },
        {
          profile_id: 3,
          image_id: 10,
          image_type: 'design'
        },
        {
          profile_id: 3,
          image_id: 11,
          image_type: 'tattoo'
        },
        {
          profile_id: 3,
          image_id: 12,
          image_type: 'inspiration'
        }
      ]);
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
        }
      ]);
    });
};
