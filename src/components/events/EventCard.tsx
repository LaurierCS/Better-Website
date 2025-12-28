
interface EventCardProps {
  title: string;
  description: string;
  date: string;
  accentColorIndex?: number;
  centerText?: boolean;
  showSadFace?: boolean;
}

import { useMemo } from "react";


const accentColors = [
  "var(--color-accent-pink)",
  "var(--color-accent-orange)",
  "var(--color-accent-yellow)",
  "var(--color-accent-blue)",
  "var(--color-accent-light-blue)",
];

function EventCard({ title, description, date, accentColorIndex, centerText, showSadFace }: EventCardProps) {
  // Use accentColorIndex if provided, otherwise fallback to random
  const glowColor = useMemo(() => {
    if (typeof accentColorIndex === "number") {
      return accentColors[accentColorIndex % accentColors.length];
    }
    const idx = Math.floor(Math.random() * accentColors.length);
    return accentColors[idx];
  }, [accentColorIndex]);

  return (
    <div className="relative p-[2px] rounded-2xl transition-all duration-300 hover:scale-105 w-full max-w-3xl">
      <div
        className="absolute inset-0 rounded-2xl blur-md opacity-80 pointer-events-none animate-pulse"
        style={{ background: glowColor }}
        aria-hidden="true"
      />
      <div className={`relative bg-[#05081a] text-white rounded-2xl shadow-lg p-6 z-10 border-2 border-transparent w-full h-full ${centerText ? "text-center" : ""}`}>
        <div className={`flex items-center mb-2 ${centerText ? "justify-center" : "justify-between"}`}>
          <h2 className="text-4xl font-bold uppercase tracking-wide font-[Dosis] flex items-center gap-3">
            {title}
            {showSadFace && (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className="inline w-8 h-8 text-white opacity-80"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none"/><circle cx="9" cy="10" r="1" fill="currentColor"/><circle cx="15" cy="10" r="1" fill="currentColor"/><path d="M9 16c1-1 4-1 6 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
            )}
          </h2>
          {!centerText && date && date.trim() !== "" && (
            <span className="ml-6 text-lg font-[Dosis] opacity-95 whitespace-nowrap bg-[#181f3a] px-4 py-1 rounded-lg border border-white/20">{date}</span>
          )}
        </div>
        <p className="text-base opacity-90">{description}</p>
      </div>
    </div>
  );
}
    


export default EventCard;