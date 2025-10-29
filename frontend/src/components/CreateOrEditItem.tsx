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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
type Props = {
  defaultValue?: IItem;
  updateItem: (id: string, item: IItem) => void;
  createItem: (item: IItem) => void;
  error: string;
};

export default function CreateOrEditItem({
  defaultValue,
  createItem,
  updateItem,
  error,
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
      setItem({
        category: "",
        description: "",
        image: "",
        name: "",
        price: 0,
      });
    }
    console.log(error);
  }
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setItem({ ...item, [name]: value });
  }
  function handleCancle() {
    if (defaultValue) {
      setItem(defaultValue);
    } else {
      setItem({
        category: "",
        description: "",
        image: "",
        name: "",
        price: 0,
      });
    }
  }
  return (
    <div>
      <Dialog>
        <form>
          <DialogTrigger asChild onClick={handleCancle}>
            <Button variant={defaultValue ? "link" : "default"}>
              {defaultValue ? <Edit2Icon /> : "Create new product"}
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[450px]">
            <DialogTitle>
              <Tabs defaultValue="editOradd" className="w-[400px]">
                <TabsList className="mx-auto">
                  <TabsTrigger value="editOradd">
                    {defaultValue ? "Edit Product" : "Add Product"}
                  </TabsTrigger>
                  <TabsTrigger value="preview">Preview</TabsTrigger>
                </TabsList>
                <DialogHeader>
              <DialogDescription>
                {defaultValue
                  ? "Make changes to your product here."
                  : "Enter Product details"}
              </DialogDescription>
            </DialogHeader>
                <TabsContent value="editOradd">
                  <>
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
                    <DialogFooter className="mt-5">
                      <DialogClose asChild>
                        <Button variant="outline" onClick={handleCancle}>
                          Cancel
                        </Button>
                      </DialogClose>
                      <DialogClose asChild>
                        <Button type="submit" onClick={onSubmit}>
                          {defaultValue ? "Save changes" : "Add"}
                        </Button>
                      </DialogClose>
                    </DialogFooter>
                  </>
                </TabsContent>
                <TabsContent value="preview">
                  {!item.image&&!item.name ?<Label>Add product details to see preview</Label>:<>
                    <div className="grid gap-4">
                      <img
                        src={item.image || undefined}
                        alt={item.name}
                        width={250}
                        height={250}
                        className="mx-auto mt-1"
                      />
                      <Label className="mx-auto">{item.name}</Label>
                      <Label className="text-gray-600">
                        {item.description}
                      </Label>
                      <Label>{item.price}</Label>
                      <Label>{item.category}</Label>
                    </div>
                  </>}
                </TabsContent>
              </Tabs>
            </DialogTitle>
          </DialogContent>
        </form>
      </Dialog>
    </div>
  );
}
