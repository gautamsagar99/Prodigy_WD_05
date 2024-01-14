import React, { useState } from 'react'
import "./WeatherApp.css"

import search_icon from "../Assets/search.png";

import clear_icon from "../Assets/clear.png";

import cloud_icon from "../Assets/cloud.png";

import drizzle_icon from "../Assets/drizzle.png";

import rain_icon from "../Assets/rain.png";

import snow_icon from "../Assets/snow.png";

import wind_icon from "../Assets/wind.png";

import humidity_icon from "../Assets/humidity.png";


export const WeatherApp = () => {

    let api_key = process.env.REACT_APP_WEATHER_API;

    const [wincon, setWincon] = useState(cloud_icon);

    const search = async () =>{
        setWincon(clear_icon);
        const element = document.getElementsByClassName('cityInput');
        if(element[0].value === "")
        {
            return 0;
        }
        let url = `https://api.openweathermap.org/data/2.5/weather?appid=${api_key}&q=${element[0].value}&units=Metric`;

        let response = await fetch(url);
        let data = await response.json();

        const humidity = document.getElementsByClassName('humidity-percent');
        const wind = document.getElementsByClassName('wind-rate');
        const temperature = document.getElementsByClassName('weather-temp');
        const location = document.getElementsByClassName('weather-location');

        humidity[0].innerHTML = data.main.humidity + " %";
        wind[0].innerHTML = Math.floor(data.wind.speed) + " km/hr";
        temperature[0].innerHTML = Math.floor(data.main.temp) + "°c";
        location[0].innerHTML = data.name;
        console.log(data.weather[0].icon);

        if(data.weather[0].icon === "01d" || data.weather[0].icon === "01n"){
            setWincon(clear_icon);
            // console.log(wincon);
        }
        else if(data.weather[0].icon === "02d" || data.weather[0].icon === "02n"){
            setWincon(cloud_icon);
        }
        else if(data.weather[0].icon === "03d" || data.weather[0].icon === "03n"){
            setWincon(drizzle_icon);
        }
        else if(data.weather[0].icon === "04d" || data.weather[0].icon === "04n"){
            setWincon(drizzle_icon);
        }
        else if(data.weather[0].icon === "09d" || data.weather[0].icon === "09n"){
            setWincon(rain_icon);
        }
        else if(data.weather[0].icon === "10d" || data.weather[0].icon === "10n"){
            setWincon(rain_icon);
        }
        else if(data.weather[0].icon === "13d" || data.weather[0].icon === "13n"){
            setWincon(snow_icon);
        }
        else{
            setWincon(clear_icon);
        }

    }

  return (
    
    <div className='container'>

    <div className="top-bar">
        <input type="text" className="cityInput" placeholder='Search'/>
        <div className="search-icon" onClick={()=>{search()}}>
            <img src={search_icon} alt="" />
        </div>
    </div>
    <div className="weather-image">
        <img src={wincon} alt="" />
    </div>
    <div className="weather-temp">24°c</div>
    <div className="weather-location">Hyderabad</div>
    <div className="data-container">
        <div className="element">
            <img src={humidity_icon} alt="" className="icon" />
            <div className="data">
                <div className="humidity-percent">64%</div>
                <div className="text">Humidity</div>
            </div>
        </div>
        <div className="element">
            <img src={wind_icon} alt="" className="icon" />
            <div className="data">
                <div className="wind-rate">18 Km/hr</div>
                <div className="text">Wind Speed</div>
            </div>
        </div>
    </div>

    </div>
  )
}

export default WeatherApp