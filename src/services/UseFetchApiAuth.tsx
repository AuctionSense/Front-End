import { useEffect, useState } from "react";
import { getToken } from "./KeyCloakService";

function UseAdminRequest(apiDestination: string, isFetchReady: boolean) {

    const [data, setData] = useState(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [error, setError] = useState<Error>();

  useEffect(() => {
    const fetchData = async () => {
        if (!isFetchReady)
{
    return;
}
      return await fetch(
        process.env.REACT_APP_BASE_URL_DEVELOPMENT + apiDestination,
        {
          method: "GET",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + getToken()
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

export default UseAdminRequest;