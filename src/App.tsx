import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import GamesContainer from "./pages/ItemsController";
import HomeContainer from "./pages/HomeController";
import ItemContainer from "./pages/ItemController";
import LoginUser, {CreateUser} from "./pages/UserController";
import { useEffect, useState } from "react";
import UseAdminRequest from "./services/UseFetchApiAuth";

function App() {
  const [isFetchReady, setIsFetchReady] = useState<boolean>(false);
  const {error, data, isLoaded} = UseAdminRequest("admins/admin", isFetchReady);
  const setFetchReady = () => {
    setIsFetchReady(true);
  }

   return (
    <div className="App">
      <NavBar />

      <button disabled>test</button>
      <button onClick={() => setFetchReady()}>fetchApiAdmin</button>

      <Footer />

      <Routes>
        <Route path="/" element={<HomeContainer />} />
        <Route path="/games" element={<GamesContainer />} />
        <Route path="/games/:id" element={<ItemContainer />} />
        <Route path="/user/create" element={<CreateUser />} />
        <Route path="/user/login" element={<LoginUser />} />
      </Routes>
    </div>
  );
}

export default App;
