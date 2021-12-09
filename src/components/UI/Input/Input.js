import React, { Fragment } from 'react';
import classes from './Input.module.css';

// 재사용가능한 input 구성 컴포넌트
const Input = props => {
  return (
    <Fragment>
      <div
        className={`${classes.control} ${
          props.isValid === false ? classes.invalid : ''
        }`}
      >
        <label htmlFor={props.id}>{props.label}</label>
        <input
          type={props.type}
          id={props.id}
          value={props.value}
          onChange={props.onChange}
          onBlur={props.onBlur}
        />
      </div>
    </Fragment>
  );
};

export default Input;
