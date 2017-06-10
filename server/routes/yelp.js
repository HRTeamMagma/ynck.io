const yelp = require('yelp-fusion');
const clientId = process.env.YELP_CLIENT_ID;
const clientSecret = process.env.YELP_CLIENT_SECRET;

module.exports = (query, callback) => {
  const searchRequest = {
    term: query.term,
    location: query.location,
    limit: 10,
    category_filter: 'beautysvc,All,tattoo,All'
  };

  yelp.accessToken(clientId, clientSecret).then(response => {
    const client = yelp.client(response.jsonBody.access_token);

    client.search(searchRequest).then(response => {
      callback(null, response.jsonBody.businesses);
    });
  }).catch(e => {
    callback(e, null);
  });
  
};
