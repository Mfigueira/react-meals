import classes from './CartItem.module.scss';

export const CartItem = ({ item, onAdd, onRemove }) => {
  return (
    <li className={classes.item}>
      <div>
        <h2>{item.title}</h2>
        <div className={classes.summary}>
          <span className={classes.price}>{`$${item.price.toFixed(2)}`}</span>
          <span className={classes.amount}>x {item.amount}</span>
        </div>
      </div>
      <div className={classes.actions}>
        <button onClick={onRemove}>−</button>
        <button onClick={onAdd}>+</button>
      </div>
    </li>
  );
};
