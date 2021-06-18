import React from 'react';

function ColorOption({ setModalSettings, modalSettings, colorClassName }) {
  return (
    <div onClick={() => setModalSettings({ ...modalSettings, color: colorClassName })} className={`modal__option ${colorClassName}`}>
      {modalSettings.color === colorClassName && <img src="./images/tick.svg" alt="tick" />}
    </div>
  );
}

export default ColorOption;
