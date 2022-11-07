import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import Item from "../models/Item";
import UseFetchGet from "../services/UseFetchApi";

function CategoryContainer() {
  const navigate = useNavigate();
  const { category } = useParams();
  const [isFetchReady, setIsFetchReady] = useState<boolean>(true);
  const [items, setItems] = useState<Item[]>([]);
  const [isItemsSet, setIsItemsSet] = useState<boolean>(false);
  const { error, data, isLoaded } = UseFetchGet(`all/items/category=${category}`, isFetchReady);

  useEffect(() => {
    if (items.length === 0 && isItemsSet)
    {
      navigate("/404", {replace: true});
    }

    if (data)
    {
      setItems(data);
      setIsItemsSet(true);
    }
  }, [data, navigate, items, isLoaded, isItemsSet])
 
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
            <Link to={`/c/${category}/${item.name}`}>
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
