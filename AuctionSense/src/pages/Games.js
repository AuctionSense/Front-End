import React from "react";
import GetAllItems from "../services/ItemService";

function Games() {
  const items = GetAllItems();

  if (items === "Loading items...") {
    return <>items</>;
  } else {
    return (
      <div>
        {items.map((item) => (
          <div key={item.id}>
            <h1>{item.name}</h1>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    );
  }
}

export default Games;
