import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import User from "../models/User";
import { UseFetchPost } from "../services/UseFetchApi";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import FormErrors from "../models/FormErrors";
import { useNavigate } from "react-router-dom";

function CreateUser() {
  const [user, setUser] = useState<User>();
  const {isLoaded, error, data: status }= UseFetchPost("users", user);
  const [errorApiCall, setErrorApiCall] = useState<Error>();
  const [isSubmit, setIsSubmit] = useState<boolean>();
  const [formErrors, setFormErrors] = useState<FormErrors>();
  const navigate = useNavigate();

  const schema = yup.object().shape({
    username: yup
      .string()
      .min(4, "Username is too short, it should be a minimum of 4 characters.")
      .max(16, "Username is too long, it should be a max of 16 characters.")
      .required("No username provided."),
    password: yup
      .string()
      .min(
        12,
        "Password is too short, it should be a minimum of 12 characters."
      )
      .max(20, "Password is too long, it can only be a max of 20 characters.")
      .required("No password provided.")
      .matches(/[a-zA-Z]/, "Password can only contain Latin letters.")
      .matches(/[0-9]/, "Password requires a number")
      .matches(/[^\w]/, "Password requires a symbol")
      .matches(/[A-Z]/, "Password requires an uppercase letter"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], 'Must match "password" field value'),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (data: any) => {
    setUser({ username: data.username, password: data.password });

    setIsSubmit(true);
  };

  useEffect(() => {
    if (isSubmit)
    {
      if (error)
      {
        setErrorApiCall(error);
      }
  
      if (isLoaded)
      {
        if (status === 201)
        {
          navigate('/');
        }
      }
    }
    if (
      errors.username?.message ||
      errors.password?.message ||
      errors.confirmPassword?.message
    ) {
      setFormErrors({
        username: errors.username?.message?.toString(),
        password: errors.password?.message?.toString(),
        confirmPassword: errors.confirmPassword?.message?.toString(),
      });
    }
  }, [errors, isSubmit, isLoaded, error, status, navigate]);

 

  return (
    <div>
      <p>{errorApiCall?.message}</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="Enter username..."
          {...register("username")}
        />
        <p>{formErrors?.username}</p>
        <input
          type="password"
          placeholder="Enter password..."
          {...register("password")}
        />
        <p>{formErrors?.password}</p>
        <input
          type="password"
          placeholder="Confirm password..."
          {...register("confirmPassword")}
        />
        <p>{formErrors?.confirmPassword}</p>
        <input type="submit" />
      </form>
    </div>
  );
}

export default CreateUser;
