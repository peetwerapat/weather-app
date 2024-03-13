import "./App.css";
import { useState } from "react";
import axios from "axios";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState({});
  const [history, setHistory] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editCity, setEditCity] = useState("");
  const [editTemp, setEditTemp] = useState("");

  const apiKey = "1f63bc5d1c458ce32da711f8b4c1bc89";

  const searchButton = async () => {
    const res = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );
    setWeather(res.data);

    setHistory([...history, res.data]);
  };

  const editItem = (index) => {
    const item = history[index];
    setEditIndex(index);
    setEditCity(item.name);
    setEditTemp(item.main.temp);
  };

  const saveEdit = () => {
    if (editIndex !== null) {
      const updatedHistory = [...history];
      updatedHistory[editIndex] = {
        name: editCity,
        main: { temp: editTemp },
      };
      setHistory(updatedHistory);
      setEditIndex(null);
      setEditCity("");
      setEditTemp("");
    }
  };

  const removeItem = (index) => {
    const updatedHistory = [...history];
    updatedHistory.splice(index, 1);
    setHistory(updatedHistory);
  };

  return (
    <div
      className={
        typeof weather.main !== "undefined"
          ? weather.main.temp > 18
            ? "app-hot"
            : "app-cold"
          : "app"
      }
    >
      <main>
        <div className="search-container">
          <input
            type="text"
            className="search-bar"
            placeholder="Enter City"
            onChange={(e) => setCity(e.target.value)}
          />
          <button className="search-button" onClick={searchButton}>
            Search
          </button>
        </div>

        {typeof weather.main !== "undefined" ? (
          <div>
            <div className="location-container">
              <div className="location">{weather.name}</div>
            </div>
            <div className="weather-container">
              <div className="temperature">
                {Math.round(weather.main.temp)} °C
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
        {history.map((item, index) => (
          <p className="history-edit" key={index}>
            {editIndex === index ? (
              <div className="edit-side">
                <input
                  type="text"
                  value={editCity}
                  onChange={(e) => setEditCity(e.target.value)}
                  className="edit-bar"
                />
                <input
                  type="number"
                  value={editTemp}
                  onChange={(e) => setEditTemp(e.target.value)}
                  className="edit-bar"
                />
                <button className="save-button" onClick={saveEdit}>
                  Save
                </button>
              </div>
            ) : (
              <div className="history-detail">
                {item.name} : {Math.round(item.main.temp)} °C
                <div>
                  <button
                    className="edit-button"
                    onClick={() => editItem(index)}
                  >
                    Edit
                  </button>
                  <button
                    className="remove-button"
                    onClick={() => removeItem(index)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            )}
          </p>
        ))}
      </main>
    </div>
  );
}

export default App;
