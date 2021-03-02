import React from 'react';
import style from './Button.module.css';

const Button = () => {
  return (
    <button type="submit" className={style.searchFormButton}>
      <span className={style.searchFormButtonLabel}>Search</span>
    </button>
  );
};

export default Button;
