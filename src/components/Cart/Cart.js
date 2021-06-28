import { useContext } from 'react';
import CartContext from '../../store/cart-context';
import { Modal } from '../UI/Modal';
import classes from './Cart.module.scss';
import { CartItem } from './CartItem';

export const Cart = ({ onHideCart }) => {
  const cartCtx = useContext(CartContext);

  const handleAddItem = item => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const handleRemoveItem = id => {
    cartCtx.removeItem(id);
  };

  return (
    <Modal onHideModal={onHideCart}>
      <ul className={classes.items}>
        {cartCtx.items.map(item => (
          <CartItem
            key={item.id}
            item={item}
            onAdd={handleAddItem.bind(null, item)}
            onRemove={handleRemoveItem.bind(null, item.id)}
          >
            {item.title}
          </CartItem>
        ))}
      </ul>
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{`$${cartCtx.totalAmount.toFixed(2)}`}</span>
      </div>
      <div className={classes.actions}>
        <button onClick={onHideCart}>Close</button>
        <button className={classes.main} disabled={!cartCtx.items.length}>
          Order
        </button>
      </div>
    </Modal>
  );
};
