import { useEffect, useState } from 'react';
import Modal from './Modal';

function App() {
  const initialState = {
    time: {
      pomodoro: 45,
      shortBreak: 5,
      longBreak: 15,
    },
    font: 'primary-font',
    color: 'primary-color',
  };

  const [settings, setSettings] = useState(initialState);
  const [time, setTime] = useState(settings.time.pomodoro * 60);
  const [timerOn, setTimerOn] = useState(false);
  const [activeButton, setActiveButton] = useState('pomodoro');
  const [showModal, setShowModal] = useState(false);
  const [circleLength, setCircleLength] = useState(1037);

  useEffect(() => {
    if (activeButton === 'pomodoro') {
      setTime(settings.time.pomodoro * 60);
    } else if (activeButton === 'long break') {
      setTime(settings.time.longBreak * 60);
    } else if (activeButton === 'short break') {
      setTime(settings.time.shortBreak * 60);
    }
  }, [showModal]);

  useEffect(() => {
    if (window.innerWidth < 600) {
      setCircleLength(779.11);
    } else {
      setCircleLength(1037);
    }
    let interval = null;
    if (time === 0) {
      setTimerOn(false);
    }
    if (timerOn) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  });

  const onClickOptionChange = (e) => {
    const optionType = e.target.innerHTML;
    setActiveButton(optionType);
    if (optionType === 'pomodoro') {
      setTime(settings.time.pomodoro * 60);
    } else if (optionType === 'long break') {
      setTime(settings.time.longBreak * 60);
    } else if (optionType === 'short break') {
      setTime(settings.time.shortBreak * 60);
    }
  };

  const onClickModalHandler = () => {
    setShowModal((prev) => !prev);
  };

  const onRestartTime = () => {
    if (activeButton === 'pomodoro') {
      setTime(settings.time.pomodoro * 60);
    } else if (activeButton === 'long break') {
      setTime(settings.time.longBreak * 60);
    } else if (activeButton === 'short break') {
      setTime(settings.time.shortBreak * 60);
    }
    setTimerOn(true);
  };

  const svgCircleLengthHandler = () => {
    if (activeButton === 'pomodoro') {
      return (circleLength * (settings.time.pomodoro * 60 - time)) / (settings.time.pomodoro * 60);
    } else if (activeButton === 'long break') {
      return (circleLength * (settings.time.longBreak * 60 - time)) / (settings.time.longBreak * 60);
    } else if (activeButton === 'short break') {
      return (circleLength * (settings.time.shortBreak * 60 - time)) / (settings.time.shortBreak * 60);
    }
  };

  return (
    <div className={`App ${settings.font}`}>
      <h2 className="App__h2">pomodoro</h2>
      <div className="App__options">
        <p onClick={(e) => onClickOptionChange(e)} className={`${activeButton === 'pomodoro' ? `App__option App__option-active body-1 ${settings.color}` : 'App__option body-1'}`}>
          pomodoro
        </p>
        <p onClick={(e) => onClickOptionChange(e)} className={`${activeButton === 'short break' ? `App__option App__option-active body-1 ${settings.color}` : 'App__option body-1'}`}>
          short break
        </p>
        <p onClick={(e) => onClickOptionChange(e)} className={`${activeButton === 'long break' ? `App__option App__option-active body-1 ${settings.color}` : 'App__option body-1'}`}>
          long break
        </p>
      </div>
      <div className="App__timer">
        <div className="App__timer__wrapper">
          <svg className="svg" height="360" width="360">
            <circle className={settings.color} strokeDasharray={window.innerWidth < 600 ? 779.11 : 1037} strokeDashoffset={svgCircleLengthHandler()} fill="transparent" strokeLinecap="round" />
          </svg>
        </div>
      </div>
      <div className="App__settings">
        <img onClick={onClickModalHandler} src="./images/settings.svg" alt="settings" />
      </div>
      <Modal setSettings={setSettings} showModal={showModal} setShowModal={onClickModalHandler} />
    </div>
  );
}

export default App;
