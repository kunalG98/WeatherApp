import React from 'react';
import '../App.scss';
import {Button} from "react-bootstrap";
import { WeatherData } from './WeatherData'
import {StatusData} from './StatusData'

class MyLocationWeather extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: 'init',
      isLoaded: false,
      weatherData: null,
      locationData: null,
      fullData: [],
      dailyData: []
    }
  }

  abortController = new AbortController();
  controllerSignal = this.abortController.signal;

  onClick = () => {
    this.weatherInit();
  }

  weatherInit = () => {

    const success = (position) => {
      this.setState({status: 'fetching'});
      this.getWeatherData(position.coords.latitude, position.coords.longitude);
    }
  
    const error = () => {
      this.setState({status: 'unable'});
      alert('Unable to retrieve location. Using random values. Check your permissions');
      this.getWeatherData(27.2, 77.49);
    }
  
    if (navigator.geolocation) {
      this.setState({status: 'fetching'});
      navigator.geolocation.getCurrentPosition(success, error);

    } else {
      this.setState({status: 'unsupported'});
      alert('Your browser does not support location tracking, or permission is denied.');
    }
  }

  getWeatherData = (lat, lon) => {
    const locationApi = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${process.env.REACT_APP_WEATHER_KEY}`;
    const weatherApi = `http://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&appid=${process.env.REACT_APP_WEATHER_KEY}`;
    
    fetch(weatherApi)
    .then(response => response.json())
    .then(
      (result) => {

        this.setState({
          status: 'success',
          isLoaded: true,
          weatherData : result
        });
      },
      (error) => {
        this.setState({
          isLoaded: true,
          error
        });
      }
    );

    fetch(locationApi, { signal: this.controllerSignal })
    .then(response => response.json())
    .then(
      (result) => {
        console.log(result);
        const { name } = result;
        const { country } = result.sys;
  
        this.setState({
          locationData: {
            name,
            country
          }
        });
      },
      (error) => {
        this.setState({
          isLoaded: true,
          error
        });
      }
    );
}

  componentWillUnmount() {
    this.abortController.abort();
  }

  returnActiveView = (status) => {
    switch(status) {
      case 'init':
        return(
          <div>
            <br/>
            <br/>
          <center>
          
          <Button 
          className='btn-main' 
          onClick={this.onClick}
          >
            Get My Location
          </Button>
          </center>
         
          </div>
        );
      case 'success':
        return <WeatherData data={this.state.weatherData} locationData={this.state.locationData}/>;
      default:
        return <StatusData status={status} />;
    }
  }

  render() {
    return (
      <div className='App'>
        <div className='container'>
        {this.returnActiveView(this.state.status)}
        <br/>
        <br/>
<center>
        <Button href="/anylocation">Search weather of any Location</Button>
        <br/>
        </center>
        

        </div>
        <br/>
      </div>
    );
  }
}

export default MyLocationWeather;