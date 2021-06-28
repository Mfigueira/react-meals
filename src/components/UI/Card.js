import classes from './Card.module.scss';

export const Card = ({ children }) => {
  return <div className={classes.card}>{children}</div>;
};
