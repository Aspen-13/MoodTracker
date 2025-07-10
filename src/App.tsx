import "./App.css";
import Calendar from "./Components/Calendar/Calendar";

const currentDate = new Date();
const currentMonthName = currentDate.toLocaleString("default", {
  month: "long",
});
const currentYear = currentDate.getFullYear();

function App() {
  return (
    <>
      <div className="month-display">
        {currentMonthName} {currentYear}
      </div>
      <Calendar />
    </>
  );
}

export default App;
