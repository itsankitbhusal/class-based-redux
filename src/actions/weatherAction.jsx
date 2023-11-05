import {
  SET_CITY_NAME,
  FETCH_WEATHER_DATA_REQUEST,
  FETCH_WEATHER_DATA_SUCCESS,
  FETCH_WEATHER_DATA_FAILURE,
} from "../actionTypes/actionTypes";

export const setCityName = (city) => ({
  type: SET_CITY_NAME,
  payload: city,
});

export const fetchWeatherData = (city) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_WEATHER_DATA_REQUEST });

    try {
      const { VITE_API_KEY: apiKey, VITE_BASE_URL: baseUrl } = import.meta.env;
      const response = await fetch(
        `${baseUrl}weather?q=${city}&&appid=${apiKey}`
      );
      const data = await response.json();

      dispatch({
        type: FETCH_WEATHER_DATA_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: FETCH_WEATHER_DATA_FAILURE,
        payload: error.message,
      });
    }
  };
};

export const fetchWeatherDataRequest = () => ({
  type: FETCH_WEATHER_DATA_REQUEST,
});

export const fetchWeatherDataSuccess = (data) => ({
  type: FETCH_WEATHER_DATA_SUCCESS,
  payload: data,
});

export const fetchWeatherDataFailure = () => ({
  type: FETCH_WEATHER_DATA_FAILURE,
});
