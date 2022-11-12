import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../../css/App.module.css";
import Category from "../../models/Category";
import HttpConfig from "../../services/HttpConfigService";
import UseFetch from "../../services/UseFetchApiService";
import { LoadingObject } from "../Loading";

function CategoryNavbar() {
  const [isFetchReady, setIsFetchReady] = useState<boolean>(true);
  const [categories, setCategories] = useState<Category[] | null>(null);

  const { data, isLoaded, error } = UseFetch(
    "all/categories",
    isFetchReady,
    HttpConfig.getHeaders(),
    HttpConfig.methods.GET
  );

  useEffect(() => {
    if (isFetchReady === true) {
      setIsFetchReady(false);
    }
    if (data) {
      setCategories(data);
    }
  }, [data, isFetchReady]);

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
