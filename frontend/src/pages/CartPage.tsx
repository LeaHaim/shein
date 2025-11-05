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
import { BsCart } from "react-icons/bs";
import EmptyCart from "@/components/EmptyCart";
import { useCartContext } from "@/contexts/CartContext";
import CartTable from "@/components/ui/CartTable";
export default function CartPage() {
  const { cartData, open, set_Open } = useCartContext();

  const totalPrice = Number(
    cartData
      .reduce((sum, i) => sum + (i.item?.price! * i.quantity || 0), 0)
      .toFixed(2)
  );
  return (
    <Sheet open={open} onOpenChange={set_Open}>
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
        <>{cartData.length === 0 ? <EmptyCart /> : <CartTable cartData={cartData}/>}</>
        <SheetFooter>
          <Button type="submit">
            Beyond payment {totalPrice > 0 ? totalPrice : ""}
          </Button>
          <SheetClose asChild>
            <Button variant="outline">Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
