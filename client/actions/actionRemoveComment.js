export var removeComment = function (postId, i) {
  return {
    type: 'REMOVE_COMMENT',
    i, 
    postId
  };
};