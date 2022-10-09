import { useEffect, useState } from "react";
import GetBaseUrl from "../utils/http";

function GetAllItems() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      return await fetch(GetBaseUrl() + "items", {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        }
      });
    };
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
    return { loading: "Loading items.." };
  } else {
    return { list: items };
  }
}

function GetAllItemsByCategory(category)
{
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      return await fetch(GetBaseUrl() + `items/category=${category}`, {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        }
      });
    };
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
  }, [category]);

  if (error) {
    return {
      hasError: hasError,
      message: error.message,
    };
  } else if (!isLoaded) {
    return { loading: "Loading items.." };
  } else {
    return { list: items };
  }
}

function GetItemById(id) {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [item, setItem] = useState([]);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      return await fetch(GetBaseUrl() + `items/id=${id}`, {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        }
      });
    };
    fetchData()
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItem(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
          setHasError(true);
        }
      );
  }, [id]);

  if (error) {
    return {
      hasError: hasError,
      message: error.message,
    };
  } else if (!isLoaded) {
    return { loading: "Loading items.." };
  } else {
    return { list: item };
  }
}

export default GetAllItems;
export { GetAllItemsByCategory };
export { GetItemById };
