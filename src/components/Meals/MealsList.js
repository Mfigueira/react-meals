import { Card } from '../UI/Card';
import { MealItem } from './MealItem/MealItem';
import classes from './MealsList.module.scss';

const DUMMY_MEALS = [
  {
    id: 'm1',
    title: 'Sushi',
    description: 'Finest fish and veggies',
    price: 22.99,
  },
  {
    id: 'm2',
    title: 'Schnitzel',
    description: 'A german specialty!',
    price: 16.5,
  },
  {
    id: 'm3',
    title: 'Barbecue Burger',
    description: 'American, raw, meaty',
    price: 12.99,
  },
  {
    id: 'm4',
    title: 'Green Bowl',
    description: 'Healthy...and green...',
    price: 18.99,
  },
];

export const MealsList = () => {
  const listItems = DUMMY_MEALS.map(meal => (
    <MealItem key={meal.id} meal={meal} />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{listItems}</ul>
      </Card>
    </section>
  );
};
