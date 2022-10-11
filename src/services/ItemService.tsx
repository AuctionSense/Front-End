import { useEffect, useState } from "react";
import Item from "../models/Item";
import Error from "../models/Error"
import GetBaseUrl from "../utils/Http";
import Category from "../models/Category";

function GetAllItems() {
  const [error, setError] = useState<Error>();
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      return await fetch(GetBaseUrl() + "items", {
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
          (error) => {
            setIsLoaded(true);
            setError(error);
          }
        );
    };
    fetchData();
  }, []);

  return {
    error,
    isLoaded,
    items,
  };
}

function GetAllItemsByCategory(iCategory: Category) {
  const [error, setError] = useState<Error>();
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      return await fetch(GetBaseUrl() + `items/category=${iCategory.name}`, {
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
          (error) => {
            setIsLoaded(true);
            setError(error);
          }
        );
    };
    fetchData();
  }, [iCategory]);

  return {
    error,
    isLoaded,
    items,
  };
}

function GetItemById(iItem: Item) {
  const [error, setError] = useState<Error>();
  const [isLoaded, setIsLoaded] = useState(false);
  const [item, setItems] = useState<Item>();

  useEffect(() => {
    const fetchData = async () => {
      return await fetch(GetBaseUrl() + `items/id=${iItem.id}`, {
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
          (error) => {
            setIsLoaded(true);
            setError(error);
          }
        );
    };
    fetchData();
  }, [iItem]);

  return {
    error,
    isLoaded,
    item,
  };
}

export default GetAllItems;
export { GetAllItemsByCategory };
export { GetItemById };