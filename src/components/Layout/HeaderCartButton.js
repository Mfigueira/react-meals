import { useContext, useEffect, useState } from 'react';
import CartContext from '../../store/cart-context';
import classes from './HeaderCartButton.module.scss';
import CartIcon from '../Cart/CartIcon';

export const HeaderCartButton = ({ onClick }) => {
  const cartCtx = useContext(CartContext);
  const [btnAnimating, setBtnAnimating] = useState(false);

  useEffect(() => {
    if (cartCtx.items.length === 0) return;
    setBtnAnimating(true);
    const timer = setTimeout(() => setBtnAnimating(false), 300);
    return () => clearTimeout(timer);
  }, [cartCtx.items]);

  const cartItemsCount = cartCtx.items.reduce(
    (count, item) => count + item.amount,
    0
  );

  return (
    <button
      className={`${classes.btn} ${btnAnimating ? classes.bump : ''}`}
      onClick={onClick}
    >
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your cart</span>
      <span className={classes.badge}>{cartItemsCount}</span>
    </button>
  );
};
