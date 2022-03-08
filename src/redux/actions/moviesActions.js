export const setMovies = (movies) => {
  return {
    type: "SET_MOVIES",
    payload: movies,
  };
};

export const setCategories = (categories) => {
  return {
    type: "SET_CATEGORIES",
    payload: categories,
  };
};

export const likeMovie = (id, value) => {
  return {
    type: "LIKE_MOVIE",
    payload: { id, value },
  };
};

export const dislikeMovie = (id) => {
  return {
    type: "DISLIKE_MOVIE",
    payload: id,
  };
};

export const removeMovie = (id) => {
  return {
    type: "REMOVE_MOVIE",
    payload: id,
  };
};
