import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";

function ClockComponent(props) {
  const [updatedTime, setUpdatedTime] = useState(new Date(props.time));

  useEffect(() => {
    const interval = setInterval(() => {
      setUpdatedTime(new Date(updatedTime.getTime() + 1000));
    }, 1000);

    return () => clearInterval(interval);
  }, [updatedTime]);

  return (
    <h2>
      {updatedTime.getHours()}:{updatedTime.getMinutes()}:
      {updatedTime.getSeconds()}
      <br />
      <button
        onClick={() => {
          setUpdatedTime(new Date(updatedTime.getTime() - 3600000));
        }}
      >
        Reverse Time By 1 Hour
      </button>
    </h2>
  );
}

function App() {
  const [clockState, setClockState] = useState(Date());

  useEffect(() => {
    fetch("http://worldtimeapi.org/api/timezone/Europe/Berlin")
      .then((result) => result.json())
      .then((result) => {
        let time = new Date(result.datetime);

        setClockState(time.getTime());
      });
  }, []);

  return (
    <div className="App">
      <h1>Time</h1>
      <ClockComponent time={clockState} />
    </div>
  );
}

export default App;
