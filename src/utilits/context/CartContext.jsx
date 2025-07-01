import { createContext, useState, useMemo } from "react";

const intilazeState = {
  items: [],
  addToCart: () => {},
  removeFromCart: () => {},
  incrementCount: () => {},
  decrementCount: () => {},
  getTotalPrice: () => {},
  resetItems: () => {}
};

export const CartContext = createContext(intilazeState);

export default function GlobalCartConetxt({ children }) {
  const [itemsCart, setItemsCart] = useState([]);

  function addToCart(product) {
    if (itemsCart.find((item) => item.id == product.id)) {
      return;
    } else {
      setItemsCart((prevState) => [...prevState, { ...product }]);
    }
  }
  function removeFromCart(id) {
    const filteredItems = itemsCart.filter((item) => item.id !== id);
    setItemsCart([...filteredItems]);
  }

  function incrementCount(id) {
    const updatedItems = itemsCart.map((item) => {
      if (item.id === id) {
        return { ...item, count: item.count + 1 };
      }
      return item;
    });
    setItemsCart([...updatedItems]);
  }

  function decrementCount(id) {
    const updatedItems = [];
    for (let i = 0; i < itemsCart.length; i++) {
      if (itemsCart[i].id === id) {
        if (itemsCart[i].count === 1) {
          continue;
        }
        updatedItems.push({ ...itemsCart[i], count: itemsCart[i].count - 1 });
      } else {
        updatedItems.push({ ...itemsCart[i] });
      }
    }

    setItemsCart([...updatedItems]);

    return updatedItems.length;
  }

  function getTotalPrice() {
    return itemsCart.reduce(
      (total, item) => total + item.price * item.count,
      0
    );
  }

  function resetItems() {
    setItemsCart([]);
  }

  const ctx = useMemo(() => {
    return {
      items: itemsCart,
      addToCart,
      removeFromCart,
      incrementCount,
      decrementCount,
      getTotalPrice,
      resetItems
    };
  }, [itemsCart]);

  return <CartContext.Provider value={ctx}>{children}</CartContext.Provider>;
}
