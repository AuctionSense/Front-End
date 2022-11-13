import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Item from "../models/Product";
import HttpConfig from "../services/HttpConfigService";
import UseFetch from "../services/UseFetchApiService";
import Loading from "../components/Loading";

function CategoryContainer(props: {setError: any}) {
  const navigate = useNavigate();
  const { category } = useParams<string>();
  const [isFetchReady, setIsFetchReady] = useState<boolean>(true);
  const [items, setItems] = useState<Item[]>([]);
  const [isItemsSet, setIsItemsSet] = useState<boolean>(false);
  const [currentCategory, setCurrentCategory] = useState<string>(
    category || ""
  );

  const { error, data, isLoaded } = UseFetch(
    `all/items/category=${category}`,
    isFetchReady,
    HttpConfig.getHeaders(),
    HttpConfig.methods.GET
  );

  useEffect(() => {
    if (error)
    {
      props.setError(error);
    }
    if (isFetchReady === true) {
      setIsFetchReady(false);
    }
    if (currentCategory !== category) {
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
  }, [
    data,
    navigate,
    items,
    isLoaded,
    isItemsSet,
    isFetchReady,
    category,
    currentCategory,
    error,
    props
  ]);

  if (!isLoaded) {
    return <Loading />;
  } else {
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
  }
}

export default CategoryContainer;
