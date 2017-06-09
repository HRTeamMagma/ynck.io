'use strict';

const yelp = require('yelp-fusion');

const clientId = process.env.YELP_CLIENT_ID;
const clientSecret = process.env.YELP_CLIENT_SECRET;
console.log(clientId, clientSecret);

const searchRequest = {
  term: 'tattoo',
  location: 'san francisco, ca'
};

yelp.accessToken(clientId, clientSecret).then(response => {
  const client = yelp.client(response.jsonBody.access_token);

  client.search(searchRequest).then(response => {
    console.log(response.jsonBody.businesses);
    // const firstResult = response.jsonBody.businesses[0];
    // const prettyJson = JSON.stringify(firstResult, null, 4);
    // console.log(prettyJson);
  });
}).catch(e => {
  console.log(e);
});