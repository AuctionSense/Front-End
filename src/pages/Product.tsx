import Item from "../models/Product";
import { useNavigate, useParams } from "react-router-dom";
import UseFetch from "../services/UseFetchApiService";
import { useEffect, useState } from "react";
import HttpConfig from "../services/HttpConfigService";

function ItemContainer(props: {setError: any}) {
  const navigate = useNavigate();
  const { product } = useParams();
  const [isFetchReady, setIsFetchReady] = useState<boolean>(true);
  const [item, setItem] = useState<Item>();
  const [isItemSet, setIsItemSet] = useState<boolean>(false);
  const [currentProduct, setCurrentProduct] = useState<string>(product || "");
  const { error, isLoaded, data } = UseFetch(
    `all/items/name=${product}`,
    isFetchReady,
    HttpConfig.getHeaders(),
    HttpConfig.methods.GET
  );

  useEffect(() => {
    if (isFetchReady === true) {
      setIsFetchReady(false);
    } 
    if (error)
    {
      props.setError(error);
    }
    if (currentProduct !== product)
    {
      setIsFetchReady(true);
      setCurrentProduct(product || "");
    }
    if (item === undefined && isItemSet) {
      navigate("/404", { replace: true });
    }

    if (data) {
      setItem(data);
      setIsItemSet(true);
    }
  }, [data, navigate, isItemSet, item, currentProduct, isFetchReady, product, error, props]);

  if (!isLoaded) {
    return (
      <div>
        <h1>{"Loading..."}</h1>
      </div>
    );
  } else {
    return (
      <div>
        <div key={item?.id}>
          <h1>{item?.name}</h1>
          <p>{item?.description}</p>
        </div>
      </div>
    );
  } 
}

export default ItemContainer;
