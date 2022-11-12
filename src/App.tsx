import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CategoryContainer from "./pages/Products";
import HomeContainer from "./pages/Home";
import ItemContainer from "./pages/Product";
import BalanceContainer from "./pages/Balance";
import NotFound from "./pages/NotFound";
import KeyCloakService from "./services/KeyCloakService";

function App() {

  return (
    <div className="App">
      <Navbar />

      <button onClick={KeyCloakService.updateToken}>Refreshtoken</button>
      <button disabled>test</button>

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
