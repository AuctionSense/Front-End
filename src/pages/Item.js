// @ts-nocheck

import React from "react";
import { useLocation } from "react-router-dom";
import { GetItemById } from "services/ItemService";

function Item() {
  const id = useLocation().state?.id;
  const { error, isLoaded, item } = GetItemById(id);

  if (!isLoaded) {
    return <>{"Loading..."}</>;
  }
  else if(error)
  {
    return (
    <>
      {error.message}
    </>
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
