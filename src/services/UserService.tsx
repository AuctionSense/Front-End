import User from "../models/User";

const CreateUser = (user: User) => {
  let errorVerified: Error = {name: "", message: ""};
  let isLoaded = false;
  let statusVerified: number = 0;

  const fetchData = async () => {
    return await fetch(process.env.REACT_APP_BASE_URL_DEVELOPMENT + `users`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({username: `${user.username}`, password: `${user.password}`, role: `${user.role}`})
    })
      .then((res) => {
        if (!res.ok)
        {
          throw new Error(`Http error: ${res.status}`)
        }

        return res.status;
      })
      .then(
        (status) => {
          isLoaded = true;
          statusVerified = status;
        },
      )        
      .catch((error) => {
        console.error(`There seems to be an error: ${error}`);
      });
  };
  fetchData();

  return {
    errorVerified,
    isLoaded,
    statusVerified
  };
};

export default CreateUser;