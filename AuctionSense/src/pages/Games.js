import React from "react";
import GetAllItems from "../services/ItemService";

function Games() {
  const items = GetAllItems();

  if (items === "Loading items...") {
    return <>items</>;
  } else {
    return (
      <>
        {items.map((item) => (
          <ul key={item.id}>
            <li>{item.name}</li>
            <li>{item.description}</li>
          </ul>
        ))}
      </>
    );
  }
}

export default Games;
