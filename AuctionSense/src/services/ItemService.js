import { useEffect, useState } from "react";
import GetBaseUrl from "../utils/http";

function GetAllUsers() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch(GetBaseUrl() + "items", {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  if (error) {
    console.log(error.message);

    return error.message;
  } else if (!isLoaded) {
    console.log(isLoaded);
    return isLoaded;
  } else {
    console.log(items);
    return items;
  }
}

export default GetAllUsers;
