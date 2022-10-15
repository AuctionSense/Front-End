import { useEffect, useState } from "react";

function UseFetchGet(apiDestination: string) {
  const [data, setData] = useState(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [error, setError] = useState<Error>();

  useEffect(() => {
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
  }, [apiDestination]);

  return { isLoaded, error, data };
}

function UseFetchPost(apiDestination: string, object: any)
{
  const [data, setData] = useState<number>();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [error, setError] = useState<Error>();

  useEffect(() => {
    const postData = async () => {
      if (!object)
      {
        return;
      }
      return await fetch(process.env.REACT_APP_BASE_URL_DEVELOPMENT + apiDestination, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(object)
      })
      .then((response) => response.status)
      .then((status) => {
        setIsLoaded(true);
        setData(status);
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

export default UseFetchGet;
export { UseFetchPost };