import React, { useState, useEffect, useRef } from "react";
import "./PomodoroClock.css";

const PomodoroClock = () => {
  const [time, setTime] = useState(1500); // 25 minutes in seconds
  const [cycles, setCycles] = useState(0);
  const [limit, setLimit] = useState(2);
  const [isBreak, setIsBreak] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime > 0) {
            return prevTime - 1;
          } else {
            if (isBreak) {
              setCycles((prevCycles) => prevCycles + 1);
            }
            setIsBreak((prevBreak) => !prevBreak);
            return isBreak ? 1500 : 300; // 25 minutes or 5 minutes
          }
        });
      }, 1000);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning, isBreak]);

  const startTimer = () => {
    setIsRunning(true);
  };

  const pauseTimer = () => {
    setIsRunning(false);
  };

  const endTimer = () => {
    setIsRunning(false);
    setTime(1500);
    setCycles(0);
    setIsBreak(false);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const remainingSeconds = seconds % 60;
    const formattedSeconds =
      remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;
    return `${formattedMinutes}:${formattedSeconds}`;
  };

  return (
    <div className="card card-pomodoro">
      <div className="card-body">
        <h1 className="card-title">Pomodoro Clock</h1>
        <div>
          <p className="fs-3">{isBreak ? "Break Time" : "Work Time"}</p>
          <div className="p-2">
            <span className="badge text-bg-warning pomo">
              {formatTime(time)}
            </span>
          </div>
          <p className="fs-3">Cycles: {cycles}</p>
          {!isRunning && (
            <button className="btn btn-primary m-2" onClick={startTimer}>
              Start
            </button>
          )}
          {isRunning && (
            <button className="btn btn-danger m-2" onClick={pauseTimer}>
              Pause
            </button>
          )}
          <button className="btn end-button m-2" onClick={endTimer}>
            End
          </button>
        </div>
      </div>
    </div>
  );
};

export default PomodoroClock;
