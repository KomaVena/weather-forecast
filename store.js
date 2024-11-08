import { createStore } from 'redux';

const initialState = {
  favoriteCities: [],
  temperatureUnit: 'metric'
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_FAVORITE':
      return {
        ...state,
        favoriteCities: [...state.favoriteCities, action.city]
      };
    case 'REMOVE_FAVORITE':
      return {
        ...state,
        favoriteCities: state.favoriteCities.filter(city => city !== action.city)
      };
    case 'SET_TEMP_UNIT':
      return {
        ...state,
        temperatureUnit: action.unit
      };
    default:
      return state;
  }
};

const store = createStore(rootReducer);

export default store;
