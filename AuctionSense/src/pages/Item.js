import React from "react";
import { useLocation } from "react-router-dom";
import { GetItemById } from "services/ItemService";

function Item() {
  const id = useLocation().state?.id;
  const item = GetItemById(id);

  if (item.loading != null) {
    return <>{item.loading}</>;
  }
  else if(item.hasError === true)
  {
    return (
    <div>
      {item.message}
    </div>
    );
  }
  else {
    const {list} = item;
    console.log(list);
  return (
    <div>
      <div key={list.id}>
        <h1>{list.name}</h1>
        <p>{list.description}</p>
      </div>
    </div>
  );
  }
}

export default Item;
