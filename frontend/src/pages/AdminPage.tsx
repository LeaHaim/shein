import { Button } from "@/components/ui/button";
import { ItemDescription } from "@/components/ui/item";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Folder, Plus } from "lucide-react";

export default function AdminPage() {
  return (
    <div className="">
      {/* // header */}
      <div className="flex justify-between items-center mb-15">
        <div className="mt-10">
          <h1 className="text-5xl font-bold mb-3">ADMIN PANEL</h1>
          <p className="text-gray-700 text-lg">Manage your products</p>
        </div>
        <Button
          variant="outline"
          size="lg"
          className="rounded-2xl border-e-gray-400"
        >
          <Folder /> Manage Category
        </Button>
      </div>
      {/* //products */}
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-3xl font-bold">Products</h2>
        <Button className="rounded-4xl">
          Add Product <Plus />
        </Button>
      </div>
      <ItemDescription className="my-2">
        Lorem ipsum dolor sit amet.
      </ItemDescription>

      {/* //product table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Invoice</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Method</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">INV001</TableCell>
            <TableCell>Paid</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell className="text-right">$250.00</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
