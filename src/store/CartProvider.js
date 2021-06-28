import { useReducer } from 'react';
import CartContext from './cart-context';

const dafaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (currState, action) => {
  if (action.type === 'ADD') {
    const existingItemIndex = currState.items.findIndex(
      item => item.id === action.item.id
    );
    let updatedItems = [...currState.items];

    if (existingItemIndex > -1) {
      const updatedItem = { ...currState.items[existingItemIndex] };
      updatedItem.amount += action.item.amount;
      updatedItems = [...currState.items];
      updatedItems[existingItemIndex] = updatedItem;
    } else updatedItems.push(action.item);

    const updatedAmount =
      currState.totalAmount + action.item.price * action.item.amount;

    return {
      items: updatedItems,
      totalAmount: updatedAmount,
    };
  }

  if (action.type === 'REMOVE') {
    const existingItemIndex = currState.items.findIndex(
      item => item.id === action.id
    );
    let updatedItems = [...currState.items];

    const existingItem = currState.items[existingItemIndex];
    const updatedAmount = currState.totalAmount - existingItem.price;

    if (existingItem.amount === 1) {
      updatedItems.splice(existingItemIndex, 1);
    } else {
      const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
      updatedItems[existingItemIndex] = updatedItem;
    }

    return {
      items: updatedItems,
      totalAmount: updatedAmount,
    };
  }

  return dafaultCartState;
};

export const CartProvider = ({ children }) => {
  const [cart, dispatchCartAction] = useReducer(cartReducer, dafaultCartState);

  const handleAddItemToCart = item => {
    dispatchCartAction({
      type: 'ADD',
      item,
    });
  };

  const handleRemoveItemsToCart = id => {
    dispatchCartAction({
      type: 'REMOVE',
      id,
    });
  };

  const cartContextValue = {
    items: cart.items,
    totalAmount: cart.totalAmount,
    addItem: handleAddItemToCart,
    removeItem: handleRemoveItemsToCart,
  };

  return (
    <CartContext.Provider value={cartContextValue}>
      {children}
    </CartContext.Provider>
  );
};
