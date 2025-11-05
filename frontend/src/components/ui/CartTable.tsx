import type { ICart } from "@/types/cart.types";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";

import { ButtonGroup } from "@/components/ui/button-group";
import { MinusIcon, PlusIcon, Trash2 } from "lucide-react";
import { Button } from "./button";
import { useCartContext } from "@/contexts/CartContext";
import { useCart } from "@/hooks/useCart";
type Props = {
  cartData: ICart[];
};

export default function CartTable({
  cartData,
}: Props) {
      const { addItemToCart, deleteItemFromCart } = useCart();
      const { add, reduce, deleteItem} = useCartContext();
     async function handleAdd(item_id: string, quantity: number) {
    const item = await addItemToCart({ item_id, quantity });
    add(item_id, quantity, item);
  }
  async function handleReduce(item_id: string, quantity: number) {
    await addItemToCart({ item_id, quantity });
    reduce(item_id, -1);
  }
  async function handleDelete(item_id: string) {
    await deleteItemFromCart(item_id);
    deleteItem(item_id);
  }
  return (
    <div className="flex w-full max-w-md flex-col gap-6 mx-auto max-h-[60v] overflow-y-auto">
                <ItemGroup className="gap-4">
                  {cartData.map((item) => (
                    <Item
                      key={item.item?.name}
                      variant="outline"
                      asChild
                      role="listitem"
                    >
                      <a href="#">
                        <ItemMedia variant="image" className="h-20 w-20">
                          <img
                            src={item.item?.image}
                            alt={item.item?.name}
                            width={100}
                            height={100}
                            className="object-cover grayscale"
                          />
                        </ItemMedia>
                        <ItemContent>
                          <ItemTitle className="line-clamp-1">
                            {item.item?.name} -{" "}
                            <span className="text-muted-foreground">
                              {item.item?.category}
                            </span>
                          </ItemTitle>
                          <ItemDescription className="mt-2 flex">
                            <ButtonGroup className="scale-75">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleReduce(item.item_id, -1)}
                              >
                                <MinusIcon />
                              </Button>
                              <Button variant="outline" size="sm">
                                {item.quantity}
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleAdd(item.item_id, 1)}
                              >
                                <PlusIcon />
                              </Button>
                            </ButtonGroup>
                            <Button
                              onClick={() => handleDelete(item.item_id)}
                              className="bg-white hover:bg-gray-300 rounded-md"
                            >
                              <Trash2 className="text-red-600" size={18} />
                            </Button>
                          </ItemDescription>
                        </ItemContent>
                        <ItemContent className="flex-none">
                          <ItemDescription className="text-black font-semibold">
                            {(item.item?.price! * item.quantity).toFixed(2)}
                          </ItemDescription>
                        </ItemContent>
                      </a>
                    </Item>
                  ))}
                </ItemGroup>
              </div>
  )
}
