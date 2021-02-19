import React from "react";
import {Button} from "react-bootstrap";

function DisplayWeather(props) {
    // console.log("props", props);
    const {data} = props;

    const iconurl = "http://openweathermap.org/img/wn/" + `${data.weather[0].icon}` + ".png"
    return (
    <div>
        <br/>
        <span>Weather in {}
        {data.name}, {data.sys.country}
        
        </span>
        {/* <span> <h5>Weather</h5></span> */}
        <br/>
        <span>
            As of {new Date().toLocaleTimeString()}
            </span>
            <h2>{Math.floor(data.main.temp - 273.15)}°C</h2>
            <span>{data.weather[0].main}</span>
            <img src={iconurl}/>
            <span>{data.weather[0].description}</span>
<br/>

            <Button href="/">Back</Button>
    </div>
    )
}

export default DisplayWeather;