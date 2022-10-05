import { useEffect, useState } from "react";
import GetBaseUrl from "../utils/http";

function GetAllItems() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

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
        }
      );
  }, []);

  if (error) {
    return error.message;
  } else if (!isLoaded) {
    return "Loading items...";
  } else {
    return items;
  }
}

export default GetAllItems;
