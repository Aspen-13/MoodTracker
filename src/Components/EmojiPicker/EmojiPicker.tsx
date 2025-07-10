import Button from "../Button/Button";
import "./EmojiPicker.css";
type props = {
  onSelect: (emoji: string) => void;
  onClose: () => void;
};

const emojis = ["😂", "😒", "😭", "😡", "😐", "😊", ""];
function EmojiPicker({ onSelect, onClose }: props) {
  return (
    <div className="emoji-overlay" onClick={onClose}>
      <div className="emoji-popup" onClick={(e) => e.stopPropagation()}>
        <h3> What you feeling today?</h3>
        <div className="emoji-grid">
          {emojis.map((emoji) => (
            <Button key={emoji} onClick={() => onSelect(emoji)}>
              {emoji ? emoji : "Remove"}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default EmojiPicker;
