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
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { BsBasket, BsCart } from "react-icons/bs";
import { ButtonGroup } from "@/components/ui/button-group";
import { MinusIcon, PlusIcon } from "lucide-react";
export default function CartPage() {
  const [items, setItems] = useState<ICart[]>([]);
   const { addItemToCart } = useCart();
  const { getAllItems } = useCart();
  useEffect(() => {
    getAllItems().then((i) => {
      setItems(i || []);
    });
  }, []);
  async function handleAdd(item_id: string,quantity:number) {
    await addItemToCart({ item_id, quantity });
  }
  async function handleReduce(item_id: string,quantity:number) {
    await addItemToCart({ item_id, quantity});
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
            <div>
              <Empty className="mt-50">
                <EmptyHeader>
                  <EmptyMedia variant="icon">
                    <BsBasket />
                  </EmptyMedia>
                  <EmptyTitle>No items in cart yet.</EmptyTitle>
                  <EmptyDescription>
                    Add items to cart to see them here
                  </EmptyDescription>
                </EmptyHeader>
                <EmptyContent>
                  <SheetClose asChild>
                    <Button variant="outline">Start Shopping</Button>
                  </SheetClose>
                </EmptyContent>
              </Empty>
            </div>
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
                        <ItemMedia variant="image">
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
                          <ItemDescription className="mt-2">
                            <ButtonGroup className="scale-75">
                              <Button variant="outline" size="sm" onClick={()=>handleReduce(item.item_id,item.quantity)}>
                                <MinusIcon />
                              </Button>
                              <Button variant="outline" size="sm">
                                {item.quantity}
                              </Button>
                              <Button variant="outline" size="sm" onClick={()=>handleAdd(item.item_id,item.quantity)}>
                                <PlusIcon />
                              </Button>
                            </ButtonGroup>
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
