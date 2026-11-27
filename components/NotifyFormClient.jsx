"use client";

import { useEffect, useRef, useState } from "react";

const inputClass =
  "w-full h-10 lg:h-11 rounded-lg bg-[#FEFFF4] px-3 text-black font-raleway text-[15px] outline-none border-2 border-transparent focus:border-[#A59653] transition-colors";
const labelClass = "block mb-1.5 text-[#FEFFF4] font-raleway font-medium text-sm";

export default function NotifyFormClient({ labels, consent, success }) {
  const [status, setStatus] = useState("idle"); // idle | sending | done | error
  const [error, setError] = useState("");
  // Bots fill forms instantly; the API rejects anything submitted too fast.
  const startedAt = useRef(0);
  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    if (status === "sending") return;

    const form = new FormData(e.currentTarget);
    setStatus("sending");
    setError("");

    try {
      const res = await fetch("/api/notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.get("name"),
          company: form.get("company"),
          email: form.get("email"),
          website: form.get("website"), // honeypot
          elapsed: Date.now() - startedAt.current,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Something went wrong. Please try again.");
      setStatus("done");
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div
        role="status"
        className="mt-8 rounded-xl border border-[#A59653]/60 bg-white/5 px-5 py-6 text-[#FEFFF4] font-raleway text-base lg:text-lg"
      >
        {success}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 lg:mt-9">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-3">
        <div>
          <label htmlFor="notify-name" className={labelClass}>
            {labels.name}
            <span aria-hidden="true">*</span>
          </label>
          <input
            id="notify-name"
            name="name"
            type="text"
            autoComplete="name"
            required
            maxLength={120}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="notify-company" className={labelClass}>
            {labels.company}
            <span aria-hidden="true">*</span>
          </label>
          <input
            id="notify-company"
            name="company"
            type="text"
            autoComplete="organization"
            required
            maxLength={160}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="notify-email" className={labelClass}>
            {labels.email}
            <span aria-hidden="true">*</span>
          </label>
          <input
            id="notify-email"
            name="email"
            type="email"
            autoComplete="email"
            enterKeyHint="send"
            required
            maxLength={200}
            className={inputClass}
          />
        </div>
      </div>

      {/* Honeypot: hidden from people, bots tend to fill it in */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="notify-website">Website</label>
        <input id="notify-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="mt-5 lg:mt-4 flex flex-col md:flex-row md:items-center md:justify-between gap-5">
        <div className="text-[#FEFFF4] font-raleway text-xs lg:text-[13px] leading-snug md:max-w-[65%]">
          {consent}
        </div>
        <button
          type="submit"
          disabled={status === "sending"}
          className="flex items-center justify-center w-full md:w-fit shrink-0 px-9 py-3 lg:py-4 rounded-xl leading-tight font-monsterrat font-bold text-sm xl:text-base uppercase text-black cursor-pointer transition-[color,background-color,border-color,scale] duration-200 active:scale-[0.97] disabled:active:scale-100 bg-[#A59653] hover:bg-white border border-[#A59653] hover:border-white disabled:opacity-60 disabled:cursor-wait"
        >
          {status === "sending" ? "Sending…" : labels.button}
        </button>
      </div>

      <p aria-live="polite" className="mt-3 empty:mt-0 text-sm font-raleway text-[#F4B4A4]">
        {status === "error" ? error : ""}
      </p>
    </form>
  );
}
