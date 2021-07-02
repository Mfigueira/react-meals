import { useState } from 'react';
import { Cart } from './components/Cart/Cart';
import { Header } from './components/Layout/Header';
import { Meals } from './components/Meals/Meals';
import { CartProvider } from './store/CartProvider';

const App = () => {
  const [cartShown, setCartShown] = useState(false);

  const handleShowCart = () => setCartShown(true);
  const handleHideCart = () => setCartShown(false);

  return (
    <CartProvider>
      <Header onShowCart={handleShowCart} />
      <main>
        <Meals />
        {cartShown && <Cart onHideCart={handleHideCart} />}
      </main>
    </CartProvider>
  );
};

export default App;
