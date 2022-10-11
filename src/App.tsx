import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import GamesContainer from "./pages/GamesContainer";
import HomeContainer from "./pages/HomeContainer";
import ItemContainer from "./pages/ItemContainer";

function App() {
  return (
    <div className="App">
      <NavBar />

      <button disabled>test</button>

      <Footer />

      <Routes>
        <Route path="/" element={<HomeContainer />} />
        <Route path="/games" element={<GamesContainer />} />
        {/* <Route path="/cars" element={<Cars />} /> */}
        <Route path="/games/:id" element={<ItemContainer />} />
      </Routes>
    </div>
  );
}

export default App;
