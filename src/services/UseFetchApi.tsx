import { useEffect, useState } from "react";

/** Fetches data from the given destination.
 *
 * @param apiDestination The destination for fetching the data. Example: items/category=games
 * @returns If the data has loaded, error if there is an error and data if there is data.
 */
function UseFetchGet(apiDestination: string, isFetchReady: boolean) {
  const [data, setData] = useState<any>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [error, setError] = useState<Error>();

  useEffect(() => {
    if (!isFetchReady) {
      return;
    }
    const fetchData = async () => {
      return await fetch(
        process.env.REACT_APP_BASE_URL_DEVELOPMENT + apiDestination,
        {
          method: "GET",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
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
  }, [isFetchReady, apiDestination]);

  return { isLoaded, error, data };
}

/** Post data on the given destination.
 *
 * @param apiDestination The destination for fetching the data. Example: user/id=uuid
 * @param object This can be any type of object (preferable json).
 * @returns If the data has loaded, error if there is an error and data if there is data.
 */
function UseFetchPost(apiDestination: string, object: any) {
  const [data, setData] = useState(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [error, setError] = useState<Error>();

  useEffect(() => {
    const postData = async () => {
      // This check is for hooks at top of a file so it doesn't send an unnecessary request.
      if (!object) {
        return;
      }
      return await fetch(
        process.env.REACT_APP_BASE_URL_DEVELOPMENT + apiDestination,
        {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(object),
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

    postData();
  }, [apiDestination, object]);

  return { isLoaded, error, data };
}

export default UseFetchGet;
export { UseFetchPost };
