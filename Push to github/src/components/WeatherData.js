import React from 'react'
import {  Row, Col, Card, CardGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import { DegreesToDirection, Month, Weekday, Day } from '../helpers/utils'


export const WeatherData = ({ data, locationData }) => {
  const { name, country } = locationData;
  const { humidity, temp, feels_like } = data.current;
  const { icon, description} = data.current.weather[0];
  const speed = data.current.wind_speed;

  var dataW = data.daily;
  console.log("Today ", locationData);
  console.log("Daily Data: ", data);
  console.log("Weekly Data: ", dataW);
  var weekToNum = {
      'monday' : 0,
      'tuesday' : 1,
      'wednesday' : 2,
      'thursday' : 3,
      'friday' : 4,
      'saturday' : 5,
      'sunday' : 6
  }

  var numToWeek = {
      0 : 'Monday',
      1 : 'Tuesday',
      2 : 'Wednesday',
      3 : 'Thursday',
      4 : 'Friday', 
      5 : 'Saturday',
      6 : 'Sunday'
  }

  var nextWeek = []
  for (var i = 0; i < 5; i++)
  {
      nextWeek.push(numToWeek[weekToNum[Weekday.toLowerCase()] + i]);
  }
  console.log("Next Week =>", nextWeek);

  return (
    <>
   
    <br/>
    
    <CardGroup>
        
        
            <Card  border="primary" style={{ width: '18rem', height: "40vh" }}>
                <Card.Body>
                    <Card.Title><h3>{name}, {country}</h3></Card.Title>
                    <Card.Text>
                    <h6>{Weekday}, {Month} {Day}</h6>
                    <h3 >{description}</h3>
                    <img  style={{width:"13%"}} src={`http://openweathermap.org/img/wn/${icon}@2x.png`} alt='weather icon' ></img>
                    <h4 >Temp {temp}°C</h4>
                    </Card.Text>
                
                </Card.Body>
            </Card>
        
            <Card  border="primary" style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Title><h3>{name}, {country}</h3></Card.Title>
                    <Card.Text>
                        <h5>Feels like {feels_like} °C</h5>
                        <h5>Humidity {humidity} </h5>
                        <h5>Wind Speed {speed} </h5>
                        <h5>H {dataW[0].temp.max}°C</h5>
                        <h5>L {dataW[0].temp.min}°C</h5>
                    </Card.Text>
                </Card.Body>
            </Card>
        </CardGroup>
      
    
        
        <Row>
        
        <br/>
        </Row>

        <Row>

            {nextWeek.map((value, index) => {
                console.log(value, index);
                return (
                <Col >
                    <Card  border="primary" style={{ width: '10rem', height: "35vh" }}>
                        <Card.Body style={{backgroundColor: "#f5f5f5"}}>
                            <Card.Title><h5>{value}</h5></Card.Title>
                            <Card.Text>
                                <img  style={{width:"25%"}} src={`http://openweathermap.org/img/wn/${dataW[index].weather[0].icon}@2x.png`} alt='weather icon' ></img>
                                <h6>{dataW[index].weather[0].main}</h6>
                                <h6><b> H {dataW[index].temp.min} °C</b></h6>
                                <h6> L {dataW[index].temp.max} °C</h6>
                            </Card.Text>
                        
                        </Card.Body>
                    </Card>
                </Col>
                )
            })}
        </Row>
    
     
      
    </>
  );
}