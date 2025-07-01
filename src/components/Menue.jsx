import { useState, useEffect } from "react";

import { fetchFoods } from "../http";

import { Card } from "./Card";
import Error from "./Error";

export default function Menue() {



  
  const [availableMeals, setAvailableMeals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    async function fetchMeals() {
      setLoading(true);
      try {
        const meals = await fetchFoods("http://localhost:3000/meals");
        setAvailableMeals(meals);
      } catch (error) {
        setError(error.message);
      }
      setLoading(false);
    }
    fetchMeals();
  }, []);

  return (
    <>
      {loading && <p>Loading...</p>}
      {error && <Error error={error} />}
      <section id="meals">
        {availableMeals.map((meal) => {
          return (
            <div className="meal-item" key={meal.id}>
              <Card
                img={meal.image}
                name={meal.name}
                price={meal.price}
                id={meal.id}
                description={meal.description}
              />
            </div>
          );
        })}
      </section>
    </>
  );
}

