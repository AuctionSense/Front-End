import Item from "../models/Item";
import { useNavigate, useParams } from "react-router-dom";
import UseFetchGet from "../services/UseFetchApi";
import { useEffect, useState } from "react";

function ItemContainer() {
  const navigate = useNavigate();
  const { name } = useParams();
  const [isFetchReady, setIsFetchReady] = useState<boolean>(true);
  const [item, setItem] = useState<Item>();
  const [isItemSet, setIsItemSet] = useState<boolean>(false);
  const { error, isLoaded, data } = UseFetchGet(`all/items/name=${name}`, isFetchReady);

  useEffect(() => {
    if (item === undefined && isItemSet)
    {
      navigate("/404", {replace: true});
    }

    if (data)
    {
      setItem(data);
      setIsItemSet(true);
    }  
  }, [data, navigate, isItemSet, item])
  

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
