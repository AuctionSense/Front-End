import { useEffect, useState } from "react";
import KeyCloakService from "../services/KeyCloakService";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import useFetch from "../services/UseFetchApiService";
import HttpConfig from "../services/HttpConfigService";
import { useNavigate } from "react-router-dom";

function BalancePage(props: {setError: any}) {
  const [fetchBalance, setFetchBalance] = useState<boolean>(true);
  const [amount, setAmount] = useState<string>();
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const [balance, setBalance] = useState<string>();
  const { data, error, isLoaded } = useFetch(
    `user/balance/${KeyCloakService.getUsername()}`,
    fetchBalance,
    HttpConfig.getHeaders(),
    HttpConfig.methods.GET,
  );
  const navigate = useNavigate();
  const {
    data: newB,
    error: authError,
    isLoaded: isLoadedAuth,
  } = useFetch(
    `user/balance/${KeyCloakService.getUsername()}/${amount}`,
    isSubmit,
    HttpConfig.getHeaders(),
    HttpConfig.methods.GET,
  );
  

  console.log(authError, isLoadedAuth);

  let patternTwoDigisAfterComma = /^\d+(\.\d{0,2})?$/;

  const schema = yup.object().shape({
    amount: yup
      .number()
      .required("Required to fill in amount.")
      .positive("Amount needs to be positive.")
      .max(1000, "Maximum amount is €1000,-")
      .min(10, "Minimum amount is €10,-")
      .test(
        "is-decimal",
        "The amount should be a decimal with maximum two digits after comma",
        (val: any) => {
          if (val !== undefined) {
            return patternTwoDigisAfterComma.test(val);
          }
          return true;
        }
      ),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (data: any) => {
    setAmount(data.amount);
    setIsSubmit(true);
  };

  useEffect(() => {
    if (fetchBalance)
    {
      setFetchBalance(false);
    }
    if (isLoaded && data) {
      setBalance(data);
    } else if (error) {
      props.setError(error);
      setBalance("0");
    } else {
      setBalance("Loading..");
    }
    if (newB) {
      setBalance(newB.newBalance);
      setIsSubmit(false);
    }
    if (!KeyCloakService.isLoggedIn()) {
      navigate("/");
    }
  }, [newB, isLoaded, data, error, navigate, props, fetchBalance]);

  return (
    <div>
      {/* SHOW CURRENT BALANCE */}
      <h1>Current Balance</h1>
      <p>€{balance}</p>
      <h1>Add balance</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="number"
          min="10"
          max="1000"
          step="0.01"
          required
          placeholder="0.00"
          {...register("amount")}
        />
        <p style={{ color: "red" }}>{errors.amount?.message?.toString()}</p>
        <input type="submit" />
      </form>
    </div>
  );
}

export default BalancePage;
