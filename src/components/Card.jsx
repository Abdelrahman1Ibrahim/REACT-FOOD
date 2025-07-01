import { use } from "react";
import { CartContext } from "../utilits/context/CartContext.jsx";

export function Card({ ...props }) {
  const { addToCart } = use(CartContext);

  console.log("Card rendered");

  return (
    <article>
      <img src={`http://localhost:3000/${props.img}`} alt={props.name} />
      <h3>{props.name}</h3>

      <span className="meal-item-price">{props.price}</span>

      <p className="meal-item-description">{props.description}</p>
      <div className="meal-item-actions">
        <button
          className="button"
          onClick={() =>
            addToCart({
              name: props.name,
              price: props.price,
              id: props.id,
              count: 1
            })
          }
        >
          Add to Cart
        </button>
      </div>
    </article>
  );
}
