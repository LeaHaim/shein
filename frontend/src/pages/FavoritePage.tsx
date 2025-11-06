import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemHeader,
  ItemTitle,
} from "@/components/ui/item";
import { useCartContext } from "@/contexts/CartContext";
import { useFavoriteContext } from "@/contexts/FavoriteContext";
import { useCart } from "@/hooks/useCart";
import { BsCart } from "react-icons/bs";
import { Toggle } from "@/components/ui/toggle";
import { Heart, Trash2 } from "lucide-react";
import { useFavorite } from "@/hooks/useFavorite";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Link } from "react-router-dom";
export default function FavoritePage() {
  const { favoriteData } = useFavoriteContext();
  const { addItemToCart, getOneItem } = useCart();
  const { set_Open, add } = useCartContext();
  const { deleteItemFromFavorite } = useFavorite();
  const { deleteItem } = useFavoriteContext();
  async function handleClick(item_id: string) {
    await addItemToCart({ item_id, quantity: 1 });
    const item = await getOneItem(item_id);
    add(item_id, 1, item!);
    set_Open(true);
  }
  async function deleteOne(item_id: string) {
    await deleteItemFromFavorite(item_id);
    deleteItem(item_id);
  }
  return (
    <div className="flex w-full max-w-10xl flex-col gap-6 mt-15">
      <>
        {favoriteData.length === 0 ? (
          <Empty className="mt-50">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <Heart />
              </EmptyMedia>
              <EmptyTitle>No items in favorite yet.</EmptyTitle>
              <EmptyDescription>
                Add items to favorite to see them here
              </EmptyDescription>
              <Link to="/" className="underline">
                explore items
              </Link>
            </EmptyHeader>
            <EmptyContent></EmptyContent>
          </Empty>
        ) : (
          <ItemGroup className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5">
            {favoriteData.map((item) => (
              <Item key={item.item_id} variant="outline">
                <ItemHeader>
                  <img
                    src={item.item?.image}
                    alt={item.item?.name}
                    width={128}
                    height={128}
                    className="aspect-square w-full rounded-sm object-cover"
                  />
                </ItemHeader>
                <ItemContent>
                  <ItemTitle>{item.item?.name}</ItemTitle>
                  <div className="flex mt-2 items-center gap-2">
                    <ItemDescription>{item.item?.description}</ItemDescription>
                    <Toggle
                      size="sm"
                      variant="outline"
                      onClick={() => handleClick(item.item?._id!)}
                    >
                      <BsCart />
                    </Toggle>
                    <Toggle
                      size="sm"
                      variant="outline"
                      onClick={() => deleteOne(item.item_id)}
                    >
                      <Trash2 className="text-red-600" size={18} />
                    </Toggle>
                  </div>
                </ItemContent>
              </Item>
            ))}
          </ItemGroup>
        )}
      </>
    </div>
  );
}
