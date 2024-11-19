import React, { useState, useContext } from 'react';

import Card from '../../shared/components/UIElements/Card';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button.js';
import ErrorModal from '../../shared/components/UIElements/ErrorModal.js';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner.js';
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from '../../shared/util/validators.js';
import { AuthContext } from '../../shared/context/auth-context.js';
import { useForm } from '../../shared/hooks/form-hook';

import './Auth.css';

const Auth = () => {
  const auth = useContext(AuthContext);
  const [isSignupMode, setisSignupMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: '',
        isValid: false,
      },
      password: {
        value: '',
        isValid: false,
      },
    },
    false
  );

  const switchModeHandler = () => {
    if (isSignupMode) {
      // switching to login mode
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      // switching to signup mode
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: '',
            isValid: false,
          },
        },
        false
      );
    }
    setisSignupMode(prevMode => !prevMode);
  };

  const authSubmitHandler = async event => {
    event.preventDefault();

    setIsLoading(true);

    if (!isSignupMode) {
      try {
        //login mode
        const response = await fetch('http://localhost:5000/api/users/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
        });

        const responseData = await response.json(); //parsing the response body (JSON) to produce a JavaScript object
        if (!response.ok) {
          //fetch in JavaScript doesn't automatically throw an error when the backend sends an error status code "400" or "500"
          // as Fetch only "rejects" on network errors, not on HTTP errors.
          // response.ok checks for any status code outside the 200-299 range
          throw new Error(responseData.message);
        }
        console.log('responseData: ', responseData);
        console.log('response: ', response);
        setIsLoading(false);
        auth.login();
      } catch (err) {
        console.log(err);
        setIsLoading(false);
        setError(err.message || 'Something went wrong, please try again.');
      }
    } else {
      //signup mode
      try {
        const response = await fetch('http://localhost:5000/api/users/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: formState.inputs.name.value,
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
        });
        const responseData = await response.json();
        console.log('responseData: ', responseData);
        if (!response.ok) {
          throw new Error(responseData.message);
        }

        setIsLoading(false);
        auth.login();
      } catch (err) {
        console.log(err);
        setIsLoading(false);
        setError(err.message || 'Something went wrong, please try again.');
      }
    }
  };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <>
      <ErrorModal error={error} onClear={errorHandler} />
      <Card className="authentication">
        {isLoading && <LoadingSpinner asOverlay />}
        <h2>Login Required!</h2>
        <hr /> {/* horizontal separation */}
        <form onSubmit={authSubmitHandler}>
          {isSignupMode && (
            <Input
              id="name"
              element="input"
              type="text"
              label="Your Name"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter a name."
              onInput={inputHandler}
            />
          )}
          <Input
            id="email"
            element="input"
            type="email" // making use of native built-in password type in input html element
            label="Email"
            validators={[VALIDATOR_EMAIL()]}
            errorText="Please enter a valid email address."
            onInput={inputHandler}
          />
          <Input
            id="password"
            element="input"
            type="password" // making use of native built-in password type in input html element
            label="Password"
            validators={[VALIDATOR_MINLENGTH(8)]}
            errorText="Please enter a valid password, atleast 8 characters)."
            //   autocomplete={isSignupMode ? 'current-password' : 'new-password'}
            onInput={inputHandler}
          />
          <Button type="submit" disabled={!formState.isValid}>
            {isSignupMode ? 'SIGNUP' : 'LOGIN'}
          </Button>
        </form>
        <Button inverse onClick={switchModeHandler}>
          SWITCH TO {isSignupMode ? 'LOGIN' : 'SIGNUP'}
        </Button>
      </Card>
    </>
  );
};

export default Auth;
