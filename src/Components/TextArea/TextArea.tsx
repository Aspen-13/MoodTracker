import "./TextArea.css";

interface moodProps {
  value: string;
  placeholder?: string;
  rows?: number;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  id: string;
}

function TextArea({
  value,
  onChange,
  placeholder = "Type something here...",
  rows = 4,
  id,
}: moodProps) {
  return (
    <textarea
      id={id}
      name={id}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
      className="mood-text-area"
    ></textarea>
  );
}

export default TextArea;
