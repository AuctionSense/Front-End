import Product from "../models/Product";
import { useNavigate, useParams } from "react-router-dom";
import UseFetch from "../services/UseFetchApiService";
import { useEffect, useState } from "react";
import HttpConfig from "../services/HttpConfigService";

function ProductPage(props: { setError: any }) {
  const navigate = useNavigate();
  const { productName } = useParams();
  const [currentProduct, setCurrentProduct] = useState<string>(
    productName || ""
  );

  const [isFetchReady, setIsFetchReady] = useState<boolean>(true);
  const [product, setProduct] = useState<Product | null>(null);

  if (isFetchReady) {
    HttpConfig.setHeader("Content-Type", "application/json");
  }

  const { error, isLoaded, data, responseCode } = UseFetch(
    `all/products/name=${productName}`,
    isFetchReady,
    HttpConfig.methods.GET
  );

  useEffect(() => {
    if (isFetchReady) {
      setIsFetchReady(false);
    }

    // If product changed fetch new product.
    if (currentProduct !== productName) {
      setIsFetchReady(true);
      setCurrentProduct(productName || "");
    }

    if (error) {
      props.setError(error); // Set error in parent component.
    } else if (data) {
      setProduct(data);
    }

    if (responseCode === 204 && isLoaded) {
      navigate("/404", { replace: true });
    }
  }, [
    data,
    navigate,
    product,
    currentProduct,
    isFetchReady,
    productName,
    error,
    props,
    isLoaded,
    responseCode,
  ]);

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
