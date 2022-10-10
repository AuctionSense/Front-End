import { useEffect, useState } from "react";
import GetBaseUrl from "../utils/http";

function GetAllItems() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

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
        }
      );
  }, []);

  return {
    error, 
    isLoaded, 
    items
  };
}

function GetAllItemsByCategory(category)
{
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

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
        }
      );
  }, [category]);

  return {
    error, 
    isLoaded, 
    items
  };
}

function GetItemById(id) {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [item, setItem] = useState([]);

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
        }
      );
  }, [id]);

  return {
    error, 
    isLoaded, 
    item
  };
}

export default GetAllItems;
export { GetAllItemsByCategory };
export { GetItemById };
