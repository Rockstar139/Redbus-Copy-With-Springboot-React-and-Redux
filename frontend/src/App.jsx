import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Outlet } from "react-router";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Header />
        <Outlet />
      <Footer />
    </>
  );
}

export default App;
