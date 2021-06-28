import classes from './Header.module.scss';
import mealsImg from '../../assets/meals.jpeg';
import { HeaderCartButton } from './HeaderCartButton';

export const Header = ({ onShowCart }) => {
  return (
    <>
      <header className={classes.header}>
        <h1>ReactMeals</h1>
        <HeaderCartButton onClick={onShowCart} />
      </header>
      <div className={classes['img-container']}>
        <img src={mealsImg} alt="Table of meals" />
      </div>
    </>
  );
};
