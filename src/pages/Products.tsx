import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Item from "../models/Product";
import HttpConfig from "../services/HttpConfigService";
import UseFetch from "../services/UseFetchApiService";

function CategoryContainer() {
  const navigate = useNavigate();
  const { category } = useParams<string>();
  const [isFetchReady, setIsFetchReady] = useState<boolean>(true);
  const [items, setItems] = useState<Item[]>([]);
  const [isItemsSet, setIsItemsSet] = useState<boolean>(false);
  const [currentCategory, setCurrentCategory] = useState<string>(category || "");

  const { error, data, isLoaded } = UseFetch(
    `all/items/category=${category}`,
    isFetchReady,
    HttpConfig.getHeaders(),
    HttpConfig.methods.GET
  );

  useEffect(() => {
    if (isFetchReady === true) {
      setIsFetchReady(false);
    } 
    if (currentCategory !== category)
    {
      setIsFetchReady(true);
      setCurrentCategory(category || "");
    }
 
    if (items.length === 0 && isItemsSet) {
      navigate("/404", { replace: true });
    }

    if (data) {
      setItems(data);
      setIsItemsSet(true);
    }
  }, [data, navigate, items, isLoaded, isItemsSet, isFetchReady, category, currentCategory]);

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
  } else if (items) {
    return (
      <div>
        {items.map((item) => (
          <div key={item.id}>
            <Link to={`/c/${category}/${item.name}`}>Go to item</Link>
            <h1>{item.name}</h1>
            <p>{item.description}</p>
          </div>
        ))}
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

export default CategoryContainer;
