import { useCart } from "@/hooks/useCart";
import type { ICart } from "@/types/cart.types";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { useUserContext } from "./UserContext";

interface ContextData {
  cartData: ICart[];
  add: (item_id: string, quantity: number) => void;
  reduce: (item_id: string, quantity: number) => void;
  deleteItem: (item_id: string) => void;
  open: boolean;
}

export const CartContext = createContext<ContextData>({
  cartData: [],
  add: () => {},
  reduce: () => {},
  deleteItem: () => {},
  open: true,
});

interface IChildren {
  children: ReactNode;
}
export function CartContextWrapper({ children }: IChildren) {
  const [cartData, setData] = useState<ICart[]>([]);
    const [open, setOpen] = useState(false);
  const { getAllItems } = useCart();
  const { data } = useUserContext();
  useEffect(() => {
    if (data.token) {
      getAllItems().then((i) => {
        setData(i || []);
      });
    } else {
      setData([]);
    }
  }, [data.user, cartData]);
  function add(item_id: string, quantity: number) {
    cartData.push({ item_id, quantity });
    setOpen(true)
  }
  function reduce(item_id: string, quantity: number) {
    cartData.map((i) =>
      i.item_id === item_id ? (i.quantity += quantity) : (i.quantity = quantity)
    );
  }
  function deleteItem(item_id: string) {
    cartData.filter((i) => i.item_id != item_id);
  }
  return (
    <CartContext.Provider value={{ cartData, add, reduce, deleteItem ,open}}>
      {children}
    </CartContext.Provider>
  );
}

export function useCartContext() {
  const data = useContext(CartContext);
  return data;
}
