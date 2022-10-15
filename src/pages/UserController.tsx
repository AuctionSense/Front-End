import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import User from "../models/User";
import CreateUser from "../services/UserService";

function CreateUserForm() {
  console.log("Rerender");

  const [user, setUser] = useState<User>({
    username: "",
    password: "",
    role: "user"
  });
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>();
  const [isLoadedVerified, setIsLoadedVerified] = useState<boolean>();
  const navigate = useNavigate();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmit(true);
  };

  useEffect(() => {
    if (isSubmit)
    {
      const {errorVerified, isLoaded, statusVerified} = CreateUser(user);
      setIsLoadedVerified(isLoaded);
      setErrorMessage(errorVerified.message);
      if (isLoaded)
      {
        if (!errorVerified.message)
        {
          console.log(statusVerified)
          navigate('/');
        }
      }
    }
  }, [isSubmit, navigate, user]);

  return (
    <>
    {isLoadedVerified === true && <h2>Loading...</h2>}
    {errorMessage && <h2>{errorMessage}</h2>}
    <form onSubmit={(e) => handleSubmit(e)}>
      <label>
        Enter your username:
        <input
          type="text"
          name="username"
          value={user?.username || ""}
          onChange={handleChange}
        />
      </label>
      <label>
        Enter your password:
        <input
          type="text"
          name="password"
          value={user?.password || ""}
          onChange={handleChange}
        />
      </label>
      <input type="submit" />
    </form>
    </>
  );
}

export default CreateUserForm;
