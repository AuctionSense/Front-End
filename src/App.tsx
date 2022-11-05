import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import GamesContainer from "./pages/ItemsController";
import HomeContainer from "./pages/HomeController";
import ItemContainer from "./pages/ItemController";
import { useState } from "react";
import UseAdminRequest from "./services/UseFetchApiAuth";

function App() {
  const [isFetchReady, setIsFetchReady] = useState<boolean>(false);
  const {error, data, isLoaded} = UseAdminRequest("admin", isFetchReady);

  const setFetchReady = () => {
    setIsFetchReady(true);
    console.log(error, data, isLoaded)
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
      </Routes>
    </div>
  );
}

export default App;
