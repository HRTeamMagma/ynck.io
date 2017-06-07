export var removePhoto = function (postId, i) {
  return {
    type: 'REMOVE_PHOTO',
    i, 
    postId
  };
};