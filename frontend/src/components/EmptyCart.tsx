import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { BsBasket } from "react-icons/bs";
import { SheetClose } from "./ui/sheet";
import { Button } from "./ui/button";
export default function EmptyCart() {
  return (
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
  );
}
