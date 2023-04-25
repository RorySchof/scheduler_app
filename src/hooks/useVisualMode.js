import { useState } from "react";

export default function useVisualMode(initialMode) {
  const [history, setHistory] = useState([initialMode]);

  function transition(mode, replace = false) {
    setHistory((prev) =>
      replace ? [...prev.slice(0, prev.length - 1), mode] : [...prev, mode]
    );
  }

  function back() {
    if (history.length > 1) {
      setHistory((prev) => prev.slice(0, prev.length - 1));
    }
  }

  const mode = history[history.length - 1];

  return { mode, transition, back };
}