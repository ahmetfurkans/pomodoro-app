import { useEffect, useState } from 'react';
import Modal from './Modal';

function App() {
  const initialState = {
    time: {
      pomodoro: 45 * 60,
      shortBreak: 5 * 60,
      longBreak: 15 * 60,
    },
    font: 'primary-font',
    color: 'primary-color',
  };
  const [settings, setSettings] = useState(initialState);
  const [time, setTime] = useState(settings.time.pomodoro);
  const [timerOn, setTimerOn] = useState(false);
  const [activeButton, setActiveButton] = useState('pomodoro');
  const [showModal, setShowModal] = useState(false);
  const [circleLength, setCircleLength] = useState(1037);

  useEffect(() => {
    setTime(settings.time[activeButton]);
  }, [showModal]);

  useEffect(() => {
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
  useEffect(() => {
    const handler = () =>
      setCircleLength((prev) => {
        if (prev === 1037) {
          return 779.11;
        } else {
          return 1037;
        }
      });
    window.matchMedia('(min-width: 600px)').addListener(handler);
  });

  const onClickOptionChange = (e) => {
    const optionType = e.target.id;
    setActiveButton(optionType);
    setTime(settings.time[optionType]);
  };
  const onRestartTime = () => {
    setTime(activeButton);
    setTimerOn(true);
  };
  const returnTime = () => {
    const minute = time / 60 < 10 ? '0' + String(Math.floor(time / 60)) : String(Math.floor(time / 60));
    const second = time % 60 < 10 ? '0' + String(time % 60) : String(time % 60);
    return minute + ':' + second;
  };
  const svgCircleLengthHandler = () => {
    return (circleLength * (settings.time[activeButton] - time)) / settings.time[activeButton];
  };
  const onClickModalHandler = () => {
    setShowModal((prev) => !prev);
  };

  return (
    <div className={`App ${settings.font}`}>
      <h2 className="App__h2">pomodoro</h2>
      <div className="App__options">
        <p id="pomodoro" onClick={(e) => onClickOptionChange(e)} className={`${activeButton === 'pomodoro' ? `App__option App__option-active body-1 ${settings.color}` : 'App__option body-1'}`}>
          pomodoro
        </p>
        <p id="shortBreak" onClick={(e) => onClickOptionChange(e)} className={`${activeButton === 'shortBreak' ? `App__option App__option-active body-1 ${settings.color}` : 'App__option body-1'}`}>
          short break
        </p>
        <p id="longBreak" onClick={(e) => onClickOptionChange(e)} className={`${activeButton === 'longBreak' ? `App__option App__option-active body-1 ${settings.color}` : 'App__option body-1'}`}>
          long break
        </p>
      </div>
      <div className="App__timer">
        <div className="App__timer__wrapper">
          <svg className="svg">
            <circle className={settings.color} strokeDashoffset={svgCircleLengthHandler()} fill="transparent" strokeLinecap="round" />
          </svg>
          <div className="App__timer__content">
            <h1>{returnTime()}</h1>
          </div>
          <div className="App__time__button">{time === 0 ? <h3 onClick={onRestartTime}>RESTART</h3> : <h3 onClick={() => setTimerOn((prev) => !prev)}>{timerOn ? 'PAUSE' : 'PLAY'}</h3>}</div>
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
