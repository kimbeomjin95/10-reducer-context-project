import React, {useContext, useEffect, useReducer, useState} from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from "../../store/auth-context";

const emailReducer = (state, action) => {
  switch (action.type) {
    case 'EMAIL_INPUT':
      return {
        value: action.val,
        isVaild: action.val.includes('@')
      }
    case 'EMAIL_BLUR':
      return {
        value: state.value,
        isVaild: state.value.includes('@')
      }
    default:
      return {value: '', isVaild: false}
  }
};

const passwordReducer = (state, action) => {
  switch (action.type) {
    case 'PASSWORD_INPUT':
      return {
        value: action.val,
        isVaild: action.val.trim().length > 6
      }
    case 'PASSWORD_BLUR':
      return {
        value: state.value,
        isVaild: state.value.trim().length > 6
      }
    default:
      return {value: '', isVaild: false}
  }

}
  const Login = (props) => {
    const authCtx = useContext(AuthContext)

    const [formIsValid, setFormIsValid] = useState(false);
    const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: '',
    isVaild: null
  })

    const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
      value: '',
      isVaild: null
    })

  // 객체 비구조화 alias 문법
  const { isVaild: emailIsValid } = emailState;
  const { isVaild: passwordIsValid } = passwordState;

  useEffect(() => {
    const identifier = setTimeout(() => {
    console.log('checked form validity')
      setFormIsValid(
        emailIsValid && passwordIsValid
      );
    }, 500)

    return () => {
      console.log('clean up')
      clearTimeout(identifier)
    }
  }, [emailIsValid, passwordIsValid]);

  const emailChangeHandler = (event) => {
    dispatchEmail({type: 'EMAIL_INPUT', val:event.target.value})
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({ type: 'PASSWORD_INPUT', val:event.target.value })
  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: 'EMAIL_BLUR'})
  };

  const validatePasswordHandler = () => {
    dispatchPassword({type: 'PASSWORD_BLUR'})
  };

  const submitHandler = (event) => {
    event.preventDefault();
    authCtx.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isVaild === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordState.isVaild === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
