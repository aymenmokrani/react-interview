export default function (
  state = { movies: [], nbCards: 12, categories: [] },
  action
) {
  switch (action.type) {
    case "SET_MOVIES":
      return {
        ...state,
        movies: action.payload,
      };
    case "GET_CATEGORIES":
      return {
        ...state,
        categories: action.payload,
      };
    case "LIKE_MOVIE":
      return {
        ...state,
        movies: state.movies.map((movie) =>
          movie.id === action.payload.id
            ? action.payload.value === 1
              ? {
                  ...movie,
                  dislikes:
                    movie.isLiked === -1 ? movie.dislikes - 1 : movie.dislikes,
                  isLiked: 1,
                  likes: movie.likes + 1,
                }
              : action.payload.value === 0
              ? {
                  ...movie,
                  likes: movie.isLiked === 1 ? movie.likes - 1 : movie.likes,
                  dislikes:
                    movie.isLiked === -1 ? movie.dislikes - 1 : movie.dislikes,
                  isLiked: 0,
                }
              : {
                  ...movie,
                  likes: movie.isLiked === 1 ? movie.likes - 1 : movie.likes,
                  isLiked: -1,
                  dislikes: movie.dislikes + 1,
                }
            : movie
        ),
      };
    case "REMOVE_MOVIE":
      return {
        ...state,
        movies: [
          ...state.movies.filter((movie) => movie.id !== action.payload),
        ],
      };
    default:
      return { ...state };
  }
}
