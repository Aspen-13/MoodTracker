import { useState } from "react";
import Button from "../Button/Button";
import "./EmojiPicker.css";
import { MOOD_DEFINITION, type MoodEntry } from "../../types/mood";
import TextArea from "../TextArea/TextArea";
import { formatEntryDate } from "../../util/formatEntryDate";
interface props {
  date: string;
  onSave: (entry: { mood: string; note: string; tags: string[] }) => void;
  onClose: () => void;
  defaultEntry?: MoodEntry;
}

const PRESET_TAGS = [
  "Work",
  "Gym",
  "Date",
  "Relax",
  "Stress",
  "Family",
  "Sleep",
];

function EmojiPicker({ date, onSave, onClose, defaultEntry }: props) {
  //use states for the emojis
  const [selectedEmoji, setSelectedEmoji] = useState(defaultEntry?.mood || "");
  //use state for the note
  const [moodNote, setMoodNote] = useState(defaultEntry?.note || "");
  const [tags, setTags] = useState<string[]>(defaultEntry?.tags || []);

  const toggleTag = (tag: string) => {
    setTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  };

  const popupDate = formatEntryDate(date);
  const handleSave = () => {
    if (!selectedEmoji) return;
    onSave({ mood: selectedEmoji, note: moodNote, tags });
  };
  return (
    <div className="emoji-overlay" onClick={onClose}>
      <div className="emoji-popup" onClick={(e) => e.stopPropagation()}>
        <div className="emoji-popup-header">
          <div className="emoji-popup-date-box-wrapper">
            <div className="emoji-popup-date-box">
              <div className="emoji-popup-day">{popupDate.weekdayShort}</div>
              <div className="emoji-popup-date">{popupDate.dayNumber}</div>
              <div className="emoji-popup-monthYearCombo">
                <span className="emoji-popup-month">
                  {popupDate.monthShort}
                </span>
                <span className="emoji-popup-year">{popupDate.year}</span>
              </div>
            </div>
          </div>
          <h3> What you feeling today?</h3>
        </div>
        <div className="emoji-grid">
          {Object.values(MOOD_DEFINITION).map(({ emoji, label }) => (
            <Button
              key={emoji}
              onClick={() => setSelectedEmoji(emoji)}
              className={`${selectedEmoji === emoji ? "selected-emoji" : ""}`}
              title={label}
            >
              {emoji}
            </Button>
          ))}
        </div>
        <div className="tags-container">
          <label className="section-label">Tags:</label>
          <div className="tags-cloud">
            {PRESET_TAGS.map((t) => (
              <Button
                key={t}
                className={`tag-pill ${tags.includes(t) ? "active" : ""}`}
                onClick={() => toggleTag(t)}
              >
                {t}
              </Button>
            ))}
          </div>
        </div>
        <p>{defaultEntry?.note}</p>
        <TextArea
          value={moodNote}
          onChange={(e) => setMoodNote(e.target.value)}
          id={"mood-entry-text-area"}
          placeholder="Write about your feelings"
        />
        <div className="emoji-panel-button-span">
          <Button onClick={handleSave} disabled={!selectedEmoji}>
            Save
          </Button>
          <Button onClick={() => onSave({ mood: "", note: "", tags: [] })}>
            Clear
          </Button>
        </div>
      </div>
    </div>
  );
}

export default EmojiPicker;
