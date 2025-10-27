import { useItem } from "@/hooks/useItem";
import type { IItem } from "@/types/item.types";
import { useEffect, useState } from "react";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemHeader,
  ItemTitle,
} from "@/components/ui/item";
export default function HomePage() {
  const [items, setItems] = useState<IItem[]>([]);
  const { getAll } = useItem();
  useEffect(() => {
    getAll().then((i) => {
      setItems(i || []);
    });
  }, []);

  return (
    <div className="flex w-full max-w-10xl flex-col gap-6 mt-15">
      <ItemGroup className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5">
        {items.map((item) => (
          <Item key={item._id} variant="outline">
            <ItemHeader>
              <img
                src={item.image}
                alt={item.name}
                width={128}
                height={128}
                className="aspect-square w-full rounded-sm object-cover"
              />
            </ItemHeader>
            <ItemContent>
              <ItemTitle>{item.name}</ItemTitle>
              <ItemDescription>{item.description}</ItemDescription>
            </ItemContent>
          </Item>
        ))}
      </ItemGroup>
    </div>
  );
}
