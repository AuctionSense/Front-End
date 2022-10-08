import styles from "./App.module.css";
import { Link, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Games from "./pages/Games";
import React from "react";
import Cars from "pages/Cars";

function App() {
  return (
    <>
    <div>
    <nav className={styles.navBarTop}>
        <ul>
          <li>
            <Link className={styles.navBarTopLink} to="/">Image placeholder</Link>
          </li>
          <li className={styles.dropDown}>
            <p>
              Category
            </p>
            <div className={styles.dropDownContent}>
              <Link className={styles.dropDownContentLink} to="/games">Games</Link>
              <Link className={styles.dropDownContentLink} to="/cars">Cars</Link>
            </div>
          </li>
        </ul>
      </nav>
    </div>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/games" element={<Games />} />
        <Route path="/cars" element={<Cars />} />
      </Routes>
      <div>
      <footer>
        @JarnoBV
      </footer>
    </div>
    </>
  );
}

export default App;
