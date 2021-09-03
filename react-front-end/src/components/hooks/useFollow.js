import { useState } from "react";

export default function useFollow(initialMode) {
  const [mode, setMode] = useState(initialMode)
  const transition = (mode) => {
    setMode(mode)
  }

  return { mode, transition }
}