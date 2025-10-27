import type { IItem } from "@/types/item.types";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Edit2Icon } from "lucide-react";
type Props = {
  defaultValue?: IItem;
  updateItem: (id: string, item: IItem) => void;
  createItem: (item: IItem) => void;
};

export default function CreateOrEditItem({
  defaultValue,
  createItem,
  updateItem,
}: Props) {
  const [item, setItem] = useState<IItem>(
    defaultValue
      ? defaultValue
      : {
          category: "",
          description: "",
          image: "",
          name: "",
          price: 0,
        }
  );
  function onSubmit() {
    if (defaultValue) {
      updateItem(item._id!, item);
    } else {
      createItem(item);
    }
  }
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setItem({ ...item, [name]: value });
  }
  return (
    <div>
      <Dialog>
        <form>
          <DialogTrigger asChild>
            <Button variant={defaultValue ? "link" : "default"}>
              {defaultValue ? <Edit2Icon /> : "Create new product"}
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>
                {defaultValue ? "Edit Product" : "Add Product"}
              </DialogTitle>
              <DialogDescription>
                {defaultValue
                  ? "Make changes to your product here."
                  : "Enter Product details"}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4">
              <div className="grid gap-3">
                <Label>Category</Label>
                <Input
                  name="category"
                  placeholder="enter category here"
                  value={item.category}
                  onChange={handleChange}
                />
              </div>
              <div className="grid gap-3">
                <Label>Name</Label>
                <Input
                  name="name"
                  placeholder="enter product name"
                  value={item.name}
                  onChange={handleChange}
                />
              </div>
              <div className="grid gap-3">
                <Label>Description</Label>
                <Input
                  name="description"
                  placeholder="enter product description"
                  value={item.description}
                  onChange={handleChange}
                />
              </div>
              <div className="grid gap-3">
                <Label>Price</Label>
                <Input
                  name="price"
                  placeholder="enter product price"
                  value={item.price}
                  onChange={handleChange}
                />
              </div>
              <div className="grid gap-3">
                <Label>Image</Label>
                <Input
                  name="image"
                  placeholder="enter product image url"
                  value={item.image}
                  onChange={handleChange}
                />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <DialogClose asChild>
                <Button type="submit" onClick={onSubmit}>
                  {defaultValue ? "Save changes" : "Add"}
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </form>
      </Dialog>
    </div>
  );
}
