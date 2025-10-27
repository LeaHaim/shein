import type { IItem } from "@/types/item.types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "./ui/button";
import { Trash2 } from "lucide-react";
import CreateOrEditItem from "./CreateOrEditItem";
type Props = {
  items: IItem[];
  deleteItem: (id: string) => void;
  updateItem: (id: string, item: IItem) => void;
  createItem: (item: IItem) => void;
};

export default function ItemsTable({
  items,
  deleteItem,
  createItem,
  updateItem,
}: Props) {
  return (
    <div>
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-3xl font-bold">Products</h2>
        <CreateOrEditItem
          createItem={createItem}
          updateItem={updateItem}
        />
      </div>
      {/* //product table */}
      <div className="border border-gray-300 rounded-lg ">
        <Table>
          <TableHeader className="bg-gray-200">
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((i) => (
              <TableRow key={i._id}>
                <TableCell className="font-medium flex items-center gap-4">
                  <img src={i.image} alt={i.name} width={50} height={50} />
                  {i.name}
                </TableCell>
                <TableCell>{i.category}</TableCell>
                <TableCell>{i.price}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-3">
                    <Button
                      onClick={() => deleteItem(i._id!)}
                      className="bg-white hover:bg-gray-300 rounded-full"
                    >
                      <Trash2 className="text-red-600" size={18} />
                    </Button>
                    <CreateOrEditItem
                      defaultValue={i}
                      createItem={createItem}
                      updateItem={updateItem}
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
