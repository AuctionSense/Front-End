import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Product from "../models/Product";
import HttpConfig from "../services/HttpConfigService";
import UseFetch from "../services/UseFetchApiService";
import Loading from "../components/Loading";

function ProductsPage(props: {setError: any}) {
  const navigate = useNavigate();
  const { category } = useParams<string>();
  const [isFetchReady, setIsFetchReady] = useState<boolean>(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [isProductsSet, setIsProductsSet] = useState<boolean>(false);
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
    if (isFetchReady === true) {
      setIsFetchReady(false);
    }

    if (error)
    {
      props.setError(error);
    }

    if (currentCategory !== category) {
      setIsFetchReady(true);
      setCurrentCategory(category || "");
    }

    if (data) {
      setProducts(data);
      setIsProductsSet(true);
    }

    if (products.length === 0 && isProductsSet) {
      navigate("/404", { replace: true });
    }
  }, [
    data,
    navigate,
    products,
    category,
    currentCategory,
    error,
    props,
    isLoaded,
    isProductsSet,
    isFetchReady,
  ]);

  if (!isLoaded) {
    return <Loading />;
  } else {
    return (
      <div>
        {products.map((item) => (
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

export default ProductsPage;
