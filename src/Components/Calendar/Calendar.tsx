import { useEffect, useState } from "react";
import EmojiPicker from "../EmojiPicker/EmojiPicker";
import "./Calendar.css";

const daysInMonth = new Date(
  new Date().getFullYear(),
  new Date().getMonth() + 1,
  0
).getDate();

const todayDate = new Date().getDate();

function Calendar() {
  const [selectedDays, setSelectedDays] = useState<number | null>(null);
  const [moods, setMoods] = useState<{ [day: number]: string }>({});

  const handleSelectedMood = (emoji: string) => {
    if (selectedDays !== null) {
      const updated = { ...moods, [selectedDays]: emoji };
      setMoods(updated);
      localStorage.setItem("moods", JSON.stringify(updated));
      setSelectedDays(null);
    }
  };
  useEffect(() => {
    const stored = localStorage.getItem("moods");
    if (stored) {
      setMoods(JSON.parse(stored));
    }
  }, []);
  return (
    <div className="calendar">
      {Array.from({ length: daysInMonth }, (_, i) => {
        const day = i + 1;
        return (
          <div
            key={day}
            className={`day-box ${day !== todayDate ? " " : "today-day-box"}`}
            onClick={() => setSelectedDays(day)}
          >
            <div className="day"> {day} </div>
            <div className="emoji-box">{moods[day]}</div>
          </div>
        );
      })}
      {selectedDays !== null && (
        <EmojiPicker
          onSelect={handleSelectedMood}
          onClose={() => setSelectedDays(null)}
        />
      )}
    </div>
  );
}

export default Calendar;
