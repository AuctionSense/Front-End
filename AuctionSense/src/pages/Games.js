import React from "react";
import GetAllUsers from "../services/ItemService";

function Games() {
  const items = GetAllUsers();
  console.log(items);
  return (
    <article>
      <h1>Scientists</h1>
    </article>
  );
}

export default Games;
