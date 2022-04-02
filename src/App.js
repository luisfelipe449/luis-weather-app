import React, { useState } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState({});
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");
  const [placeholder, setPlaceholder] = useState("");

  const handleQuery = (e) => {
    e.preventDefault();
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=imperial&appid=895284fb2d2c50a520ea537456963d9c`
      )
      .then((response) => {
        setData(response.data);
        console.log(data);
        setQuery("");
        setPlaceholder(query);
      })
      .catch(
        (err) => {
          setError(err.data);
          console.log(err.data);
        },
        setError(""),
        setQuery(query)
      );
  };

  return (
    <div className="App">
      <div className={(typeof data.main != "undefined") ? ((data.main.temp > 25) ? 'App-warm' : 'App') : 'App'}>
      <div className="search">
        <input
          onChange={(e) => setQuery(e.target.value)}
          value={query}
          placeholder={placeholder}
        />
        <button className="myButton" onClick={handleQuery}>
          Buscar
        </button>
      </div>

      {error === undefined ? (
        <div className="container">
          <div className="top">
            <div className="location">
              <p>Essa cidade não existe, pesquise novamente. 😅</p>
            </div>
          </div>
        </div>
      ) : (
        [
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
                  <p>Sensação térmica</p>
                </div>
                <div className="humidity">
                  {data.main ? (
                    <p className="bold">{data.main.humidity}%</p>
                  ) : null}
                  <p>Humidade</p>
                </div>
                <div className="wind">
                  {data.wind ? (
                    <p className="bold">
                      {(data.wind.speed * 1.609).toFixed()} KM/h
                    </p>
                  ) : null}
                  <p>Velocidade do vento</p>
                </div>
              </div>
            )}
            
          </div>,
        ]
      )}
    </div>
    </div>
  );
}

export default App;
