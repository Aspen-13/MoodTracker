import "./App.css";
import Calendar from "./Components/Calendar/Calendar";
import Footer from "./Components/Footer/Footer";
import Header from "./Components/Header/Header";

function App() {
  return (
    <div className="app">
      <Header> Mood???? </Header>
      <div className="main-body-container">
        <Calendar />
      </div>
      <Footer />
    </div>
  );
}

export default App;
