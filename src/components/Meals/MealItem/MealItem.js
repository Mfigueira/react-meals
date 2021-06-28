import { useContext } from 'react';
import CartContext from '../../../store/cart-context';
import classes from './MealItem.module.scss';
import { MealItemForm } from './MealItemForm';

export const MealItem = ({ meal }) => {
  const cartCtx = useContext(CartContext);

  const handleAddToCart = amount => {
    cartCtx.addItem({
      id: meal.id,
      title: meal.title,
      amount,
      price: meal.price,
    });
  };

  return (
    <li className={classes.meal}>
      <div>
        <h3>{meal.title}</h3>
        <div className={classes.description}>{meal.description}</div>
        <div className={classes.price}>{`$${meal.price.toFixed(2)}`}</div>
      </div>
      <div>
        <MealItemForm id={meal.id} onAddToCart={handleAddToCart} />
      </div>
    </li>
  );
};
