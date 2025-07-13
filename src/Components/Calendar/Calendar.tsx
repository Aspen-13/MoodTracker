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
  const [moods, setMoods] = useState<{
    [day: number]: { mood: string; note: string };
  }>({});

  const handleSelectedMood = (entry: { mood: string; note: string }) => {
    if (selectedDays !== null) {
      const updated = {
        ...moods,
        [selectedDays]: { mood: entry.mood, note: entry.note },
      };
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
        const entry = moods[day];
        return (
          <div
            key={day}
            className={`day-box ${day !== todayDate ? " " : "today-day-box"}`}
            onClick={() => setSelectedDays(day)}
          >
            <div className="day"> {day} </div>
            <div className="emoji-box">{entry?.mood}</div>
          </div>
        );
      })}
      {selectedDays !== null && (
        <EmojiPicker
          onSave={handleSelectedMood}
          onClose={() => setSelectedDays(null)}
          defaultEntry={moods[selectedDays] || { mood: "", note: "" }}
        />
      )}
    </div>
  );
}

export default Calendar;
