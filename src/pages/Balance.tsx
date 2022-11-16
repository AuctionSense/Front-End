import { useEffect, useState } from "react";
import KeyCloakService from "../services/KeyCloakService";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import useFetch from "../services/UseFetchApiService";
import HttpConfig from "../services/HttpConfigService";
import { useNavigate } from "react-router-dom";
import { LoadingObject } from "../components/Loading";

function BalancePage(props: { setError: any }) {
  const [amount, setAmount] = useState<string | null>(null);
  const [isSubmit, setIsSubmit] = useState<boolean>(false);

  const [isFetchReady, setIsFetchReady] = useState<boolean>(true);
  const [balance, setBalance] = useState<string>();

  const navigate = useNavigate();

  let patternTwoDigisAfterComma = /^\d+(\.\d{0,2})?$/;

  if (isFetchReady || isSubmit) {
    HttpConfig.setHeader("Content-Type", "application/json");
    HttpConfig.setHeader(
      "Authorization",
      `Bearer ${KeyCloakService.getToken()}`
    );
  }

  const { data, error, isLoaded } = useFetch(
    `user/balance/${KeyCloakService.getUsername()}`,
    isFetchReady,
    HttpConfig.methods.GET
  );

  const {
    data: newBalance,
    error: putError,
    isLoaded: putIsLoaded,
  } = useFetch(
    `user/balance/${KeyCloakService.getUsername()}/${amount}`,
    isSubmit,
    HttpConfig.methods.PUT
  );

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
    if (!KeyCloakService.isLoggedIn()) {
      navigate("/");
    }

    if (isFetchReady) {
      setIsFetchReady(false);
    } else if (isSubmit) {
      setIsSubmit(false);
    }

    if (data) {
      setBalance(data);
    } else if (error) {
      error.message = "Balance service is down, come back later."
      props.setError(error);
      setBalance("0");
    }

    if (newBalance) {
      setBalance(newBalance.newBalance);
    } else if (putError) {
      props.setError(putError);
      setBalance("0");
    }
  }, [
    newBalance,
    data,
    error,
    navigate,
    props,
    isFetchReady,
    isSubmit,
    putError,
  ]);

  return (
    <main>

    <div>
      <h1>Current Balance</h1>
      <p>
        €
        {isLoaded ? (
          balance
        ) : <LoadingObject /> || putIsLoaded ? (
          balance
        ) : (
          <LoadingObject />
        )}
      </p>
      <h1>Add balance</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="number"
          min="10"
          max="1000"
          step="0.01"
          required
          placeholder="0.00"
          data-testid="balance-input"
          {...register("amount")}
        />
        <p style={{ color: "red" }} data-testid="error-p">{errors.amount?.message?.toString()}</p>
        <input type="submit" data-testid="form-submit-button"/>
      </form>
    </div>
    </main>
  );
}

export default BalancePage;
