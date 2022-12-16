import Product from "../models/Product";
import { Link, useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import UseFetch from "../services/UseFetchApiService";
import { useEffect, useState } from "react";
import HttpConfig from "../services/HttpConfigService";
import Loading from "../components/Loading";
import styles from "../css/Product.module.css";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import Bid from "../models/Bid";
import KeyCloakService from "../services/KeyCloakService";

function ProductPage(props: { setError: any }) {
  const navigate = useNavigate();
  const { category } = useParams<string>();
  const { productName } = useParams();
  const [currentProduct, setCurrentProduct] = useState<string>(
    productName || ""
  );

  const [isFetchReady, setIsFetchReady] = useState<boolean>(true);
  const [product, setProduct] = useState<Product | null>(null);
  const [bids, setBids] = useState<Bid[] | null>(null);
  const [amount, setAmount] = useState<number | null>(null);
  const [isPutReady, setIsPutReady] = useState<boolean>(false);

  let patternTwoDigisAfterComma = /^\d+(\.\d{0,2})?$/;

  if (isFetchReady || isPutReady) {
    HttpConfig.setHeader("Content-Type", "application/json");
  }

  const { error, isLoaded, data, responseCode } = UseFetch(
    `all/products/name/${productName}`,
    isFetchReady,
    HttpConfig.methods.GET
  );

   UseFetch(
    `all/products/name/${productName}`,
    isPutReady,
    HttpConfig.methods.PUT,
    `{ "user": "${KeyCloakService.getUsername()}", "amount": "${amount}"}`
  );
  const schema = yup.object().shape({
    amount: yup
      .number()
      .required("Required to fill in amount.")
      .positive("Amount needs to be positive.")
      .max(1000, "Maximum amount is €1000,-")
      .min(10, "Minimum amount is €10,-")
      .test(
        "is-decimal",
        "The amount should be a decimal with maximum two digits after comma",
        (val: any) => {
          if (val !== undefined) {
            return patternTwoDigisAfterComma.test(val);
          }
          return true;
        }
      ),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (obj: any) => {
    setAmount(obj.amount);
    setIsPutReady(true);
  };

  const backEvent = () => {
    navigate("/");
  };

  useEffect(() => {
    if (isFetchReady) {
      setIsFetchReady(false);
    }

    if (isPutReady)
    {
      setIsPutReady(false);
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
      const sortBids: Bid[] = data.bidHistory.bids
        .sort((a: Bid, b: Bid) => {
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        })
        .reverse();
      setBids(sortBids);
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
    isPutReady
  ]);

  if (!isLoaded) {
    return (
      <main>
        <Loading />
      </main>
    );
  } else {
    return (
      <main className={styles.productMain}>
        <div key={product?.id} className={styles.productContainer}>
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
              <li>{" >"}</li>
              <li>
                <Link
                  to={`/c/${category}/${product?.name}`}
                  className={styles.breadcrumbLink}
                >
                  {product?.name}
                </Link>
              </li>
            </ul>
          </div>
          <div className={styles.bidContainer}>
            <div className={styles.product}>
              <h3 data-testid="product-name">{product?.name}</h3>
              <img
                src="/images/minecraft-background.png"
                alt="Product"
                className={styles.productImage}
              ></img>
            </div>
            <div className={styles.bidBox}>
              <div className={styles.bidBoxLeft}>
                <div>
                  <h3>Current bid by: {bids ? bids[0]?.user.email : ""}</h3>
                  <p>€ {product?.price}</p>
                  <p className={styles.estimateText}>Estimate: € 0 - 30</p>
                </div>
                <form
                  className={styles.bidForm}
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <input
                    placeholder="0.00"
                    type="number"
                    min="0"
                    max="1000"
                    step="0.01"
                    required
                    data-testid="balance-input"
                    {...register("amount")}
                  ></input>
                  <br></br>
                  <p style={{ color: "red" }} data-testid="error-p">
                    {errors.amount?.message?.toString()}
                  </p>
                  <button type="submit">Place bid</button>
                </form>
              </div>
              <div className={styles.bidBoxRight}>
                <h3>Bid History</h3>
                {bids?.map((bid) => (
                  <div key={bid.id} className={styles.bidHistoryBox}>
                    <div className={styles.bidHistoryBoxDiv}>
                      <p>{bid.user.email}</p>
                    </div>
                    <div className={styles.bidHistoryBoxDiv}>
                      <p>{bid.date.toString().replace("T", "\u00a0")}</p>
                    </div>
                    <div className={styles.bidHistoryBoxDiv}>
                      <p>€ {bid.amount}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div>
            <h3>Specifications</h3>
            <p>{product?.description}</p>
          </div>
        </div>
      </main>
    );
  }
}

export default ProductPage;
