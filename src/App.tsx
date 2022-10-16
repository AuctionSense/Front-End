import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import GamesContainer from "./pages/ItemsController";
import HomeContainer from "./pages/HomeController";
import ItemContainer from "./pages/ItemController";
import CreateUser from "./pages/UserController";

function App() {
  return (
    <div className="App">
      <NavBar />

      <button disabled>test</button>

      <Footer />

      <Routes>
        <Route path="/" element={<HomeContainer />} />
        <Route path="/games" element={<GamesContainer />} />
        <Route path="/games/:id" element={<ItemContainer />} />
        <Route path="/user/create" element={<CreateUser />} />
      </Routes>
    </div>
  );
}

export default App;
