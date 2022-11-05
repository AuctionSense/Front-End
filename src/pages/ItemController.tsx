import Item from "../models/Item";
import { useLocation } from "react-router-dom";
import UseFetchGet from "../services/UseFetchApi";
import { useEffect, useState } from "react";

function ItemContainer() {
  const [item, setItem] = useState<Item>();
  const { error, isLoaded, data } = UseFetchGet(`all/items/id=${useLocation().state?.id}`);

  useEffect(() => {
    if (data)
    {
      setItem(data);
    }  
  }, [data])
  

  if (!isLoaded) {
    return (
      <div>
        <h1>{"Loading..."}</h1>
      </div>
    );
  } else if (error) {
    return (
      <div>
        <h1>Couldn't load data, try reloading the page or going back to the home page.</h1>
      </div>
    );
  } else if (item) {
    return (
      <div>
        <div key={item.id}>
          <h1>{item.name}</h1>
          <p>{item.description}</p>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <h1>Something unexpected happened!</h1>
      </div>
    );
  }
}

export default ItemContainer;
