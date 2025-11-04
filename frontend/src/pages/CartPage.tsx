import { useCart } from "@/hooks/useCart";
import type { ICart } from "@/types/cart.types";
import { useEffect, useState } from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { BsCart } from "react-icons/bs";
import { ButtonGroup } from "@/components/ui/button-group";
import { MinusIcon, PlusIcon, Trash2 } from "lucide-react";
import EmptyCart from "@/components/EmptyCart";
export default function CartPage() {
  const [items, setItems] = useState<ICart[]>([]);
  const { addItemToCart, deleteItemFromCart } = useCart();
  const { getAllItems } = useCart();
  useEffect(() => {
    getAllItems().then((i) => {
      setItems(i || []);
    });
  }, []);
  async function handleAdd(item_id: string, quantity: number) {
    await addItemToCart({ item_id, quantity });
  }
  async function handleReduce(item_id: string, quantity: number) {
    await addItemToCart({ item_id, quantity });
  }
  async function handleDelete(item_id: string) {
    deleteItemFromCart(item_id);
  }
  return (
    <Sheet>
      <SheetTrigger asChild>
        <BsCart size={25} />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>shopping cart</SheetTitle>
          <SheetDescription>
            Make changes to your shopping cart here.
          </SheetDescription>
        </SheetHeader>
        <>
          {items.length === 0 ? (
            <EmptyCart />
          ) : (
            <>
              <div className="flex w-full max-w-md flex-col gap-6 mx-auto mt-10 max-h-[60v] overflow-y-auto">
                <ItemGroup className="gap-4">
                  {items.map((item) => (
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
                                onClick={() =>
                                  handleReduce(item.item_id, -item.quantity)
                                }
                              >
                                <MinusIcon />
                              </Button>
                              <Button variant="outline" size="sm">
                                {item.quantity}
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                  handleAdd(item.item_id, item.quantity)
                                }
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
                            {item.item?.price}
                          </ItemDescription>
                        </ItemContent>
                      </a>
                    </Item>
                  ))}
                </ItemGroup>
              </div>
            </>
          )}
        </>
        <SheetFooter>
          <Button type="submit">Beyond payment</Button>
          <SheetClose asChild>
            <Button variant="outline">Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
