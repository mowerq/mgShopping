import "./App.css";
import Header from "./components/header/Header";
import Homepage from "./components/homepage/Homepage";
import Footer from "./components/footer/Footer";
function App() {
  if (!localStorage.getItem("accessToken")) {
    localStorage.setItem("accessToken", "");
  }
  return (
    <div className="app">
      <Header />
      <div id="homepage-wrapper">
        <Homepage />
      </div>
      <Footer />
    </div>
  );
}

export default App;
