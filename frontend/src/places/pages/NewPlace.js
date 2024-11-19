import React from 'react';

import Input from '../../shared/components/FormElements/Input.js';
import Button from '../../shared/components/FormElements/Button.js';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from '../../shared/util/validators.js';
import { useForm } from '../../shared/hooks/form-hook.js';
import './PlaceForm.css';

const NewPlace = () => {
  // We don't need the returned setFormData from our custom hook 'useForm' so we haven't destructured it
  const [formState, inputHandler] = useForm(
    {
      title: {
        value: '',
        isValid: false,
      },
      description: {
        value: '',
        isValid: false,
      },
      address: {
        value: '',
        isValid: false,
      },
    },
    false
  );

  const placeSubmitHandler = event => {
    event.preventDefault(); //To make sure that we don't have the browser default behaviour
    // of submitting a form and sending a request which leads to a page reload

    console.log(formState.inputs); //we will send this to backend
  };

  return (
    <form className="place-form" onSubmit={placeSubmitHandler}>
      <Input
        id="title"
        element="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid title."
        onInput={inputHandler}
      />
      <Input
        id="description"
        element="textarea"
        label="Description"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a valid description (at least 5 characters)."
        onInput={inputHandler}
      />
      <Input
        id="address"
        element="input"
        type="text"
        label="Address"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid address."
        onInput={inputHandler}
      />
      <Button type="submit" disabled={!formState.isValid}>
        ADD PLACE
      </Button>
    </form>
  );
};

export default NewPlace;
