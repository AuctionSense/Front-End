import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import HttpConfig from "../services/HttpConfigService";
import UseFetch from "../services/UseFetchApiService";
import Loading from "../components/Loading";
import Product from "../models/Product";

function ProductsPage(props: { setError: any }) {
  const navigate = useNavigate();
  const { category } = useParams<string>();
  const [currentCategory, setCurrentCategory] = useState<string>(
    category || ""
  );

  const [isFetchReady, setIsFetchReady] = useState<boolean>(true);
  const [products, setProducts] = useState<Product[] | null>(null);

  if (isFetchReady) {
    HttpConfig.setHeader("Content-Type", "application/json");
  }

  const { error, data, isLoaded } = UseFetch(
    `all/products/category/${category}`,
    isFetchReady,
    HttpConfig.methods.GET
  );

  useEffect(() => {
    if (isFetchReady) {
      setIsFetchReady(false);
    }

    // If product changed fetch new product.
    if (currentCategory !== category) {
      setIsFetchReady(true);
      setCurrentCategory(category || "");
    }

    if (error) {
      props.setError(error); // Set error in parent component.
    } else if (data) {
      setProducts(data);
    }

    if (products?.length === 0 && isLoaded) {
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
    isFetchReady,
  ]);

  if (!isLoaded) {
    return (
      <main>
        <Loading />
      </main>
    );
  } else {
    return (
      <main>
        <div>
          {products?.map((product) => (
            <div key={product.id}>
              <Link to={`/c/${category}/${product.name}`}>Go to item</Link>
              <h1>{product.name}</h1>
              <p>{product.description}</p>
            </div>
          ))}
        </div>
      </main>
    );
  }
}

export default ProductsPage;
