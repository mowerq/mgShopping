import "./App.css";
import Header from "./components/header/Header";
import Homepage from "./components/homepage/Homepage";
import Footer from "./components/footer/Footer";
function App() {
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
