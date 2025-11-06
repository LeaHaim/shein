import { useItem } from "@/hooks/useItem";
import type { IItem } from "@/types/item.types";
import { useEffect, useState } from "react";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemHeader,
  ItemTitle,
} from "@/components/ui/item";
import { Toggle } from "@/components/ui/toggle";
import { useCart } from "@/hooks/useCart";
import { BsCart } from "react-icons/bs";
import { HeartIcon } from "lucide-react";
import { useCartContext } from "@/contexts/CartContext";
import { useFavorite } from "@/hooks/useFavorite";
import { useFavoriteContext } from "@/contexts/FavoriteContext";
export default function HomePage() {
  const [items, setItems] = useState<IItem[]>([]);
  const { getAll } = useItem();
  const { addItemToCart,getOneItem } = useCart();
  const {addItemToFavorite} =useFavorite();
  const {set_Open,add} = useCartContext();
  const {addFavorite} =useFavoriteContext();
  useEffect(() => {
    getAll().then((i) => {
      setItems(i || []);
    });
  }, []);
  async function handleClick(item_id: string) {
    await addItemToCart({ item_id, quantity: 1 });
    const item =await getOneItem(item_id);
  add(item_id, 1, item!);
    set_Open(true);
  }
    async function handleFavorite(item_id: string) {
    await addItemToFavorite({ item_id });
    const item =await getOneItem(item_id);
    addFavorite(item_id, item!);
  }
  return (
    <div className="flex w-full max-w-10xl flex-col gap-6 mt-15">
      <ItemGroup className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5">
        {items.map((item) => (
          <Item key={item._id} variant="outline">
            <ItemHeader>
              <img
                src={item.image}
                alt={item.name}
                width={128}
                height={128}
                className="aspect-square w-full rounded-sm object-cover"
              />
            </ItemHeader>
            <ItemContent>
              <ItemTitle>{item.name}</ItemTitle>
              <div className="flex mt-2 items-center gap-2">
                <ItemDescription>{item.description}</ItemDescription>
                <Toggle
                  size="sm"
                  variant="outline"
                  onClick={() => handleClick(item._id!)}
                >
                  <BsCart />
                </Toggle>
                <Toggle
                  aria-label="Toggle heart"
                  size="sm"
                  variant="outline"
                  className="data-[state=on]:bg-transparent data-[state=on]:*:[svg]:fill-red-500 data-[state=on]:*:[svg]:stroke-red-500"
                  onClick={()=>handleFavorite(item._id!)}
                >
                  <HeartIcon />
                </Toggle>
              </div>
            </ItemContent>
          </Item>
        ))}
      </ItemGroup>
    </div>
  );
}
