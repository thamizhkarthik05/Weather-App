import { useEffect, useState } from 'react'
import './App.css';

import searchIcon from './assets/search.png';
import humidityIcon from './assets/humidity.png';
import windIcon from './assets/wind.png';

import clearIcon from './assets/sunny.png';
import fewclouds from './assets/fewclouds.png';
import scatteredclouds from './assets/scatteredclouds.png';
import brokenclouds from './assets/brokenclouds.png';
import showerrain from './assets/showerrain.png';
import rain from './assets/rain.png';
import thunderstorm from './assets/thunderstrom.png';
import snow from './assets/snow.png';
import mist from './assets/mist.png';

const WeatherDetails = ({icon , temp , city , country , lat , log , humidity , wind}) =>
{
   return(
    <>
       <div className='image'>
          <img src={icon} alt="ClearIcon"/>
       </div>

       <div className="temp">{temp}&deg; C</div>
       <div className="location">{city}</div>
       <div className="country">{country}</div>
       <div className="cord">
          <div>
              <span className="lat">Latitude</span>
              <span>{lat}</span>
          </div>

          <div>
              <span className="log">Longitude</span>
              <span>{log}</span>
          </div>
       </div>

       
        <div className="data-container">
             <div className="element">
                <img src={humidityIcon} alt="humidity" className='icon'/>
                <div className="data">
                  <div className="humidity-percent">{humidity}%</div>
                  <div className="text">Humidity</div>
                </div>
             </div>

            <div className="element">
                <img src={windIcon} alt="wind" className='icon'/>
                <div className="data">
                  <div className="wind-speed">{wind} Km/hr</div>
                  <div className="text">Wind Speed</div>
                </div>
             </div>

        </div>
    </>
   ); 
}

function App() {

  let api_url = "8f1cf5ec47b6635d198494f7aafb1a34";
  const[text,setText] = useState("Chennai");

  const[icon,setIcon] = useState(clearIcon);
  const[temp,setTemp] = useState(0);
  const[city,setCity] = useState('Chennai');
  const[country,setCountry] = useState('IN');
  const[lat,setLat] = useState(0);
  const[log,setLog] = useState(0);
  const[humidity,setHumidity] = useState(0);
  const[wind,setWind] = useState(0);


  const[cityNotFound,setCityNotFound] = useState(false);
  const[loading,setLoading] = useState(false);

  const[error,setError] = useState(null);


  const weatherIconMap = {
  "01d": clearIcon,
  "01n": clearIcon,
  "02d": fewclouds,
  "02n": fewclouds,
  "03d": scatteredclouds,
  "03n": scatteredclouds,
  "04d": brokenclouds,
  "04n": brokenclouds,
  "09d": showerrain,
  "09n": showerrain,
  "10d": rain,
  "10n": rain,
  "11d": thunderstorm,
  "11n": thunderstorm,
  "13d": snow,
  "13n": snow,
  "50d": mist,
  "50n": mist
};



  const search = async() => 
  {
    setLoading(true);
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=8f1cf5ec47b6635d198494f7aafb1a34&units=Metric`;
    
    
    try{
      
      let response = await fetch(url);
      let data = await response.json();

      if(data.cod === "404")
        {
          console.error("City Not Found");
          setCityNotFound(true);
          setLoading(false);
          return;
        }
      
      setHumidity(data.main.humidity);
      setWind(data.wind.speed);
      setTemp(Math.floor(data.main.temp));
      setCity(data.name);
      setCountry(data.sys.country);
      setLat(data.coord.lat);
      setLog(data.coord.lon);

      const weatherIcon = data.weather[0].icon;
      console.log(weatherIcon);
      setIcon(weatherIconMap[weatherIcon]);
      setCityNotFound(false);
      
      
    }
    catch(error)
    {
      console.error("An Error Occurred : ",error.message);
      setError("Error occurred while fetching the data"); 
    }
    finally
    {
      setLoading(false);
    }
  
  
  
  
  }

  const handleText = (e) =>
  {
    setText(e.target.value);
  }
    
  const handleKeyDown = (e) =>
  {
    if(e.key === "Enter")
      {
        search();
      }
  }



  useEffect(function() 
  {
    search();
  },[]);

  return (
    <>
      <div className='container'>
          <div className='input-container'>
            
            <input type="text" className='cityInput' placeholder='Search City' onChange={handleText} value={text} onKeyDown={handleKeyDown}/>

            <div className='search-icon'>
              <img src={searchIcon} alt="Search" id='searchIcon' onClick={() => search()}/>
            </div>

          </div>

          
          
          {loading && <div className="loading-message">Loading...</div>}
          {error && <div className="error-message">{error}</div>}
          {cityNotFound && <div className="city-not-found">City Not Found</div>}

          {!loading && !cityNotFound && <WeatherDetails icon={icon} temp={temp} city={city} country={country} lat={lat} log={log} humidity={humidity} wind={wind}/>}
          
          <p className='copyright'>
              Designed by <b>Kaarthik</b>
          </p>

      </div>

    </>
  )
}

export default App
