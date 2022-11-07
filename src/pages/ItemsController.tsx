import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Item from "../models/Item";
import UseFetchGet from "../services/UseFetchApi";

function CategoryContainer() {
  const location = useLocation();
  const [items, setItems] = useState<Item[]>([]);
  const { error, isLoaded, data } = UseFetchGet(`all/items/category=${location.pathname.replace("/", "")}`);
  const category = useLocation().state?.category;

  useEffect(() => {
    if (data)
    {
      setItems(data);
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
        <h1>{error.message}</h1>
      </div>
    );
  } else if (items)
  {
    return (
      <div>
        {items.map((item) => (
          <div key={item.id}>
            <Link to={`/${category}/${item.name}`} state={{ id: item.id, category: category }}>
              Go to item
            </Link>
            <h1>{item.name}</h1>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    );
  }
  else {
    return (
      <div>
        <h1>
          Something unexpected happened!
        </h1>
      </div>
    );
  }
}

export default CategoryContainer;
