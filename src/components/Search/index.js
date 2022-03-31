import axios from "axios";
import React, { useState } from "react";

export default function Search(props) {
  const [data, setData] = useState({});
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");

  const handleQuery = () => {
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${query}&units=imperial&appid=895284fb2d2c50a520ea537456963d9c`)
      .then((response) => {
        setData(response.data);
        console.log(data)
        setQuery("");
      })
      .catch((err) => {
        setError(err.data);
        console.log(error);
        setQuery("Try again");
      });
  };

  return (
    <div className="container">
      <div className="top">
        <div className="location">
          <input onChange={(e) => setQuery(e.target.value)} value={query} />
          <button onClick={handleQuery}>Search</button>
        </div>
      </div>
    </div>
  );
}
