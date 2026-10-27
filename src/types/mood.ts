export type MoodScore = 1 | 2 | 3 | 4 | 5;

export interface MoodConfig {
  emoji: string;
  label: string;
  score: MoodScore;
  colour: string;
}

export const MOOD_DEFINITION: Record<string, MoodConfig> = {
  "😊": { emoji: "😊", label: "Great", score: 5, colour: "#4ade80" },
  "😂": { emoji: "😂", label: "Happy", score: 4, colour: "#60a5fa" },
  "😐": { emoji: "😐", label: "Neutral", score: 3, colour: "#facc15" },
  "😒": { emoji: "😒", label: "Down", score: 2, colour: "#fb923c" },
  "😭": { emoji: "😭", label: "Sad", score: 1, colour: "#f87171" },
  "😡": { emoji: "😡", label: "Angry", score: 1, colour: "#ef4444" },
};

export interface MoodEntry {
  date: string;
  mood: string;
  score: MoodScore;
  note: string;
  tags?: string[];
  updatedAt: string;
}

export type MoodHistory = Record<string, MoodEntry>;
