import React, { useState } from 'react';
import TimeSelect from './components/TimeSelect';
import FontOption from './components/FontOption';
import ColorOption from './components/ColorOption';
import './modal.scss';
import './index.scss';

function Modal({ showModal, setShowModal, setSettings }) {
  const initialState = {
    time: {
      pomodoro: 45,
      shortBreak: 5,
      longBreak: 15,
    },
    font: 'primary-font',
    color: 'primary-color',
  };
  const [modalSettings, setModalSettings] = useState(initialState);
  const pomodoroOptions = [15, 20, 25, 30, 35, 45, 50, 55, 60];
  const breakOptions = [2, 3, 4, 5, 10, 15, 20, 25, 30];

  const onTimeChangeHandler = (e) => {
    const name = e.target.name;
    const value = Number(e.target.value);
    const newTime = { ...modalSettings.time, [name]: value };
    setModalSettings({ ...modalSettings, time: newTime });
  };

  const applySettings = () => {
    setShowModal();
    const newTime = {
      pomodoro: modalSettings.time.pomodoro * 60,
      shortBreak: modalSettings.time.shortBreak * 60,
      longBreak: modalSettings.time.longBreak * 60,
    };
    setSettings({ ...modalSettings, time: newTime });
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
                <TimeSelect name="pomodoro" value={modalSettings.time.pomodoro} option={pomodoroOptions} onTimeChangeHandler={onTimeChangeHandler} />
                <TimeSelect name="shortBreak" value={modalSettings.time.shortBreak} option={breakOptions} onTimeChangeHandler={onTimeChangeHandler} />
                <TimeSelect name="longBreak" value={modalSettings.time.longBreak} option={breakOptions} onTimeChangeHandler={onTimeChangeHandler} />
              </div>
            </div>
            <div className="modal__options modal__options__bb">
              <h4>Font</h4>
              <div className="modal__options__wrapper ">
                <FontOption setModalSettings={setModalSettings} fontClassName="primary-font" modalSettings={modalSettings} />
                <FontOption setModalSettings={setModalSettings} fontClassName="secondary-font" modalSettings={modalSettings} />
                <FontOption setModalSettings={setModalSettings} fontClassName="light-font" modalSettings={modalSettings} />
              </div>
            </div>
            <div className="modal__options">
              <h4>COLOR</h4>
              <div className="modal__options__wrapper">
                <ColorOption setModalSettings={setModalSettings} colorClassName="primary-color" modalSettings={modalSettings} />
                <ColorOption setModalSettings={setModalSettings} colorClassName="secondary-color" modalSettings={modalSettings} />
                <ColorOption setModalSettings={setModalSettings} colorClassName="purple-color" modalSettings={modalSettings} />
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
