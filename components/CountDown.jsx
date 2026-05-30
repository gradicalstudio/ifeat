"use client";

import { useEffect, useState } from "react";

// Set your event date here
const EVENT_DATE = new Date("2026-07-18T20:00:00");

function calculateTimeLeft() {
  const difference = EVENT_DATE.getTime() - new Date().getTime();
  if (difference <= 0) return { days: 0, hours: 0, mins: 0, secs: 0 };
  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    mins: Math.floor((difference / 1000 / 60) % 60),
    secs: Math.floor((difference / 1000) % 60),
  };
}

function Segment({ value, label }) {
  return (
    <div className="flex flex-col items-center gap-4 px-13 py-5">
      <span className="text-[50px] font-monsterrat tabular-nums leading-none text-[#A59653]">
        {String(value).padStart(2, "0")}
      </span>
      <span className="text-[18px] tracking-[0.2em] font-raleway uppercase font-medium text-[#FEFFF4]">
        {label}
      </span>
    </div>
  );
}

function Divider() {
  return (
    <div
      className="self-stretch w-px my-5 bg-[#A59653]"
      
    />
  );
}

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  if (!mounted) return null;

  return (
    <div
      className="inline-flex items-stretch rounded-xl"
      style={{
        background: "rgba(255, 255, 255, 0.06)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        border: "1px solid rgba(255, 255, 255, 0.12)",
        boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
      }}
    >
      <Segment value={timeLeft.days} label="Days" />
      <Divider />
      <Segment value={timeLeft.hours} label="Hours" />
      <Divider />
      <Segment value={timeLeft.mins} label="Mins" />
      <Divider />
      <Segment value={timeLeft.secs} label="Secs" />
    </div>
  );
}