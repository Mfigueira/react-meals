import { useContext, useState } from 'react';
import CartContext from '../../store/cart-context';
import { Modal } from '../UI/Modal';
import classes from './Cart.module.scss';
import { CartItem } from './CartItem';
import { Checkout } from './Checkout';

export const Cart = ({ onHideCart }) => {
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const cartCtx = useContext(CartContext);

  const handleAddItem = item => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const handleRemoveItem = id => {
    cartCtx.removeItem(id);
  };

  const handleClickConfirm = () => {
    setIsCheckout(true);
  };

  const handleSubmitOrder = async userData => {
    setIsSubmitting(true);
    await fetch(
      'https://react-meals-9-default-rtdb.firebaseio.com/orders.json',
      {
        method: 'POST',
        body: JSON.stringify({
          userData,
          orderedItems: cartCtx.items,
        }),
      }
    );
    setIsSubmitting(false);
    setDidSubmit(true);
    cartCtx.clearCart();
  };

  return (
    <Modal onHideModal={onHideCart}>
      {isSubmitting ? (
        <p>Submitting Order...</p>
      ) : didSubmit ? (
        <>
          <p>Order Submitted!</p>
          <div className={classes.actions}>
            <button onClick={onHideCart}>Close</button>
          </div>
        </>
      ) : (
        <>
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
          {isCheckout && (
            <Checkout onConfirm={handleSubmitOrder} onCancel={onHideCart} />
          )}
          {!isCheckout && (
            <div className={classes.actions}>
              <button onClick={onHideCart}>Close</button>
              <button
                className={classes.main}
                disabled={!cartCtx.items.length}
                onClick={handleClickConfirm}
              >
                Order
              </button>
            </div>
          )}
        </>
      )}
    </Modal>
  );
};
