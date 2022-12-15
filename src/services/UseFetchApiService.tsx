import { useEffect, useState } from "react";
import HttpConfig from "./HttpConfigService";
import KeyCloakService from "./KeyCloakService";

/** Fetches data from the given destination.
 *
 * @param apiDestination The destination for fetching the data. Example: items/category=games
 * @returns If the data has loaded, error if there is an error and data if there is data.
 */
function UseFetch(
  apiDestination: string,
  isFetchReady: boolean,
  fetchMethod: string,
  body: any = null
) {
  const [data, setData] = useState<any>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [responseCode, setResponseCode] = useState<number>(100);
  const [error, setError] = useState<Error | null>(null);
  const [headers] = useState<any>(HttpConfig.getHeaders());
  if (Object.keys(HttpConfig.getHeaders()).length !== 0)
  {
    HttpConfig.removeAllHeaders();
  }

  useEffect(() => {
    if (!isFetchReady) {
      return;
    }

    if (apiDestination.includes("user/") || apiDestination.includes("admin/")) {
      if (!KeyCloakService.isLoggedIn()) {
        KeyCloakService.updateToken(); // Sends the user to the login page if not logged in and token cannot be renewed.
      }
    }
    const fetchData = async () => {
      return await fetch(
        process.env.REACT_APP_BASE_URL_DEVELOPMENT + apiDestination,
        {
          method: fetchMethod,
          mode: "cors",
          headers: headers,
          body: body,
        }
      )
        .then((response) => {
          setResponseCode(response.status);
          return response.json();
        })
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
  }, [isFetchReady, apiDestination, fetchMethod, body, headers]);

  return { isLoaded, error, data, responseCode };
}

export default UseFetch;
