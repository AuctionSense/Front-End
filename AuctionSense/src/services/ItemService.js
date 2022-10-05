import { useEffect, useState } from "react";
import GetBaseUrl from "../utils/http";

function GetAllItems() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [hasError, setHasError] = useState(false);

  const fetchData = async () => {
    return await fetch(GetBaseUrl() + "items", {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  useEffect(() => {
    fetchData()
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
          setHasError(true);
        }
      );
  }, []);

  if (error) {
    return {
      hasError: hasError,
      message: error.message,
    };
  } else if (!isLoaded) {
    return { loading: "Loading items..." };
  } else {
    return { list: items };
  }
}

export default GetAllItems;
