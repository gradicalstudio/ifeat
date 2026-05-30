"use client";

import { useEffect, useState } from "react";

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
    <div className="flex flex-col flex-1 items-center justify-center gap-1.5 sm:gap-2 md:gap-3 lg:gap-4 xl:gap-5 py-3 sm:py-4 md:py-5 lg:py-6 xl:py-7 px-2 sm:px-3 md:px-4 xl:px-6">
      <span
        className="tabular-nums text-[28px] md:text-[38px] lg:text-[50px] leading-none text-[#A59653]"
        style={{
          fontFamily: "'Montserrat', sans-serif",
          fontWeight: 500,

          letterSpacing: "-0.02em",
        }}
      >
        {String(value).padStart(2, "0")}
      </span>
      <span
        className="uppercase text-[13px] md:text-base lg:text-lg tracking-widest text-[#FEFFF4]"
        style={{
          fontFamily: "'Raleway', sans-serif",
          fontWeight: 500,
       
          letterSpacing: "0.2em",
          opacity: 0.85,
        }}
      >
        {label}
      </span>
    </div>
  );
}

function Divider() {
  return (
    <div
      className="self-stretch shrink-0"
      style={{
        width: "1px",
        background: "rgba(165, 150, 83, 0.45)",
        margin: "clamp(10px, 2.5vw, 22px) 0",
      }}
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
      className="inline-flex w-full items-stretch overflow-hidden"
      style={{
        borderRadius: "clamp(10px, 2vw, 18px)",
        background: "rgba(255, 255, 255, 0.06)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        border: "1px solid rgba(165, 150, 83, 0.35)",
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
