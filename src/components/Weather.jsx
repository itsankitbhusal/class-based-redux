import { Component } from "react";
import { connect } from "react-redux";
import { setCityName, fetchWeatherData } from "../actions/weatherAction";
import Card from "./Card";

class Weather extends Component {
  componentDidMount() {
    const { searchCity, fetchWeatherData } = this.props;
    fetchWeatherData(searchCity);
  }

  handleCityChange = (e) => {
    this.props.setCityName(e.target.value);
  };

  handleLoadMore = () => {
    // Handle load more logic if needed
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.fetchWeatherData(this.props.searchCity);
  };

  printTime = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString();
  };

  printTemp = (kelvin) => {
    return Math.round(kelvin - 273.15);
  };

  render() {
    // console.log("props print", this.props);
    const { isLoading, error, weatherData } = this.props;

    return (
      <>
        {isLoading && !error && (
          <div className="absolute left-[50vh] top-5 text-4xl text-white">
            Loading...
          </div>
        )}
        {weatherData && weatherData.main ? (
          <div className="bg-white h-[80vh] w-[80vw] rounded drop-shadow-2xl flex justify-between items-center">
            <div className=" h-full w-1/2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white grid place-items-center">
              <div className=" grid place-items-center">
                <img
                  src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                  alt="api"
                />
                <h3 className=" text-7xl font-bold">
                  {this.printTemp(weatherData.main.temp)}&deg;c
                </h3>
                <p className=" text-4xl font-bold">
                  {weatherData.name + " "}
                  <span className=" text-blue-900">
                    {weatherData.sys.country}
                  </span>
                </p>
                <Card
                  firstData={this.printTime(weatherData.sys.sunrise)}
                  firstName={"Sunrise"}
                  secondData={this.printTime(weatherData.sys.sunset)}
                  secondName={"Sunset"}
                />

                <Card
                  firstData={weatherData.main.humidity + "%"}
                  firstName={"Humidity"}
                  secondData={weatherData.wind.speed + "km/h"}
                  secondName={"Wind Speed"}
                />
                <div>
                  <Card
                    firstData={`${this.printTemp(
                      weatherData.main.feels_like
                    )}°c`}
                    firstName={"Feels Like"}
                    secondData={weatherData.main.pressure}
                    secondName={"Pressure"}
                  />

                  <Card
                    firstData={`${this.printTemp(weatherData.main.temp_min)}°c`}
                    firstName={"Min Temp"}
                    secondData={`${this.printTemp(
                      weatherData.main.temp_max
                    )}°c`}
                    secondName={"Max Temp"}
                  />
                </div>
              </div>
            </div>

            <div className=" h-auto w-1/2 grid place-items-center">
              <div>
                <form onSubmit={this.handleSubmit} className=" flex gap-4">
                  <input
                    placeholder="Enter city name"
                    onChange={this.handleCityChange}
                    name="city"
                    className=" border-b-2 focus:outline-none rounded-sm px-2 py-1"
                  ></input>
                  <button
                    type="submit"
                    className=" bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-3 py-1 font-semibold rounded-sm hover:bg-gradient-to-r hover:from-blue-700 hover:to-cyan-700 transition-all"
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        ) : (
          "some error occured"
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  searchCity: state.searchCity,
  isLoading: state.weatherData,
  error: state.weatherData,
  weatherData: state.weatherData,
});

const mapDispatchToProps = {
  setCityName,
  fetchWeatherData,
};

export default connect(mapStateToProps, mapDispatchToProps)(Weather);
