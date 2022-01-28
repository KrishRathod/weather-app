import React, { Component } from 'react';
import './App.css';
import Titles from './components/Titles';
import Form from './components/Form';
import Weather from './components/Weather';
import WeatherDetails from './components/WeatherDetails';
import Footer from './components/Footer';
import {COUNTRIES_OPTIONS} from './data/ISO_CountryList';

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

class App extends Component {

  state = {
    cityInput: undefined,
    countryInput: undefined,
    city: undefined,
    country: undefined,
    temperture: undefined,
    humidity: undefined,
    condition: undefined,
    icon: undefined,
    wind: [undefined,undefined],
    error: undefined,
    incorrctCountryNameError: undefined,
    displayComponent: false,
    countryList: []
  }

  //to get location from <Form /> (user inputs)
  getLocations = (city, country, countryNameError) => {
    //handle case: if user enter correct country value
    if (country) {
      // update location state due to user inputs
      this.setState({
        cityInput: city, countryInput: country
      });
    //handle case: if user enter incorrect country value
    //UX: add error message
    } else {
      console.log(':(')
      this.setState({
        incorrctCountryNameError: countryNameError,
        displayComponent: true,
        error: undefined,
        cityInput: city,
        countryInput: country,
        temperture: undefined,
        humidity: undefined,
        condition: undefined,
        icon: undefined,
        wind: [undefined,undefined],
      });
    }
    
    // handle case: that blind user enter another incorrect country input
    // A11y: to get message read another time
    this.delayState();
  }

  // to delay hiding incorrctCountryNameError
  // A11y: to get message read another time 
  delayState= function() {
    setTimeout(() => {
      this.setState({incorrctCountryNameError: undefined});
    }, 3000);
  }
  
  // use - async await - approche to fetch data from openweathermap API
  // add async before our function
  fetchWeather = async (city, country) => {
    try {
      // add await before make a call
      const api_call = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city},${country}&units=metric&APPID=${API_KEY}`);

      // handle response using json() method to turn response into JSON
      const response = await api_call.json();
      console.log(response);
      console.log(city, country);
      console.log(response.message);
      
      // handle case: data is fecthed correctly
      if (response.cod === "200") {
        // update weather state after fetching data
        this.setState( {
          city: response.city.name,
          country: response.city.country,
          temperture : response.list[0].main.temp,
          humidity: response.list[0].main.humidity,
          condition: response.list[0].weather[0].description,
          icon: response.list[0].weather[0].icon,
          wind: [response.list[0].wind.speed, response.list[0].wind.deg],
          error: undefined,
          incorrctCountryNameError: undefined,
          displayComponent: true
        });
        // handle case: user enter incorrect location
        // simulate case: enter wrong locations
        //UX: add error message
       } else if (response.cod === "404") {
          this.setState({
            error : `!Error: ${response.message}, please check location inputs again`,
            incorrctCountryNameError: undefined,
            cityInput: undefined,
            countryInput: undefined,
            city: undefined,
            country: undefined,
            temperture: undefined,
            humidity: undefined,
            condition: undefined,
            icon: undefined,
            wind: [undefined,undefined],
            displayComponent: true
           });

        } else {
        // handle case: if invalid API openweathermap key (Unauthorized error)
        // if (response.cod === "401")
        // simulate case: delete from API key
        //UX: add error message
          this.setState({
            error : `!Error: ${response.message} `,
            incorrctCountryNameError: undefined,
            cityInput: undefined,
            countryInput: undefined,
            city: undefined,
            country: undefined,
            temperture: undefined,
            humidity: undefined,
            condition: undefined,
            icon: undefined,
            wind: [undefined,undefined],
            displayComponent: true
          });
          
        }

    //handle case: if fetch request fails due to network issues or fetched url incorrect
    // User is offline, DNS troubles, network errors
    // simulate case: disconnect internet or delete anything from fetched url
    //UX: add error message
    } catch (error) {
      this.setState({
        cityInput: undefined,
        countryInput: undefined,
        city: undefined,
        country: undefined,
        temperture: undefined,
        humidity: undefined,
        condition: undefined,
        icon: undefined,
        wind: [undefined,undefined],
        displayComponent: true,
        error : `!Error: something went wrong with network`,
        incorrctCountryNameError: undefined
      });
    }
  
  } 

  componentDidMount() {
    console.log('App  componentDidMount')
    this.setState({ countryList : COUNTRIES_OPTIONS }, 
      () => console.log(this.state.countryList));
  }

  // adding prevProps parameter corrected the multiple call issue
  componentDidUpdate(prevProps, prevState) {
      
    
    console.log('App componentDidUpdate', this.state.incorrctCountryNameError, this.state.displayComponent);
    //check value countryInput !== undefined to make network request
    //a network request may not be necessary if the state (locations user enterd) have not changed
    if ((this.state.cityInput !== prevState.cityInput || this.state.countryInput !== prevState.countryInput) && this.state.countryInput !== undefined) {
      
      console.log(this.state.cityInput, prevState.cityInput);
      console.log(this.state.countryInput, prevState.countryInput);
      
      // handle case: that blind user enter another incorrect input
      // A11y: to get message read another time
      if(this.state.error) {
        this.setState({error : undefined});
      }

      this.fetchWeather(this.state.cityInput, this.state.countryInput);
     
    }
    // else if ((this.state.cityInput !== prevState.cityInput || this.state.countryInput !== prevState.countryInput) && this.state.countryInput === undefined) {
    //   if(!this.state.displayComponent) {
    //     this.setState({displayComponent: true});
    //   } else {
    //     this.setState({displayComponent: false});
    //   }
  // }
      
  }
  

  render() {
    console.log('App render');
    return (
      <div className="App">
      
        <Titles />
        <Form 
          onSubmit={this.getLocations}
          countryList={this.state.countryList}
        />
        <Weather 
          city={this.state.city}
          country={this.state.country}
          temperture={this.state.temperture}
          humidity={this.state.humidity}
          condition={this.state.condition}
          icon={this.state.icon}
          wind={this.state.wind}
          error={this.state.error}
          incorrctCountryNameError={this.state.incorrctCountryNameError}
          displayComponent={this.state.displayComponent}
        />

        <WeatherDetails 
          humidity={this.state.humidity}
          condition={this.state.condition}
          wind={this.state.wind}
          displayComponent={this.state.displayComponent}
        />

        <Footer />

      </div>
    );
  }
}

export default App;
