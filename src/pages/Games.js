import React from "react";
import { Link, useLocation } from "react-router-dom";
import { GetAllItemsByCategory } from "services/ItemService";

function Games() {
  const location = useLocation();
  const category = location.pathname.replace("/", "");
  const { error, isLoaded, items }  = GetAllItemsByCategory(category);

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
        {items.map((item) => (
          <div key={item.id}>
            <Link to={`/games/${item.name}`} state={{id: item.id}}>Go to item</Link>
            <h1>{item.name}</h1>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    );
  }
}

export default Games;
