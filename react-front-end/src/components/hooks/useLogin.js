import { useState } from "react";

export default function useLogin(initialMode) {
  const [mode, setMode] = useState(initialMode)
  const transition = (mode) => {
    setMode(mode)
  }

  return { mode, transition }
}