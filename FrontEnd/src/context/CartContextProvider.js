import { createContext, useContext } from "react";
import { useState } from "react";
const StateContext = createContext({
  cartItems: [],
  setCartItems: () => {},
  quantityInCart: 0,
  setQuantityInCart: () => {},
});
export const ContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [quantityInCart, setQuantityInCart] = useState(0);
  return (
    <StateContext.Provider
      value={{
        cartItems,
        setCartItems,
        quantityInCart,
        setQuantityInCart,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);