"use client";

import { useEffect, useState } from "react";

export default function HideWhenEnded({ targetDate, children }) {
  const [ended, setEnded] = useState(false);

  useEffect(() => {
    const date = targetDate
      ? new Date(targetDate)
      : new Date("2026-10-23T21:00:00+07:00");
    const check = () => {
      if (date.getTime() - Date.now() <= 0) {
        setEnded(true);
        return true;
      }
      return false;
    };
    if (check()) return;
    const timer = setInterval(() => {
      if (check()) clearInterval(timer);
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  if (ended) return null;
  return <>{children}</>;
}
