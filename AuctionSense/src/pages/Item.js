import React from "react";
import { GetItemById } from "services/ItemService";

function Item(id) {
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
  return (
    <div>
      <div key={item.id}>
        <h1>{item.name}</h1>
        <p>{item.description}</p>
      </div>
    </div>
  );
  }
}

export default Item;
