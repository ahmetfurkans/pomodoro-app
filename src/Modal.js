import React, { useState } from 'react';
import './modal.scss';
import './index.scss';

function Modal({ showModal, setShowModal, setSettings }) {
  const pomodoroOptions = [15, 20, 25, 30, 35, 45, 50, 55, 60];
  const breakOptions = [2, 3, 4, 5, 10, 15, 20, 25, 30];
  const initialState = {
    time: {
      pomodoro: 45,
      shortBreak: 5,
      longBreak: 15,
    },
    font: 'primary-font',
    color: 'primary-color',
  };
  const [settings, setSetting] = useState(initialState);
  const onTimeChangeHandler = (e) => {
    const name = e.target.name;
    const value = Number(e.target.value);
    if (name === 'longBreak') {
      const newTime = { ...settings.time, longBreak: value };
      setSetting({ ...settings, time: newTime });
    } else if (name === 'shortBreak') {
      const newTime = { ...settings.time, shortBreak: value };
      setSetting({ ...settings, time: newTime });
    } else if (name === 'pomodoro') {
      const newTime = { ...settings.time, pomodoro: value };
      setSetting({ ...settings, time: newTime });
    }
  };

  const applySettings = (e) => {
    setShowModal();
    console.log(settings);
    setSettings(settings);
  };
  return (
    <>
      {showModal ? (
        <div className="modal">
          <div className="modal__content">
            <div className="modal__navbar">
              <h2>Settings</h2>
              <img onClick={setShowModal} src="./images/close-button.svg" className="modal__button-close" alt="close button" />
            </div>
            <div className="modal__options-time">
              <h4>TIME (MINUTES)</h4>
              <div className="modal__options-time__wrapper">
                <div className="modal__option-time">
                  <label htmlFor="pomodoro" className="body-2">
                    pomodoro
                  </label>
                  <select value={settings.time.pomodoro} onChange={(e) => onTimeChangeHandler(e)} name="pomodoro" id="pomodoro">
                    {pomodoroOptions.map((option) => (
                      <option value={option} key={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="modal__option-time">
                  <label htmlFor="shortBreak" className="body-2">
                    short break
                  </label>
                  <select value={settings.time.shortBreak} onChange={(e) => onTimeChangeHandler(e)} name="shortBreak" id="shortBreak">
                    {breakOptions.map((option) => (
                      <option value={option} key={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="modal__option-time">
                  <label htmlFor="longBreak" className="body-2">
                    long break
                  </label>
                  <select value={settings.time.longBreak} onChange={(e) => onTimeChangeHandler(e)} name="longBreak" id="longBreak">
                    {breakOptions.map((option) => (
                      <option value={option} key={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="modal__options modal__options__bb">
              <h4>Font</h4>
              <div className="modal__options-font__wrapper ">
                <div
                  onClick={() => setSetting({ ...settings, font: 'primary-font' })}
                  className={`primary-font modal__option-font primary-font ${settings.font === 'primary-font' ? 'modal__option-font-active' : null}`}
                >
                  Aa
                </div>
                <div
                  onClick={() => setSetting({ ...settings, font: 'secondary-font' })}
                  className={`primary-font modal__option-font secondary-font ${settings.font === 'secondary-font' ? 'modal__option-font-active' : null}`}
                >
                  Aa
                </div>
                <div
                  onClick={() => setSetting({ ...settings, font: 'light-font' })}
                  className={`primary-font modal__option-font light-font ${settings.font === 'light-font' ? 'modal__option-font-active' : null}`}
                >
                  Aa
                </div>
              </div>
            </div>
            <div className="modal__options">
              <h4>COLOR</h4>
              <div className="modal__options-font__wrapper">
                <div onClick={() => setSetting({ ...settings, color: 'primary-color' })} className="modal__option-font primary-color">
                  {settings.color === 'primary-color' && <img src="./images/tick.svg" alt="tick" />}
                </div>
                <div onClick={() => setSetting({ ...settings, color: 'secondary-color' })} className="modal__option-font secondary-color">
                  {settings.color === 'secondary-color' && <img src="./images/tick.svg" alt="tick" />}
                </div>
                <div onClick={() => setSetting({ ...settings, color: 'purple-color' })} className="modal__option-font purple-color">
                  {settings.color === 'purple-color' && <img src="./images/tick.svg" alt="tick" />}
                </div>
              </div>
            </div>

            <button onClick={applySettings} className="modal__button-submit primary-font" type="submit">
              Apply
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default Modal;
