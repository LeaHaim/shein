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
import type { IItem } from "@/types/item.types";

interface ContextData {
  cartData: ICart[];
  add: (item_id: string, quantity: number,item:IItem) => void;
  reduce: (item_id: string, quantity: number) => void;
  deleteItem: (item_id: string) => void;
  open: boolean;
  set_Open: (open: boolean) => void;
}

export const CartContext = createContext<ContextData>({
  cartData: [],
  add: () => {},
  reduce: () => {},
  deleteItem: () => {},
  open: true,
  set_Open: () => {},
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
  }, [data.token]);
  function add(item_id: string, quantity: number,item:IItem) {
    const exist = cartData.find((i) => i.item_id === item_id);
    if (exist) {
      return setData((prev) =>
        prev.map((p) =>
          p.item_id === item_id ? { ...p, quantity: p.quantity + quantity } : p
        )
      );
    }
    return setData((prev) => [...prev, { item_id, quantity,item }]);
  }
  function reduce(item_id: string, quantity: number) {
    setData((prev)=>prev.map((i)=>i.item_id!=item_id? i:{...i,quantity:Math.max(i.quantity+quantity,0)}).filter((i)=>i.quantity>0))
  }
  function deleteItem(item_id: string) {
    setData((prev)=>prev.filter((i)=>i.item_id!=item_id))
  }
  function set_Open(open: boolean) {
    setOpen(open);
  }
  return (
    <CartContext.Provider
      value={{ cartData, add, reduce, deleteItem, open, set_Open }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCartContext() {
  const data = useContext(CartContext);
  return data;
}
