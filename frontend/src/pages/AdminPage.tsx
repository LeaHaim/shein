import ItemsTable from "@/components/ItemsTable";
import { Button } from "@/components/ui/button";

import { useItem } from "@/hooks/useItem";
import type { IItem } from "@/types/item.types";
import { Folder } from "lucide-react";
import { useEffect, useState } from "react";

export default function AdminPage() {
  const [items, setItems] = useState<IItem[]>([]);
  const [error, setError] = useState("");
  const { getAll, deleteOne, createOneItem, updateOneItem } = useItem();
  useEffect(() => {
    getAll().then((i) => {
      setItems(i || []);
    });
  }, [createOneItem]);

  async function deleteItem(id: string) {
    await deleteOne(id).then(() => {
      setItems((prev) => [...prev.filter((item) => item._id != id)]);
    });
  }
  async function updateItem(id: string, item: IItem) {
    try {
      await updateOneItem(id, item);
    } catch (error) {
      setError(error as string);
    }
  }
  async function createItem(item: IItem) {
    try {
      await createOneItem(item);
    } catch (error) {
      setError(error as string);
    }
  }
  return (
    <div className="">
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
      <ItemsTable
        items={items}
        deleteItem={deleteItem}
        createItem={createItem}
        updateItem={updateItem}
        error={error}
      />
    </div>
  );
}
