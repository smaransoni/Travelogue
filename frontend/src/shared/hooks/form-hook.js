import { useCallback, useReducer } from 'react';

const formReducer = (state, action) => {
  // console.log('state inside formReducer', state);
  //Uncomment all the console.log in this file to debug why is it getting consoled multiple times
  switch (action.type) {
    case 'INPUT_CHANGE':
      let formIsValid = true; //A helper variable which is intially set to true

      for (const inputId in state.inputs) {
        //skipping a property if it is undefined, i.e., in our case property 'name' (for the auth page)
        if (!state.inputs[inputId]) {
          continue; // go to the next iteration, i.e., the next property
        }
        if (inputId === action.inputId) {
          formIsValid = formIsValid && action.isValid;
        } else {
          formIsValid = formIsValid && state.inputs[inputId].isValid;
        }
      }
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputId]: { value: action.value, isValid: action.isValid },
        },
        isValid: formIsValid,
      };
    case 'SET_DATA':
      return {
        inputs: action.inputs,
        isValid: action.formIsValid,
      };
    default:
      return state;
  }
};

export const useForm = (initialInputs, intialFormValidity) => {
  // console.log('intialFormValidity', intialFormValidity);
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: initialInputs,
    isValid: intialFormValidity,
  });
  // console.log('formState inside form-hook', formState);
  const inputHandler = useCallback((id, value, isValid) => {
    // console.log('inputHandler inside form-hook');
    dispatch({
      type: 'INPUT_CHANGE',
      value: value,
      isValid: isValid,
      inputId: id,
    });
  }, []); //React ensures that the dispatch from the useReducer never changes,
  //so we have omit dispatch as the dependency

  const setFormData = useCallback((inputData, formValidity) => {
    dispatch({
      type: 'SET_DATA',
      inputs: inputData,
      formIsValid: formValidity,
    });
  }, []); // Since, we haven't provided any dependency, therefore the function (provided inside the callback here) will never be re-created

  return [formState, inputHandler, setFormData]; //hooks can return anything like objects, just text etc.
};
