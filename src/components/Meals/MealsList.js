import { useEffect, useState } from 'react';
import { Card } from '../UI/Card';
import { MealItem } from './MealItem/MealItem';
import classes from './MealsList.module.scss';

export const MealsList = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(
          'https://react-meals-9-default-rtdb.firebaseio.com/meals.json'
        );
        if (!res.ok) throw new Error('Could not fetch meals');

        const data = await res.json();
        const meals = Object.keys(data).map(id => ({
          ...data[id],
          id,
        }));
        setMeals(meals);
      } catch (err) {
        console.error(err);
        setHttpError(err.message);
      }
      setIsLoading(false);
    })();
  }, []);

  return (
    <section className={isLoading ? classes.loading : classes.meals}>
      {isLoading && <p>Loading...</p>}
      {!isLoading && httpError && <p>{httpError}</p>}
      {!isLoading && !httpError && (
        <Card>
          <ul>
            {meals.map(meal => (
              <MealItem key={meal.id} meal={meal} />
            ))}
          </ul>
        </Card>
      )}
    </section>
  );
};
