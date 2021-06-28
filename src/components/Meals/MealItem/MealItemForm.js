import { useRef, useState } from 'react';
import { Input } from '../../UI/Input';
import classes from './MealItemForm.module.scss';

export const MealItemForm = ({ id, onAddToCart }) => {
  const [isValid, setIsValid] = useState(true);
  const amountInputRef = useRef();

  const handleSubmit = e => {
    e.preventDefault();
    const enteredAmount = +amountInputRef.current.value.trim();
    if (enteredAmount < 1 || enteredAmount > 5) return setIsValid(false);
    onAddToCart(enteredAmount);
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <Input
        ref={amountInputRef}
        label="Amount"
        input={{
          id: `amount_${id}`,
          type: 'number',
          min: '1',
          max: '5',
          step: '1',
          defaultValue: '1',
        }}
      />
      <button type="submit">Add</button>
      {!isValid && <p>Please enter a valid amount (1-5).</p>}
    </form>
  );
};
