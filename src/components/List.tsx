import React, { memo, ReactNode } from "react";

type Item<ID extends React.Key> = {
  id: ID;
};

export type ListProps<ID extends React.Key, ITEM extends Item<ID>> = {
  data: ITEM[] | undefined;
  renderItem: (item: ITEM) => ReactNode;
};

const ListComponent = <ID extends React.Key, ITEM extends Item<ID>>({
  data,
  renderItem
}: ListProps<ID, ITEM>) => (
  <ul>
    {data?.map((item) => (
      <li key={item.id}>{renderItem(item)}</li>
    ))}
  </ul>
);

export const List = memo(ListComponent) as typeof ListComponent;
