const initialState = { favorites: [] };

const favoritesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'TOGGLE_FAVORITE':
      return {
        ...state,
        favorites: state.favorites.includes(action.payload)
          ? state.favorites.filter(city => city !== action.payload)
          : [...state.favorites, action.payload],
      };
    default:
      return state;
  }
};

export default favoritesReducer;
