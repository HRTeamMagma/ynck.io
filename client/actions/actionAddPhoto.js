export var addPhoto = function (postId, author, photo) {
  return {
    type: 'ADD_PHOTO',
    postId,
    author,
    photo
  };
};