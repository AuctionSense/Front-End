import { useEffect, useState } from "react";
import KeyCloakService from "./KeyCloakService";

function UseFetchAuthGet(apiDestination: string, isFetchReady: boolean) {
  const [data, setData] = useState<any>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [error, setError] = useState<Error>();

  useEffect(() => {
    const fetchData = async () => {
      if (!isFetchReady) {
        return;
      }
      return await fetch(
        process.env.REACT_APP_BASE_URL_DEVELOPMENT + apiDestination,
        {
          method: "GET",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + KeyCloakService.getToken(),
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          setIsLoaded(true);
          setData(data);
        })
        .catch((err) => {
          setIsLoaded(true);
          setError(err);
        });
    };
    fetchData();
  }, [apiDestination, isFetchReady]);

  return { isLoaded, error, data };
}

function UseFetchAuthPut(apiDestination: string, object: any)
{
  const [data, setData] = useState<any>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [error, setError] = useState<Error>();

  useEffect(() => {
    const postData = async () => {
      // This check is for hooks at top of a file so it doesn't send an unnecessary request.
      if (!object)
      {
        return;
      }
      return await fetch(process.env.REACT_APP_BASE_URL_DEVELOPMENT + apiDestination, {
        method: "PUT",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + KeyCloakService.getToken(),
        },
        body: JSON.stringify(object)
      })
      .then((response) => response.json())
      .then((data) => {
        setIsLoaded(true);
        setData(data);
      })
      .catch((err) => {
        setIsLoaded(true);
        setError(err);
      })
    }

    postData();
  }, [apiDestination, object])

  return { isLoaded, error, data }
}

export default UseFetchAuthGet;
export { UseFetchAuthPut };
