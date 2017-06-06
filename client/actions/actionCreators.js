export var increment = function (index) {
  return {
    type: 'INCREMENT_LIKES',
    index
  };
};

export var decrement = function (index) {
  return {
    type: 'DECREMENT_LIKES',
    index
  };
};

export var addComment = function (postId, author, comment) {
  return {
    type: 'ADD_COMMENT',
    postId,
    author,
    comment
  };
};


export var removeComment = function (postId, i) {
  return {
    type: 'REMOVE_COMMENT',
    i, 
    postId
  };
};