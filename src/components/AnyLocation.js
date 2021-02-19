import React, { useState , useEffect } from 'react'
import {Button} from "react-bootstrap";
import DisplayWeather from './DisplayWeather';

const AnyLocation = () => {

    const API_KEY = "43012f3e890aa7d0dc298994c33433ec";

    const [form, setForm] = useState({
        city: "",
        country: ""
    });

    const [weather, setWeather] = useState([]);

    async function weatherData(e){
        e.preventDefault();
        if(form.city == ""){
            alert("Add values");

        }
        else{
            const data = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${form.city},${form.country}&appid=${API_KEY}`
            )
            .then((res) => res.json())
            .then((data) => data);

            setWeather(
                {
                    data: data
                }
            );

        }
}

    const handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        if(name == "city"){
            setForm({...form, city:value})
        }
        if(name == "country"){
            setForm({...form, country:value})
        }
        //console.log(form.city)
    }
    
    return(
        <div>
            <br/>
            <center>
                <h1>Enter City Name</h1>

                <form>
                    <input type="text" name="city" placeholder="City" onChange={e=>handleChange(e)}/>
                    &nbsp;
                    {/* <input type="text" name="country" placeholder="country" onChange={e=>handleChange(e)}/> */}
                    &nbsp;
                    <Button onClick={(e)=>weatherData(e)}>Search</Button>
                    
                </form>

                {weather.data != undefined ? (
                    <div>
                        <DisplayWeather data = {weather.data}/>
                    </div>
                ) : null
                }
                
            </center>
        
        
        </div>
    );
};



export default AnyLocation;