"use client";
import { useEffect } from "react";
import { createPortal } from "react-dom";

// Full-screen modal shell: dimmed overlay (click to close), dialog panel, round close button.
// Pauses Lenis and locks body scroll while open, and closes on Escape.
// `className` styles the dialog panel; `overlayClassName` the overlay padding;
// `closeClassName` positions the close button relative to the panel.
export default function Modal({
  onClose,
  className = "",
  overlayClassName = "p-4 bg-black/60 backdrop-blur-sm",
  closeClassName = "top-2 right-2 md:top-3 md:right-3",
  children,
}) {
  useEffect(() => {
    window.lenis?.stop();
    document.body.style.overflow = "hidden";
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      window.lenis?.start();
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return createPortal(
    <div
      className={`fixed inset-0 z-100 flex items-center justify-center animate-dropdown ${overlayClassName}`}
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
        className={`relative ${className}`}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className={`absolute z-10 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white text-[#0E1219] shadow-md transition-[color,background-color,scale] duration-200 active:scale-95 hover:bg-[#A59653] hover:text-white ${closeClassName}`}
        >
          <svg viewBox="0 0 14 14" className="h-3.5 w-3.5" aria-hidden="true">
            <path
              d="M1 1l12 12M13 1L1 13"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
        </button>
        {children}
      </div>
    </div>,
    document.body,
  );
}
