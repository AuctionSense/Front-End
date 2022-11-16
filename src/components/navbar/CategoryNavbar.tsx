import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../../css/App.module.css";
import Category from "../../models/Category";
import HttpConfig from "../../services/HttpConfigService";
import UseFetch from "../../services/UseFetchApiService";
import { LoadingObject } from "../Loading";

function CategoryNavbar(props: {setError: any}) {
  const [isFetchReady, setIsFetchReady] = useState<boolean>(true);
  const [categories, setCategories] = useState<Category[] | null>(null);

  if (isFetchReady) {
    HttpConfig.setHeader("Content-Type", "application/json");
  }

  let { data, isLoaded, error } = UseFetch(
    "all/categories",
    isFetchReady,
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
    if (data) {
      setCategories(data);
    }
  }, [data, isFetchReady, error, props]);

  if (!isLoaded) {
    return (
      <div className={styles.dropDownContent}>
        <LoadingObject />
      </div>
    );
  } else {
    return (
      <div className={styles.dropDownContent}>
        {categories?.map((category) => (
          <Link
            className={styles.dropDownContentLink}
            key={category.id}
            to={`/c/${category.name}`}
          >
            {category.name}
          </Link>
        ))}
      </div>
    );
  }
}

export default CategoryNavbar;
