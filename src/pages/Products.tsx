import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import HttpConfig from "../services/HttpConfigService";
import UseFetch from "../services/UseFetchApiService";
import Loading from "../components/Loading";
import Product from "../models/Product";
import styles from "../css/Products.module.css";
import GenresNavbar from "../components/navbar/GenresNavbar";
import Alert from "@mui/material/Alert/Alert";

function ProductsPage(props: { setError: any }) {
  const navigate = useNavigate();
  const { category } = useParams<string>();
  const [currentCategory, setCurrentCategory] = useState<string>(
    category || ""
  );
  const [errorGenres, setErrorGenres] = useState<Error | null>(null);

  const [isFetchReady, setIsFetchReady] = useState<boolean>(true);
  const [products, setProducts] = useState<Product[] | null>(null);

  const pull_error = (error: Error) => {
    if (error) {
      setErrorGenres(error);
    }
  };
  const [genres] = useState<JSX.Element | null>(<GenresNavbar  setError={pull_error}/>);


  if (isFetchReady) {
    HttpConfig.setHeader("Content-Type", "application/json");
  }

  const { error, data, isLoaded } = UseFetch(
    `all/products/category/${category}`,
    isFetchReady,
    HttpConfig.methods.GET
  );

  const backEvent = () => {
    navigate("/");
  };

  useEffect(() => {
    if (isFetchReady) {
      setIsFetchReady(false);
    }

    // If product changed fetch new product.
    if (currentCategory !== category) {
      setIsFetchReady(true);
      setCurrentCategory(category || "");
    }

    if (error || errorGenres) {
      if (error)
      {
        error.message = "Product service is down, come back later.";
      }
      else if (errorGenres)
      {
        errorGenres.message = "Genre service is down, come back later if you want to filter on genres."
      }
      props.setError(error || errorGenres); // Set error in parent component.
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
    errorGenres,
  ]);

  if (!isLoaded) {
    return (
      <main>
        <Loading />
      </main>
    );
  } else if (error) {
    return (
      <Alert style={{ width: "20%"}} severity="error">This is an error alert — check it out!</Alert>
    )
  } else {
    return (
      <main className={styles.productsMain}>
        <nav className={styles.verticalNav}>
          <div className={styles.breadcrumb}>
            <ul>
              <li>
                <button className={styles.breadcrumbButton} onClick={backEvent}>
                  Back
                </button>
              </li>
              <li>
                <Link to={"/"} className={styles.breadcrumbLink}>
                  Home
                </Link>
              </li>
              <li>{" >"}</li>
              <li>
                <Link to={`/c/${category}`} className={styles.breadcrumbLink}>
                  {category}
                </Link>
              </li>
            </ul>
          </div>
          <div className={styles.filter}>
            <h1>Filter</h1>
            <ul>
              <li>New</li>
              <li>Populair</li>
            </ul>
          </div>
          {genres}
          <div className={styles.price}>
            <h3>Price</h3>
            <ul>
              <li>€</li>
              <li>
                drag price bar
              </li>
            </ul>
          </div>
        </nav>
        <div className={styles.cardContainer}>
          {products?.map((product) => (
            <div key={product.id} className={styles.productCard}>
              <Link
                className={styles.productCardLink}
                to={`/c/${category}/${product.name}`}
              >
                <img
                  src="/images/Minecraft.png"
                  alt="Product"
                  className={styles.productImage}
                ></img>
              </Link>
              <div>
                <Link
                  className={styles.productCardLink}
                  to={`/c/${category}/${product.name}`}
                >
                  <h3 data-testid="product-with-name">{product.name}</h3>
                </Link>
                <p>{product.description}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    );
  }
}

export default ProductsPage;
