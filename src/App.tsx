import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CategoryContainer from "./pages/Products";
import HomeContainer from "./pages/Home";
import ItemContainer from "./pages/Product";
import BalanceContainer from "./pages/Balance";
import NotFound from "./pages/NotFound";
import KeyCloakService from "./services/KeyCloakService";
import { useEffect, useState } from "react";
import ErrorMessage from "./components/ErrorMessage";

function App() {
  const location = useLocation();
  const [error, setError] = useState<Error | null>(null);
  const [errors, setErrors] = useState<Error[]>([]);
  const [currentPath, setCurrentPath] = useState<string>(location.pathname);

  const pull_error = (error: Error) => {
    if (error) {
      setError(error);
    }
  };

  useEffect(() => {
    if (location.pathname !== currentPath)
    {
      setCurrentPath(location.pathname);
      setErrors([]);
    }
    if (error) {
      setErrors((errors) => [...errors, error]);
      setError(error);
    }
  }, [error, currentPath, location.pathname]);

  return (
    <div className="App">
      <Navbar setError={pull_error} />
      {errors ? <ErrorMessage errors={errors} /> : null}

      <button onClick={KeyCloakService.updateToken}>Refreshtoken</button>
      <button disabled>test</button>

      <Footer />

      <Routes>
        <Route path="*" element={<Navigate to="/404" replace />} />
        <Route path="/404" element={<NotFound />} />
        <Route path="/" element={<HomeContainer setError={pull_error} />} />
        <Route
          path="/c/:category"
          element={<CategoryContainer setError={pull_error} />}
        />
        <Route
          path="/c/:category/:product"
          element={<ItemContainer setError={pull_error} />}
        />
        <Route
          path="/balance"
          element={<BalanceContainer setError={pull_error} />}
        />
      </Routes>
    </div>
  );
}

export default App;
