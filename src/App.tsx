import { Navigate, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import CategoryContainer from "./pages/Products";
import HomeContainer from "./pages/Home";
import ItemContainer from "./pages/Product";
import { useState } from "react";
import UseFetchAuthGet from "./services/UseFetchApiAuthService";
import BalanceContainer from "./pages/Balance";
import NotFound from "./pages/NotFound";
import KeyCloakService from "./services/KeyCloakService";

function App() {
  const [isFetchReady, setIsFetchReady] = useState<boolean>(false);
  const { error, data, isLoaded } = UseFetchAuthGet("admin", isFetchReady);

  const setFetchReady = () => {
    setIsFetchReady(true);
    console.log(error, data, isLoaded);
  };

  return (
    <div className="App">
      <NavBar />

      <button onClick={KeyCloakService.updateToken}>Refreshtoken</button>
      <button disabled>test</button>
      <button onClick={() => setFetchReady()}>fetchApiAdmin</button>

      <Footer />

      <Routes>
        <Route path="*" element={<Navigate to="/404" replace />} />
        <Route path="/404" element={<NotFound />} />
        <Route path="/" element={<HomeContainer />} />
        <Route path="/c/:category" element={<CategoryContainer />} />
        <Route path="/c/:category/:name" element={<ItemContainer />} />
        <Route path="/balance" element={<BalanceContainer />} />
      </Routes>
    </div>
  );
}

export default App;
