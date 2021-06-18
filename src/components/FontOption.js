import React from 'react';

function FontOption({ setModalSettings, fontClassName, modalSettings }) {
  return (
    <div
      onClick={() => setModalSettings({ ...modalSettings, font: fontClassName })}
      className={`modal__option ${fontClassName} ${modalSettings.font === fontClassName ? 'modal__option-font-active' : null}`}
    >
      Aa
    </div>
  );
}

export default FontOption;
