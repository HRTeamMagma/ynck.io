module.exports.cleanTags = (array) => {
  array.forEach(function(element) {
    if (element.tags.length > 0) {
      element.tags = element.tags.map(tag => {
        return tag.name;
      });
    }
  });
  return array;
};