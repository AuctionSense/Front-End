import Product from "../models/Product";
import { useNavigate, useParams } from "react-router-dom";
import UseFetch from "../services/UseFetchApiService";
import { useEffect, useState } from "react";
import HttpConfig from "../services/HttpConfigService";

function ProductPage(props: {setError: any}) {
  const navigate = useNavigate();
  const { productName } = useParams();
  const [isFetchReady, setIsFetchReady] = useState<boolean>(true);
  const [isProductSet, setIsProductSet] = useState<boolean>(false);
  const [product, setProduct] = useState<Product | null>(null);
  const [currentProduct, setCurrentProduct] = useState<string>(productName || "");
  const { error, isLoaded, data } = UseFetch(
    `all/items/name=${productName}`,
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

    if (currentProduct !== productName)
    {
      setIsFetchReady(true);
      setCurrentProduct(productName || "");
    }
    
    if (product === undefined && isProductSet) {
      navigate("/404", { replace: true });
    }

    if (data) {
      setProduct(data);
      setIsProductSet(true);
    }
  }, [data, navigate, isProductSet, product, currentProduct, isFetchReady, productName, error, props]);

  if (!isLoaded) {
    return (
      <div>
        <h1>{"Loading..."}</h1>
      </div>
    );
  } else {
    return (
      <div>
        <div key={product?.id}>
          <h1>{product?.name}</h1>
          <p>{product?.description}</p>
        </div>
      </div>
    );
  } 
}

export default ProductPage;
