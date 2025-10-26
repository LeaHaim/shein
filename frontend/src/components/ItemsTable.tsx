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
import { Edit2, Plus, Trash2 } from "lucide-react";
type Props = {
  items: IItem[];
  deleteItem: (id: string) => void;
};

export default function ItemsTable({ items,deleteItem }: Props) {

  return (
    <div>
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-3xl font-bold">Products</h2>
        <Button className="rounded-4xl">
          Add Product <Plus />
        </Button>
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
                <TableCell className="font-medium">{i.name}</TableCell>
                <TableCell>{i.category}</TableCell>
                <TableCell>{i.price}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-3">
                    <Button
                      onClick={() => deleteItem(i._id)}
                      className="bg-white hover:bg-gray-300 rounded-full"
                    >
                      <Trash2 className="text-red-600" size={18} />
                    </Button>
                    <Button className="bg-white hover:bg-gray-300 rounded-full">
                      <Edit2 className="text-blue-700" size={18} />
                    </Button>
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
