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

export default UseFetchAuthGet;
