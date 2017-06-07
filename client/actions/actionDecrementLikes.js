export var decrement = function (index) {
  return {
    type: 'DECREMENT_LIKES',
    index
  };
};