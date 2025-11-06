import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { useUserContext } from "./UserContext";
import type { IItem } from "@/types/item.types";
import type { IFavorite } from "@/types/favorite.types";
import { useFavorite } from "@/hooks/useFavorite";

interface ContextData {
  favoriteData: IFavorite[];
  addFavorite: (item_id: string, item: IItem) => void;
  deleteItem: (item_id: string) => void;
  open: boolean;
  set_Open: (open: boolean) => void;
}

export const FavoriteContext = createContext<ContextData>({
  favoriteData: [],
  addFavorite: () => {},
  deleteItem: () => {},
  open: true,
  set_Open: () => {},
});

interface IChildren {
  children: ReactNode;
}
export function FavoriteContextWrapper({ children }: IChildren) {
  const [favoriteData, setData] = useState<IFavorite[]>([]);
  const [open, setOpen] = useState(false);
  const { getAllItems } = useFavorite();
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
  function addFavorite(item_id: string, item: IItem) {
    const exist = favoriteData.find((i) => i.item_id === item_id);
    if (!exist) {
      return setData((prev) => [...prev, { item_id, item }]);
    }
  }
  function deleteItem(item_id: string) {
    setData((prev) => prev.filter((i) => i.item_id != item_id));
  }
  function set_Open(open: boolean) {
    setOpen(open);
  }
  return (
    <FavoriteContext.Provider
      value={{ favoriteData, addFavorite, deleteItem, open, set_Open }}
    >
      {children}
    </FavoriteContext.Provider>
  );
}

export function useFavoriteContext() {
  const data = useContext(FavoriteContext);
  return data;
}
