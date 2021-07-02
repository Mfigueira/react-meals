import { useRef, useState } from 'react';
import classes from './Checkout.module.scss';

export const Checkout = ({ onConfirm, onCancel }) => {
  const nameInputRef = useRef();
  const addressInputRef = useRef();

  const [nameIsValid, setNameIsValid] = useState(true);
  const [addressIsValid, setAddressIsValid] = useState(true);

  const confirmHandler = event => {
    event.preventDefault();
    setNameIsValid(true);
    setAddressIsValid(false);

    const username = nameInputRef.current.value;
    const address = addressInputRef.current.value;

    username.trim() ? setNameIsValid(true) : setNameIsValid(false);
    address.trim() ? setAddressIsValid(true) : setAddressIsValid(false);

    if (username.trim() && address.trim()) {
      onConfirm({
        username,
        address,
      });
    }
  };

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={`${classes.control} ${!nameIsValid && classes.invalid}`}>
        <label htmlFor="name">Your Name</label>
        <input ref={nameInputRef} type="text" id="name" />
        {!nameIsValid && <p>Please enter a name!</p>}
      </div>
      <div
        className={`${classes.control} ${!addressIsValid && classes.invalid}`}
      >
        <label htmlFor="address">Address</label>
        <input ref={addressInputRef} type="text" id="address" />
        {!addressIsValid && <p>Please enter an address!</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};
