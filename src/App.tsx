import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProductsPage from "./pages/Products";
import HomePage from "./pages/Home";
import ProductPage from "./pages/Product";
import BalancePage from "./pages/Balance";
import NotFoundPage from "./pages/NotFound";
import { useEffect, useState } from "react";
import ErrorMessage from "./components/ErrorMessage";

function App() {
  const location = useLocation();
  const [error, setError] = useState<Error | null>(null);
  const [errors, setErrors] = useState<Error[]>([]);
  const [currentPath, setCurrentPath] = useState<string>(location.pathname);

  // Create variable function to set error of child component.
  const pull_error = (error: Error) => {
    if (error) {
      setError(error);
    }
  };

  useEffect(() => {
    // Set current path and empty previous errors.
    if (location.pathname !== currentPath) {
      setCurrentPath(location.pathname);
      setErrors([]);
    }

    // Set error of child component into errors array.
    if (error) {
      setErrors((errors) => [...errors, error]);
      setError(error);
    }
  }, [error, currentPath, location.pathname]);

  return (
    <div className="App">
      <Navbar setError={pull_error} />
      <main>
          
        {errors ? <ErrorMessage errors={errors} /> : null}

      </main>

      <Routes>
        <Route path="*" element={<Navigate to="/404" replace />} />
        <Route path="/404" element={<NotFoundPage />} />
        <Route path="/" element={<HomePage setError={pull_error} />} />
        <Route
          path="/c/:category"
          element={<ProductsPage setError={pull_error} />}
        />
        <Route
          path="/c/:category/:productName"
          element={<ProductPage setError={pull_error} />}
        />
        <Route
          path="/balance"
          element={<BalancePage setError={pull_error} />}
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
