import { useState } from "react";
import Button from "../Button/Button";
import "./EmojiPicker.css";
import TextArea from "../TextArea/TextArea";
interface props {
  onSave: (entry: { mood: string; note: string }) => void;
  onClose: () => void;
  defaultEntry?: { mood: string; note: string };
}

const emojis = ["😂", "😒", "😭", "😡", "😐", "😊"];
function EmojiPicker({ onSave, onClose, defaultEntry }: props) {
  //use states for the emojis
  const [selectedEmoji, setSelectedEmoji] = useState(defaultEntry?.mood || "");
  //use state for the note
  const [moodNote, setMoodNote] = useState(defaultEntry?.note || "");
  const handleSave = () => {
    if (selectedEmoji !== null) {
      onSave({
        mood: selectedEmoji,
        note: moodNote,
      });
    }
  };
  return (
    <div className="emoji-overlay" onClick={onClose}>
      <div className="emoji-popup" onClick={(e) => e.stopPropagation()}>
        <h3> What you feeling today?</h3>
        <div className="emoji-grid">
          {emojis.map((emoji) => (
            <Button
              key={emoji}
              onClick={() => setSelectedEmoji(emoji)}
              classname={`${selectedEmoji === emoji ? "selected-emoji" : ""}`}
            >
              {emoji}
            </Button>
          ))}
        </div>
        <p>{defaultEntry?.note}</p>
        <TextArea
          value={moodNote}
          onChange={(e) => setMoodNote(e.target.value)}
          id={"mood-entry-text-area"}
          placeholder="Write about your feelings"
        />
        <Button onClick={handleSave} disabled={!selectedEmoji}>
          Save
        </Button>
        <Button onClick={() => onSave({ mood: "", note: "" })}>Clear</Button>
      </div>
    </div>
  );
}

export default EmojiPicker;
