"use client";

import { useEffect, useState } from "react";

function calculateTimeLeft(targetDate) {
  const difference = targetDate.getTime() - new Date().getTime();
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
    <div className="flex flex-col flex-1 items-center justify-center gap-1.5 sm:gap-2 md:gap-3 lg:gap-4 xl:gap-5 py-3 sm:py-4 md:py-5 lg:py-6 xl:py-4 px-2 sm:px-3 md:px-4 xl:px-6">
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

export default function ClockV2({ targetDate }) {
  const date = targetDate
    ? new Date(targetDate)
    : new Date("2026-10-23T21:00:00+07:00");
  const [timeLeft, setTimeLeft] = useState(() => calculateTimeLeft(date));
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft(date)), 1000);
    return () => clearInterval(timer);
  }, []);

  if (!mounted) return null;

  return (
    <div
      className="inline-flex w-full items-stretch overflow-hidden"
      style={{
        borderRadius: "clamp(10px, 2vw, 18px)",
        background:
          "linear-gradient(180deg, rgba(254, 255, 244, 0.02) 0%, rgba(254, 255, 244, 0.1) 100%)",
        border: "2px solid transparent",
        backgroundClip: "padding-box",
        backdropFilter: "blur(30px)",
        WebkitBackdropFilter: "blur(30px)",
        boxShadow: "4px 4px 18px 0px #00000040",
        position: "relative",
      }}
    >
      {/* gradient border overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "clamp(10px, 2vw, 18px)",
          padding: "2px",
          background:
            "linear-gradient(180deg, rgba(254, 255, 244, 0.1) 0%, rgba(254, 255, 244, 0.02) 100%)",
          WebkitMask:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          pointerEvents: "none",
        }}
      />
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
