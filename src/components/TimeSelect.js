import React from 'react';

function TimeSelect({ name, value, option, onTimeChangeHandler }) {
  return (
    <div className="modal__option-time">
      <label htmlFor={name} className="body-2">
        {name}
      </label>
      <select value={value} onChange={(e) => onTimeChangeHandler(e)} name={name} id={name}>
        {option.map((option) => (
          <option value={option} key={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default TimeSelect;
