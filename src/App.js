import React, { useState } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState({});
  const [error, setError] = useState({});
  const [location, setLocation] = useState("");

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=895284fb2d2c50a520ea537456963d9c`;

  const searchLocation = (event) => {
    if (event.key === "Enter") {
      axios
        .get(url)
        .then((response) => {
          setData(response.data);
          setLocation("");
        })
        .catch((err) => {
          setError(err.data);
          console.log(error);
          setLocation("Location do not exist");
          setTimeout(() => {
            setLocation(event.target.value);
          }, 3000);
        });
    }
  };

  return (
    <div className="App">
      <div className="search">
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder="Enter New Location"
          type="text"
        />
      </div>
      {searchLocation === undefined ? (
        <div className="container">
          <h1>Erro</h1>
        </div>
      ) : null }
      {searchLocation !== undefined && (
        <div className="container">
          <div className="top">
            <div className="location">
              <p>{data.name}</p>
            </div>
            <div className="temp">
              {data.main ? (
                <h1>{(((data.main.temp - 32) * 5) / 9).toFixed()}°C</h1>
              ) : null}
            </div>
            <div className="description">
              {data.weather ? <p>{data.weather[0].main}</p> : null}
            </div>
          </div>

          {data.name !== undefined && (
            <div className="bottom">
              <div className="feels">
                {data.main ? (
                  <p className="bold">
                    {(((data.main.feels_like - 32) * 5) / 9).toFixed()}°C
                  </p>
                ) : null}
                <p>Feels Like</p>
              </div>
              <div className="humidity">
                {data.main ? (
                  <p className="bold">{data.main.humidity}%</p>
                ) : null}
                <p>Humidity</p>
              </div>
              <div className="wind">
                {data.wind ? (
                  <p className="bold">
                    {(data.wind.speed * 1.609).toFixed()} KM/h
                  </p>
                ) : null}
                <p>Wind Speed</p>
              </div>
            </div>
          )}
        </div>
      )}
     
    </div>
  );
}

export default App;
