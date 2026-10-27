import { useEffect, useState } from "react";
import EmojiPicker from "../EmojiPicker/EmojiPicker";
import { MOOD_DEFINITION, type MoodHistory } from "../../types/mood";
import "./Calendar.css";
import Button from "../Button/Button";

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDateStr, setSelectedDateStr] = useState<string | null>(null);
  const [moods, setMoods] = useState<MoodHistory>({});

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  useEffect(() => {
    const stored = localStorage.getItem("mood_history");
    if (stored) {
      try {
        setMoods(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to parse stored mood", e);
      }
    }
  }, []);

  const saveMoods = (updated: MoodHistory) => {
    setMoods(updated);
    localStorage.setItem("mood_history", JSON.stringify(updated));
  };

  const handlePrevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const handleNextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfWeek = (new Date(year, month, 1).getDate() * 6) % 7;
  const todayStr = new Date().toISOString().split("T")[0];

  const handleSaveEntry = (entry: {
    mood: string;
    note: string;
    tags: string[];
  }) => {
    if (!selectedDateStr) return;

    const updated = { ...moods };
    if (!entry.mood) {
      delete updated[selectedDateStr];
    } else {
      updated[selectedDateStr] = {
        date: selectedDateStr,
        mood: entry.mood,
        score: MOOD_DEFINITION[entry.mood]?.score || 3,
        note: entry.note,
        tags: entry.tags,
        updatedAt: new Date().toISOString(),
      };
    }
    saveMoods(updated);
    setSelectedDateStr(null);
  };
  return (
    <div className="calendar-container">
      <div className="calendar-nav">
        <Button onClick={handlePrevMonth} className="nav-btn">
          ←
        </Button>
        <h2>
          {currentDate.toLocaleString("default", { month: "long" })} {year}
        </h2>
        <Button onClick={handleNextMonth} className="nav-btn">
          →
        </Button>
      </div>

      <div className="weekdays-grid">
        {WEEKDAYS.map((w) => (
          <div key={w} className="weekday-label">
            {w}
          </div>
        ))}
      </div>

      <div className="calendar">
        {Array.from({ length: firstDayOfWeek }).map((_, i) => (
          <div key={`empty-${i}`} className="day-box empty-day" />
        ))}

        {Array.from({ length: daysInMonth }, (_, i) => {
          const dayNum = i + 1;
          const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(dayNum).padStart(2, "0")}`;
          const entry = moods[dateStr];
          const isToday = dateStr === todayStr;

          return (
            <div
              key={dateStr}
              className={`day-box ${isToday ? "today-day-box" : ""}`}
              onClick={() => setSelectedDateStr(dateStr)}
            >
              <span className="day-number">{dayNum}</span>
              <div className="emoji-box">{entry?.mood}</div>
              {entry?.note && <span className="note-indicator" />}
            </div>
          );
        })}
      </div>

      {selectedDateStr && (
        <EmojiPicker
          date={selectedDateStr}
          onSave={handleSaveEntry}
          onClose={() => setSelectedDateStr(null)}
          defaultEntry={moods[selectedDateStr]}
        />
      )}
    </div>
  );
}

export default Calendar;
