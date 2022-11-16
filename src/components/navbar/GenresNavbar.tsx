import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "../../css/Products.module.css";
import Genre from "../../models/Genre";
import HttpConfig from "../../services/HttpConfigService";
import UseFetch from "../../services/UseFetchApiService";
import { LoadingObject } from "../Loading";

function GenresNavbar(props: {setError: any}) {
  const [isFetchReady, setIsFetchReady] = useState<boolean>(true);
  const [genres, setGenres] = useState<Genre[] | null>(null);
  const { category } = useParams();
  const [currentCategory, setCurrentCategory] = useState<string>(category || "");

  if (isFetchReady) {
    HttpConfig.setHeader("Content-Type", "application/json");
  }

  const { data, error, isLoaded } = UseFetch(
    `/all/genres/category/${category}`,
    isFetchReady,
    HttpConfig.methods.GET
  );

  useEffect(() => {
    if (isFetchReady === true) {
      setIsFetchReady(false);
    }

    if (currentCategory !== category) {
        setIsFetchReady(true);
        setCurrentCategory(category || "");
      }

      if (error)
      {
        props.setError(error);
      }
    if (data) {
      setGenres(data);
    }
  }, [isFetchReady, data, category, currentCategory, error, props]);

  if (!isLoaded) {
    return (
      <div className={styles.dropDownContent}>
        <LoadingObject />
      </div>
    );
  } else {
    return (
      <div className={styles.genre}>
        <h3>Genres</h3>
        <ul>
          {genres?.map((genre) => (
            <li key={genre.id}>{genre.name}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default GenresNavbar;
