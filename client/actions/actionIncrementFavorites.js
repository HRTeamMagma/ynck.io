export var increment = function (index) {
  return {
    type: 'INCREMENT_FAVORITES',
    index
  };
};