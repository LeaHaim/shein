import { useCart } from "@/hooks/useCart";
import type { ICart } from "@/types/cart.types";
import { useEffect, useState } from "react";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import { Button } from "@/components/ui/button"
import { BsBasket } from "react-icons/bs";
import { IItem } from "@/types/item.types";
export default function CartPage() {
  const [items, setItems] = useState<ICart[]>([]);
  const [all,setAll]=useState<IItem[]>([])
  const { getAllItems ,getOneItem} = useCart();
   useEffect(() => {
      getAllItems().then((i) => {
        setItems(i || []);
      });
    }, []);
  return <>{items.length === 0 ?<div><Empty className="border border-dashed mt-50">
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
        <Button variant="outline" size="sm">
          Start Shopping
        </Button>
      </EmptyContent>
    </Empty>
    </div>:<>{JSON.stringify(items)}</> }</>;
}
// {JSON.stringify(items.map((i)=>getOneItem(i._id!)))}</> }
