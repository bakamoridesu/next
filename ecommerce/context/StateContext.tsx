import { createContext, ReactNode, useContext, useState } from "react";
import { toast } from "react-hot-toast";
import product from "../sanity/schemas/product";
import { IProduct } from "../types/product";

interface ICartProduct extends IProduct {
  quantity: number;
}
type AppContextType = {
  showCart: boolean;
  cartItems: (ICartProduct | undefined)[];
  totalPrice: number;
  totalQuantities: number;
  quantity: number;
  increaseQuantity: () => void;
  decreaseQuantity: () => void;
  setShowCart: (condition: boolean) => void;
  onAdd: (product: IProduct, quantity: number) => void;
  toggleCartItemQuantity: (id: string, value: string) => void;
  removeProduct: (id: string) => void;
  clearCart: () => void;
};

const AppContext = createContext<AppContextType | null>(null);

type Props = {
  children: ReactNode;
};

export const StateContext = ({ children }: Props) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState<(ICartProduct | undefined)[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [totalQuantities, setTotalQuantities] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);

  let foundProduct;
  let index;

  const increaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decreaseQuantity = () => {
    setQuantity((prevQuantity) =>
      prevQuantity - 1 < 1 ? 1 : prevQuantity - 1
    );
  };

  const onAdd = (product: IProduct, quantity: number) => {
    const checkProductInCart = cartItems?.find(
      (item) => item?._id === product._id
    );

    setTotalPrice(
      (prevTotalPrice) => prevTotalPrice + product.price * quantity
    );
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);

    if (checkProductInCart) {
      const updatedCartItems = cartItems?.map((cartProduct) => {
        if (cartProduct?._id === product._id)
          return {
            ...cartProduct,
            quantity: cartProduct.quantity + quantity,
          };
      });

      setCartItems(updatedCartItems);
    } else {
      setCartItems([...cartItems, { ...product, quantity }]);
    }
    toast.success(`${quantity} ${product.name} added to the cart.`);
  };

  const toggleCartItemQuantity = (id: string, value: string) => {
    if (value === "inc") {
      setCartItems(
        cartItems.map((item) => {
          if (item?._id === id) {
            setTotalPrice((totalPrice) => totalPrice + item.price);
            setTotalQuantities((totalQuantities) => totalQuantities + 1);
            return {
              ...item,
              quantity: item.quantity + 1,
            };
          }
          return item;
        })
      );
    } else if (value === "dec") {
      const foundProduct = cartItems.find((item) => item?._id === id) as ICartProduct
      if(foundProduct.quantity === 1) {
        removeProduct(id)
      } else {
        setCartItems(
          cartItems.map((item) => {
            if (item?._id === id) {
              setTotalPrice((totalPrice) => totalPrice - foundProduct.price);
              setTotalQuantities((totalQuantities) => totalQuantities - 1);
              return {
                ...item,
                quantity: item.quantity - 1 > 0 ? item.quantity - 1 : 1,
              };
            }
            return item;
          })
        );
      }
    }
  };

  const removeProduct = (id: string) => {
    const foundProduct = cartItems.find((item) => item?._id === id) as ICartProduct
    setCartItems(cartItems.filter((item) => item?._id !== id));
    setTotalPrice((totalPrice) => totalPrice - foundProduct.price * foundProduct.quantity);
    setTotalQuantities((totalQuantities) => totalQuantities - foundProduct.quantity);
  };

  const clearCart = () => {
    setCartItems([])
    setTotalPrice(0)
    setTotalQuantities(0)
  }

  return (
    <AppContext.Provider
      value={{
        showCart,
        cartItems,
        totalPrice,
        totalQuantities,
        quantity,
        increaseQuantity,
        decreaseQuantity,
        onAdd,
        setShowCart,
        toggleCartItemQuantity,
        removeProduct,
        clearCart,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useStateContext = () => {
  const stateContext = useContext(AppContext);

  if (!stateContext) {
    throw new Error(
      "useStateContext has to be used within <AppContext.Provider>"
    );
  }

  return stateContext;
};
