import "./App.css";
import Calendar from "./Components/Calendar/Calendar";
import Footer from "./Components/Footer/Footer";
import Header from "./Components/Header/Header";

const currentDate = new Date();
const currentMonthName = currentDate.toLocaleString("default", {
  month: "long",
});
const currentYear = currentDate.getFullYear();

function App() {
  return (
    <div className="app">
      <Header> Mood???? </Header>
      <div className="main-body-container">
        <div className="month-display">
          {currentMonthName} {currentYear}
        </div>
        <Calendar />
      </div>
      <Footer />
    </div>
  );
}

export default App;
