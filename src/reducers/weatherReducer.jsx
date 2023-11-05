import {
  SET_CITY_NAME,
  FETCH_WEATHER_DATA_REQUEST,
  FETCH_WEATHER_DATA_SUCCESS,
  FETCH_WEATHER_DATA_FAILURE,
} from "../actionTypes/actionTypes";

const initialState = {
  searchCity: "kawasoti",
  isLoading: false,
  error: null,
  weatherData: {},
};

const weatherReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CITY_NAME:
      return {
        ...state,
        searchCity: action.payload,
      };

    case FETCH_WEATHER_DATA_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case FETCH_WEATHER_DATA_SUCCESS:
      return {
        ...state,
        isLoading: false,
        weatherData: action.payload,
      };
    case FETCH_WEATHER_DATA_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: "Error occurred while fetching weather data.",
      };
    default:
      return state;
  }
};

export default weatherReducer;
