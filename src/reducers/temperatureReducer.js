const initialState = { unit: 'Celsius' };

const temperatureReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'TOGGLE_UNIT':
      return {
        ...state,
        unit: state.unit === 'Celsius' ? 'Fahrenheit' : 'Celsius',
      };
    default:
      return state;
  }
};

export default temperatureReducer;
